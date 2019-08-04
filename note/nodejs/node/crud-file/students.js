// 数据操作文件模块
var fs = require('fs')

var dbPath = './db.json'

// 获取所有学生列表
exports.find = function (callback) {
    fs.readFile(dbPath, 'utf8', function (err, data) {
        callback && callback(err, JSON.parse(data).students)
    })
}
// 查询一个学生
exports.findById = function (id, callback) {
    fs.readFile(dbPath, 'utf8', function (err, data) {
        if (err) {
            return callback(err)
        }
        var students = JSON.parse(data).students
        // [].find() 方法
        // 这是一个 Es6 中的一个数组方法， 需要接受一个返回值为布尔值的函数作为参数
        // 当某个遍历项符合 item.id === id 条件时会终止遍历，同时返回该数据对象
        var stu = students.find(function (item) {
            return item.id === parseInt(id)
        })
        callback(err, stu)
    })
}

// 添加保存学生
exports.save = function (student, callback) {
    fs.readFile(dbPath, 'utf8', function (err, data) {
        if (err) {
            return callback(err)
        }
        // 读出所有学生
        var students = JSON.parse(data).students
        // 添加 id
        student.id = students[students.length - 1].id + 1
        student.gender = parseInt(student.gender)
        student.age = parseInt(student.age)
        // 追加到 students 里
        students.push(student)
        // 对象转为字符串，再持久化
        var fileData = JSON.stringify({
            students: students
        })
        // 数据持久化
        fs.writeFile(dbPath, fileData, function (err) {
            callback(err)
        })
    })
}

// 更新学生
exports.updateById = function (student, callback) {
    fs.readFile(dbPath, 'utf8', function (err, data) {
        if (err) {
            return callback(err)
        }
        var students = JSON.parse(data).students

        // 保持数据类型
        student.id = parseInt(student.id)
        student.gender = parseInt(student.gender)
        student.age = parseInt(student.age)

        var stu = students.find(function (item) {
            return item.id === student.id
        })
        for (var key in student){
            stu[key] = student[key]
        }
        var fileData = JSON.stringify({
            students: students
        })
        // 数据持久化
        fs.writeFile(dbPath, fileData, function (err) {
            callback(err)
        })
    })
}

// 删除学生
exports.deleteById = function (id, callback) {
    fs.readFile(dbPath, 'utf8', function (err, data) {
        if (err) {
            return callback(err)
        }
        var students = JSON.parse(data).students
        // [].findIndex() es6数组方法 返回下标
        var deleteIndex = students.findIndex(function (item) {
            return item.id === parseInt(id)
        })
        // 数组中删除
        students.splice(deleteIndex, 1)

        var fileData = JSON.stringify({
            students: students
        })
        // 数据持久化
        fs.writeFile(dbPath, fileData, function (err) {
            callback(err)
        })
    })
}
