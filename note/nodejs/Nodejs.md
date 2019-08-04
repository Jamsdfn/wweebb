# Node.js Note

## Node.js介绍

+ Node.js is a JavaScript runtime bulit on Chrome's V8 JavaScript engine.

  + Node.js 不是一门语言

  + Node.js 不是库，不是框架

  + Node.js 是一个 JavaScript 运行环境

  + 现在的 JavaScript 可以脱离浏览器来运行，一切都归功于， Node.js

  + 浏览器中的 JavaScript

    + Ecmascript
      + 基本语法
      + function
      + Object
      + Array

    + BOM
    + DOM

  + Node.js 中的 JavaScript

    + 没有BOM、DOM
    + EcmaScript
    + 在 Node 中 JavaScript 执行环境中为 JavaScript 提供了一些服务器级别的操作
      + 例如文件读写
      + 网络服务的构建
      + 网络通信
      + ...

+ Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficent.

  + event-driven 事件驱动
  + non-blocking I/O model 非阻塞IO模型（异步）

+ Node.js' package ecosystem, npm, is the largest ecosystem of open source libraries in the world.

  + npm install jquery

## Node.js能做的事

+ Web服务器后台
+ 命令行工具
+ 游戏服务器
+ 接口服务器
+ .....

## 学习目标

+ B/S 编程模型
  + Browser - Server
  + back-end (后台)
  + 任何服务器都是用BS模型， 和语言无关
+ 模块化编程
+ Node 常用 API
+ 异步编程
  + 回调函数
  + Promise
  + async
  + generator
+ Express 开发框架
+ EcmaScript 6
  + 一些新的语法



## 起步

### 安装 node 环境

- 官网下载 <https://nodejs.org/en/>
- 安装

### hello world！

+ console.log(‘hello world!’)

### Node 中的 JavaScript

+ Node 为 JavaScript 提供了很多服务器级别的 API，这些 API 被包装到了一个具名的核心模块中了，例如文件操作的 `fs` 核心模块； http 服务构建的 `http` 模块；`path` 路径操作模块；`os` 操作系统信息模块，等....
+ 用到这些 API 时候要如下代码加载模载

 ```javascript
  var fs = require('fs')
  var http = require('http')
 ```

+ require()方法，用来加载模块，在 Node 中模块有三种：核心模块、用户自定义模块。

  + 用户在编写文件模块
    + 相对路径必须加 ./ (用/ 的话是定位到磁盘根目录)
    + 可以省略后缀名

+ 在 Node 中，没有全局作用域，只有模块作用域

  + 外部访问访问不到内部

  + 内部访问访问不到外部

  + 要想内部让外部访问，则要把成员放入exports 对象中，require的返回值就是 exports

   ```javascript
   // a.js
    exports.foo = 'x'
    exports.hello = function () {
        console.log('hello')
    }
   ```
   ```javascript
   //b.js
    var aExports = require('a')
    console.log(aExpotrs)// => {foo:x,hello:[Function: hello]}
   ```


## Node中搭建服务器

###  http
  - require 
  - 端口号
    - ip 地址定位计算机
    - 端口号定位具体的应用程序
  - Content-Type
    - 服务器最好把每次响应的数据是什么内容类型都告诉客户端，而且要正确的告诉
    - 不同的资源对应的 Content-Type 是不一样，具体参照：http://tool.oschina.net/commons
    - 对于文本类型的数据，最好都加上编码，目的是为了防止中文解析乱码问题
  - 通过网络发送文件
    - 发送的并不是文件，本质上来讲发送是文件的内容
    - 当浏览器收到服务器响应内容之后，就会根据你的 Content-Type 进行对应的解析处理
- 请求对象 Request
- 响应对象 Response
### 在 Node 中使用模板引擎

- art-template 等模板引擎最开始是出现在后台，后面发展到前端，因此 Nodejs 也可以用这些模板引擎

### 统一处理静态资源

