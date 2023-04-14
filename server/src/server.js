const express = require('express')
const fs = require('fs')
const path = require('path')

const app = express()

// 设置允许跨域访问该服务
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});

app.get('/', (request, response)=>{
    response.send('hello world')
})

app.get('/data', (request, response)=>{
    let filePath = path.join(__dirname + '/source/marked.md')
    fs.readFile(filePath, 'utf-8', (error, data)=>{
        if (error) response.send(error)
        else response.send(data)
    })
})

app.listen('8080', () => {
    console.log('http://localhost:8080')
})