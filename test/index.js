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

        el.click();
    })(el);
});

document.querySelector('input').addEventListener('change', function () {
    var that = this;

    lrz(that.files[0], {
        width: 1024
    })
        .then(function (rst) {
            var img        = new Image(),
                div        = document.createElement('div'),
                p          = document.createElement('p'),
                sourceSize = toFixed2(that.files[0].size / 1024),
                resultSize = toFixed2(rst.base64Len / 1024),
                scale      = parseInt(100 - (resultSize / sourceSize * 100));

            p.style.fontSize = 13 + 'px';
            p.innerHTML      = '源文件：<span class="text-danger">' +
                sourceSize + 'KB' +
                '</span> <br />' +
                '压缩后传输Base64：<span class="text-success">' +
                resultSize + 'KB (省' + scale + '%)' +
                '</span> ';

            div.className = 'col-sm-6';
            div.appendChild(img);
            div.appendChild(p);

            img.onload = function () {
                that.parentNode.appendChild(div);
            };

            img.src = rst.base64;

            return rst;
        });
});

document.querySelector('#version').innerHTML = lrz.version;

function toFixed2 (num) {
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
