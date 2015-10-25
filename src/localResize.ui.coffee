# 获取当前js文件所在路径
currentJSDir = do ->
  js = document.scripts[document.scripts.length-1]
  return js.src.substr 0, js.src.lastIndexOf '/'


class LrUI
  constructor: (source) ->
    @el      = source.el
    @options = source.defaults
    @source  = source

    @_init @el

  # reset
  reset: ->
    @el.classList.remove 'waiting'
    @el.classList.remove 'success'
    @el.classList.remove 'only-read'
    @el.classList.add 'ready'

    @el.querySelector('.lr-img').style.backgroundImage = null


  # setWait
  setWait: ->
    @el.classList.remove 'ready'
    @el.classList.remove 'success'
    @el.classList.remove 'only-read'
    @el.classList.add 'waiting'


  # setImgOnly
  setImgOnly: (url) ->
    @el.classList.remove 'ready'
    @el.classList.remove 'waiting'
    @el.classList.remove 'success'
    @el.classList.add 'only-read'

    @el.querySelector('.lr-img').style.backgroundImage = "url(#{url})"


  # setImg
  setImg: (url) ->
    @setSuccess()

    @el.querySelector('.lr-img').style.backgroundImage = "url(#{url})"


  # setSuccess
  setSuccess: (cb) ->
    @el.classList.remove 'ready'
    @el.classList.remove 'waiting'
    @el.classList.remove 'only-read'
    @el.classList.add 'success'


  # 设置标题
  setTitle: (title) ->
    title = title or @el.dataset.title

    if title
      @el.querySelector('.lr-title').innerHTML = title
    else
      @el.classList.add 'no-title'


  # 生成元素
  _addEl: ->
    html = """
            <div class="lr-title"></div>

            <div class="lr-hint">
                <div class="lr-ready">
                    <i class="fa fa-camera"></i>
                    <p>点击上传</p>
                </div>

                <div class="lr-waiting">
                    <i class="fa fa-spinner fa-spin"></i>
                </div>
            </div>

            <div class="lr-success">
                <div class="lr-remove">
                    <i class="fa fa-trash"></i>
                </div>

                <div class="lr-img"></div>
            </div>
             """

    @el.classList.add 'lr'
    @el.classList.add 'lr-ui'
    @el.innerHTML = html

    @reset()


  # 监听删除
  _onRemove: ->
    @el.querySelector('.lr-remove').addEventListener 'click', =>
      @source.reset()
    ,false


  # 初始化样式
  _initStyle: ->
    style      = document.createElement 'link'
    style.type = 'text/css'
    style.rel  = 'stylesheet'
    style.href = "#{currentJSDir}/localResize.css"
    document.head.appendChild style

    LrUI::_initStyle = -> return true


  # 初始化入口
  _init: ->
    @_initStyle()
    @_addEl()
    @_onRemove()
    @setTitle()


# 开放接口
window.LrUI = LrUI