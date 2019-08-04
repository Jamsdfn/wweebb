var mysql      = require('mysql');

// 创建连接
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '123456',
    database : 'test'
});
// 连接
connection.connect();
// 执行数据操作
//第一个参数：SQL 语句；第二个参数：回调函数
connection.query('SELECT * FROM `users`', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].name);
});
// 关闭连接
connection.end();