
//用 node 构建一个web服务器

//Node 中专门提供了一个核心模块：http

var http = require('http')

//http.createServer()方法创建一个服务器， 返回一个server实例

var server = http.createServer()

// 服务器： 接受客户端请求 处理请求 发送响应
//注册 request 事件
server.on('request',function () {
    console.log('收到请求')
})

//启动服务器，绑定端口号
server.listen(3000,function () {
    console.log('running...')
})