- 如 feedback 目录（留言板 demo）中对 url 的处理

 ```javascript
  //为了方便处理静态资源，所以约定静态资源都存在 public 中
  //else if (url.indexOf('/public/') === 0) 就可以做到 public 可以被访问
  
  
  var http = require('http')
  var fs = require('fs')
  var template = require('art-template')
  var Url = require('url')
  
  var comments = [
      {
          name: '张三1',
          message: '今天天气不错！',
          dateTime: '2015-10-16'
      },
      {
          name: '张三2',
          message: '今天天气不错！',
          dateTime: '2015-10-16'
      },
      {
          name: '张三3',
          message: '今天天气不错！',
          dateTime: '2015-10-16'
      },
      {
          name: '张三4',
          message: '今天天气不错！',
          dateTime: '2015-10-16'
      }
  ]
  
  
  http.createServer(function (req, res) {
      var parseObj = Url.parse(req.url, true)
      var pathname = parseObj.pathname
  
  
      if (pathname === '/') {
          fs.readFile('./views/index.html', function (err, data) {
              if (err) {
                  return res.end('404 Not Found.')
              }
              var html = template.render(data.toString(),{
                  comments: comments
              })
              res.end(html)
          })
      } else if (pathname === '/post') {
          fs.readFile('./views/post.html', function (err, data) {
              if (err) {
                  return res.end('404 Not Found.')
              }
              res.end(data)
          })
      } else if (pathname.indexOf('/public/') === 0) {
          fs.readFile('.' + pathname, function (err, data) {
              if (err) {
                  return res.end('404 Not Found.')
              }
              res.end(data)
          })
      } else if (pathname === '/pinglun') {
          // console.log(parseObj.query)
          //url核心模块通过 .query 帮我们取出 get 传来的数据
          var comment = parseObj.query
          comment.dateTime = '2104-1-1'
          comments.push(comment)
          //重定向 1.状态码设置为 302 临时冲重定向 2. 在响应头通过 Location 设置
          res.statusCode = 302
          res.setHeader('Location', '/')
          res.end()
      } else {
          fs.readFile('./views/404.html', function (err, data) {
              if (err) {
                  return res.end('404 Not Found.')
              }
              res.end(data)
          })
      }
  }).listen(3000, function () {
      console.log('running...')
  })
 ```

### 服务器渲染

- 服务器渲染相对于用 ajax 进行客户端异步渲染，优势在于有利于 SEO ，但是用户体验没异步渲染好，因此通常网站开发服务器渲染和客户端渲染要根据具体情况进行分析

## Node 中的模块系统

使用 Node 编写应用程序主要就是在使用：

- EcmaScript 语言
  - 和浏览器不一样，在 Node 中没有 BOM、DOM
- 核心模块
  - 文件操作的 fs
  - http 服务的 http
  - url 路径的操作模块的 url
  - 路径处理的 path
  - 获取操作系统信息的 os
  - ……
- 第三方模块
  - art-template 
- 自己写的模块
  - 自己创建的文件

### 什么是模块化

- 文件作用域
- 文件规则
  - 加载 require
  - 导出 exports

### CommonJS 模块规范

CommonJS 是一种思想，一种规范，而 NodeJs 就是这种思想的实现

在 Node 中的 JavaScript 还有一个很重要的概念：模块系统

- 模块作用域
- 使用 require 方法用来加载模块
- 使用 exports 接口对象用来导出模块中的成员



### 加载 require

语法：

```javascript
var X = require('module')
```

两个作用：

- 执行被加载模块中的代码
- 的到被加载模块中的 exports 导出接口对象

#### require加载规则

- 核心模块
  - 模块名
- 第三方模块
  - 模块名
- 用户自己写的模块
  - 路径
- 优先从缓存加载

```javascript
//main.js(执行)
require('./a')
var fn = require('./b')
console.log(fn)

//输出-->
//a被执行了
//b被执行了
//[Function]
//[Function]

//a 中已经加载过 b 了，所以 main 中不会再执行一遍 b，可以拿到接口对象但不会重复执行代码，这样做的目的是避免重复加载，提高加载效率


//a.js
console.log('a被执行了')
var fn =require('./b')
console.log(fn)


//b.js
console.log('b被执行了')
module.exports = function () {
    console.log('hello')
}
```



