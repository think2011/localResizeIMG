var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 1991;

app.use(bodyParser.json());
app.use(express.static(__dirname + '/src/'));

app.get('/', function (req, res) {
    res.send('<script>location.href = "/demo";</script>');
});

// 接收post
app.post('/', function (req, res) {
    var data = req.body;

    if(data.base64.length !== data.size) {
        return res.send({
            error: '文件未接收完整，服务端生成失败'
        });
    }

    var fileSrc = 'src/demo.jpg',
        dataBuffer = new Buffer((data.base64).split(',')[1], 'base64');

    fs.writeFile(fileSrc, dataBuffer, function (err) {
        var file = fs.readFileSync(fileSrc);
        res.send({
            size: file.length,
            src: req.url + 'demo.jpg?' + Date.now()
        });
    });
});

var server = app.listen(port, function () {
    console.log('app running at ' + port);
});