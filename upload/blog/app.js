var path = require('path')

var express = require('express')
var session = require('express-session')
var bodyParser = require('body-parser')

var router = require('./router')

var app = express()

app.use('/public/', express.static(path.join(__dirname, './public/')))
app.use('/node_modules/', express.static(path.join(__dirname, './node_modules/')))

app.engine('html',require('express-art-template'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

app.use(router)

// 如果没有一个中间件可以处理则进入 404 页面
app.use(function (req, res) {
    res.render('404.html')
})


app.listen(3000, function () {
    console.log('running...')
})