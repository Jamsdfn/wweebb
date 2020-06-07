# vue note

## webpack

本质上，*webpack* 是一个现代 JavaScript 应用程序的*静态模块打包器(module bundler)*。当 webpack 处理应用程序时，它会递归地构建一个*依赖关系图(dependency graph)*，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 *bundle*。

> 可以从[这里](https://www.webpackjs.com/concepts/modules)了解更多关于 JavaScript 模块和 webpack 模块的信息。

从 webpack v4.0.0 开始，可以不用引入一个配置文件。然而，webpack 仍然还是[高度可配置的](https://www.webpackjs.com/configuration)。在开始前你需要先理解四个**核心概念**：

- 入口(entry)
- 输出(output)
- loader
- 插件(plugins)

### 安装

```shell
# 安装一个全局的 webpack ，这样可以直接在命令行执行webpack命令
npm install -g webpack
npm install --save-dev webpack
```

### 使用 (以下 webpack 例子都是 3.x 版本)

``` shell
# 没有 webpack 配置文件 把 /src/js/entry.js 编译成 /dist/js/bulid.js
webpack /src/js/entry.js /dist/js/bulid.js
# 有 webpack.config.js 文件
webpack

# 如果要用局部版本的 webpack，按道理应该直接 webpack 就是用局部的 webpack 的，我装了 4.x 版本就出问题了
# package.json 文件加上 "scripts": {"webpack":"webpack"}
 npm run webpack
```


###  webpack 属性配置   **webpack.config.js**

```javascript
// 引入插件的包
var HtmlWebpackPlugin = require('html-webpack-plugin')
var path = require('path')
module.exports = {
    entry: { // main是默认入口，也可以是多入口
        main: './src/main.js'
    },
    // 出口
    output: {
        filename:'./js/build.js', // 指定js文件
        publicPath: '/', //通常我们会对目录进行分类，所以我门用这个来统一资源路径
        path: path.join(__dirname, 'dist') //最好是绝对路径，防止不必要的错误
    },
    module: {
        // 也可以是 rules： ，这个功能和 loaders 一样，是 webpack2.x 之后新加的
        loaders: [ //比如 引入 .css 文件，loaders 执行顺序是倒序执行的
            {
                test: /\.css$/ // 正则表达式
                //style-loader和css-loader是工具名称。
                //!感叹号是分割符，表示两个工具都参与处理。
                //?问号，其实跟url的问号一样，就是后面要跟参数的意思。
                //loader:'sytle-loader!css-loader'
                //这样的写法等效于官网的
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test:/\.(jpg|svg|png|gif)$/,
                // [name].[ext]内置提供的，因为本身是先读这个文件
                // loader:'url-loader?limit=8192'
                // 等效于
                 use: [{
                	loader: 'url-loader',
                	options:{
    					limit:8192,
    					name:'./assets/[name].[ext]'//生成名字，可以写成路径形式，自动创建目录，并放入目录中
					}
            	}]
            }
        ]
    },
    plugins: [
        //插件的执行顺序的依次执行的
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })// 把模板文件 配置到 output.path 目录
    ]
}
```

### 缓存问题

网站上线后，遇到更新如果直接用第一次打包的配置打包的话，因为输出js的文件名都一样，因此会出现缓存问题，为了解决这个缓存问题有以下解决方案

1. 加版本号

- output.filename 后面加上版本号版本号（old school）

```js
output: {
        filename:'./build.js?v=1.1.1', 
		publicPath: '/', //通常我们会对目录进行分类，所以我门用这个来统一资源路径
        path: path.join(__dirname, 'dist') 
    },
```

版本升级导致全体升级，用户要把整个文件重新下载一次，对于小更新来说，例如只在 css 中改了几个样式，就要把整个js文件重新下一次，这样用户体验是不好的。

- 各部分分离，各自加版本号

  - 分离提取css

    - 安装插件

    ```shell
    npm install --save-dev extract-text-webpack-plugin
    # for webpack 2
    npm install --save-dev extract-text-webpack-plugin@2.1.2
    # for webpack 1
    npm install --save-dev extract-text-webpack-plugin@1.0.1
    ```

    - 使用

  ```js
  const ExtractTextPlugin = require("extract-text-webpack-plugin");
  module.exports = {
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: "css-loader"
          })
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin("styles.css"),// 生成文件的文件名
    ]
  }
  ```

  - 分离第三方包

  如果我们用vue的话，比如在 vue 文件中只改一句话，如果不分离第三方包的话，这样整个 js 文件又会重新更新并且下载一次，这样用户体验也不好。我们可以用一个插件（CommonsChunkPlugin）来分离第三方包，这个插件是 webpack 内置的插件，无需下载不过要引入 webpack ，直接 new 除了就好了。

  ```js
  const webpack = require('webpack')
  
  module.exports = {
  entry: { //多入口
          main: './src/main.js',
          vendors: ['vue','vue-router','axios',....]
      },
      ...
      plugins: [
      new webpack.optimize.CommonsChunkPlugin({
          // manifest 清单，用来记录使用者和第三方包之间的关系
          name:['vendors','manifest']
      });
    ]
  }
  ```

  

  2.  hash 值来命名文件，这样就不用一次次的自己改版本号

  ```js
  output: {
      // [chunkhash:6] 表示生产六位的 hash 
      // hash相关的占位符都可以加 :num 来限定名字的长度
      // [name].[chunkhash] =》 名字.hash值.js
          filename:'./js/[chunkhash].js', 
          publicPath: '/', //通常我们会对目录进行分类，所以我门用这个来统一资源路径
          path: path.join(__dirname, 'dist') 
      },
  ```

  ```js
  const ExtractTextPlugin = require("extract-text-webpack-plugin");
  module.exports = {
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: "css-loader"
          })
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin("./css/[contenthash].css"),
    ]
  }
  ```

### 对生成文件瘦身

为了减少包的大小，我们有几个方案

1. 压缩 UglifyjsWebpackPlugin

- 下载

```shell
npm install uglifyjs-webpack-plugin --save-dev
```

- 使用

```js
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// webpack 4.x
module.exports = {
  optimization: {
    minimizer: [new UglifyJsPlugin()],// 用于压缩的插件放入 minimizer 中
  },
};
// webpack 3.x
plugins: [
    new UglifyJsPlugin(),
  ]
```

2. 按需加载

   对于一些可以自定义的第三方插件进行按需加载，如 mint-ui

3. 如果是单页面程序（spa）可以根据路由进行懒加载，以下用 vue 框架来做例子

   懒加载写法：![1112279-20171103120334341-1152394105](.\1112279-20171103120334341-1152394105.png)

   非懒加载写法：![1112279-20171103120443263-200874461](.\1112279-20171103120443263-200874461.png)

   **那个 `@/` 只是个路径的名字，也就是他放组件的目录叫 @，不是懒加载的格式，这两张图只是为了偷懒，从网上抠过来而已 **

   vue路由懒加载格式就一个

   ```js
   import xxx from 'path'
   //改成
   const xxx = resolve => require(['path'],resolve)
   //这个 xxx 该怎么用就怎么用
   ```

## EcmaScript 6

2015年6月， ES2015（即 ECMAScript 6、ES6） 正式发布。虽然 ES6 提出了许多激动人心的新特性，但由于目前许多浏览器不支持或者支持不好，没有普遍地推广起来。

而 Babel 的出现，让我们可以现在就使用最新的 JavaScript 语法，而不用等待浏览器提供支持。

- Babel 是一个转换编译器，它能将 ES6 转换成可以在浏览器中运行的代码。Babel 可以处理 ES6 的所有新语法，并且内置了 React JSX 扩展及 Flow 类型注解支持。

### webpack-ES6

因为浏览器对 es6 语法，不是完全支持的，因此我们可以用 webpack 打包，打包的时候把 es6 语法转换为浏览器都支持的 es5 语法。

- ES6 的模块，vue本身默认支持 ES6 的模块导入导出
- Babel
  - babel-loader（内部依赖 babel-core）
    - 关键字 （presets es2015）
    - 函数 （plugins babel-plugin-transform-runtime）

```shell
# 引入解析包
npm i -D babel-loader babel-core babel-preset-es2015 babel-plugin-transform-runtime
```

```javascript
    const htmlWebpackPlugin = require('html-webpack-plugin');
    const path = require('path')
    module.exports = {
        entry:{ //main是默认入口,也可以是多入口
            main:'./src/main.js'
        },
        //出口
        output:{
            filename:'./build.js', //指定js文件
            path: path.join(__dirname,'dist')          //最好是绝对路径
            //代表当前目录的上一级的dist
        },
        module:{
            //一样的功能rules:   webpack2.x之后新加的
            loaders:[       //require('./a.css||./a.js')
                {test:/\.css$/,
                 loader:'style-loader!css-loader',
                },
                {
                 test:/\.(jpg|svg|png|gif)$/,
                 loader:'url-loader?limit=4096&name=[name].[ext]', 
                 //[name].[ext]内置提供的，因为本身是先读这个文件
                 // options:{
                 //    limit:4096,
                 //    name:'[name].[ext]'
                 // }
                },{//处理ES6的js
                    test:/\.js$/,
                    loader:'babel-loader',
                    //排除 node_modules下的所有, 因为第三方包也有js文件
                    exclude:/node_modules/,
                    options:{
                        presets:['es2015'],//关键字 相当于引入了 babel-preset-es2015
                        plugins:['transform-runtime'],//函数 相当于引入了 babel-plugin-transform-runtime
                    }
                }
            ]
        },
        plugins:[
            //插件的执行顺序是依次执行的
            new htmlWebpackPlugin({
                template:'./src/index.html',
                })
                //将src下的template属性描述的文件根据当前配置的output.path，将文件移动到该目录
        ]
    }
```

### 箭头函数

箭头函数是对函数定义和调用的一种简写方式

- 箭头函数基本形式

```javascript
let func = (num) => num;
let func = () => num;
let sum = (num1,num2) => num1 + num2;
[1,2,3].map(x => x * x);
```

- 箭头函数this为父作用域的this，不是调用时的this

箭头函数中的this，指向与一般function定义的函数不同，箭头函数this的定义：箭头函数中的this是在定义函数的时候绑定，而不是在执行函数的时候绑定。

即箭头函数的this永远指向其父作用域，任何方法都改变不了，包括call，apply，bind。
普通函数的this指向调用它的那个对象。

```javascript
let name = 'rose'
let person = {
    name:'jack',
    init:function(){
        //为body添加一个点击事件，看看这个点击后的this属性有什么不同
        document.body.onclick = ()=>{
            alert(this.name);//jack   person对象的name                 
        }
    }
}
person.init();
```

上例中，init是function，以person.init调用，其内部this就是person本身，而onclick回调是箭头函数，
其内部的this，就是父作用域的this，就是person，能得到name。

```javascript
let person = {
    name:'jack',
    init:()=>{
        //为body添加一个点击事件，看看这个点击后的this属性有什么不同
        document.body.onclick = ()=>{
            alert(this.name);//""                  
        }
    }
}
person.init();
```

上例中，init为箭头函数，其内部的this为全局window（因为window是person的上一级），onclick的this也就是init函数的this，也是window，可以看做this往上抛了两层，得到的this.name就为window.name。window.name 默认为 ""。

- 箭头函数不能作为构造函数，不能使用new

```javascript
//构造函数如下：
function Person(p){
    this.name = p.name;
}
//如果用箭头函数作为构造函数，则如下
var Person = (p) => {
    this.name = p.name;
}
```

由于this必须是对象实例，而箭头函数是没有实例的，此处的this指向别处，不能产生person实例，自相矛盾。

- 箭头函数没有arguments，caller，callee

箭头函数本身没有arguments，如果箭头函数在一个function内部，它会将外部函数的arguments拿过来使用。
箭头函数中要想接收不定参数，应该使用rest参数解决。

```javascript
let B = (b)=>{
  console.log(arguments);
}
B(2,92,32,32);   // Uncaught ReferenceError: arguments is not defined

let C = (...c) => {
  console.log(c);
}
C(3,82,32,11323);  // [3, 82, 32, 11323]
```

- 箭头函数通过call和apply调用，不会改变this指向，只会传入参数

```javascript
let obj2 = {
    a: 10,
    b: function(n) {
        let f = (n) => n + this.a;
        return f(n);
    },
    c: function(n) {
        let f = (n) => n + this.a;
        let m = {
            a: 20
        };
        return f.call(m,n);
    }
};
console.log(obj2.b(1));  // 11
console.log(obj2.c(1)); // 11
```

- 箭头函数没有原型属性

```javascript
var a = ()=>{
  return 1;
}

function b(){
  return 2;
}

console.log(a.prototype);  // undefined
console.log(b.prototype);   // {constructor: ƒ}
```

- 箭头函数不能作为Generator函数，不能使用yield关键字

- 箭头函数返回对象时，要加一个小括号

```javascript
var func = () => ({ foo: 1 }); //正确
var func = () => { foo: 1 };   //错误
```

- 箭头函数在ES6 class中声明的方法为实例方法，不是原型方法

```javascript
//deom1
class Super{
    sayName(){
        //do some thing here
    }
}
//通过Super.prototype可以访问到sayName方法，这种形式定义的方法，都是定义在prototype上
var a = new Super()
var b = new Super()
a.sayName === b.sayName //true
//所有实例化之后的对象共享prototypy上的sayName方法


//demo2
class Super{
    sayName =()=>{
        //do some thing here
    }
}
//通过Super.prototype访问不到sayName方法，该方法没有定义在prototype上
var a = new Super()
var b = new Super()
a.sayName === b.sayName //false
//实例化之后的对象各自拥有自己的sayName方法，比demo1需要更多的内存空间
```

因此，在class中尽量少用箭头函数声明方法。

- 多重箭头函数就是一个高阶函数，相当于内嵌函数

```javascript
const add = x => y => y + x;
//相当于
function add(x){
  return function(y){
    return y + x;
  };
}
```

- 箭头函数常见错误

```javascript
let a = {
  foo: 1,
  bar: () => console.log(this.foo)
}

a.bar()  //undefined
```

bar函数中的this指向父作用域，而a对象没有作用域，因此this不是a，打印结果为undefined

```javascript
function A() {
  this.foo = 1
}

A.prototype.bar = () => console.log(this.foo)

let a = new A()
a.bar()  //undefined
```

原型上使用箭头函数，this指向是其父作用域（即 window 的 a），并不是对象a，因此得不到预期结果

### 导入导出

- 默认

```javascript
// 导出
var temp1 = '我是默认导出的结果'
export default templ
// 导入 
import a from '导入文件了路径'
console.log(a)// 我是默认导出的结果
```

- 声明式

``` javascript
// 导出 （代码有点丑）
export var obj = 'xxx'
export var obj2 = {
    name: 'ttt'
}
function stu() {
    console.log('123')
}
export {stu}
// 导入 
import {obj, obj2, stu} from './import'
console.log(obj)
console.log(obj2.name)
stu()
//结果
//xxx
//ttt
//123
```

- 全体

``` javascript
var obj = 'xxx'
var obj2 = {
    name: 'ttt'
}

function stu() {
    console.log('123')
}

var templ = 'xxx'
export {obj, obj2, stu}
export default templ
// 导出
import * as my from './import'
console.log(my.obj)
console.log(my.obj2.name)
my.stu()
console.log(my.default)
```

- 默认导出和声明式
  - 要注意，声明式导入的时候，必须{名称} 名称要一致 （按需导入）
  - 默认导入，可以随意的使用变量名
  - 导入导出不能拿包含在函数内部，必须在最外层作用域

### 对象属性的声明

- 当属性的 key 和变量的名相同，而要使用变量的值做 value，就可以简写{name}

```javascript
var name = 'abc'
var person = {name: name}
//等效于 es6
var person = {name}
// 函数声明
var cal = {
    add: function () {
        return 1
    },
    add2() {
        return 1
    },
    add3: function (a, b) {
        return a + b
    },
    add4(a, b) {
        return a + b
    }
}
```

## vue单文件方式

- 单文件就是以 *.vue 结尾的文件，最终通过 webpack 也会编译成 *.js 可以在浏览器运行
- 内容：`<template></template>` + `<script></script>` + `<style></style>`
  - template 中只能有一个根节点 2.x
  - script  中按照 export default {配置} 来写
  - style 中 可以设置 scoped 属性，让其 template 中生效

```html
// index.html
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  <div class="app"></div>
</body>
</html>
```

```javascript
// main.js 入口函数
import Vue from 'vue'
import App from './app.vue'

new Vue({
    el: '#app', // 渲染的地方
    // 渲染内容
    // render: function (creater) {
    //     return creater(App)
    // }
    // es6 写法
    // render: (creater) => {
    //     return creater(App)
    // }
    // es6 简写
//    1. 当参数是一个的时候，小括号可以省略
//    2. 当代码只有一行且是返回值的时候，可以省略大括号
    render: creater => creater(App)
})
```

```vue
// app.vue
<template>
  <div>
    <h1>第一个 vue 程序</h1>
    <p>{{mtext}}</p>
    <input type="text" v-model="mtext">
  </div>
</template>
<script>
  export default {
    data(){
        return {
            mtext:'大家好，舒服了'
        }
    }
  }
</script>
<style></style>
```



### 以单文件的方式启动（webpack 热加载）

安装

```shell
npm i -D webpack-dev-server
```

使用

- 方法一

```shell
# 直接运行文件:找到项目的 node_modules 下的 .bin\webpack-dev-server 运行就可以了
.\\node_modules\\.bin\\webpack-dev-server
```

- 方法二

  - 先在 package.json 文件加入配置项（没有就在文件夹中建一个）

  ```json
  {
      "scripts": {
          "dev": ".\\node_modules\\.bin\\webpack-dev-server --inline --hot --open"
      }
  }
  ```

  - 在文件目录下运行命令行

  ```shell
  npm run dev
  ```

结果

```shell
# 命令行输出
Project is running at http://localhost:8081/
webpack output is served from /
webpack: wait until bundle finished: /
```

看到这样的结果就可以直接访问上地址，就可以看到结果了，改了文件也会动态生成 dist 的虚拟内存，不用每一次都自己运行 webpack 打包再看结果。（类似于 node 的 nodemon，修改保存后悔自动刷新页面）

## vue 介绍

- 2014年 vue 诞生，2013年出现了 react，2009年出现了 angularjs
- 作者：尤雨溪
- 核心概念：组件化 双向数据流 ( 基于 ES5 中的 defineProperty 来实现的 )，IE9 以上才支持
  - 开发一个登陆的模块：登陆需要显示的头部、底部、中部
  - 组件：组合起来的一个部件
  - __细分代码__
    - 需求：页面、样式、动态效果
    - 代码：template、style、script
- 与其他框架对比

> https://cn.vuejs.org/v2/guide/comparison.html

### 数据流 (双向数据流)

- 一向：js 内存属性发生改变，影响页面的变化
- 另一向：页面的改变，影响 js 内存的属性改变

### vue 中常用的 v- 指令演示

- 常用指令
  - v-text
    - 元素的 innerText，只能在双标签中使用
  - v-html
    - 元素的 innerHtml，不能在html变量中调用别的变量，会把{{xxx}}
  - v-if
    - 元素是否移除或者插入 (为false的话是审查元素时是没有该元素的)
  - v-show
    - 元素是否显示或者隐藏 (为false的话是审查元素时是有该元素的，不过style属性加了个display：none)
  - v-model
    - 双向数据流的体现，js内存改变页面，页面也可以改变js内存

```vue
// app.vue
<template>
  <div>
    v-text:<br>
    <span v-text="text"></span>
    <hr>
    v-html:
    <p v-html="html"></p>
    <hr>
    v-if:
    <div v-if="if02" style="height: 100px;background-color: deeppink"></div>
    <div v-if="if01" style="height: 100px;background-color: hotpink"></div>
    <hr>
    v-show:
    <div v-show="show01" style="height: 100px;background-color: skyblue"></div>
    <div v-show="show02" style="height: 100px;background-color: yellowgreen"></div>
    <hr>
    v-model:
    <input type="text" name="" v-model="mText">{{mText}}<br>
    给下面的 input 的 value 赋值用 v-bind:value = "mText"<br>
    <!-- 这个指令是单单向的，仅js内存改变影响他 -->
    <input type="text" name="" v-bind:value="mText">
  </div>
</template>
<script>
    export default {
        data: function () {
            return {
                xxx: '{{xxx}}',// 防止 pre 标签中解释时报错
                text: '我是 v-text! ',
                html: `
                  <ul>
                    <li>哈哈</li>
                    <li>{{text}}</li>
                  </ul>
                `,
                if01: true,
                if02: false,
                show01: true,
                show02: false,
                mText: '哈哈'
            }
        }
    }
</script>
<style>
</style>
```

###  v-bind 使用

- v-bind:属性名 = "表达式"，最终表达式运算结束的结果赋值给改属性名
  - 需要根据可变的表达式的结果来给 class 赋值，就需要 v-bind:class = "xxx"
- v-bind:属性名   可以简写为   :属性名

```vue
<template>
  <div>
    <div v-bind:class="isSkyblue ? 'skyblue' : 'yellogreen'">单个class</div>
    <!-- v-bind:xxx 可以简写为 :xxx -->
    <div :class="{'skyblue': isSkyblue, 'big': true}">多个class</div>
    <hr>
    复杂情况：
    通过遍历，根据当前对象的成绩，匹配成绩和样式的清单对象，用成绩做为 key，
    取对象的 value，最终返回字符串做样式名
    <ul>
      <!-- obj.A 或 obj.B ,下表达式运算结果为obj['A'] 或 obj['B'] -->
      <li v-for="(stu, index) in stus" :class="{'A':'skyblue','B':'yellogreen'}[stu.score]" :key="index">
        {{stu.name}}
      </li>
    </ul>
  </div>
</template>
<script>
    export default {
        data: function () {
            return {
                isSkyblue: true,
                stus: [
                    {name: 'Jack', score: 'A'}, 
                    {name: 'Rose', score: 'B'}
                ]
            }
        }
    }
</script>
<style>
  .skyblue {
    height: 100px;
    background: skyblue;
  }

  .yellogreen {
    height: 100px;
    background-color: yellowgreen;
  }

  .big {
    height: 200px;
  }
</style>
```

### v-on 使用

- 绑定事件的方法
  - `v-on:事件名 = "表达式||函数名"` 
    - v-on:事件名   简写为   @事件名
- 函数名如果没有参数，可以省略括号 只给一个函数名称
- 在 export default 这个对象的跟属性加上 methods 属性，其是一个对象
  - key 是函数名 值时函数体
- 在 export default 这个对象的根属性加上 data 属性，其实一个函数，返回值是一个对象
  - 对象的属性是我们初始化的变量名的名称
- 凡是在 template 中使用变量或者函数，不需要加 this
- 在 script 中使用就需要加上 this

```vue
<template>
  <div>
    <ul>
      <li v-for="(stu, index) in stus" :class="{'A':'skyblue','B':'yellogreen'}[stu.score]" :data-key="index">
        {{stu.name}}
      </li>
    </ul>
    <button v-on:click="change()">点我00</button>
    <!-- 不传参数可以不加括号 -->
    <button @click="change">点我01</button>
  </div>
</template>
<script>
    export default {
        // 变量
        data: function () {
            return {
                isSkyblue: true,
                stus: [{name: 'Jack', score: 'A'}, {name: 'Rose', score: 'B'}]
            }
        },
    //    声明函数, 属于组件对象
        methods: {
            change: function () {
                // 在 script 中能使用的对象，基本 template 基本也能使用
                // 不过在 script 中要加 this, template 中不需要 this
                this.isSkyblue = !this.isSkyblue
                this.stus.push({
                    name: 'Tom',
                    score: 'A'
                })
            }
        }
    }
</script>
<style>
  .skyblue {
    height: 100px;
    background: skyblue;
  }
  .yellogreen {
    height: 100px;
    background-color: yellowgreen;
  }
  .big {
    height: 200px;
  }
</style>
```



### v-for 使用

- 可以使用操作数组 (item, index)
- 可以使用操作对象 (value, key, index)
- 实例可以见上文 v-on 的实例 

### 父子组件的使用

- 局部组件

  - 父和子，使用的是父，被用的是子
  - 父需要声明子组件，引入子组件对象，声明方式

```vue
<template>
  <div>
      <!-- 调用子组件 -->
    <header-vue></header-vue>
    <content-vue></content-vue>
    <footer-vue></footer-vue>
  </div>
</template>
<script>
    // 引入子组件
    import headerVue from '../components/header.vue'
    import contentVue from '../components/content.vue'
    import footerVue from '../components/footer.vue'
    export default {
        // 变量
        data: function () {
            return {
            }
        },
        // 使用子组件
        components: {
            headerVue,
            contentVue,
            footerVue
        }

    }
</script>
<style>
</style>
```

- 全局组件

使用更加方便，不需要声明，直接可以使用

在入口的 main.js 中使用 `vue.component('组件名', 组件对象)`

```javascript
import Vue from 'vue'
import App from './app.vue'
// 引入组件
import globalVue from '../components/global.vue'
// 注册一个组件，挂载到全局，在组件的 template 中使用
Vue.component('globalVue', globalVue)

new Vue({
    el: '.app',
    render: creater => creater(App)
})
```

#### 组件直接信息传递

##### 父传子

父组件

- 在父组件的 <template> 中，声明或者全局注册的组件名的标签中添加一个自定义的属性
- 用这个属性传递值
  - 常量 `prop1 = "常量"`
  - 变量 `:prop2 = "变量名"`

子组件

- 在 <script> 标签中声明一个跟属性 `props: ['prop1','prop2'…]`
- 使用 
  - 在 <template> 中 直接 `{{prop1}}` 调用
  - 在 <script> 中的 methods 中使用 加个 this 就好了：`this.prop2`

app.vue

```vue
<template>
  <div>
    <header-vue textOne="test" :textTwo="textTwo"></header-vue>
    <content-vue ></content-vue>
    <global-vue></global-vue>
    <footer-vue></footer-vue>
  </div>
</template>
<script>
    import headerVue from '../components/header.vue'
    import contentVue from '../components/content.vue'
    import footerVue from '../components/footer.vue'
    export default {
        // 变量
        data: function () {
            return {
                textTwo: '哈哈哈!'
            }
        },
        components: {
            headerVue,
            contentVue,
            footerVue
        }

    }
</script>
<style>
</style>
```

header.vue

```vue
<template>
  <div>
    我是头部 <br>
    {{textOne}}<br>
    {{textTwo}}
  </div>
</template>
<script>
    export default {
        name: "header",
        data: function () {
            return {

            }
        },
        // 接收父组件值参数的设置
        props: ['textOne','textTwo']
    }
</script>
<style scoped>
  div {
    height: 100px;
    background-color: yellowgreen;
  }
</style>
```

##### 子传父(vuebus)

- 通过 new Vue()这样的一个对象，来$on('事件名', fn(prop1,prop2…))

- 另一个组件引入同一个vuebus，来$emit('事件名',prop1,prop2)

```javascript
// 新建一个 connector.js 文件，方便两个组件引同一个 vuebus，这个文件就是总线
import Vue from 'vue'
var Bus = new Vue()
export default Bus
```

组件一


```vue
<template>
  <div>
    <global-vue></global-vue>
    <button @click="listen">listen</button>
  </div>
</template>
<script>
    import connect from  './connector.js'
    export default {
        // 变量
        data: function () {
            return {
                textTwo: '哈哈哈!'
            }
        },
        methods:{
            listen: function () {
                // 创建一个 phone 分支连入总线
                // 可以创建多个 同名 但处理方式不同的的分支，$emit 发送的信息将会被分别处理
                connect.$on('phone', function (msg) {
                    console.log(msg)
                })
                connect.$on('phone', function (msg) {
                    console.log(msg + '1')
                })
            }
        }

    }
</script>
<style>
  .skyblue {
    height: 100px;
    background: skyblue;
  }

  .yellogreen {
    height: 100px;
    background-color: yellowgreen;
  }

  .big {
    height: 200px;
  }
</style>
```

组件二

```vue
<template>
  <div>
    <button @click="call">call</button>
  </div>
</template>
<script>
  import connect from '../src/connector'
    export default {
        name: "global",
        methods:{
            call: function () {
                // 连接到总线，往 phone 分支发送信息，phone 可以是一个也可以是多个
                connect.$emit('phone', '???')
            }
        }
    }
</script>
<style scoped>
  div{
    height: 100px;
  }
</style>
```

### 过滤器 filter

过滤器就是一种把一串字符串按照一定规则格式化的工具。Vue.js 允许你自定义过滤器，可被用于一些常见的文本格式化。过滤器可以用在两个地方：**双花括号插值和 `v-bind` 表达式** (后者从 2.1.0+ 开始支持)。过滤器应该被添加在 JavaScript 表达式的尾部，由“管道”符号指示。

- content | 过滤器，vue 中没有提供相关的内置过滤器，但是可以自定义过滤器
- 组件内的过滤器 和 全局过滤器
  - 组件内过滤器就是 options 中的一个 filters 的属性（一个对象）
    - 多个 key 就是不同过滤器的名称，多个 value 就是与 key 对应的过滤方式函数体
  - 全局过滤器 Vue.filter(name, fn)

组件过滤器

```vue
<template>
  <div>
    请输入内容 <br>
    <input type="text" name="" v-model="text"><br>
    显示：{{text | myFilter}}
  </div>
</template>
<script>
    export default {
        data: function () {
            return {
                text: ''
            }
        },
        filters: {
            myFilter: function (value) { // value -> text
                return value.split('').reverse().join('')
            }
        }
    }
</script>
<style>
</style>
```

全局过滤器

```javascript
import Vue from 'vue'
import App from './app.vue'

Vue.filter('myFilter2',function (value) {
    return value.split('').reverse().join('')
})

new Vue({
    // 渲染内容的目的地
    el: '#app',
    // 渲染内容
    render: function (creater) {
        return creater(App)
    }
})

```

### 获取 DOM 元素

虽然前端框架是为了减少 DOM 操作，但是特定情况下，也是可以操作 DOM 元素的

- 在指定的元素上，添加 ref="xxx"
- 在获取的地方加入 this.$refs.xxx
  - 如果 ref 放在了原生 DOM 元素上，获取的数据就是原生 DOM 对象
    - this.$refs.xxx 就是原生 DOM 对象
  - 如果 ref 放在了组件对象上，获取的就是组件对象
    - this.$refs.xxx 就是子组件对象，可以理解为 xxx.vue 里 <script> 中的 this
- 相对应的两个钩子(其实就是事件)
  - created 完成为数据的初始化，此时还未生成 DOM，我无法操作 DOM
  - mounted 已将数据加载到了 DOM 中，可以操作 DOM 了

app.vue

```vue
<template>
  <div>
    <sub-vue></sub-vue>
    <div ref="myDiv"></div>
  </div>
</template>
<script>
    import subVue from './sub.vue'
    export default {
        data: function () {
            return {}
        },
        components: {
            subVue
        },
    //    组建创建后，数据已经完成初始化，但是 DOM 还未生成
        created: function () {
            console.log('created: ' + this.$refs.myDiv) // undefined
        },
    //    数据装到 DOM 上后，各种数据已经就位，将数据渲染到 DOM 上，DOM 已经生成
        mounted: function () {
            console.log('mounted: ' + this.$refs.myDiv)
            this.$refs.myDiv.innerHTML = '哈哈哈哈'
            // this.$refs.sub 相当于在 sub.vue <script>里的 this
            this.$refs.sub.text = '嘻嘻!'
        }
    }
</script>
<style scoped></style>
```

sub.vue

```vue
<template>
  <div>
    <div>{{text}}</div>
  </div>
</template>
<script>
    export default {
        name: "sub",
        data: function () {
            return {text: 'lala'}
        }
    }
</script>
<style scoped>
  div{
    height: 100px;
    background-color: skyblue;
  }
</style>
```

### Vue 中的 use

Vue.use(plugin)是 vue 用来使用插件的全局 API

- 组件库：在内部祖册了各种全局组件
- 安装插件：挂载属性，为了方便 this. 可以使用到其功能

### 对变量的监视

在 data 中对一个变量赋值之后就已经完成数据监视了，因此如果对一个变量赋了一个对象或数组，之后再往这个对象中添加属性，那么这个对象新加的属性就不会被监听到（原本的属性还是会被监听到的），因此为了在已赋值的参数中添加属性，并且能被监听到，那么要用 `vm.$set(target,key/index,value)` 来添加属性并赋值。

```vue
<template>
  <div>
      <span @click = add>{{test.num}}</span>
      <span></span>
  </div>
</template>
<script>
    export default {
        data: function () {
            return {
                test: {},
            }
        },
        created: fucntion () {
        	let obj = {a:{b:1}}
            this.test = obj
    		// obj.num = 1 属性添加 但这样添加不会别监视到 要用 vm.$set 方法
    		this.$set(obj,'num', 1)
    		
    	},
        methods: {
        	add: function () {
      		this.test.num++
    	}
  }
        
    }
</script>
<style></style>
```

#### watch

实例对象 options 的一个属性，监听内存有无改变（变量的值有无改变）。如果监视的对象不是基本数据类型，而是引用数据类型，则要深度监视。

```vue
<template>
  <div>
    <input type="text" name="" v-model="mText">{{mText}}<br>
  </div>
</template>
<script>
    export default {
        data: function () {
            return {
                mText: '哈哈',
                persons:[{
                    name:'jack'
                },{
                    name:'rose'
                }]
            }
        },
        watch: {
            mText: function (newValue, oldValue) {
                console.log('mText改变了')
            },
            persons: {
                handler: function (newValue, oldValue) {
                console.log('persons改变了')
                },
                deep:true
            }
        }
    }
</script>
<style></style>
```

#### computed 计算属性

如果是对大量数据进行监视，则要用的 computed。它可以监视多个值，指定返回数据，并且可以显示在页面。

```vue
<template>
  <div>
    <input type="text" name="" v-model="price">{{price}}<br>
      <input type="text" name="" v-model="num">{{num}}<br>
      <input type="text" name="" v-model="rate">{{rate}}<br>
      {{sum}}
  </div>
</template>
<script>
    export default {
        data: function () {
            return {
                price: 0,
                num: 0,
                rate: 0
            }
        },
        computed: {
            sum: function () {
                // 如果当函数内涉及到的 this(Vue实例) 相关属性发生改变以后出发，并且返回一个值（可以是对象）
                return this.price * this.num * (this.rate/100)
            }
        }
    }
</script>
<style></style>
```

### vue生命周期

- **beforeCreate**
- **created**
- **beforeMount**
- **mounted**
- **beforeUpdate**
- **updated**
- **beforeDestroy**
- **destroyed**

### Vue-router

前端路由核心就是锚点值的改变，根据不同的值，在指定 DOM 位置的渲染不同数据，在 vue 中，模板数据不是通过 ajax 请求来的，而是调用函数获取到模板内容。这个 Vue-router 插件是以 vue 开头的，因此是 vue 的核心插件，所以要用到 Vue.use 来引用。

- vue 的核心插件
  - vue-router 路由
  - vuex 管理全局共享数据的

- 下载

  - `npm install vue-router --save`

- 引入

  - 在 入口js文件中引入

  ```javascript
  import VueRouter from 'vue-router'
  Vue.use(VueRouter)
  ```

- 使用

  - 创建路由对象并配置路由规则

  ```javascript
  let router = new VueRouter({
      //当路由被选中时标签自动加上一个 class="xxx", 方便加样式
      linkActiveClass: 'xxx',
      routes:[
          // 只有一个渲染位置的
          {
              path: '/home',
              component: Home
          },
          // 有多个渲染位置的
          {
            path: '/',
              components: {
                // router-view 没有 name 就用 default
                  a: component01,
                  default: component02,
                  b: component03
              }
          }
      ]
  })
  ```
```
  
- 将其路由对象传递给 Vue 实例，options 中
  
  ```javascript
  new Vue({
      el: '#app',
      router: router,
      render: creater => creater(App)
  })
```

  - 在 app.vue 中留渲染位置 `<router-view></router-view>` (只放一个)

  ```vue
  <template>
    <div>
      <router-view></router-view>
    </div>
  </template>
  ```

  - 在 app.vue 中留渲染位置 `<router-view></router-view>` (放多个，多视图)

  ```vue
  <template>
    <div>
        <router-view name='a'></router-view>
        <router-view></router-view>
        <router-view name='b'></router-view>
    </div>
  </template>
  ```

  

#### 命名路由

vue-router 提供了一个 <router-link> 标签，相当于 a 标签的作用

  ```javascript
  let router = new VueRouter({
      routes:[
          {
              name: 'home',
              path: '/home',
              component: Home
          }
      ]
  })
  ```

根据名字来找到路径，更利于维护

```vue
<div class="h">
      <!-- 根据路由规则的名称找路径，利于维护，防止因路由路径改变导致大量地方要跟着改 -->
      <router-link :to="{name:'home'}">进入主页</router-link>
      <router-link :to="{name:'music'}">进入音乐</router-link>
</div>
```

#### router-link 

- 在 vue-router 中，有两大对象被挂载到了实例 this 中

  - $route  只读、具备信息的对象
  - $router 具备功能的函数

- 通过 url地址 传参

  1. 用 ?id=1 的查询字符串方式(路由规则不用改)

     ```html
     <div class="h">
     	  <!-- 在:to属性的对象中加一个 query 对象 --> 
           <!-- 即拼接了一个 ?id=1 到 url地址后面 -->    
           <router-link :to="{name:'detail',query:{id:1}}">进入详情</router-link>
     </div>
     ```
     
     在详情的页面 如果要用到参数 直接在 <script> 标签中 `this.$route.query.id` 就取到数据了，取值操作可以在 created() 中就可以调用了，不一定非要在 mounted() 使用
     
     
     
  2. path方式 （路由规则要改）
  
     ```html
     <div class="h">
     	  <!-- 在:to属性的对象中加一个 params 对象 --> 
           <!-- 即拼接了一个 /1 到 url地址后面 -->    
           <router-link :to="{name:'detail',params:{name:1}}">进入详情</router-link>
     </div>
	   ```
  
     ```javascript
     // 改路由规则
       let router = new VueRouter({
           routes:[
               {
                   name: 'detail',
                   //修改前  path: '/detail',
                   //修改后 /:xxx 这里的名字要和你传参时候params对象里的key同名
                   path: '/detail/:name',
                   component: Home
               }
           ]
       })
     ```
  
     
  
		在详情的页面 如果要用到参数 直接在 <script> 标签中 `this.$route.params.name` 就取到数据了，取值操作可以在 created() 中就可以调用了，不一定非要在 mounted() 使用


#### 编程式导航

有时候可能我们除了页面跳转为还有一些别的操作，不单单会只在 template 中用简单的标签那种声明式导航，因此我们也可能会在 script 中对路由操作进行编程式导航，因此 vue-router 提供了几个操作方式

- `this.$router.go` 根据浏览器记录 
  - 参数num: 前进(正数)  后退(负数)
- `this.$router.push` 直接跳转到某个页面显示
  - 参数 如果是字符串就直接是路径 `/xxx 这里的路径是路由规则那个路径，不是/#/xxx` ，也可以传对象 `{name:'xxx'} 这个 name 是路由规则那个name`

#### 重定向和404

```javascript
routes: [
      //重定向
      { path: '/a', redirect: '/b' }
      { path: '/a', redirect: { name:'b'} }
      // 404
      // 路由配对是从上到下的，只有以上全部都不匹配才会走到 404
      { path: '*',component: NotFound }
]
```

#### 路由嵌套

 用单页面去实现多页面应用，复杂的嵌套路由，开发中一般遇上了就会使用嵌套路由

```javascript
routes: [{
            path: '/',
            redirect: { name: 'music' },
        },
        {
            name: 'music',
            path: '/music',
            component: Music,
            children: [

                //-> 这里很灵活，如果你写上/xxx  就是绝对路径， /oumei
                //如果你不写/  ,那么就是相对路径 /music/oumei
                { name: 'music_oumei', path: 'oumei', component: Oumei },
                //标识一下，当前路由之间的关系，格式不是必须的
                { name: 'music_guochan', path: 'guochan', component: Guochan }
            ]
        }

    ]
```

```vue
<template>
<!-- 第一层 -->
    <div>
            <header-vue></header-vue>
            <!-- 用来显示music -->
             <router-view></router-view>
            <footer-vue></footer-vue>


    </div>
</template>
<template>
    <div>
        欢迎来到音乐世界
        <router-link :to="{name:'music_oumei'}">欧美音乐</router-link>
        <router-link :to="{name:'music_guochan'}">国产音乐</router-link>

        <hr/>
        <!-- 变化的音乐数据 第二层 -->
        <router-view></router-view>
    </div>
</template>
<template>
<!--  第三层 -->
    <div>
            欧美歌曲好听啊
    </div>
</template>
```

#### 路由导航钩子

在路由改变前和路由改变后的事件，即跳转前或跳转后可以自定义事件。

- 全局的导航钩子
- 单个路由独享的钩子
- 组件级别的钩子

##### 全局前置守卫

你可以使用 `router.beforeEach` 注册一个全局前置守卫：

```js
const router = new VueRouter({ ... })

router.beforeEach((to, from, next) => {
  // ...
})
```

当一个导航触发时，全局前置守卫按照创建顺序调用。守卫是异步解析执行，此时导航在所有守卫 resolve 完之前一直处于 **等待中**。

每个守卫方法接收三个参数：

- **to: Route**: 即将要进入的目标 路由对象
- **from: Route**: 当前导航正要离开的路由
- **next: Function**: 一定要调用该方法来 **resolve** 这个钩子。执行效果依赖 `next` 方法的调用参数。
  - **next()**: 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 **confirmed** (确认的)。即跳转到路由指向的页面
  - **next(false)**: 中断当前的导航。如果浏览器的 URL 改变了 (可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 `from` 路由对应的地址。
  - **next('/') 或者 next({ path: '/' })**: 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。你可以向 `next` 传递任意位置对象，且允许设置诸如 `replace: true`、`name: 'home'` 之类的选项以及任何用在 `router-link` 的 `to` prop 或 `router.push` 中的选项。跳转到参数指向的页面。
  - **next(error)**: (2.4.0+) 如果传入 `next` 的参数是一个 `Error` 实例，则导航会被终止且该错误会被传递给`router.onError()` 注册过的回调。

**确保要调用 next 方法，否则钩子就不会被 resolved。（适用于所有导航钩子）**

##### 全局解析守卫

> 2.5.0 新增

在 2.5.0+ 你可以用 `router.beforeResolve` 注册一个全局守卫。这和 `router.beforeEach` 类似，区别是在导航被确认之前，**同时在所有组件内守卫和异步路由组件被解析之后**，解析守卫就被调用。

##### 路由独享的守卫

你可以在路由配置上直接定义 `beforeEnter` 守卫：

```js
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      beforeEnter: (to, from, next) => {
        // ...
      }
    }
  ]
})
```

这些守卫与全局前置守卫的方法参数是一样的。

##### 组件内的守卫

最后，你可以在路由组件内直接定义以下路由导航守卫：

- `beforeRouteEnter`
- `beforeRouteUpdate` (2.2 新增)
- `beforeRouteLeave`

```js
const Foo = {
  template: `...`,
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
  },
  beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  }
}
```

`beforeRouteEnter` 守卫 **不能** 访问 `this`，因为守卫在导航确认前被调用,因此即将登场的新组件还没被创建。

不过，你可以通过传一个回调给 `next`来访问组件实例。在导航被确认的时候执行回调，并且把组件实例作为回调方法的参数。

```js
beforeRouteEnter (to, from, next) {
  next(vm => {
    // 通过 `vm` 访问组件实例
  })
}
```

注意 `beforeRouteEnter` 是支持给 `next` 传递回调的唯一守卫。对于 `beforeRouteUpdate` 和 `beforeRouteLeave` 来说，`this` 已经可用了，所以**不支持**传递回调，因为没有必要了。

```js
beforeRouteUpdate (to, from, next) {
  // just use `this`
  this.name = to.params.name
  next()
}
```

这个离开守卫通常用来禁止用户在还未保存修改前突然离开。该导航可以通过 `next(false)` 来取消。

```js
beforeRouteLeave (to, from , next) {
  const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
  if (answer) {
    next()
  } else {
    next(false)
  }
}
```

### vue-resource

vue-resourse 是基于 HTTP 对客户端发送请求的一个插件，早期 vue 团队开发的插件，现在已经停止维护了，作者尤雨溪推荐使用 axios。

### vue-preview 

图片预览，点击后显示大图的插件

- Installation

```shell
npm i vue-preview -S
```

- Usage

  - Notice:
    - This plugin currently support vue2.5 and above

- Install plugin

```javascript
import VuePreview from 'vue-preview'
 
// defalut install
Vue.use(VuePreview)
 
// with parameters install
Vue.use(preview, {
  mainClass: 'pswp--minimal--dark',
  barsSize: {top: 0, bottom: 0},
  captionEl: false,
  fullscreenEl: false,
  shareEl: false,
  bgOpacity: 0.85,
  tapToClose: true,
  tapToToggleControls: false
})
```

- example

```vue
<template>
  <div class="mypreview">
    <vue-preview :slides="slide1" @close="handleClose" class="preview"></vue-preview>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                slide1: [
                    {
                        // src(大图资源) msrc(缩略图资源) w(点击后大图的宽) h(点击后大图的高) 四个为必须要的样式
                        src: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_b.jpg',
                        msrc: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_b.jpg',
                        alt: 'picture1',
                        title: 'Image Caption 1',
                        w: 600,
                        h: 400
                    },
                    {
                        src: 'https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_b.jpg',
                        msrc: 'https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_b.jpg',
                        alt: 'picture2',
                        title: 'Image Caption 2',
                        w: 1200,
                        h: 900
                    }
                ]
            }
        },
        methods: {
            handleClose() {
                console.log('close event')
            }
        }
    }
</script>
<style>
</style>
```

```css
/* 
*   通常我们图片资源只有一个，
*	即缩略图和大图为同一个资源，想让预览图(缩略图)变小
*	则必须加一个全局样式不能是组件内的样式
*/
.preview figure {
    float: left;
    width: 100px;
    height: 80px;
    margin: 1.5%;
}
.preview figure img {
    width: 100%;
}
```

### axios

> 中文文档： https://segmentfault.com/a/1190000008470355

- 安装 `npm i -S axios`
- 引包、挂载

```javascript
import Axios from 'axios'
// Axios.defaults.baseURL = 'xxx' 这个是设置默认发送请求url的根路径，后面写请求地址的时候就可以省略前面的一大串东西
Vue.prototype.$axios = Axios
```

- 使用

```javascript
this.$axios.get(url,options)
this.$axios.get(url,data,options)
```

- options:{ params: { id:1 }//查询字符串, header:{ 'content-type': 'xxx' } }
  - post 请求的时候，如果数据是字符串即第二个参数是字符串，默认请求头的 content-type 就是 x-www-form-urlencode ，如果是对象则请求头就是 application/json

#### 合并请求

多个请求一次性发送，必须要全部请求都成功，才能拿到数据，拿到数据后分发响应，响应参数的内容的顺序和发送请求的顺序保持一致。

```vue
<template>
    <div></div>
</template>
<script>
    export default {
        data(){
            return {}
        },created(){
           //将两个请求一起发送，只要有一个失败，就算失败，成功只有是全体成功
           function getMsg(res1,res2){
             console.log('成功啦');
             console.log(res1);
             console.log(res2);
           }
           this.$axios.all([ 
            this.$axios.post('postcomment/300','content=123'),
            this.$axios.get('getcomments/300?pageindex=1')
           ])
           //分发响应
           .then(this.$axios.spread(getMsg))
           .catch(err=>{
            console.log(err);
           })
        }
    }
</script>
<style scoped></style>
```

#### 拦截器

对每一次请求与响应进行过滤、处理。可以用拦截器操作 loading 图标的出现或关闭、也可以用来添加 token 等等。

```javascript
Axios.interceptors.request.use(function(config) {
    //console.log(config);
    //return false; //返回没有修改的设置,不 return config 就是一个拦截
    //个性化的修改
    // config.headers.accept = 'interceptors'; 对 header 的 accept 追加
    config.headers = { // 直接覆盖
        accept: 'interceptors'
    }
    return config;
})
```

### mint-ui

饿了么公司推出的基于 vue 在移动端使用的一个组件库，对应 PC 端的 element-ui

> 官网 http://mint-ui.github.io/#!/zh-cn

安装

```shell
npm install mint-ui --save
```

引包

```javascript
// 引入全部组件 （实际开发都不这样用，因为这样打包后太大了）
import Mint from 'mint-ui'
Vue.use(Mint)
// 按需引入部分组件
import { Cell, Checklist } from 'mint-ui'
Vue.component(Cell.name, Cell)
Vue.component(Checklist.name, Checklist)
```

使用：（根据官方文档来就好了）

- 注意 如果是在全局安装的方式 
  - 1. 在 template 中可以直接使用组件标签
    2. 在 script 中使用的 js 动态效果，即便你是全局安装的也必须在 script 中引入组件对象（按需加载）

```vue
<template>
  <div>
    <mt-header title="multiple button">
      <router-link to="/" slot="left">
        <mt-button icon="back">back</mt-button>
        <mt-button @click="handleClose">close</mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <mt-switch v-model="value"></mt-switch>
  </div>
</template>
<script>
    export default {
        name: "app.vue",
        data: function () {
            return {
                value : false
            }
        },
        methods: {
            handleClose(){}
        }
    }
</script>
<style scoped></style>
```

#### 懒加载

- 引入

```javascript
import { Lazyload } from 'mint-ui';

Vue.use(Lazyload);
```

- 例子

为 `img` 元素添加 `v-lazy` 指令，指令的值为图片的地址。同时需要设置图片在加载时的样式。

```html
<ul>
  <li v-for="url in list">
      <!-- 把 原来的 :src 换成 v-lazy -->
    <img v-lazy="url">
  </li>
</ul>
image[lazy=loading] {
  width: 40px;
  height: 300px;
  margin: auto;
}
```

若列表不在 window 上滚动，则需要将被滚动元素的 id 属性以修饰符的形式传递给 `v-lazy` 指令

```html
<div id="container">
  <ul>
    <li v-for="item in list">
      <img v-lazy.container="item">
    </li>
  </ul>
</div>
```

### vue生产环境部署

其实就是去除 开发环境 的那个警告。开发环境下，Vue 会提供很多警告来帮你对付常见的错误与陷阱。而在生产环境下，这些警告语句却没有用，反而会增加应用的体积。此外，有些警告检查还有一些小的运行时开销，这在生产环境模式下是可以避免的。

#### 不使用构建工具

如果用 Vue 完整独立版本，即直接用 `<script>` 元素引入 Vue 而不提前进行构建，请记得在生产环境下使用压缩后的版本 (`vue.min.js`)。两种版本都可以在安装指导中找到。

#### 使用构建工具

当使用 webpack 或 Browserify 类似的构建工具时，Vue 源码会根据 `process.env.NODE_ENV` 决定是否启用生产环境模式，默认情况为开发环境模式。在 webpack 与 Browserify 中都有方法来覆盖此变量，以启用 Vue 的生产环境模式，同时在构建过程中警告语句也会被压缩工具去除。所有这些在 `vue-cli` 模板中都预先配置好了，但了解一下怎样配置会更好。

##### webpack

在 webpack 4+ 中，你可以使用 `mode` 选项：

```js
module.exports = {
  mode: 'production'
}
```

但是在 webpack 3 及其更低版本中，你需要使用 DefinePlugin：

```js
var webpack = require('webpack')

module.exports = {
  // ...
  plugins: [
    // ...
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
}
```

## Vuex

> 具体的时候这里就不阐述了，可以参考官方的文档https://vuex.vuejs.org/zh/guide/

这里就简单介绍一些 vuex要注意的点。

每一个 Vuex 应用的核心就是 store（仓库）。“store”基本上就是一个容器，它包含着你的应用中大部分的**状态 (state)**。Vuex 和单纯的全局对象有以下两点不同：

1. Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。
2. 你不能直接改变 store 中的状态。改变 store 中的状态的唯一途径就是显式地**提交 (commit) mutation**。这样使得我们可以方便地跟踪每一个状态的变化，从而让我们能够实现一些工具帮助我们更好地了解我们的应用。

同理redux通过subscribe函数触发组件更新状态，如果是单纯的全局变量是做不到的，还是要触发在组件内触发state。想要改变state的值只能通过action才改变，而全局变量是暴露出来的，任何地方都可以改变，很危险。

### Mutation 需遵守 Vue 的响应规则

既然 Vuex 的 store 中的状态是响应式的，那么当我们变更状态时，监视状态的 Vue 组件也会自动更新。这也意味着 Vuex 中的 mutation 也需要与使用 Vue 一样遵守一些注意事项：

1. 最好提前在你的 store 中初始化好所有所需属性。
2. 当需要在对象上添加新属性时，你应该

- 使用 `Vue.set(obj, 'newProp', 123)`, 或者

- 以新对象替换老对象。例如，利用对象展开运算符我们可以这样写：

  ```js
  state.obj = { ...state.obj, newProp: 123 }
  ```

### Mutation 必须是同步函数

现在想象，我们正在 debug 一个 app 并且观察 devtool 中的 mutation 日志。每一条 mutation 被记录，devtools 都需要捕捉到前一状态和后一状态的快照。然而，在上面的例子中 mutation 中的异步函数中的回调让这不可能完成：因为当 mutation 触发的时候，回调函数还没有被调用，devtools 不知道什么时候回调函数实际上被调用——实质上任何在回调函数中进行的状态的改变都是不可追踪的。

在 mutation 中混合异步调用会导致你的程序很难调试。例如，当你调用了两个包含异步回调的 mutation 来改变状态，你怎么知道什么时候回调和哪个先回调呢？这就是为什么我们要区分这两个概念。在 Vuex 中，**mutation 都是同步事务**：

Action 类似于 mutation，不同在于：

- Action 提交的是 mutation，而不是直接变更状态。
- Action 可以包含任意异步操作。

### 表单处理

当在严格模式中使用 Vuex 时，在属于 Vuex 的 state 上使用 `v-model` 会比较棘手：

```html
<input v-model="obj.message">
```

假设这里的 `obj` 是在计算属性中返回的一个属于 Vuex store 的对象，在用户输入时，`v-model` 会试图直接修改 `obj.message`。在严格模式中，由于这个修改不是在 mutation 函数中执行的, 这里会抛出一个错误。

用“Vuex 的思维”去解决这个问题的方法是：给 `` 中绑定 value，然后侦听 `input` 或者 `change` 事件，在事件回调中调用一个方法:

```html
<input :value="message" @input="updateMessage">
// ...
computed: {
  ...mapState({
    message: state => state.obj.message
  })
},
methods: {
  updateMessage (e) {
    this.$store.commit('updateMessage', e.target.value)
  }
}
```

下面是 mutation 函数：

```js
// ...
mutations: {
  updateMessage (state, message) {
    state.obj.message = message
  }
}
```

#### 双向绑定的计算属性

必须承认，这样做比简单地使用“`v-model` + 局部状态”要啰嗦得多，并且也损失了一些 `v-model` 中很有用的特性。另一个方法是使用带有 setter 的双向绑定计算属性：

```html
<input v-model="message">
// ...
computed: {
  message: {
    get () {
      return this.$store.state.obj.message
    },
    set (value) {
      this.$store.commit('updateMessage', value)
    }
  }
}
```

vue双向绑定的方法在2.x版本中用的是 Object.defineProterty()方法设置get、set函数，也就是在设置属性的前，修改模型中的值。在3.x版本中因为ES6中出现了proxy对象，所以用proxy作为拦截器，在对对象进行修改前把值赋值给model

## 其他

### Moment.js

一个不错的 JS 日期处理类库

### token

- cookie 只能在浏览器使用，不能用在移动端的原生应用
- 移动端原生应用也可以使用 HTTP 协议
  - 可以加自定义的头
  - 原生应用没有 cookie
- 对于三端来讲，token 可以作为 cookie 来使用，并且可以三端通用
- 拦截器可以用在 添加 token 上