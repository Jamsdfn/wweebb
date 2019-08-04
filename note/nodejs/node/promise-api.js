var fs = require('fs')

var p1 = new Promise(function (resolve, reject) {
    fs.readFile('./data/a.txt', 'utf8', function (err, data) {
        if (err) {
            reject(err)
        } else {
            resolve(data)
        }
    })
})

var p2 = new Promise(function (resolve, reject) {
    fs.readFile('./data/b.txt', 'utf8', function (err, data) {
        if (err) {
            reject(err)
        } else {
            resolve(data)
        }
    })
})

var p3 = new Promise(function (resolve, reject) {
    fs.readFile('./data/c.txt', 'utf8', function (err, data) {
        if (err) {
            reject(err)
        } else {
            resolve(data)
        }
    })
})

//    当 p1 读取成功的时候
//    当前函数中 return 的结构就可以在后面的 then 的 function 接收到
//    因此我们可以 return 一个 Promise 对象
//    当 return 一个 Promise 对象的时候
//    后续的 then 中方法的第一第二个参数就会
//    作为 return 的那个promise对象的 resolve 和 reject 的定义
//    因此可以用此方法( then 的链式调用)解决回调地狱的问题
p1
    .then(function (data) {//p1 的 resolve 和 reject
        console.log(data)
        return p2
    }, function (err) {
        console.log(err, '读取文件失败了')
    })

    .then(function (data) {
        console.log(data)
        return p3
    }, function (err) {
        console.log(err, '读取文件失败了')
    })

    .then(function (data) {
        console.log(data)
    }, function (err) {
        console.log(err, '读取文件失败了')
    })