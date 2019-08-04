var mongoose = require('mongoose')

var Schema = mongoose.Schema

// 1. 连接数据库
// 制定的数据库不一定要存在，当执行了第一条操作就会自动生成
mongoose.connect('mongodb://localhost/itcast')

// 2. 设计集合结构（表结构）
// 字段名称就是表结构中的属性名称
// 约束的目的是为了保证数据的完整性，不要有脏数据
var userSchema = new Schema({
    username: {
        type: String,
        required: true //必须有
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String
    }
})

// 3. 将文档结构发布为模型
//  mongoose.model 方法就是用来将一个架构发布为 model
//  第一个参数：传入一个大写字母开头的名词单数字符串用来表示你的数据库名称
//            mongoose 会自动将大写名词的字符串生成 小写复数 的集合名词
//            例如这里的 User 最终会变成 users 集合名称
//  第二个参数：架构 Schema
//  返回值：模型构造函数
var User = mongoose.model('User', userSchema)

// 4.当有了模型的构造函数之后，就可以用构造函数对 users 集合进行数据库操作

// 新增数据
// var admin = new User({
//     username: 'zs',
//     password: '123456',
//     email: 'admin@admin.com'
// })
//
// admin.save(function (err, ret) {
//     if (err) {
//         console.log('保存失败')
//     } else {
//         console.log('保存成功')
//         // console.log(ret)
//     }
// })

// 查询数据
// User.find(function (err, data) {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log(data)//数组(没数据则为空数组)
//     }
// })
//
// User.find({
//     username: 'zs'
// }, function (err, data) {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log(data)//数组(查不到则为空数组)
//     }
// })
//
// User.findOne({
//     username: 'zs'
// }, function (err, data) {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log(data)// 结果的对象(查不到则为null)
//     }
// })

// 删除
// User.remove({
//     username: 'zs'
// }, function (err, ret) {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log(ret)
//         console.log('删除成功')
//     }
// })

// User.findOneAndRemove({
//     username: 'zs'
// }, function (err, ret) {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log(ret)
//         console.log('删除成功')
//     }
// })

// 更新数据
// User.findOneAndUpdate({
//     username: 'admin'
// },{
//     password: '111111'
// }, function (err, ret) {
//     if (err) {
//         console.log(err)
//         console.log('更新失败')
//     } else {
//         console.log(ret)// 返回的是[{更新后数据},{更新前数据}]
//         console.log('更新成功')
//     }
// })
