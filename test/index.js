[].forEach.call(document.querySelectorAll('[data-src]'), function (el) {
    (function (el) {
        el.src = 'img/loading.gif';

        lrz(el.dataset.src).then(function (rst) {
            el.src = rst.base64;
        });
    })(el);
});

11

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
                resultSize = toFixed2(rst.base64Len * 0.8 / 1024),
                scale      = parseInt(100 - (resultSize / sourceSize * 100));

            p.style.fontSize = 13 + 'px';
            p.innerHTML      = '源文件：<span class="text-danger">' +
                sourceSize + 'KB' +
                '</span>，压缩后<span class="text-success">' +
                resultSize + 'KB (省' + scale + '%)' +
                '</span> ';

            //div.className = 'col-xs-6';
            div.appendChild(img);
            div.appendChild(p);

            img.onload = function () {
                that.parentNode.appendChild(div);
            };

            img.src = rst.base64;
        });
});

document.querySelector('#version').innerHTML = lrz.version;

function toFixed2 (num) {
    return parseFloat(+num.toFixed(2));
}