- 判断模块标识

  - 核心模块

    ```javascript
    var X = require('moduleName')
    ```

  - 第三方模块

    - 必须通过 npm 下载
    - 引用语法同上

  - 用户自己写的模块

  ```javascript
  var X = require('path')
  // 路径形式的模块
  //   ./ 当前目录，不可省略
  //   ../ 上一级目录，不可省略
  //   /xxx 文件模块对应磁盘跟目录 几乎不用
  //   d:/a/foo 绝对路径 几乎不用
  ```




### 导出 exports

- Node 中是模块作用域，默认文件中所有成员只在当前文件模块有效
- 对于希望可以被其他模块访问的成员，我们就需要把这些公开的成员挂载到 exports 接口对象上

导出对个成员（拿到的是对象）：

 ```javascript
   // a.js
    exports.foo = 'x'
    exports.hello = function () {
        console.log('hello')
    }
 ```
   ```javascript
   //b.js
    var aExports = require('./a')
    console.log(aExpotrs)// => {foo:x,hello:Function}
   ```

导出单个成员（拿到的就是：函数或者字符串或者对象，因为可以导出对象所以在对象中也可以放多个成员）：

```javascript
//a.js
module.exports = 'hello'
```

```javascript
//b.js
var aExports = require('./a')
console.log(a)//=>'hello'
```

#### exports原理

exports 是 module.exports 的一个引用，即 `var exports = module.exports`

导出的是 `module.exports`

```javascript
//a.js
console.log(exports === module.exports)//true

//exports.foo = 'bar'
//等价于
//module.exports.foo = 'bar'

exports.a = 123

exports = {} // 对 exports 重新赋值的话，则与 module.exports 断开的关联，因为返回的是 module.exports, 所以 exports 往下对 exports 加成员与不会返回出去

exports.foo = 'bar'
//b.js(执行)

var aExports = require('./a')
console.log(aExports)
//true
//123
```

#### exports 和 module.exports 的区别

- 每个模块中都有一个 module 对象
- module 对象中有一个 exports 对象
- 我们可以把需要导出的成员都挂载到 module.exports 接口对象中
- 也就是：`moudle.exports.xxx = xxx` 的方式
- 但是每次都 `moudle.exports.xxx = xxx` 很麻烦，点儿的太多了
- 所以 Node 为了你方便，同时在每一个模块中都提供了一个成员叫：`exports`
- `exports === module.exports` 结果为  `true`s
- 所以对于：`moudle.exports.xxx = xxx` 的方式 完全可以：`expots.xxx = xxx`
- 当一个模块需要导出单个成员的时候，这个时候必须使用：`module.exports = xxx` 的方式
- 不要使用 `exports = xxx` 不管用
- 因为每个模块最终向外 `return` 的是 `module.exports`
- 而 `exports` 只是 `module.exports` 的一个引用
- 所以即便你为 `exports = xx` 重新赋值，也不会影响 `module.exports`
- 但是有一种赋值方式比较特殊：`exports = module.exports` 这个用来重新建立引用关系的

### npm

- node package manager

#### npm 网站

<https://www.npmjs.com/>

#### npm 命令行工具

只要安装了 node 就已经安装了 npm

npm 也有版本的概念，可以升级 `npm install --global npm`

#### npm 常用命令

- `npm init` 通过向导生成 package.json 文件
  - `npm init -y` 可以跳过向导，快速生成
- `npm install  /  npm i`  package.json 的 dependencies 中有记录第三方模块信息的话可以直接根据信息一次性下载相关的所有包
- `npm install 包名 /  npm i 包名`   只安装一个第三方模块
- `npm install --save 包名 /  npm i -S 报名`  安装一个第三方模块并且在 package.json 的 dependencies 中记录（简写中的-S是大写）
- `npm uninstall 包名  /  npm un 包名`  只删除第三方模块，不修改 package.json 文件
- `npm uninstall --save 包名  /  npm un -S 包名`  删除且记录
- `npm help` 查看 npm 使用帮助
- `npm 命令 --help` 查看指定命令的帮助

#### 解决 npm 被墙问题

npm 存储包文件的服务器在国外，有时候被墙，速度很慢。

<https://npm.taobao.org/>  淘宝的开发团队把 npm 在国内做了一个备份。

安装淘宝的 cnpm

