# marked

author: 语录

time: 2023.04.14

介绍：

我在浏览Github时看到Markdown可以在网页上被渲染，真的是太神奇太厉害了。程序员可以很方便的在Markdown上写文章、技术分享和博客之类的，我当然也想这样，我也想实现像Github渲染Markdown这样的功能。于是，我开始百度……

搜索了各种各样的关键字，终于得到了我想要的答案。通过正则表达式将Markdown中的字符替换为HTML，我还找到两个专门渲染markdown的模块：markdown-it 和 marked。

markdown-it 我搜索了个便都没有相关的教程，要我看官网上的我也不会用，于是把目光放到了 marked 上。

marked 我也没有找到相关的教程，不过官网上的教程我看懂一点了，于是我成功的实现了渲染Markdown到网页的功能。但我是通过字符串的形式渲染的，我要的是将Markdown文件也渲染到网页上。

功能既然实现了，现在就有改进它，读取Markdown文件并渲染到网页。

因为HTML无法读取文件，所以我们使用服务器将Markdown文件响应到HTML，js通过Ajax请求请求到Markdown文件，再使用marked解析并渲染，再使用webpack打包，就可以在HTML页面上看到我们写的文章了。

```
npm init -y

npm install marked axios

npm install webpack webpack-cli -D
```

package.json

```json
{
  "name": "marktd",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack --config webpack.config.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "axios": "^1.3.5",
    "marked": "^4.3.0"
  },
  "devDependencies": {
    "webpack": "^5.78.0",
    "webpack-cli": "^5.0.1"
  }
}
```

webpack.config.js

```js
const path = require('path');

module.exports = {
    mode: 'development',
    entry: "./src/index.js",
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    }
}
```

index.js

```js
const marked = require('marked')
const axios = require('axios')

axios.get('http://localhost:8080/data').then(response=>{
    document.body.innerHTML = marked.parse(response.data);
})
```

index.html

```
pre {
    background-color: #efefef;
    padding: 10px 10px 10px 15px;
    font-size: 16px;
    line-height: 22px;
    border-radius: 1%;
}
```

server.js

```js
const express = require('express')
const fs = require('fs')
const path = require('path')

// 创建服务器
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
    // 获取文件路劲
    let filePath = path.join(__dirname + '/README.MD')
    // 读取文件
    fs.readFile(filePath, 'utf-8', (error, data)=>{
        if (error) return
        else response.send(data)
    })
})

// 启动服务器
app.listen('8080', ()=>{
    console.log('http://localhost:8080')
})
```

