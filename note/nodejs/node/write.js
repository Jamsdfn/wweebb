var fs = require('fs')
//路径 内容 回调函数(error)
fs.writeFile('./test.txt','唱，S调，Rap!',function (error) {
    console.log(error)
})