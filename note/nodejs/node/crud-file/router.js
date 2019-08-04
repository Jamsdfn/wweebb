/*
* router.js 路由模块
* 职责：
*   处理路由
*   根据不同的请求方法+请求路径设置具体请求处理函数
* */
// Express 提供了一种比较好的方法
// 专门用来包装路由
var express = require('express')
// 1. 创建一个路由容器
var router = express.Router()
var Students = require('./students')
// 2. 把路由都挂载到 router 路由容器中
router.get('/students', function (req, res) {
    Students.find(function (err, students) {
        if (err) {
            return res.status(500).send('Sever error')
        }
        res.render('index.html', {
            fruits: [
                'apple',
                'pineapple',
                'banana',
                'orange'
            ],
            students: students
        })
    })
    
})

router.get('/students/new', function (req, res) {
    res.render('new.html')
})

router.post('/students/new', function (req, res) {
//    获取表单数据
//    处理
//    发送请求
//    res.send(req.body)
    Students.save(req.body,function (err) {
        if (err) {
            return res.status(500).send('Sever error')
        }
        res.redirect('/students')
    })
})

router.get('/students/edit', function (req, res) {
    Students.findById(req.query.id,function (err, stu) {
        if (err) {
            return res.status(500).send('Sever error')
        }
        res.render('edit.html', {
            student: stu
        })
    })

})

router.post('/students/edit', function (req, res) {
    Students.updateById(req.body, function (err) {
        if (err) {
            return res.status(500).send('Sever error')
        }
        res.redirect('/students')
    })
})

router.get('/students/delete', function (req, res) {
    Students.deleteById(req.query.id, function (err) {
        if (err) {
            return res.status(500).send('Sever error')
        }
        res.redirect('/students')
    })
})


module.exports = router

// 这种方法可以但没那么好
// module.exports = function (app) {
//     app.get('/students', function (req, res) {
//         fs.readFile('./db.json', 'utf8', function (err, data) {
//             if (err) {
//                 return res.status(500).send('Sever error')
//             }
//             res.render('index.html', {
//                 fruits: [
//                     'apple',
//                     'pineapple',
//                     'banana',
//                     'orange'
//                 ],
//                 students: JSON.parse(data).students
//             })
//         })
//     })
//
//     app.get('/students/new', function (req, res) {
//
//     })
//
//     app.get('/students/new', function (req, res) {
//
//     })
//
//     app.get('/students/new', function (req, res) {
//
//     })
//
//     app.get('/students/new', function (req, res) {
//
//     })
//
//     app.get('/students/new', function (req, res) {
//
//     })
//
//     app.get('/students/new', function (req, res) {
//
//     })
// }