```shell
#在任意目录下执行都可以，因为 --global 表示安装到全局，而非当前目录
npm install --global cnpm
```

接下来安装包的时候把之前的 `npm` 替换成 `cnpm`

```shell
#使用国外的 npm 服务器下载
npm install jquery
#使用淘宝的服务器下载
cnpm install jquery
```

如果不想安装 `cnpm`又想用淘宝服务器下载

```shell
npm install jquery --registry=https://registry.npm.taobao.org
```

但是每次都手动设置一条这么长的参数很麻烦，所以我们可以吧这个选项加入配置文件中

```shell
npm config set registry https://registry.npm.taobao.org

# 查看 npm 配置信息看有无 registry
npm config list
```

只要经过了上面命令的配置，则以后所有的 `npm install` 都会默认通过淘宝的服务器下载

### package.json

- 建议每个项目都要有一个 `package.json` 文件（包描述文件）
- 这个文件可以通过 `npm init` 的方式初始化出来

#### package.json 和 package-lock.json

- npm 5 以前是不会有 `package-lock.json` 这个文件

- npm 5 以后才加入了这个文件

- 当你安装包的时候，npm 都会生成或者更新 `package-lock.json` 这个文件
- npm 5 以后的版面安装包不需要加  `--save` 参数，它会自动保存依赖信息
- 当你安装包的时候，会自动创建或者更新 `package-lock.json` 这个文件
- `package-lock.json` 这个文件会保存 `node_modules` 中所有包的信息（版本、下载地址等）
  - 这样的话重新 `npm install` 时候的速度就可以提升
- 从文件来看，有一个 `lock` 称之为锁
  - 这个 `lock` 是用来锁定版本的
  - 如果项目依赖了 `1.1.1` 版本的
  - 如果重新 `install` 其实会下载最新的版本，而不是 `1.1.1`
  - 所以这个 `package-lock.json` 这个文件的另一个作用就是锁定版本号，防止自动升级到新版本

## Express

- 原生的 http 在某些方面的表现不足以应对我们的开发需求，所以我们就需要使用框架来加快开发效率，框架的目的就是提高效率，让代码更统一

- 在 Node 中，有很多 Web 开发框架，但都差不多，这里先学习 `express`

- <http://expressjs.com/>  Express官网  作者  TJ（大牛，写了很多很出名的 Node 库）

### 安装

```shell
npm install express --save
```

- hello world!

```javascript
var express = require('express')

//1.创建 app，相当于 http.creatServer()
var app = express()
//把 public 目录公开，用于存放静态资源
app.use('/public/', express.static('./public/'))
//路由分发
app.get('/', function (req, res) {
        res.send('hello express!')
    })
    .get('/about', function (req, res) {
        res.send("我是express")
    })
    .get('/login', function (req, res) {
        res.send(`
        <!DOCTYPE html>
        <html lang="zh-CN">
        <head>
            <meta charset="utf-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <title>Login</title>
        </head>
        <body>
            <h1>欢迎来到express登录界面！</h1>
        </body>
        </html>
    `)
    })
// 监听端口设置
app.listen(3000, function () {
    console.log('app is running at port 3000.')
})
```

### 基本路由

get:

```javascript
// 当你以 GET 方式请求的时候，执行相对应的函数
app.get('/', function (req,res) {
    console.log('hello world!')
})
```

post：

```javascript
// 当你以 POST 方式请求的时候，执行相对应的函数
app.post('/', function (req,res) {
    console.log('Get a post request!')
})
```

### 静态服务

```javascript
//把 public 目录公开，用于存放静态资源
//当以url路径的 /public/ 开头时，去 ./public/ 目录查找对应的资源
app.use('/public/', express.static('./public/'))
//可以简写为
//app.use('/public/', express.static('./public'))
//or
//app.use('/public/', express.static('public'))
```

```javascript
// 如果省略第一个参数，则默认是url路径的 / 下 ./public/ 目录查找对应的资源
app.use(express.static('./public/'))
//可以简写为
//app.use(express.static('./public'))
//or
//app.use(express.static('public'))
```

### 在 Express 中配置使用 art-template 模板引擎

安装

