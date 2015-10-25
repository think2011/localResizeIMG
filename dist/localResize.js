
/**
 *  LocalResize
 * @class
 * @param {Object} el 原生的dom元素
 * @param {Object} options={} 可选项
 * @param {number} options.rWidth=800 压缩图片的宽度，高度会跟随适应。
 * @param {number} options.quality=0.7 压缩质量,取值 0-1
 * @param {boolean} options.UI 是否需要内置操作界面
 */

(function() {
  var LocalResize;

  LocalResize = (function() {
    function LocalResize(el, options) {
      var k, v;
      if (options == null) {
        options = {};
      }
      if (!el) {
        return console.error('需要传入一个dom元素');
      }
      this.el = el;
      this.results = {};
      this.defaults = {
        rWidth: 800,
        quality: 0.7,
        UI: true
      };
      for (k in options) {
        v = options[k];
        if (v) {
          this.defaults[k] = v;
        }
      }
      this._init();
    }


    /**
     * 设置预览图片
     * @param {string} url
     */

    LocalResize.prototype.setImg = function(url) {
      this.UI.setImg(url);
      return this;
    };


    /**
     * 设置预览图片-无删除图标
     * @param {string} url
     */

    LocalResize.prototype.setImgOnly = function(url) {
      this.UI.setImgOnly(url);
      return this;
    };


    /**
     * @description 停止加载状态，通常在ajax完成后调用。
     */

    LocalResize.prototype.setStop = function() {
      this.UI.setSuccess();
      return this;
    };


    /**
     * 恢复初始状态
     */

    LocalResize.prototype.reset = function() {
      this.results = {};
      this.UI.reset();
      return this;
    };


    /**
     * change回调
     * @param  {function} fn
     */

    LocalResize.prototype.change = function(fn) {
      if (typeof fn === 'function') {
        this.change = fn;
      }
      return this;
    };


    /**
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
     */

    LocalResize.prototype.success = function(fn) {
      if (typeof fn === 'function') {
        this.success = fn;
      }
      return this;
    };


    /**
     * 初始化样式
     */

    LocalResize.prototype._initStyle = function() {
      var css, theStyle;
      css = ".lr {\n  position: relative;\n  display: inline-block;\n}\n\n.lr input[type=file] {\n    width: 100%;\n    height: 100%;\n    position: absolute;\n    top: 0;\n    left: 0;\n    z-index: 1991;\n    opacity: 0;\n}";
      theStyle = document.createElement('style');
      theStyle.innerHTML = css;
      document.head.appendChild(theStyle);
      return LocalResize.prototype._initStyle = function() {
        return true;
      };
    };


    /**
     * 生成元素
     */

    LocalResize.prototype._createEl = function() {
      this.el.classList.add('lr');
      if (this.defaults.UI) {
        this.UI = new LrUI(this);
      }
      this.file = document.createElement('input');
      this.file.type = 'file';
      return this.el.appendChild(this.file);
    };


    /**
     * 获取base64
     */

    LocalResize.prototype._getBase64 = function() {
      var getResults;
      this.file.addEventListener('change', function() {
        getResults(this.files[0]);
        return this.value = '';
      }, false);
      return getResults = (function(_this) {
        return function(file) {
          var URL, defaults, img, k, results, v;
          URL = window.URL || window.webkitURL;
          defaults = _this.defaults;
          results = _this.results = {};
          results.original = {};
          for (k in file) {
            v = file[k];
            if (typeof v !== 'function') {
              results.original[k] = v;
            }
          }
          results.blob = URL.createObjectURL(file);
          _this.change(results);
          if (_this.defaults.UI) {
            _this.setImg(results.blob);
            _this.UI.setWait();
          }
          img = new Image();
          img.src = results.blob;
          return img.onload = function() {
            var base64, canvas, ctx, e, encoder, h, mpImg, scale, temp_setStop, that, userAgent, w;
            scale = img.width / img.height;
            w = defaults.rWidth || img.width;
            h = w / scale;
            canvas = document.createElement('canvas');
            canvas.width = w;
            canvas.height = h;
            ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, w, h);
            userAgent = navigator.userAgent;
            base64 = null;
            if (userAgent.match(/iphone/i)) {
              try {
                mpImg = new MegaPixImage(img);
                mpImg.render(canvas, {
                  maxWidth: w,
                  maxHeight: h,
                  quality: defaults.quality
                });
                base64 = canvas.toDataURL('image/jpeg', defaults.quality);
              } catch (_error) {
                e = _error;
                alert('未引用mobile补丁，无法生成图片。');
              }
            } else if (userAgent.match(/Android/i)) {
              try {
                encoder = new JPEGEncoder();
                base64 = encoder.encode(ctx.getImageData(0, 0, w, h), defaults.quality * 100);
              } catch (_error) {
                e = _error;
                alert('未引用mobile补丁，无法生成图片。');
              }
            } else {
              base64 = canvas.toDataURL('image/jpeg', defaults.quality);
            }
            results.base64 = base64;
            results.base64Clean = base64.substr(base64.indexOf(',') + 1);
            if (LocalResize.prototype.success !== _this.success) {
              that = _this;
              temp_setStop = (function() {
                function temp_setStop() {}

                temp_setStop.prototype.stop = function() {
                  return that.setStop.call(that);
                };

                return temp_setStop;

              })();
              return _this.success(new temp_setStop().stop, results);
            }
          };
        };
      })(this);
    };

    LocalResize.prototype._init = function() {
      this._initStyle();
      this._createEl();
      return this._getBase64();
    };

    return LocalResize;

  })();

  window.LocalResize = LocalResize;

}).call(this);

//# sourceMappingURL=localResize.js.map