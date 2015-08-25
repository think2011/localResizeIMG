// 保证按需加载的文件路径正确
__webpack_public_path__ = getCurrentJsDir() + '/';
window.URL              = window.URL || window.webkitURL;

var Promise = require('Promise'),
    exif    = require('exif');

// 判断设备是否是IOS7以下
var isOldIOS = (function (userAgent) {
    var rst = /OS (\d)_.* like Mac OS X/g.exec(userAgent);

    if (rst === null) return false;

    return +rst.pop() < 8;
})(navigator.userAgent);

// 判断设备是否是android4.5以下
var isOldAndroid = (function (userAgent) {
    var rst = /Android (\d.*?);/g.exec(userAgent);

    if (rst === null) return false;

    return +(rst.pop().substr(0, 3)) < 4.5;
})(navigator.userAgent);


function Lrz (file, opts) {
    var that = this;

    if (!file) throw new Error('没有收到图片，可能的解决方案：https://github.com/think2011/localResizeIMG4/issues/7');

    opts = opts || {};

    that.defaults = {
        width  : null,
        height : null,
        quality: 0.7
    };

    that.file = file;

    for (var p in opts) {
        if (!opts.hasOwnProperty(p)) continue;
        that.defaults[p] = opts[p];
    }

    return this.init();
}

Lrz.prototype.init = function () {
    var that   = this,
        file   = that.file,
        img    = new Image(),
        canvas = document.createElement('canvas'),
        blob   = (typeof file === 'string') ? file : URL.createObjectURL(file);

    that.img    = img;
    that.blob   = blob;
    that.canvas = canvas;

    if (!document.createElement('canvas').getContext) {
        throw new Error('浏览器不支持canvas');
    }

    return new Promise(function (resolve, reject) {
        img.onerror = function () {
            throw new Error('加载图片文件失败');
        };

        img.onload = function () {
            that._getBase64()
                .then(function (base64) {
                    if (base64.length < 10) reject('生成base64失败');

                    return base64;
                })
                .then(function (base64) {
                    resolve({
                        origin   : that.file,
                        base64   : base64,
                        base64Len: base64.length
                    });

                    // 释放内存
                    for (var p in that) {
                        if (!that.hasOwnProperty(p)) continue;

                        that[p] = null;
                    }
                    URL.revokeObjectURL(that.blob);
                });
        };

        img.crossOrigin = "*";

        img.src = blob;
    });
};

Lrz.prototype._getBase64 = function () {
    var that   = this,
        img    = that.img,
        canvas = that.canvas;

    return new Promise(function (resolve) {
        exif.getData(img, function () {
            that.orientation = exif.getTag(this, "Orientation");
            that.resize      = that._getResize();
            that.ctx         = canvas.getContext('2d');

            canvas.width  = that.resize.width;
            canvas.height = that.resize.height;

            // 设置为白色背景，jpg是不支持透明的，所以会被默认为canvas默认的黑色背景。
            that.ctx.fillStyle = '#fff';
            that.ctx.fillRect(0, 0, canvas.width, canvas.height);

            // 根据设备进行不同处理
            isOldIOS
                ? that._createBase64ForOldIOS().then(resolve)
                : that._createBase64().then(resolve);
        });
    });
};

Lrz.prototype._createBase64ForOldIOS = function () {
    var that        = this,
        img         = that.img,
        canvas      = that.canvas,
        orientation = that.orientation;

    return new Promise(function (resolve) {
        require(['megapix-image'], function (MegaPixImage) {
            var mpImg = new MegaPixImage(img);

            if ("5678".indexOf(orientation) > -1) {
                mpImg.render(canvas, {
                    width      : canvas.height,
                    height     : canvas.width,
                    orientation: orientation
                });
            } else {
                mpImg.render(canvas, {
                    width      : canvas.width,
                    height     : canvas.height,
                    orientation: orientation
                });
            }

            resolve(canvas.toDataURL('image/jpeg', that.defaults.quality));
        });
    });
};