```shell
npm install --save art-template
npm install --save express-art-template
```

配置

```javascript
// 配置使用 art-template 模板引擎
// 第一个参数表示，当渲染以 .html 结尾的文件的时候，使用 art-template 模板引擎渲染
// express-art-template 是专门用来在 Express 中把 art-template 整合到 Express 中
// 虽然不需要引 art-template 但是也必须安装
// 原因是 express-art-template 依赖了 art-template
app.engine('html', require('express-art-template'))
```

使用

```javascript
/** 
* express 为 response 对象提供了一个方法：render
* render方法是默认不可以使用的，但是如果配置了模板引擎就可以使用了
* res.render('html模板名', {模板数据})
*/
app.get('/', function (req, res) { 
	// !! 第一个参数不能写路径，默认会去项目中的 views 目录中查找模板
	// 也就是说 Express 有一个约定：开发人员把所有的视图文件都放入 views 目录中
    res.render('index.html',{
        title: 'hello world!'
    })//项目中 views 目录下的 index.html
})
```

如果希望修改默认的 `views` 目录 可以：

```javascript
// ！ 第一个参数 views 是固定的
app.set('views','目录路径')
```

### 在 Express 获取表单 POST 请求体数据

在 Express 中没有内置获取表单 POST 请求体的 API，需要使用一个第三方模块

`body-parser`

安装：

```shell
npm install --save body-parser
```

配置：

```javascript
var express = require('express')

var bodyParser = require('body-parser')

var app = express()
/**
* 配置 body-parser
* 只要加入这个配置，则在 req 请求对象上会多出来一个属性：body
* 也就是所你可以直接通过 req.body 来获取表单 POST 请求体数据了
*/
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
```

使用：

```javascript
app.post('/', function (req, res) {
    res.send(req.body)
})

```



## MongoDB

### 关系型数据库和非关系型数据库

#### 关系型数据库

表就是关系

或者说表与表之间存在关系

- 所有的关系型数据库都需要通过 `sql` 语言来操作
- 所有的关系型数据库在操作之前都需要设计表结构
- 而且数据表还支持约束
  - 唯一的
  - 主键
  - 默认值
  - 非空

#### 非关系型数据库

- 非关系型数据库非常灵活
- 有的非关系型数据库就是 key-value 对
- 但是 MongoDB 是长得最像关系型数据库的非关系型数据库
  - 数据库
  - 数据表 -> 集合（数组）
  - 表记录 -> (文档对象)
- MongoDB 不需要设计表结构
- 也就是说你可以任意的往里面存数据，没有结构性一说

想看专业术语和 API 可以参考  <https://www.runoob.com/mongodb/mongodb-tutorial.html>

### 启动和关闭数据库

#### 安装 Windows 服务方式启动和关闭（4.X 版本会自动安装服务）

Windows 的话可以安装 mongoDB 服务，直接通过电脑的服务，打开服务就是打开数据库，关闭服务就是关闭数据库，不安装 Windows 服务也可以用代码方式开启数据库

#### 控制台方式打开数据库

```shell
# mongodb 默认使用执行 mongod 命令所处盘根目录下的 /data/db 作为自己的数据存储目录
# 所以第一次执行该命令之前先自己手动新建一个 /data/db
mangod
```

如果想修改默认的数据库存储目录，可以（不推荐，因为这样做要每次都改）：

```shell
mongod --dbpath=数据存储目录路径
```

停止：

```shell
# 在开始服务的控制台，直接 Ctrl + C 即可停止, 或者直接关闭服务的控制台
> ^C
bye
```

### 连接和退出数据库

连接：

```shell
# 如果 Windows服务 安装了数据库则要在服务打开了才能连接上，如果是通过控制台，则要保持执行 mongod 的控制台不关才行
# 此命令可以在任何路径下执行，默认连接本机服务
mongo
```

退出：

```shell
# 在连接状态，直接输入 exit 就退出连接数据库了
exit
```

### 基本命令（控制台）

- `show dbs` 
  - 查看显示所有数据库
- `db`
  - 查看当前操作的数据库
- `use 数据库名称` 
  - 切换到制定的数据库，如果没有会新建

### 在 Node 中如何操作 MongoDB 数据

