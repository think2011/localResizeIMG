var lrz    = require('lrz');
var expect = chai.expect;

describe("测试压缩正常运作", function () {

    it("通过基本例子", function (done) {
        return lrz('base/test/img/transparent_png.png')
            .then(function (rst) {
                expect(rst).to.all.keys('formData', 'origin', 'base64', 'fileLen');
            });
    });
});