Lrz.prototype._createBase64 = function () {
    var that        = this,
        resize      = that.resize,
        img         = that.img,
        canvas      = that.canvas,
        ctx         = that.ctx,
        defaults    = that.defaults,
        orientation = that.orientation;

    // 调整为正确方向
    switch (orientation) {
        case 3:
            ctx.rotate(180 * Math.PI / 180);
            ctx.drawImage(img, -resize.width, -resize.height, resize.width, resize.height);
            break;
        case 6:
            ctx.rotate(90 * Math.PI / 180);
            ctx.drawImage(img, 0, -resize.width, resize.height, resize.width);
            break;
        case 8:
            ctx.rotate(270 * Math.PI / 180);
            ctx.drawImage(img, -resize.height, 0, resize.height, resize.width);
            break;

        case 2:
            ctx.translate(resize.width, 0);
            ctx.scale(-1, 1);
            ctx.drawImage(img, 0, 0, resize.width, resize.height);
            break;
        case 4:
            ctx.translate(resize.width, 0);
            ctx.scale(-1, 1);
            ctx.rotate(180 * Math.PI / 180);
            ctx.drawImage(img, -resize.width, -resize.height, resize.width, resize.height);
            break;
        case 5:
            ctx.translate(resize.width, 0);
            ctx.scale(-1, 1);
            ctx.rotate(90 * Math.PI / 180);
            ctx.drawImage(img, 0, -resize.width, resize.height, resize.width);
            break;
        case 7:
            ctx.translate(resize.width, 0);
            ctx.scale(-1, 1);
            ctx.rotate(270 * Math.PI / 180);
            ctx.drawImage(img, -resize.height, 0, resize.height, resize.width);
            break;

        default:
            ctx.drawImage(img, 0, 0, resize.width, resize.height);
    }

    return new Promise(function (resolve) {
        // 针对低于4.5版本的android
        if (isOldAndroid) {
            require(['jpeg_encoder_basic'], function (JPEGEncoder) {
                var encoder = new JPEGEncoder(),
                    img     = ctx.getImageData(0, 0, canvas.width, canvas.height);

                resolve(encoder.encode(img, defaults.quality * 100));
            })
        }
        else {
            resolve(canvas.toDataURL('image/jpeg', defaults.quality));
        }
    });
};

Lrz.prototype._getResize = function () {
    var that        = this,
        img         = that.img,
        defaults    = that.defaults,
        width       = defaults.width,
        height      = defaults.height,
        orientation = that.orientation;

    var ret = {
        width : img.width,
        height: img.height
    };

    if ("5678".indexOf(orientation) > -1) {
        ret.width  = img.height;
        ret.height = img.width;
    }

    var scale = ret.width / ret.height;

    if (width && height) {
        if (scale >= width / height) {
            if (ret.width > width) {
                ret.width  = width;
                ret.height = Math.ceil(width / scale);
            }
        } else {
            if (ret.height > height) {
                ret.height = height;
                ret.width  = Math.ceil(height * scale);
            }
        }
    }
    else if (width) {
        if (width < ret.width) {
            ret.width  = width;
            ret.height = Math.ceil(width / scale);
        }
    }
    else if (height) {
        if (height < ret.height) {
            ret.width  = Math.ceil(height * scale);
            ret.height = height;
        }
    }

    // 超过这个值base64无法生成，在IOS上
    if (ret.width >= 3264 || ret.height >= 2448) {
        ret.width *= 0.8;
        ret.height *= 0.8;
    }

    return ret;
};

/**
 * 获取当前js文件所在路径，必须得在代码顶部执行此函数
 * @returns {string}
 */
function getCurrentJsDir () {
    var src = document.scripts[document.scripts.length - 1].src;

    return src.substr(0, src.lastIndexOf('/'));
}

window.lrz = function (file, opts) {
    return new Lrz(file, opts);
};

// 版本号来自package.json，构建时自动填充
window.lrz.version = '__packageJSON.version__';

module.exports = window.lrz;

/**
 *
 * 　　　┏┓　　　┏┓
 * 　　┏┛┻━━━┛┻┓
 * 　　┃　　　　　　　┃
 * 　　┃　　　━　　　┃
 * 　　┃　┳┛　┗┳　┃
 * 　　┃　　　　　　　┃
 * 　　┃　　　┻　　　┃
 * 　　┃　　　　　　　┃
 * 　　┗━┓　　　┏━┛Code is far away from bug with the animal protecting
 * 　　　　┃　　　┃    神兽保佑,代码无bug
 * 　　　　┃　　　┃
 * 　　　　┃　　　┗━━━┓
 * 　　　　┃　　　　　 ┣┓
 * 　　　　┃　　　　 ┏┛
 * 　　　　┗┓┓┏━┳┓┏┛
 * 　　　　　┃┫┫　┃┫┫
 * 　　　　　┗┻┛　┗┻┛
 *
 */