#### 使用官方的 Mongodb 包

<https://github.com/mongodb/node-mongodb-native>

#### 使用第三方 mongoose 来操作 MongoDB 数据库

第三方包：`mongoose` 基于 MongoDB 官方的 `mongodb` 包再一次做了封装

- <https://mongoosejs.com/>

### MongoDB 数据库的基本概念

- 数据库
  - 可以有多个
- 集合
  - 一个数据库可以有多个集合（类似与关系型数据库的表）
- 文档
  - 一个数集合可以有多个文档  (类似与关系型数据库的表记录)
  - 文档结构很灵活，没有任何限制

MongoDB 非常灵活，不需要像 MySQL 一样先创建数据库、表、设计表结构。当你学要插入数据的时候，只需要制定哪个数据库的哪个表操作就可以了。一切都由 MongoDB 帮你自动完成建库建表。

```javascript
{
    qq:{//数据库
        users:[//集合
            {
                name: 'Jack',
                age: 18,
                gender: 0
            },//文档
            {
                name: 'Jack',
                age: 18,
                gender: 0
            },
            ...
        ]，
        product:[
            ...
        ]
    },
    tb:{

    },
    bd:{

    }
}
```



### 起步 Mongoose

安装：`npm i mongoose`

hello world:

```javascript
var mongoose = require('mongoose');

// 连接 MongoDB 数据库
mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true });

mongoose.Promise = global.Promise;

// 创建一个模型
// 就是在设计数据库
// MongoDB 是动态的，非常灵活，只需要在代码中设计你的数据库就可以了
// mongoose 这个包就可以让你的设计编写过程变的非常的简单
var Cat = mongoose.model('Cat', { name: String });

for (var i = 0; i < 100; i++) {
    // 实例化一个 Cat
    var kitty = new Cat({ name: '喵喵' + i });

    // 持久化保存 kitty 实例
    kitty.save(function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('meow');
        }
    });
}

```

### 官方指南

#### 设计 Schema 发布 model

```javascript
var mongoose = require('mongoose')

var Schema = mongoose.Schema

// 1. 连接数据库
// 制定的数据库不一定要存在，当执行了第一条操作就会自动生成
mongoose.connect('mongodb://localhost/test')

// 2. 设计集合结构（表结构）
// 字段名称就是表结构中的属性名称
// 约束的目的是为了保证数据的完整性，不要有脏数据
var userSchema = new Schema({
    username: {
        type: String,
        require: true //必须有
    },
    password: {
        type: String,
        require: true
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


```

#### 增加数据

```javascript
// 4.当有了模型的构造函数之后，就可以用构造函数对 users 集合进行数据库操作
var admin = new User({
    username: 'admin',
    password: '123456',
    email: 'admin@admin.com'
})

admin.save(function (err, ret) {
    if (err) {
        console.log('保存失败')
    } else {
        console.log('保存成功')
        console.log(ret)
    }
})
```

#### 查询数据

```javascript
// 查询所有
User.find(function (err, data) {
    if (err) {
        console.log(err)
    } else {
        console.log(data)//数组(没数据则为空数组)
    }
})
// 按条件查询所有
User.find({
    username: 'zs'
}, function (err, data) {
    if (err) {
        console.log(err)
    } else {
        console.log(data)//数组(查不到则为空数组)
    }
})
// 按条件查询一个，如果没有任何条件则返回第一条数据
User.findOne({
    username: 'zs'
}, function (err, data) {
    if (err) {
        console.log(err)
    } else {
        console.log(data)// 结果的对象(查不到则为null)
    }
})
```

#### 删除数据

```javascript
// 根据条件删除所有符合条件的数据
User.remove({
    username: 'zs'
}, function (err, ret) {
    if (err) {
        console.log(err)
    } else {
        console.log(ret)
        console.log('删除成功')
    }
})
// 根据条件删除一个数据
User.findOneAndRemove({
    username: 'zs'
}, function (err, ret) {
    if (err) {
        console.log(err)
    } else {
        console.log(ret)
        console.log('删除成功')
    }
})
```

#### 更新数据

