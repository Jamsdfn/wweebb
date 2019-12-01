const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')
const path = require('path')
const fs = require('fs')

const server = express()

// 把本地的所有资源都变成可访问的静态资源，懒得用 art-template 渲染和一个个去公开HTML了
server.use('/', express.static('./'))
server.use(bodyParser.urlencoded({extended: true}))
server.use(multer({dest:'./img'}).any())

server.get('/getDate',(req,res) => {
    var data = 'nok'
    if (req.query.id === '1') {
        data = 'ok'
    }
    res.send(`${req.query.callback}('${data}')`)
})

server.get('/get',(req,res) => {
    res.send(['中国','俄罗斯','瑞士'])
})

var user = {
    leo: '111'
}
server.get('/login', (req,res) => {
    if (!user[req.query.user]) {
        return res.send({ok:0,msg:'用户不存在'})
    }
    if (user[req.query.user] !== req.query.pass) {
        return res.send({ok:0,msg:'密码错误'})
    }
    return res.send({ok:1,msg:'登录成功'})
})

server.post('/loginPost', (req, res) => {
    if (!user[req.body.user]) {
        return res.send({ok:0,msg:'用户不存在'})
    }
    if (user[req.body.user] !== req.body.pass) {
        return res.send({ok:0,msg:'密码错误'})
    }
    return res.send({ok:1,msg:'登录成功'})
})

server.use('/addPic', (req,res) => {
    // console.log(req.files[0])
    var newPath = req.files[0].path + path.parse(req.files[0].originalname).ext
    fs.rename(req.files[0].path, newPath, (err)=>{
        if(err){
            return res.send({ok:0,msg:'写入失败'})
        }else{
            return res.send({ok:1,msg:'头像保存成功',dataUrl: newPath})
        }
    })
})

server.listen(3001, function () {
    console.log('running')
})
