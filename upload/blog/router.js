var express = require('express')
var md5 = require('md5')
var User = require('./models/user')


var router = express.Router()

router.get('/', function (req, res) {
    res.render('index.html', {
        user: req.session.user
    })
})

router.get('/login', function (req, res) {
    res.render('login.html')
})

router.post('/login', function (req, res) {
    var body = req.body

    User.findOne({
        email: body.email,
        password: md5(md5(body.password))
    }, function (err, user) {
        if (err) {
            return res.status(500).json({
                err_code: 500,
                message: err.message
            })
        }

        if (!user) {
            return res.status(200).json({
                err_code: 1,
                message: 'email or password is invalid'
            })
        }

        req.session.user = user

        res.status(200).json({
            err_code: 0,
            message: 'ok'
        })
    })
})

router.get('/register', function (req, res) {
    res.render('register.html')
})

router.post('/register', function (req, res) {
    var body = req.body
    body.password = md5(md5(body.password))
    User.findOne({
        email: body.email
    })
        .then(function (data) {
            if (data) {
                // express 提供了一个响应方法 json
                // 该方法接收了一个对象作为参数，它会自动转为Json格式的字符串响应回去
                return res.status(200).json({
                    err_code: 1,
                    message: 'email already exists'
                })
            }
            return User.findOne({
                nickname: body.nickname
            })
        },function () {
            return res.status(500).json({
                success: false,
                err_code: 500,
                message: 'Server error'
            })
        })
        .then(function (data) {
            if (data) {
                return res.status(200).json({
                    err_code: 2,
                    message: 'nickname already exists'
                })
            }
            return new User(body).save()
        },function () {
                return res.status(500).json({
                    success: false,
                    err_code: 500,
                    message: 'Server error'
                })
        })
        .then(function (user) {
            req.session.user = user
            return res.status(200).json({
                err_code: 0,
                message: 'ok'
            })
        },function () {
            return res.status(500).json({
                success: false,
                err_code: 500,
                message: 'Server error'
            })
        })
})

router.get('/logout', function (req, res) {
    req.session.user = null
    res.redirect('/login')
})

module.exports = router