```javascript
User.findOneAndUpdate({
    username: 'admin'
},{
    password: '111111'
}, function (err, ret) {
    if (err) {
        console.log(err)
        console.log('更新失败')
    } else {
        console.log(ret)// 返回的是[{更新后数据},{更新前数据}]
        console.log('更新成功')
    }
})
```

增删改查 还有一些别的 API 具体看官网文档

### Promise

> 参考文档： <http://es6.ruanyifeng.com/#README>

callback hell:

![图像 3](.\图像 3.png)

无法保证顺序的代码：

```javascript
var fs = require('fs')

fs.readFile('./data/a.txt', 'utf8', function (err, data) {
    if (err) {
        throw err
    }
    console.log(data)
})

fs.readFile('./data/b.txt', 'utf8', function (err, data) {
    if (err) {
        throw err
    }
    console.log(data)
})

fs.readFile('./data/c.txt', 'utf8', function (err, data) {
    if (err) {
        throw err
    }
    console.log(data)
})
```

通过回调嵌套的方式保证顺序：

```javascript
var fs = require('fs')

fs.readFile('./data/a.txt', 'utf8', function (err, data) {
    if (err) {
        throw err
    }
    console.log(data)
    fs.readFile('./data/b.txt', 'utf8', function (err, data) {
        if (err) {
            throw err
        }
        console.log(data)
        fs.readFile('./data/c.txt', 'utf8', function (err, data) {
            if (err) {
                throw err
            }
            console.log(data)
        })
    })
})
// 这样的代码能执行，但嵌套过深的话代码就很丑陋，很难维护，比如那张经典的图
```

为了解决以上彪马方式带来的问题 ( 回调低于嵌套 ) ，所以 EcmaScript 6 中新增了一个 API：`Promise` 

- Promise 的因为就是承诺、保证
- 基本语法：

```javascript
// 在 EcmaScript 6 中新增了一个 API Promise
// Promise 是一个构造函数
var fs = require('fs')
//创建 Promise 容器
// Promise 容器一旦创建，就立即开始执行里面的代码
var p1 = new Promise(function (resolve, reject) {
    //异步任务
    fs.readFile('./data/a.txt', 'utf8', function (err, data) {
        if (err) {
        //    失败了，Promise 容器中的任务失败了
        //    把容器的 Pending 状态变为了 Rejected
        //    调用 reject 函数 (then 方法传递的第二个定义的函数)
            reject(err)//--------------------------------------|
        } else {//                                             |
        //    Promise 容器中的任务成功了                          |
        //    把容器的 Pending 状态变为了 Rejected                |
        //    调用 resolve 函数 (then 方法传递的第一个定义的函数)    |   
            resolve(data)//-------------------------------|    |
        }//                                               |    |
    })//                                                  |    |
})//                                                      |    |
// 当 p1 成功了 然后(then)做指定操作                          |    |
// then 方法接收的第一个 function 就是容器中的 resolve 函数定义 |    |
p1.then(function (data) {//<<-----------------------------|    |
    console.log(data)//                                        |
}, function (err) {//<<----------------------------------------|
    // 第二个 function 为对 reject 函数的定义
    console.log(err, '读取文件失败了')
})
```



- ![图像 4](.\图像 4.png)
- callback hell 的 Promise 解决方案：

``` javascript
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
//    当前函数中 return 的结构就可以在下一个的 then 的 function 接收到
//    因此我们可以 return 一个 Promise 对象
//    当 return 一个 Promise 对象的时候
//    下一个的 then 中方法的第一第二个参数就会
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
```



## 使用 Node 操作 MySQL 数据库

安装：

```shell
npm install --save mysql
```

起步：

```javascript
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
```



## 其他

### 修改完成后代码自动重启

使用一个第三方命令行工具：`nodemon` 来解决频繁修改代码重启服务器问题

`nodemon` 是一个基于 `Node.js` 开发的一个第三方命令行工具，我们使用的时候需要独立安装：

```shell
# 在任意目录只想该目录都可以
npm install --global nodemon
```

安装完毕后，使用：

```shell
# 安装前
node app.js
# 安装后
nodemon app.js
```

只要是通过 `nodemon app.js` 启动的服务，则它会监视你的文件变化，自动帮你重启服务器。