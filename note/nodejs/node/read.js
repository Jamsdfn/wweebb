
//fs 是 file-system 的简写，就是文件系统的意思
//在 Node 中如果想要进行文件操作，就必须引入 fs 这个核心模块
//在 fs 这个核心模块中，就提供了所有的文件操作相关的API
//例如：fs.readFile 就是用来读取人间的

//1.使用 require 方法加载 fs 核心模块
var fs = require('fs')
//fs.readFile(filePath,callback(error,data))
// 成功 data就是二进制数据  error就是null
// 失败 data就是null  error就是错误对象
fs.readFile('./hello.txt',function (error,data) {
    if(error){
        console.log(error)
        return false
    }
    console.log(data)
    console.log(data.toString())
})
