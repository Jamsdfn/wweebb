var http = require('http')

var server = http.createServer()
//request 请求事件处理函数，接受两个参数 request response
server.on('request', function (request, response) {
    //request.url 端口号后面的字符串
    console.log('收到请求,路径：' + request.url)
//    response 对象有一个方法：write 可以用来给客户端发送响应数据
//    write可以使用多次，但是最后一定要使用end来结束响应，否则客户端会一直等待
    response.write('hello')
    response.write(' nodejs')
    response.end()
})

server.listen(3000, function () {
    console.log('服务器启动成功')
})
