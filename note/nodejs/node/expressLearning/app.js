var express = require('express')
//相当于 http.createServer
var app = express()
//公开指定目录
app.use('/public/', express.static('./public/'))
//返回对象是 APP 所以我们可以链式调用
app.get('/', function (req, res) {
        res.send('hello express!')
    })
    .get('/about', function (req, res) {
        res.send("我是express")
    })
    .use('/login', function (req, res) {
        res.send(`
        <!DOCTYPE html>
        <html lang="zh-CN">
        <head>
            <meta charset="utf-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <title>Login</title>
        </head>
        <body>
            <h1>欢迎来到express登录界面！</h1>
        </body>
        </html>
    `)
    })


app.listen(3000, function () {
    console.log('app is running at port 3000.')
})

