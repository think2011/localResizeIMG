(function() {
  var LrUI, currentJSDir;

  currentJSDir = (function() {
    var js;
    js = document.scripts[document.scripts.length - 1];
    return js.src.substr(0, js.src.lastIndexOf('/'));
  })();

  LrUI = (function() {
    function LrUI(source) {
      this.el = source.el;
      this.options = source.defaults;
      this.source = source;
      this._init(this.el);
    }

    LrUI.prototype.reset = function() {
      this.el.classList.remove('waiting');
      this.el.classList.remove('success');
      this.el.classList.remove('only-read');
      this.el.classList.add('ready');
      return this.el.querySelector('.lr-img').style.backgroundImage = null;
    };

    LrUI.prototype.setWait = function() {
      this.el.classList.remove('ready');
      this.el.classList.remove('success');
      this.el.classList.remove('only-read');
      return this.el.classList.add('waiting');
    };

    LrUI.prototype.setImgOnly = function(url) {
      this.el.classList.remove('ready');
      this.el.classList.remove('waiting');
      this.el.classList.remove('success');
      this.el.classList.add('only-read');
      return this.el.querySelector('.lr-img').style.backgroundImage = "url(" + url + ")";
    };

    LrUI.prototype.setImg = function(url) {
      this.setSuccess();
      return this.el.querySelector('.lr-img').style.backgroundImage = "url(" + url + ")";
    };

    LrUI.prototype.setSuccess = function(cb) {
      this.el.classList.remove('ready');
      this.el.classList.remove('waiting');
      this.el.classList.remove('only-read');
      return this.el.classList.add('success');
    };

    LrUI.prototype.setTitle = function(title) {
      title = title || this.el.dataset.title;
      if (title) {
        return this.el.querySelector('.lr-title').innerHTML = title;
      } else {
        return this.el.classList.add('no-title');
      }
    };

    LrUI.prototype._addEl = function() {
      var html;
      html = "<div class=\"lr-title\"></div>\n\n<div class=\"lr-hint\">\n    <div class=\"lr-ready\">\n        <i class=\"fa fa-camera\"></i>\n        <p>点击上传</p>\n    </div>\n\n    <div class=\"lr-waiting\">\n        <i class=\"fa fa-spinner fa-spin\"></i>\n    </div>\n</div>\n\n<div class=\"lr-success\">\n    <div class=\"lr-remove\">\n        <i class=\"fa fa-trash\"></i>\n    </div>\n\n    <div class=\"lr-img\"></div>\n</div>";
      this.el.classList.add('lr');
      this.el.classList.add('lr-ui');
      this.el.innerHTML = html;
      return this.reset();
    };

    LrUI.prototype._onRemove = function() {
      return this.el.querySelector('.lr-remove').addEventListener('click', (function(_this) {
        return function() {
          return _this.source.reset();
        };
      })(this), false);
    };

    LrUI.prototype._initStyle = function() {
      var style;
      style = document.createElement('link');
      style.type = 'text/css';
      style.rel = 'stylesheet';
      style.href = "" + currentJSDir + "/localResize.css";
      document.head.appendChild(style);
      return LrUI.prototype._initStyle = function() {
        return true;
      };
    };

    LrUI.prototype._init = function() {
      this._initStyle();
      this._addEl();
      this._onRemove();
      return this.setTitle();
    };

    return LrUI;

  })();

  window.LrUI = LrUI;

}).call(this);

//# sourceMappingURL=localResize.ui.js.map