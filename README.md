[![Build Status](https://travis-ci.org/think2011/localResizeIMG.svg?branch=master)](https://travis-ci.org/think2011/localResizeIMG)
[![npm version](https://img.shields.io/npm/v/lrz.svg)](https://www.npmjs.com/package/lrz)
[![npm](https://img.shields.io/npm/l/express.svg)]()

# 演示一下

![](http://think2011.github.io/localResizeIMG/test/demo.gif)

# 自己试试

![](http://think2011.github.io/localResizeIMG/test/qrcode.png)


[点我直接进入演示页面](http://think2011.github.io/localResizeIMG/test/)


# 介绍说明
在客户端压缩好要上传的图片可以节省带宽更快的发送给后端，特别适合在移动设备上使用。

* 兼容IOS&Android，修复了IOS和Android某些版本已知的BUG（`这也是插件最有意义的存在价值`）。

* 按需加载文件，仅需引入`lrz.bundle.js`文件，例如当检测是IOS7的用户，那么会自动异步再载入修复BUG的文件，而无需担心浪费宝贵的带宽开销。

* 原生JS编写，不依赖例如`jquery`等第三方库。

* 支持AMD or CMD规范

# 如何获取

通过以下方式都可以下载：

1. 执行`bower install lrz`（推荐）
2. 执行`npm i lrz`

接着在页面中引入
```html
<script src="./dist/lrz.bundle.js"></script>
```

# 如何使用

### 方式1:

如果您的图片来自用户拍摄或者上传的，您需要一个`input file`来获取图片。

```html
<input onchange="upload().bind(this)" type="file" accept="image/*" />
```

接着通过change事件可以得到用户选择的图片
```js
function upload () {
    lrz(this.files[0])
        .then(function (rst) {
            // 处理成功会执行
        })
        .catch(function (err) {
            // 处理失败会执行
        })
        .always(function () {
            // 不管是成功失败，都会执行
        });
});
```

### 方式2：

如果您的图片不是来自用户上传的，那么也可以直接传入图片路径。

```js
lrz('./xxx/xx/x.png')
        .then(function (rst) {
            // 处理成功会执行
        })
        .catch(function (err){
            // 处理失败会执行
        })
        .always(function () {
            // 不管是成功失败，都会执行
        });
```

# 后端处理

[后端处理请查看WIKI。](https://github.com/think2011/localResizeIMG/wiki)


# API

[具体参数说明请查看WIKI。](https://github.com/think2011/localResizeIMG/wiki)

# 兼容性

IE9以上及大部分非IE浏览器（chrome、微信什么的）

# FAQ

[有疑问请直接在 issues 中提问](https://github.com/think2011/localResizeIMG/issues)

```
请一定记得附上以下内容：💡
请一定记得附上以下内容：🙈
请一定记得附上以下内容：💡

平台：微信..
设备：iPhone5 IOS7..
问题：问题描述呗..
```

* Q：能否提供完整的一套UI?
* A：暂时定位是作为纯粹的处理插件，或许会考虑开发一整套UI。

* Q：有时拍摄完照片后，页面自动刷新或闪退了。
* A：虽然已作了优化处理，但内存似乎还是爆掉了，常见于低配android手机，建议每次只处理一张图片。

* Q: 怎么批量上传图片?
* A: 您可以自己写个循环来传入用户多选的图片，但在移动端上请谨慎处理，原因同上。

* Q: 直接传入图片路径的无法生成图片
* A: 可能是跨域的问题，具体请看[CORS_enabled_image](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image)

* Q: 想要商用可以吗？
* A: 没问题，但请留意issue里已知的问题。

# 开发

[想要参与 or 自己定制 or 了解源码请点击这里，逻辑和说明](https://github.com/think2011/localResizeIMG/wiki/%E5%BC%80%E5%8F%91)

# 感谢

* @dwandw
* @yourlin
* @wxt2005

以上在之前的版本帮忙参与维护的朋友，以及提出问题的朋友们，真的真的很感谢你们。：D
