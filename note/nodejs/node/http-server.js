var http = require('http')
var fs = require('fs')
var path = require('path')
var server = http.createServer()

var wwwDir = 'D:/mydata/wweebb/upload/H5Cart'
server.on('request', function (req, res) {
    var url = req.url
    var filePath = '/index.html'
	console.log(url)
    if (url !== '/'){
        filePath = url
    }

    fs.readFile(path.join(wwwDir,filePath), function (err,data) {
        if (err){
            return res.end('404 Not Found!')
        }
        res.end(data)
    })

})

server.listen(3000, function () {
    console.log('running....')
})