window.onerror = function (errMsg, scriptURI, lineNumber, columnNumber, errorObj) {
    setTimeout(function () {
        var rst = {
            "错误信息：": errMsg,
            "出错文件：": scriptURI,
            "出错行号：": lineNumber,
            "出错列号：": columnNumber,
            "错误详情：": errorObj
        };

        alert('出错了，下一步将显示错误信息');
        alert(JSON.stringify(rst, null, 10));
    });
};


[].forEach.call(document.querySelectorAll('[data-src]'), function (el) {
    (function (el) {
        el.addEventListener('click', function () {
            el.src = 'img/loading.gif';

            lrz(el.dataset.src)
                .then(function (rst) {
                    el.src = rst.base64;


                    return rst;
                });
        });

        fireEvent(el, 'click');
    })(el);
});


document.querySelector('input').addEventListener('change', function () {
    var that     = this,
        progress = document.querySelector('progress');

    lrz(that.files[0], {
        width: 800
    })
        .then(function (rst) {
            var img        = new Image(),
                div        = document.createElement('div'),
                p          = document.createElement('p'),
                sourceSize = toFixed2(that.files[0].size / 1024),
                resultSize = toFixed2(rst.fileLen / 1024),
                effect     = parseInt(100 - (resultSize / sourceSize * 100));

            p.style.fontSize = 13 + 'px';
            p.innerHTML      = '源文件：<span class="text-danger">!{sourceSize}KB</span> <br>压缩后传输大小：<span class="text-success">!{resultSize}KB (省!{effect}%)</span> '.render({
                sourceSize: sourceSize,
                resultSize: resultSize,
                effect    : effect
            });

            div.className = 'col-sm-6';
            div.appendChild(img);
            div.appendChild(p);

            img.onload = function () {
                document.querySelector('#upload-container').appendChild(div);
            };

            progress.value = 0;

            /* ==================================================== */
            // 原生ajax上传代码，所以看起来特别多 ╮(╯_╰)╭，但绝对能用
            // 其他框架，例如ajax处理formData略有不同，请自行google，baidu。
            var xhr = new XMLHttpRequest();
            xhr.open('POST', 'http://koa-upload.herokuapp.com');

            xhr.onload = function () {
                var data = JSON.parse(xhr.response);

                if (xhr.status === 200) {
                    // 上传成功
                    img.src        = rst.base64;
                    progress.value = 0;
                } else {
                    // 处理错误
                    alert(data.msg);

                    div.remove();
                    that.value = null;
                }
            };

            xhr.onerror = function (err) {
                alert('未知错误:' + JSON.stringify(err, null, 2));
                div.remove();
                that.value = null;
            };

            // issues #45 提到似乎有兼容性问题,关于progress
            if (xhr.upload) {
                try {
                    xhr.upload.addEventListener('progress', function (e) {
                        if (!e.lengthComputable) return false;

                        // 上传进度
                        progress.value = ((e.loaded / e.total) || 0) * 100;
                    });
                } catch (err) {
                    console.error('进度展示出错了,似乎不支持此特性?', err);
                }
            }

            // 添加参数
            rst.formData.append('fileLen', rst.fileLen);
            rst.formData.append('xxx', '我是其他参数');

            // 触发上传
            xhr.send(rst.formData);
            /* ==================================================== */

            return rst;
        });
});

document.querySelector('#version').innerHTML = lrz.version;
document.querySelector('.UA').innerHTML      = 'UA: ' + navigator.userAgent;

function toFixed2(num) {
    return parseFloat(+num.toFixed(2));
}

/**
 * 替换字符串 !{}
 * @param obj
 * @returns {String}
 * @example
 * '我是!{str}'.render({str: '测试'});
 */
String.prototype.render = function (obj) {
    var str = this, reg;

    Object.keys(obj).forEach(function (v) {
        reg = new RegExp('\\!\\{' + v + '\\}', 'g');
        str = str.replace(reg, obj[v]);
    });

    return str;
};

/**
 * 触发事件 - 只是为了兼容演示demo而已
 * @param element
 * @param event
 * @returns {boolean}
 */
function fireEvent(element, event) {
    var evt;

    if (document.createEventObject) {
        // IE浏览器支持fireEvent方法
        evt = document.createEventObject();
        return element.fireEvent('on' + event, evt)
    }
    else {
        // 其他标准浏览器使用dispatchEvent方法
        evt = document.createEvent('HTMLEvents');
        // initEvent接受3个参数：
        // 事件类型，是否冒泡，是否阻止浏览器的默认行为
        evt.initEvent(event, true, true);
        return !element.dispatchEvent(evt);
    }
}

/**
 * 替换字符串 !{}
 * @param obj
 * @returns {String}
 * @example
 * '我是!{str}'.render({str: '测试'});
 */
String.prototype.render = function (obj) {
    var str = this, reg;

    Object.keys(obj).forEach(function (v) {
        reg = new RegExp('\\!\\{' + v + '\\}', 'g');
        str = str.replace(reg, obj[v]);
    });

    return str;
};


if (!('remove' in Element.prototype)) {
    Element.prototype.remove = function () {
        this.parentNode.removeChild(this);
    };
}

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
