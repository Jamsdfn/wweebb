const express = require('express')
const server = express()

var book = ['001的内容','002的内容','003的内容']

server.use('/book',(req,res) => {
    res.setHeader('Access-Control-Allow-Origin','*')
    if (req.query.id === '001') {
        res.send({ok:1,data:book[0]})
    } else if (req.query.id === '002') {
        res.send({ok:1,data:book[1]})
    } else if (req.query.id === '003') {
        res.send({ok:1,data:book[2]})
    } else {
        res.send({ok:0})
    }
})

server.listen(3001,() => {
    console.log('server is running...')
})
