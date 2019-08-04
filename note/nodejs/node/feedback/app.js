//为了方便处理静态资源，所以约定静态资源都存在 public 中
//else if (url.indexOf('/public/') === 0) 就可以做到 public 可以被访问


var http = require('http')
var fs = require('fs')
var template = require('art-template')
var Url = require('url')

var comments = [
    {
        name: '张三1',
        message: '今天天气不错！',
        dateTime: '2015-10-16'
    },
    {
        name: '张三2',
        message: '今天天气不错！',
        dateTime: '2015-10-16'
    },
    {
        name: '张三3',
        message: '今天天气不错！',
        dateTime: '2015-10-16'
    },
    {
        name: '张三4',
        message: '今天天气不错！',
        dateTime: '2015-10-16'
    }
]


http.createServer(function (req, res) {
    var parseObj = Url.parse(req.url, true)
    var pathname = parseObj.pathname


    if (pathname === '/') {
        fs.readFile('./views/index.html', function (err, data) {
            if (err) {
                return res.end('404 Not Found.')
            }
            var html = template.render(data.toString(),{
                comments: comments
            })
            res.end(html)
        })
    } else if (pathname === '/post') {
        fs.readFile('./views/post.html', function (err, data) {
            if (err) {
                return res.end('404 Not Found.')
            }
            res.end(data)
        })
    } else if (pathname.indexOf('/public/') === 0) {
        fs.readFile('.' + pathname, function (err, data) {
            if (err) {
                return res.end('404 Not Found.')
            }
            res.end(data)
        })
    } else if (pathname === '/pinglun') {
        // console.log(parseObj.query)
        //url核心模块通过 .query 帮我们取出 get 传来的数据
        var comment = parseObj.query
        comment.dateTime = '2104-1-1'
        comments.push(comment)
        //重定向 1.状态码设置为 302 临时冲重定向 2. 在响应头通过 Location 设置
        res.statusCode = 302
        res.setHeader('Location', '/')
        res.end()
    } else {
        fs.readFile('./views/404.html', function (err, data) {
            if (err) {
                return res.end('404 Not Found.')
            }
            res.end(data)
        })
    }
}).listen(3000, function () {
    console.log('running...')
})