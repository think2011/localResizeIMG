###*
 *  LocalResize
 * @class
 * @param {Object} el 原生的dom元素
 * @param {Object} options={} 可选项
 * @param {number} options.rWidth=800 压缩图片的宽度，高度会跟随适应。
 * @param {number} options.quality=0.7 压缩质量,取值 0-1
 * @param {boolean} options.UI 是否需要内置操作界面
###
class LocalResize
  constructor: (el, options = {}) ->
    unless el then return console.error '需要传入一个dom元素'

    @el       = el
    @results  = {}
    @defaults =
      rWidth  : 800
      quality : 0.7
      UI      : true


    for k, v of options
      if v then @defaults[k] = v


    @_init()


  ###*
   * 设置预览图片
   * @param {string} url 
  ###
  setImg: (url) ->
    @UI.setImg url
    return @


  ###*
   * 设置预览图片-无删除图标
   * @param {string} url 
  ###
  setImgOnly: (url) ->
    @UI.setImgOnly url
    return @


  ###*
   * @description 停止加载状态，通常在ajax完成后调用。
  ###
  setStop: ->
    @UI.setSuccess()
    return @


  ###*
   * 恢复初始状态
  ###
  reset: ->
    @results = {}
    @UI.reset()
    return @


  ###*
   * change回调
   * @param  {function} fn 
  ###
  change: (fn) ->
    if typeof fn is 'function' then @change = fn
    return @


  ###*
   * success回调
   *
   * @example
   * lr.success(function(stop, data{});
   * 
   * @param {function} stop 停止加载状态
   * @param {function} data data.base64 生成好的base64文件
   *                        data.base64Clean 清除头信息的base64，方便后端存为图片
   *                        data.original 原始文件的信息，例如type name size
   * 
  ###
  success: (fn) ->
    if typeof fn is 'function' then @success = fn
    return @


  ###*
   * 初始化样式
  ###
  _initStyle: ->
    css = """
        .lr {
          position: relative;
          display: inline-block;
        }

        .lr input[type=file] {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 1991;
            opacity: 0;
        }
        """
    theStyle           = document.createElement 'style'
    theStyle.innerHTML = css
    document.head.appendChild theStyle

    LocalResize::_initStyle = -> return true


  ###*
   * 生成元素
  ###
  _createEl: ->
    # 生成基本样式
    @el.classList.add 'lr'

    # 生成UI
    if @defaults.UI then @UI = new LrUI @

    # 生成上传控件
    @file      = document.createElement 'input'
    @file.type = 'file'
    @el.appendChild @file


  ###*
   * 获取base64
  ###
  _getBase64: ->
    # 监听变化
    @file.addEventListener 'change', ->
      # 获取base64
      getResults @.files[0]

      # 打扫卫生
      @.value = ''
    , false

    getResults = (file) =>
      URL              = window.URL or window.webkitURL
      defaults         = @defaults
      results          = @results = {}
      results.original = {}

      # 生成原始数据
      for k, v of file
        if typeof v isnt 'function' then results.original[k] = v

      # 拒绝非图片
      # 部分手机没有提供type参数（微信环境），例如小米2。
#      unless /(gif|jpg|jpeg|png|GIF|JPG|PNG|tiff|raw|exif|bmp)$/.test file.type then return alert '不是标准的图片，请您重试。'

      # 生成引用
      results.blob = URL.createObjectURL file

      # change回调
      @change results

      # 生成预览
      if @defaults.UI
        @setImg results.blob
        @UI.setWait()

      # 生成base64
      img = new Image()
      img.src = results.blob

      img.onload = =>
        # 计算缩放尺寸
        scale = img.width / img.height
        w     = defaults.rWidth or img.width
        h     = w / scale

        # 创建canvas
        canvas = document.createElement 'canvas'
        canvas.width  = w
        canvas.height = h

        ctx = canvas.getContext '2d'
        ctx.drawImage img, 0, 0, w, h

        # 兼容各种环境
        userAgent = navigator.userAgent
        base64    = null

        # 兼容 IOS
        if userAgent.match /iphone/i
          try
            mpImg = new MegaPixImage img
            mpImg.render canvas,
              maxWidth   : w
              maxHeight  : h
              quality    : defaults.quality
            base64 = canvas.toDataURL 'image/jpeg', defaults.quality
          catch e
            alert '未引用mobile补丁，无法生成图片。'

        # 兼容 Android
        else if userAgent.match /Android/i
          try
            encoder = new JPEGEncoder()
            base64 = encoder.encode ctx.getImageData(0, 0, w, h), defaults.quality * 100
          catch e
            alert '未引用mobile补丁，无法生成图片。'

        # 其他情况
        else
          base64 = canvas.toDataURL 'image/jpeg', defaults.quality

        # 保存base64
        results.base64      = base64
        results.base64Clean = base64.substr base64.indexOf(',') + 1

        # success回调
        unless LocalResize::success is @success
          # 停止加载状态的传参，以class的方式解决上下文作用域的问题
          that = @
          class temp_setStop
            stop: ->
              that.setStop.call that

          @success new temp_setStop().stop, results



  _init: ->
    @_initStyle()
    @_createEl()
    @_getBase64()


# 开放接口
window.LocalResize = LocalResize

