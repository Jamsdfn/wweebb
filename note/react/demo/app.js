const express = require('express')

const server = express()
// 把本地的所有资源都变成可访问的静态资源，懒得用 art-template 渲染和一个个去公开HTML了
server.use('/', express.static('./'))

server.get('/get',(req,res) => {
    res.send(['中国','俄罗斯','瑞士'])
})

server.listen(3001, function () {
    console.log('running')
})
