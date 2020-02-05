var bodyParser = require('body-parser');
var STS = require('qcloud-cos-sts');
var express = require('express');

// 配置参数
var config = {
    secretId: 'xxxxx',
    secretKey: 'xxxx',
    proxy: '',
    durationSeconds: 3600, // 临时密钥时效一个小时

    // 放行判断相关参数
    bucket: 'bucketName',
    region: 'cos-region',
    allowPrefix: '*', // 这里改成允许的路径前缀，可以根据自己网站的用户登录态判断允许上传的具体路径，例子： a.jpg 或者 a/* 或者 * (使用通配符*存在重大安全风险, 请谨慎评估使用)
    // 简单上传和分片，需要以下的权限，其他权限列表请看 https://cloud.tencent.com/document/product/436/31923
    allowActions: ['name/cos:GetBucket','name/cos:PutObject', 'name/cos:PostObject', 'name/cos:GetObject', 'name/cos:DeleteObject'],
};


// 创建临时密钥服务
var app = express();
app.use(bodyParser.json());

// 支持跨域访问
app.all('*', function (req, res, next) {
    res.header('Content-Type', 'application/json');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'origin,accept,content-type');
    if (req.method.toUpperCase() === 'OPTIONS') {
        res.end();
    } else {
        next();
    }
});

// 临时密钥接口
app.all('/sts', function (req, res, next) {

    // TODO 这里根据自己业务需要做好放行判断

    // 获取临时密钥
    var policy = STS.getPolicy([{
		action: config.allowActions,
		bucket: config.bucket,
		region: config.region,
		prefix: config.allowPrefix
	}])
    STS.getCredential({
        secretId: config.secretId,
        secretKey: config.secretKey,
        proxy: config.proxy,
        durationSeconds: config.durationSeconds,
        policy: policy,
    }, function (err, tempKeys) {
        var result = JSON.stringify(err || tempKeys) || '';
        res.send(result);
    });
});
app.all('*', function (req, res, next) {
    res.writeHead(404);
    res.send({code: 404, codeDesc: 'PageNotFound', message: '404 page not found'});
});

// 启动签名服务
app.listen(3001);
console.log('app is listening at http://127.0.0.1:3001');