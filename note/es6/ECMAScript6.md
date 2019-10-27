# ES6

## ECMAScript 简介

- ECMAScript 是 JavaScript 语言的标准
- ECMA: European Computer Manufacturers Association（欧洲计算机制造商协会）
- ECMAScript6：简称 ES6，是 JavaScript 语言的下一代标准，也是目前正式发布的最新的 JavaScript 标准。由于 ES6 是在 2015 年发布的，所以 ES6 也称为 ECMAScript2015。
- ECMAScript 是 JavaScript 的标准。JavaScript 是 EcmaScript 的实现，就好像。当然，除了 JavaScript，EcmaScript 还有其他的实现，比如 JScript、ActionScript。
- 本文档参考书籍 http://es6.ruanyifeng.com/

## 运行 ECMAScript 的方法

- 浏览器 （都是只支持部分 ES6 代码，有的支持的多，有的支持的少）
  - 各大浏览器的最新版本，对 ES6 的支持可以查看 [kangax.github.io/compat-table/es6/](https://kangax.github.io/compat-table/es6/) 。随着时间的推移，支持度已经越来越高了，超过 90%的 ES6 语法特性都实现了。
- 使用 JavaScript 引擎的系统 （如 Node.js）
- 将 ECMAScript6 转化为 EcmaScript5
  - Babel 转换器（React Native 就是使用 Babel 将 JSX 转换为 JavaScript 代码）
  - Traceur 转换器
  - webpack 直接打包（本质上也是用上面两个转换器）

### 安装 Babel

- 官网：https://babeljs.io/

  ```shell
  npm i -D babel-core babel-preset-es2015 babel-cli
  ```

- 官网在线编译：https://babeljs.io/repl

- 创建 .babelrc 文件

  - ```json
    {
      "presets": [
        "es2015"
      ],
      "plugins": [
      ]
    }
    ```

### ES6 转化为 ES5 的方式（babel）

- 静态转换

  - 字符串转换

  ```js
  var code = 'let x = n => n + 1'
  var es5Code = require('babel-core').transform(code,{presets: es2015}).code
  ```

  - 文件读取转换

  ```js
  var babel = require('babel-core');
  // 文件转码（异步）
  babel.transformFile('filename.js', options, function(err, result) {
    result; // => { code, map, ast }
  });
  
  // 文件转码（同步）
  babel.transformFileSync('filename.js', options);
  // => { code, map, ast }
  ```

  - 直接进行文件转换(前提是npm i babel-core)

  ```shell
  ./node_module/.bon/babel es6.js -o es5.js
  ```

  - 官网在线编译
    - https://babeljs.io/repl

- 动态转换(不推荐，在客户端才解析，消耗太多性能，用户体验不好)

  - 用到 babel-standalone 插件

  - `npm install --save react react-dom @babel/standalone`

  - ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>demo</title>
      <script src="node_modules/@babel/standalone/babel.js"></script>
    </head>
    <body>
      <div id="root"></div>
      <script type="text/babel">
      	// ES6 code
        let x = n => n + 1;
        console.log(x(3))
      </script>
    </body>
    </html>
    ```

## ES6 语法

### let

let 类似于 var，都是用来声明变量的，但是所声明的变量，只在`let`命令所在的代码块内有效。 
- let和 var 的作用域是不同的
  1. var 可以跨代码块，就是说，在代码块内部定义的变量，外部也可以使用
  2. let 只在代码块内部有效，如果超出代码块，就会显示变量 undefined

```js
{
    let a = 100
    var b = 200
    alert(a)
    alert(b)
}
if (typeof a == 'undefined') {
    alert('a未定义')
} else if (typeof b == 'undefined') {
    alert('b未定义')
}

var a = []
for (var n = 0; n < 10; n++) {
    a[n] = function () {
        console.log(n)
    }
}
a[4]() // 10

var a = []
for (let n = 0; n < 10; n++) {
    a[n] = function () {
        console.log(n)
    }
}
a[4]() // 4 每次循环可以都看成一个新的代码块，所以每个 n 都存放在不同内存中的
```

let 的定义顺序

- let 只能先定义在使用，因为 let 定义的变量不会进行变量提升，所以反过来用则会抛出异常

- var 定义的变量可以先使用后定义，var 变量提升，但是使用时变量的值是 undefined

- let 在一个代码块中，不能重复定义
  - 如果一个代码块中 用 let 和 var 同时定义同一个变量，不会报错，以 let 定义的为准，外部也不能访问者个变量
  - 但是如果在函数内部 同时用 let 和 var 同时定义同一个变量则会直接报错
  - 函数的形参如果和函数内部 let 定义的变量同名也会直接报错

暂时性死区 （Temporal dead zone）

- 其实也就是 let 不会变量提升，如果先使用则抛出异常的这种情况

### 块级作用域

块级作用域的需求：内层变量可能会覆盖外层变量；局部变量泄露成全局变量（因为函数也会进行函数提升，所以函数也会出现响应的问题，）。let 的出现实际上就是为了给 JavaScript 增加块级作用域。

```js
// 内层变量覆盖外层变量
var s = 'hello world'
var fun = function () {
    console.log(s) // 用 this.s 则会找到 window 下全局的 s 则输出会变为 hello world
    if (false) {
        var s = '???' // 即使不被执行，但因为变量提升，内层s还是覆盖了 外层变量s的值
    }
    console.log(s)
}
fun() 
/*
undefined
undefined
*/
// 局部变量泄露成全局变量
for (var i = 0; i < 10; i++) {
    
}
console.log(i) // 10
```

- 块级作用域和匿名函数

  - 块级作用域可以取代匿名函数

  ```js
  (
  	function () {
          var v = '匿名函数'
          console.log(v)
      }()
  )
  
  {
      let v = '块级作用域'
      console.log(v)
  }
  ```

### const

const 用于声明常量，一旦声明，再改变常量的值，就会抛出异常。常量必须在声明时初始化，否则会抛出异常。const 和 let 一样，只在声明所在的块级作用域有效。var/let 和 const 不可以在同一个块中声明同一个变量。

- 对象常量
  
  - 直接改变对象常量的属性是不可以的，但是可以改变属性的值
- 数组常量
  
- 不可以把数组的指针（也就是把原来的指针指向别的数组），但可以改变数组内存的数据，即可以增删改数组元素
  
- 冻结对象
  - 让对象常量的属性和属性的值都不能改变
  - `const obj = Object.freeze({name: "name"}) `
  - 如果改变 obj.name 即 `obj.name = 'kite'` 不会报错，但是这样并不会改变原来属性的值，即 name 还是 name。因为数组也是对象，所以也可以用次方法冻结数组（注意一点：和冻结对象有点不同，如果改变已冻结数组的长度，则会报错）

- 深度冻结对象

  - 因为对象可能属性的值也可以是个对象，用冻结对象的方式只能冻结第一层属性
  - 这就要自己用递归写一个方法

  ```js
  var depthFreezeObject = (obj) => {
      obj = Object.freeze(obj)
      Object.keys(obj).forEach((key => {
          if (typeof obj[key] == 'object') {
              depthFreezeObject(obj[key])
          }
      })
      return obj
  }
  ```


### 变量的解构（Destructuring）

ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构（Destructuring）。其实就是一种新的队变量的赋值方式。

- 数组的解构赋值
  - 定义时解构赋值
  - 后期解构赋值
  - 嵌套解构赋值
  - Generator 函数的解构赋值
- 对象的解构赋值
  - 变量形式的赋值
  - 对象形式的赋值
  - 混合形式的赋值
  - 变量的重复声明

#### 数组的解构赋值

解构需要进行模式的匹配 (即如果形式一样就给变量依次赋值)。只要某种数据结构具有 Iterator 接口，都可以采用数据形式的解构赋值，每执行一次，都会指向 yield 语句（第二句话可能刚了解 ES6 可能看不懂，但本文会有相应的部分进行详细讲解）。


- 定义时解构赋值

  - 解构的数组形式，就是用数组的方式给变量进行同时赋值
    

  ```js
  // 普通的赋值方式
  var x = 1
var y = 2
  var z = 3
  //  定义时解构赋值
  let [a, b, c] = [4, 5, 6]
  console.log('a = ' + a)
  console.log('b = ' + b)
  console.log('c = ' + c)
  ```
  
- 后期解构赋值

  ```js
    // 普通的赋值方式
    var x = 1
    var y = 2
    var z = 3
    // 后期解构赋值
    ;[x, y, z] = [10, 20, 30]
    console.log('x = ' + x)
    console.log('y = ' + y)
    console.log('z = ' + z)
  ```

- 嵌套解构赋值

  ```js
  let [age, [salary, [name]]] = [20, [3000, ['Sill']]]
  // 下面方法的赋值是错误的，因为形式没有匹配
  // let [age, [salary, [name]]] = [20, 3000, 'Sill']
  console.log('age = ' + age)
  console.log('salary = ' + salary)
  console.log('name = ' + name)
  ```

- 若没有对应的匹配值则位匹配到的值为 undefined（不会报错）

  ```js
  let [m, n] = ['a']
  console.log('m = ' + m) // m = a
  console.log('n = ' + n) // n = undefined
  ```

- 部分匹配则多出来值的被忽略了（不会报错）

  ```js
  let [m, n] = ['a', 'b', 'c']
  console.log('m = ' + m) // m = a
  console.log('n = ' + n) // n = b
  ```

- 匹配剩余的值

  ```js
  // 如果这样解构赋值，则v则变为一个数组存放剩余的所有值
  let [m, n, ...v] = ['a', 'b', 'c', 'd', 'e', 'f']
  ```

- 匹配不成功则直接报错

  ```js
  let [v1] = 12 //直接报错
  ```

- Generator 函数的解构赋值（后文会详细讲解 Generator 函数）

  ```js
  // Generator 函数，天生具有 Iterator 接口，所以可以进行解构
  // Generator 会没调用一次，会暂停，所以下面的方法不会无限循环
  let gen = function* (x) {
      while (true) {
          yield x 	// 第一次 10 第二次 12 第三次 14
          x = x + 2 // 第一次 12 第二次 14 第三次 16
      }
  }
  // 正如开头说的，因为指向的是yield，所以结果如下所示
  let [g1, g2 ,g3] = gen(10)
  console.log('g1 = ' + g1) // g1 = 10
  console.log('g2 = ' + g2) // g2 = 12
  console.log('g3 = ' + g3) // g3 = 14
  ```

- 解构赋值的默认值

  ```js
  let [name1] = []
  console.log('name1 = ' + name1) // name1 = undefined
  let [name2 = 'Bill'] = []
  console.log('name1 = ' + name2) // name2 = Bill
  let f = function () {
      console.log('f')
      return 'hello'
  }
  let ff = function () {
      console.log('ff')
  }
  let [f1 = f(), f2 = ff(), f3 = f] = []// f ff 这是函数直接调动的结果
  console.log('f1 = ' + f1)// f1 = hello
  console.log('f2 = ' + f2)// f2 = undefined 因为ff函数没有返回值
  console.log('f3 = ' + f3)// f3 =  let f = function () { 这样会直接输出函数体
  //    								console.log('f')
  //     								return 'hello'
  // 								}
  let [xx = yy, yy = 20] = [] // 直接报错（暂时性死区，因为 xx 定义时 yy 还没有定义）
  ```

#### 对象的解构赋值

- 变量形式的赋值

  ```js
    var {name3, age1} = {age1: 30, name3: 'Bill'} // 因为有键值对的关系，所以顺序可以打乱
    console.log(name3,age1) // Bill 30
  
    var {value1, value2} = {value1: 30} 
    console.log(value1, value2) // 30 undefined
  
    let { baz } = { foo: 'aaa', bar: 'bbb' }
    console.log(baz) // undefined
  ```

- 对象形式的赋值

  ```js
  var {product: a1, price: b1} = {product:'phone', price:'666'}
  console.log('a1 = ' + a1, 'b1 = ' +b1)// a1 = phone b1 = 666
  let { foo: baz } = { foo: 'aaa', baz: 'bbb' };
  // 相当于 = 后面{}的 foo 的值 给了 = 前面{}的 baz
  console.log('foo = ' + foo, 'baz = ' + baz)
  // foo error:foo is not defined; baz  aaa
  ```

- 混合形式的赋值

  ```js
  var {product: a2, price1} = {product: 'pen', price1: 777}
  console.log('a2 = ' + a2, 'price1 = ' + price1) // a2 = pen price1 = 777
  ```

- 变量形式的重复赋值，会报错

  ```js
  let {v1, v2} = {v1: 20, v2: 30}
  let v1 = 50 // 直接报错（let 的重复定义）
  ```
  
- 嵌套赋值

  ```js
  var obj = {p: ['hello', {x: 100}]}
  var {p: [s, {x:y}]} = obj
  console.log('s = ' + s)// s = hello
  console.log('y = ' + y)// y = 100
  ```

- 默认值

  ```js
  var {x = 4} = {}
  console.log('x = ' + x)// 4
  var {message: msg = 'hello'} = {}
  console.log('msg = ' + msg)// msg = hello
  ```

- 后期赋值的方式

  ```js
  var x
  var y
  x = 30
  // js 编译器会把没有 var let const 声明的{}，当成是代码块，而不是变量组
  {x, y} = {x:20, y:30}// 报错
  // 为了解决这个问题可以在这个外面加一个()
  ;({x, y} = {x:20, y:30})// 赋值成功
  ```

- 对象方法赋值

  ```js
  let {sin, cos} = Math // 其实就是把 Math.sin 和 Math.cos 两个方法赋值给了 sin 和 cos
  console.log('cos(π) = ' + cos(Math.PI))// cos(π) = -1
  ```
```
  

#### 字符串、数值和布尔值的解构赋值

- 字符串的解构赋值

  ```js
  let [a, b, c, d, e] = 'hello'
  console.log(a, b, c, d, e)// h e l l o
  const {length:len} = 'How are you?'
  console.log(len)// 12
```

- 数值的解构赋值

  ```js
  // 数值的解构固执 （如果 = 右侧不是对象，系统会将其转化为对象，然后在解构）
  let {toString: s} = 456
  if (s === Number.prototype.toString) {
      console.log('s === Number.prototype.toString')
  }
  ```

- 布尔值的解构赋值

  ```js
  let {toString: s} = true
  if (s === Boolean.prototype.toString) {
      console.log('s === Boolean.prototype.toString')
  }
  ```

- 因为 undefined 和 null 无法转化为对象，所以无法解构

#### 函数参数的解构赋值

主要用于动态函数，我个人感觉没什么用 因为 js 函数体本身就可以通过 arguments 对象来接受动态参数，如果不是动态参数就更不必要了。

```js
var foo = function ([...v]) {
    v.map(x => console.log(x))
}
foo([1,2,3,4,5])
```

### 变量解构的应用

- 变量交换

  ```js
  var m = 1
  var n = 2
  ;[m, n] = [n, m]
  console.log("m = " + m)// m = 2 
  console.log("n = " + n)// n = 1
  ```

- 函数返回一个数组，并将返回结果赋给多个变量

  ```js
  var multiNames = function () {
      return ['Bill', 'Mike', 'John']
  }
  var [name11, name22, name33] = multiNames()
  console.log('name11 = ' + name11)// name11 = Bill
  console.log('name22 = ' + name22)// name22 = Mike
  console.log('name33 = ' + name33)// name33 = John
  ```

- 使用对象形式的参数，可以无序传递参数

  ```js
  var sub = function ({x, y, z}) {
      return x - y - z
  }
  console.log(sub({z: 20, y:-15, x:10}))// 5
  ```

- 函数参数可以使用默认值

- 遍历 Map 数据结构

  - ```js
    //map是ES提供的一种字典数据结构。
    
    //字典结构——用来存储不重复key的hash结构。不同于集合（set）的是，字典使用的是键值对的形式来存储数据
    
    //JavaScript对象（object：{}）只能用字符串来当key，这对使用带来了不便
    
    //为了解决这个问题，ES6提供了map数据结构。其类似于对象，也是键值对的集合，但“key”的范围不仅限于字符串，而是各种类型的值都可以当做key。也就是说，object提供了“字符串-值”的对应结构，map则提供的是“值-值”的对应。是一种更加完善的hash结构
    const map=new Map([
         ['a',1],
         ['b',2]
    ]);
    console.log(map);
    ```
  
  - 任何部署了 Iterator 接口的对象，都可以使用 for…of循环变量
  
  - Map 结构原生支持 Iterator 接口
  
  ```js
  var map = new Map()
  map.set('id', 49)
  map.set('name', 'John')
  map.set('age', 20)
  for (let [key, value] of map) {
      console.log(key + ': ' + value)
  }
  ```

### 字符串的扩展

- 字符的 Unicode 表示法

  - Unicode 是一种字符的编码方式，可以将一个字符对应成一个数字
  - js 中用 \uxxxx 表示 Unicode 编码，x 为16进制数字 \u0000 ~ \uFFFF

  ```js
  var s = '中'
  // string.charCodeAt(0), 返回值是10进制编码，参数为字符串的第几个字符
  // .toString(16), 表示转为16进制编码
  console.log('中: ' + s.charCodeAt(0).toString(16)) // 4e2d
  console.log('\u4e2d') // 中
  // 如果是 Unicode2 则要用 ES6 新增的 \u{xxxxx}
  console.log('\u{1f412}')// 🐒
  var ss = '🐒' // 此处的 🐒 是 utf-16 编码
  // 因为 utf-16 字符串长度为 2，两次输出才是这个完整的字符
  console.log('🐒: ' + ss.charCodeAt(0).toString(16))// 🐒: d83d
  console.log('🐒: ' + ss.charCodeAt(1).toString(16))// 🐒: dc12
  console.log('\ud83d\udc12')// 🐒 此处的 utf-16 和 Unicode2 相对应
  console.log('🐒: ' + ss.codePointAt(0).toString(16))// 🐒: 1f412 直接获得 Unicode2 编码
  ```

- String.fromCodePoint

  ```js
  // 对 ES5 的 String.fromCharCode() 的补充，因为这个方法只能适用于 Unicode1，
  console.log(String.fromCharCode(0x9f99))// 龙
  console.log(String.fromCharCode(0x1f412))// 
  // 对 Unicode2 也支持
  console.log(String.fromCodePoint(0x9f99))// 龙
  console.log(String.fromCodePoint(0x1f412))// 🐒
  ```

- 字符串的遍历器接口

  - ES6 为字符串添加了遍历器接口，使字符串可以由 for…of 循环遍历

  ```js
  var text = '🐒龙'
  for (let c of text) {
      console.log(c)
  }
  // 🐒
  // 龙
  ```

- 在字符串中查找子字符串

  ```js
  // ES5 indexOf
  // 从第0位开始查找 'cd',第一次出现的位置
  console.log('cdabcde'.indexOf('cd',0))// 0
  // 从第1位开始查找 'cd'
  console.log('cdabcde'.indexOf('cd',1))// 4
  // ES6
  // includes() 返回值为布尔类型，用于判断字符串是否存在于原字符串
  console.log('cdabcde'.includes('cd'))// true
  console.log('cdabcde'.includes('cdf'))// false
  // startsWith() 返回值为布尔类型，用于判断字符串是否以某字符串开头
  console.log('cdabcde'.startsWith('cd'))// true
  console.log('cdabcde'.startsWith('ccd'))// false
  // endsWith() 返回值为布尔类型，用于判断字符串是否以某字符串结尾
  console.log('cdabcde'.endsWith('cd'))// false
  console.log('cdabcde'.endsWith('de'))// true
  ```

- 将原字符串重复 n 次

  ```js
  // repeat() 将一个字符串重复 n 次
  // 如果参数是0，则输出一个空字符串；如果参数是浮点数，则舍去小数部分直接取整；如果参数是负数或Infinity（无穷），则会抛出错误；如果参数是字符串，那么如果字符串是纯数字，则会重复n次，如果字符串不是纯数字则输出空字符串
  console.log('x'.repeat(5))
  ```
  
- 模板字符串

  - 用 ` 包裹的字符串，其可以保留字符串的格式

  ```js
  console.log(`hello
  	world`)
  //输出如下
  hello
       world
  ```

  - 也可以在模板字符串中嵌入变量 ${}，大括号中可以放任何表达式，可以进行运算，也可以放函数

  ```js
  var name = 'Bill'
  console.log(`name = ${name}`)// name = Bill
  var x = 10
  var y = 20
  console.log(`${x} + ${y} = ${x + y}`)// 10 + 20 = 30
  var wow = function () {
      return 'wow function'
  }
  console.log(`${wow()}`)// wow function
  ```

- 标签模板

  - 函数的一种特殊调用形式

  ```js
  var x = 1
  var y = 2
  var fun = function (s, n, m) {
      console.log(s)// ["abc", "def", "ccc"]
      console.log(n)// 1
      console.log(m)// 2
  }
  fun`abc${x}def${y}ccc`
  // 非模板字符串方式放入第一个参数(模板变量起分割符作用)，模板字符串中的变量当做另外的参数，模板变量少了则函数后面缺的参数为 undefined；模板变量多了，则多的部分舍去不用，不会报错
  ```

  - 用于过滤 HTML 字符串，就是把页面不能直接显示的 < > 空格 改为 html 的输出方式

  ```js
  function SaferHTML(templateData) {
    let s = templateData[0];
    for (let i = 1; i < arguments.length; i++) {
      let arg = String(arguments[i]);
  
      s += arg.replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
  
      s += templateData[i];
    }
    return s;
  }
  var sender = '<script>'
  var message = SaferHTML`<p>${sender}</p>`// <p>&lt;script&gt;</p> dom元素就可以直接用了
  ```

- String.raw 方法

  - 直接输出最原始的字符串
  - 这个函数可以说是给模板字符串设计的，因为参数十分复杂，如果用普通的调用会十分的复杂，但是很符合用标签模板的方式调用的方式

  ```js
  console.log('abc \n xyz')
  // 输出如下
  abc 
   xyz
   
   console.log(String.raw`abc \n xyz`)// abc \n xyz
  
  // 正常情况下，你也许不需要将 String.raw() 当作函数调用。可以理解为raw数组和后面的参数交替输出
  // 但是为了模拟 `t${0}e${1}s${2}t` 你可以这样做:
  String.raw({ raw: 'test' }, 0, 1, 2); // 't0e1s2t'
  // 注意这个测试, 传入一个 string, 和一个类似数组的对象
  // 下面这个函数和 `foo${2 + 3}bar${'Java' + 'Script'}baz` 是相等的.
  String.raw({
    raw: ['foo', 'bar', 'baz'] 
  }, 2 + 3, 'Java' + 'Script'); // 'foo5barJavaScriptbaz'
  ```


### 数值的扩展

- 新的二进制和八进制表示法

  - 二进制：0b/0B
  - 八进制：0o/0O

  ```js
  var n1 = 345
  var n2 = 0o531
  var n3 = 0b101011001
  if (n1 == n2) {
      console.log('n1 == n2')
  }
  // n1 == n2
  if (n3 == n2) {
      console.log('n3 == n2')
  }
  // n2 == n3
  
  //将二进制和八进制转回十进制
  console.log(Number('0o531'))// 345
  console.log(Number('0b101011001'))// 345
  ```

- Number.isFinite 和 Number.isNaN

  ```js
  // ES6 提供了这两个方法来判断数值是否是 有限值 和 NaN，因为这个方法是在 Number 对象的，所以所有非数值参数传参都返回false
  console.log(Number.isFinite(20))// true
  console.log(Number.isFinite(Infinity))// false
  console.log(Number.isFinite(NaN))// false
  console.log(Number.isFinite('20'))// false
  
  console.log(Number.isNaN(20))// false
  console.log(Number.isNaN(Infinity))// false
  console.log(Number.isNaN(NaN))// true
  console.log(Number.isNaN(20/NaN))// true
  console.log(Number.isNaN('20'/'2'))// false (因为进行运算自动转为了数字，所以是 false)
  console.log(Number.isNaN('a'))// false (非数值)
  console.log(Number.isNaN('a'/1))// true (对非数字字符串进行运算，所以是 NaN)
  console.log(Number.isNaN('a'/'b'))// true (同上)
  ```
  
- Number.parseInt 、Number.parseFloat 、Number.isInteger

  - 前两个方法和 ES5 的全局方法保持一致，但是 `Number.isInterger` 方法非数值作为参数传参直接返回 false

- Number.EPSILON (极小值)

  - 因为前端对浮点数的运算都是有误差的，所以引入了这个极小值来消除误差

  ```js
  console.log(0.1 + 0.2) // 0.30000000000000004
  // 所以用前端判断浮点数是有问题的
  console.log(0.1 + 0.2 == 0.3) // false
  console.log(((0.1 + 0.2)-0.3) < Number.EPSILON) // true 做差后小于极小值，近似相等
  ```

### Math对象的扩展

- Math.trunc  

  - 用于去除一个数的小数部分，返回整数部分，直接保留符号位
  - 对于非数值参数，Math.trunc 内部会使用 Number 方法将其转换为数值类型

  ```js
  Math.trunc(4.1) // 4
  Math.trunc(4.8) // 4
  Math.trunc(-4.1) // -4
  Math.trunc(-4.8) // -4
  Math.trunc(-0.123)// -0 其实-0和0是严格相等的 即 -0 === 0 
  
  Math.trunc('asd')// NaN
  Math.trunc('1.1')// 1
  Math.trunc()// NaN
  ```

- Math.sign

  - 用于判断一个数到底是正数、负数还是0
    - 参数为正数：返回 1
    - 参数为负数：返回 -1
    - 参数为 0： 返回 0
    - 参数为 -0：返回 -0
    - 参数为其他值：返回 NaN

- Math.cbrt

  - 用于计算一个数的立方根（x^(-3)）

- Math.clz32

  - JS的整数使用32位二进制形式表示，返回值是32位无符号整数形式有多少个前导0
  - 参数为小数，只取其整数部分判断
  - 参数为负数，返回值为 0
  - 参数为 true，返回值为 31，因为 true 数值类型是等于 1，false 等于0
  - 参数为其他值，返回值全部为 32

  ```js
  Math.clz(2) // 30 有30个零在1前面 000...0010
  Math.clz32(2.123456)// 30
  ```

- Math.imul

  - 返回两个数以32位带符号整数形式相乘的结果，返回值也是32位带符号整数，系统默认转回10进制数

- Math.fround

  - 返回一个数的单精度浮点数形式

- Math.hypot

  - 返回所有参数的平方和的平方根（用于相量的模，向量的模，两点间距离公式等）

- 新增计算方法

  - Math.expm1
    - 返回 (e^x) - 1
  - Math.log1p
    - 返回 ln(1+x)
  - Math.log10
    - 返回 以10 为底的对数 lgx
  - Math.log2
    - 返回 以2 为底的对数 lbx

### 数组的扩展

- Array.from

  - 将两类对象转化为数组
    - 类似数组的对象（伪数组）
    - 可遍历的对象（Iterator ）
  - 可遍历的对象
  
  ```js
  let obj1 = {
      0: 'hello',
      1: 'world',
      length: 2
  }
  // 根据 length 来设置数组长度，少则舍，多则 undefined
Array.from(obj1) // ["hello", "world"]
  
  // 可遍历
  Array.from('string')// ["s", "t", "r", "i", "n", "g"]
  // Array.from 方法还可以接受第二个参数，和 map 方法类似，遍历数组元素返回一个新数组
  Array.from([1, 2, 3, 4], x => x*x)// [1, 4, 9, 16]
  // 可用于参数随机数数组
  Array.from({length: 5}, () => Math.random())
  ```
  
- Array.of

  - 用于将一组值转换为数组
  - Array.of 出现的主要目的是为了弥补 Array() 的不足

  ```js
  Array.of(1, 2, 3, 4, 5)// [1, 2, 3, 4, 5]
  Array.of(1)// [1]
  Array.of(10).length// 1
  // 区别于 Array() 构造函数
  Array(1, 2)// [1, 2]
  Array() // []
  Array(10)// [] 长度为10，每个元素都为空的数组
  Array(10).length// 10
  ```

- 数组实例的 copyWithin

  - 用于在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组。也就是说，使用这个方法，会修改当前数组。
  - 它接受三个参数。
    - target（必需）：从该位置开始替换数据。如果为负值，表示倒数。
    - start（可选）：从该位置开始读取数据，默认为 0。如果为负值，表示从末尾开始计算。
    - end（可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示从末尾开始计算

  ```js
  [1, 2, 3, 4, 5, 6].copyWithin(0, 3)// [4, 5, 6, 4, 5, 6]
  ```

- 数组实例的 find 和 findIndex 方法

  - 用来扫描数组，查找第一个满足条件的数组元素
  - find 返回数组元素本身
  - findIndex 返回数组元素的索引
  - 两个参数
    - 函数体
    - 用来绑定回调函数的this

  ```js
  // 注意这里 return 的是一个判断的表达式，不是元素
  // find() 传入的函数体可以带三个参数，（元素本身，索引，数组本身）
  [3, 5, 1, 10, 6].find(value => value > 3)// 5
  [3, 5, 1, 10, 6].find(value => value > 111)// undefined
  [3, 5, 1, 10, 6].find(function (value, index, arr) {
      return value > 5
  })// 10
  
  [3, 5, 1, 10, 6].findIndex (value => value > 3)// 1
  ;[3, 5, 1, 10, 6].findIndex (value => value > 111)// -1
  
  // findIndex 和 indexOf 的区别，findIndex 可以查询到 NaN
  [NaN].indexOf(NaN) // -1 查询不到
  [NaN].findIndex(n => Object.is(NaN, n)) // 0
  ```

  - Object.is() 判断两个值是否相同。如果下列任何一项成立，则两个值相同：

    - 两个值都是 undefined
    - 两个值都是 null
    - 两个值都是 true 或者都是 false
    - 两个值是由相同个数的字符按照相同的顺序组成的字符串
    - 两个值指向同一个对象
    - 两个值都是数字并且
      - 都是正零 +0
      - 都是负零 -0
      - 都是 NaN
      - 都是除零和 NaN外的其它同一个数字

    这种相等性判断逻辑和传统的 == 运算不同，== 运算符会对它两边的操作数做隐式类型转换（如果它们类型不同），然后才进行相等性比较，（所以才会有类似 0 == false 等于 true 的现象），但 Object.is 不会做这种类型转换。

    这与 === 运算符的判定方式也不一样。=== 运算符（和 == 运算符）将数字值 -0 和 +0 视为相等，并认Number.NaN 为 NaN 不等于 。

- 数组实例的 fill 方法

  - 使用给定值，填充一个数组，主要用于纯属实话数组
  - 如果数组原本就有值，就会将其覆盖
  - 三个参数
    - 填充内容（必须）
    - 填充起始位置，默认为0
    - 填充结束为止，默认为数组长度

  ```js
  new Array(10).fill(6)// [6, 6, 6, 6, 6, 6, 6, 6, 6, 6]
  [1,2,3].fill(6)// [6, 6, 6]
  [1,2,3].fill(6,1,2)// [1,6,3]
  ```

- 数组实例的 entries 、 keys 和 values 方法

  - ES6 提供三个新的方法——`entries()`，`keys()`和`values()`——用于遍历数组。它们都返回一个遍历器对象（Iterator 详见后文 Iterator 一节），可以用`for...of`循环进行遍历，唯一的区别是`keys()`是对键名的遍历、`values()`是对键值的遍历，`entries()`是对键值对的遍历。

    ```javascript
    for (let index of ['a', 'b'].keys()) {
      console.log(index);
    }
    // 0
    // 1
    
    for (let elem of ['a', 'b'].values()) {
      console.log(elem);
    }
    // 'a'
    // 'b'
    
    for (let [index, elem] of ['a', 'b'].entries()) {
      console.log(index, elem);
    }
    // 0 "a"
    // 1 "b"
    ```

    如果不使用`for...of`循环，可以手动调用遍历器对象的`next`方法，进行遍历。

    ```javascript
    let letter = ['a', 'b', 'c'];
    let entries = letter.entries();
    console.log(entries.next().value); // [0, 'a']
    console.log(entries.next().value); // [1, 'b']
    console.log(entries.next().value); // [2, 'c']
    ```

- 数组的空位（Array(n) 就是 n 个空位的数组）

  - 数组的空位指，数组的某一个位置没有任何值。比如，`Array`构造函数返回的数组都是空位。

  - `Array(3)`返回一个具有 3 个空位的数组。

    注意，空位不是`undefined`，一个位置的值等于`undefined`，依然是有值的。空位是没有任何值，`in`运算符可以说明这一点。

    ```javascript
    0 in [undefined, undefined, undefined] // true
    0 in [, , ,] // false
    ```

    上面代码说明，第一个数组的 0 号位置是有值的，第二个数组的 0 号位置没有值。

    ES5 对空位的处理，已经很不一致了，大多数情况下会忽略空位。

    - `forEach()`, `filter()`, `reduce()`, `every()` 和`some()`都会跳过空位。
    - `map()`会跳过空位，但会保留这个值
    - `join()`和`toString()`会将空位视为`undefined`，而`undefined`和`null`会被处理成空字符串。

    ```javascript
    // forEach方法
    [,'a'].forEach((x,i) => console.log(i)); // 1
    
    // filter方法
    ['a',,'b'].filter(x => true) // ['a','b']
    
    // every方法
    [,'a'].every(x => x==='a') // true
    
    // reduce方法
    [1,,2].reduce((x,y) => x+y) // 3
    
    // some方法
    [,'a'].some(x => x !== 'a') // false
    
    // map方法
    [,'a'].map(x => 1) // [,1]
    
    // join方法
    [,'a',undefined,null].join('#') // "#a##"
    
    // toString方法
    [,'a',undefined,null].toString() // ",a,,"
    ```

    ES6 则是明确将空位转为`undefined`。

    `Array.from`方法会将数组的空位，转为`undefined`，也就是说，这个方法不会忽略空位。

    ```javascript
    Array.from(['a',,'b'])
    // [ "a", undefined, "b" ]
    ```

    扩展运算符（`...`）也会将空位转为`undefined`。

    ```javascript
    [...['a',,'b']]
    // [ "a", undefined, "b" ]
    ```

    `copyWithin()`会连空位一起拷贝。

    ```javascript
    [,'a','b',,].copyWithin(2,0) // [,"a",,"a"]
    ```

    `fill()`会将空位视为正常的数组位置。

    ```javascript
    new Array(3).fill('a') // ["a","a","a"]
    ```

    `for...of`循环也会遍历空位。

    ```javascript
    let arr = [, ,];
    for (let i of arr) {
      console.log(1);
    }
    // 1
    // 1
    ```

    上面代码中，数组`arr`有两个空位，`for...of`并没有忽略它们。如果改成`map`方法遍历，空位是会跳过的。

    `entries()`、`keys()`、`values()`、`find()`和`findIndex()`会将空位处理成`undefined`。

    ```javascript
    // entries()
    [...[,'a'].entries()] // [[0,undefined], [1,"a"]]
    
    // keys()
    [...[,'a'].keys()] // [0,1]
    
    // values()
    [...[,'a'].values()] // [undefined,"a"]
    
    // find()
    [,'a'].find(x => true) // undefined
    
    // findIndex()
    [,'a'].findIndex(x => true) // 0
    ```

    由于空位的处理规则非常不统一，所以建议避免出现空位。

### 函数的扩展

- 函数参数的默认值

  ```js
  var write = function (x = 'Hello', y = 'world!') {
      console.log(x, y)
  }
  write()
  ```

- 函数参数的默认值和解构赋值默认值的结合使用

  ```js
  var fun = function ({x,y = 5}) {
      console.log(x, y)
  }
  fun()// error
  fun({})// undefined 5
  fun({x: 'hello'})// hello 5
  fun({x: 'hello',y: 'world'})// hello world
  
  var fun1 = function (n,{x,y = 5}) {
      console.log(n, x, y)
  }
  fun1(1)// error
  fun1(1,{})// 1 undefined 5
  fun1(1,{x: 'hello'})// 1 hello 5
  fun1(1,{x: 'hello',y: 'world'})// 1 hello world
  
  var fun2 =  function (n,{x,y = 5} = {}) {
      console.log(n, x, y)
  }
  fun2(1)// 1 undefined 5
  fun2(1,{})// 1 undefined 5
  fun2(1,{x: 'hello'})// 1 hello 5
  fun2(1,{x: 'hello',y: 'world'})// 1 hello world
  
  // 下面两种例子的区别
  var f1 = function ({x=0,y=0} = {}) {
      console.log(x,y)
  }
  var f2 = function ({x,y} = {x:0,y:0}) {
      console.log(x,y)
  }
  f1({x:1})// 1 0 因为解构赋值原本就有了默认值，所以这样覆盖解构y也有值
  f2({x:1})// 1 undefined 这样赋值相当于覆盖了给对象的解构赋值，所以y未定义
  ```

- 获取函数无默认值参数的个数

  - 函数的 length 属性(形参从前往后检测，遇到有默认值的就不检测了，不准确，所以并没什么用)

  ```js
  (function (x,y,z) {
      
  }).length // 3
  (function (x,y=1,z) {
      
  }).length // 1
  (function (x,y,z=1,n) {
      
  }).length // 2
  ```

- rest参数

  - 语法：…变量名
  - 一定要放在数组解构或者函数形参的最后面
  - arguments 和 rest参数 的区别
    - arguments是对象，定义函数时不需要放入形参，获取所有参数的值
    - rest参数是数组，定义函数时要放入形参并命名，获取的是，除了前面其他形参的剩余值，并且 rest 参数也可以用于数组解构，不一定要在函数中使用

  ```js
  var add = function (...value) {
      var sum = 0
      value.map(n => sum += n)
      return sum
  }
  add(1,2,3,4)// 10
  var sub = function (a,b,...value) {
      var sum = 0
      sum = value[0]-value[1]
      return sum
  }
  sub(1,2,3,4)//-1
  sub(1,2,3)//NaN 3-undefined是NaN
  ```

- 扩展运算符 `...`

  - 通俗理解，把数组的括号去掉，即一个参数，变成了多个参数
  - 用途
    - 合并数组
    - 精确获取 UTF-16 的字符串长度

  ```js
  var values = ["hello","world","!"]
  console.log(...value)// 相当于 console.log("hello","world","!")
  // hello world !
  
  //合并数组
  var arr1 = [1,2]
  var arr2 = [3,4]
  var arr3 = [5,6]
  var arr4 = arr1.concat(arr2,arr3)// [1,2,3,4,5,6]
  var arr5 = [...arr1,...arr2,...arr3]// [1,2,3,4,5,6]
  
  //精确获取字符串长度
  "a🐒a".length// 4 "a\ud83d\udc12a"
  [..."a🐒a"].length// 3
  "a🐒b".split('').reverse().join('')// "b��a" "b\udc12\ud83da"
  [..."a🐒b"].reverse().join('')// "b🐒a" "b\ud83d\udc12a"
  ```

- 函数的 name 属性

  ```js
  var fun = function () {}
  fun.name// ES6 fun ES5是空串
  
  function fun1() {}
  fun1.name// fun1
  
  // 下面的函数定义方法是 Airbnb代码规范 中推荐使用的
  var f1 = function f2() {
      
  }
  f1.name// f2
  
  (new Function).name// anonymous(匿名)
  
  function test() {}
  test.bind(f1).name // bound test
  ```

- 箭头函数 (vue那篇笔记中有详细说明)

  - 使用 `=>` 定义的函数
  - 箭头的左侧为函数的参数，右侧表示函数体
  - 如果右侧只有一条语句，则作为返回值
  - 箭头函数的 this 的指向关系是重点，在vue那篇笔记中也有详细的讲述

### 对象的扩展

- 属性的简介表示法

  - 如果属性名和属性值位置的变量名相同，则可以只用一个变量名，即表示属性名又表示属性值
  - 如果此属性是一个函数，属性值是一个匿名函数，则可以直接定义函数，即表示属性名又表示属性值

  ```js
  // ES5
  var name = 'Bill'
  var obj = {name: name}
  // ES6
  var obj1 = {name}
  
  // ES5
  var obj2 = {
      fun: function () {
          return "hello world"
      }
  }
  // ES6
  var obj3 = {
      fun() {
          return "hello world"
      }
  }
  ```

- 属性名表达式

  - 一种新增的，动态给对象添加属性的方法

  ```js
  var obj = {}
  // ES5
  obj.age = 30
  obj['salary'] = 3000
  // ES6 属性名表达式
  var p = 'x'
  obj['na'+'me'] = 'Mary'
  obj[p+p] = 'pp'
  // {age: 30, salary: 3000, name: "Mary", xx: "pp"}
  var obj2 = {
      ['product' + 1 * 666]: 'ioooooooooo',
      [p]: 'p'
  }
  // {product666: "ioooooooooo", x: "p"}
  var obj1 = {
      ['f'+'un']() {
          console.log('fun')
      }
  }
  obj1.fun() // fun
  ```

- Object.is

  - 判断两个值是否相同。如果下列任何一项成立，则两个值相同：

    - 两个值都是 undefined
    - 两个值都是 null
    - 两个值都是 true 或者都是 false
    - 两个值是由相同个数的字符按照相同的顺序组成的字符串
    - 两个值指向同一个对象
    - 两个值都是数字并且
      - 都是正零 +0
      - 都是负零 -0
      - 都是 NaN
      - 都是除零和 NaN外的其它同一个数字

    这种相等性判断逻辑和传统的 == 运算不同，== 运算符会对它两边的操作数做隐式类型转换（如果它们类型不同），然后才进行相等性比较，（所以才会有类似 0 == false 等于 true 的现象），但 Object.is 不会做这种类型转换。

    这与 === 运算符的判定方式也不一样。=== 运算符（和 == 运算符）将数字值 -0 和 +0 视为相等，并认Number.NaN 为 NaN 不等于 。

- Object.assign

  - 用于复制对象属性（包括属性值），如果目标对象或者各源对象含有同名属性，则后面复制的属性会覆盖前面的属性
  - assign 只复制资深的属性，不可枚举的属性和继承的属性不会复制
  - 两个参数
    - targetObj
    - …rest参数（sourceObj）

  ```js
  var target = {id: 10}
  var source1 = {name: 'iooo'}
  var source2 = {price: 7000}
  var source3 = {location: 'CN'}
  Object.assign(target, source1, source2, source3)
  console.log(target)// {id: 10, name: "iooo", price: 7000, location: "CN"}
  
  var target = {id: 10}
  var source1 = {name: 'iooo',id: 11}
  var source2 = {price: 7000,name: 'iooq',id:12}
  var source3 = {location: 'CN'}
  Object.assign(target, source1, source2, source3)
  console.log(target)// {id: 12, name: "iooq", price: 7000, location: "CN"}
  
  // 为对象添加属性
  class MyClass {
      constructor(x,y) {
          Object.assign(this, {x, y})
      }
  }
  var my = new MyClass(10, 20)
  console.log(my)// MyClass {x: 10, y: 20}
  
  //克隆对象
  function cloneObj(origin) {
      return Object.assign({}, origin)
  }
  var origin = {id: 20,name: 'Bill'}
  var clone = cloneObj(origin)// {id: 20, name: "Bill"}
  ```

### Symbol

ES5 的对象属性名都是字符串，这容易造成属性名的冲突。比如，你使用了一个他人提供的对象，但又想为这个对象添加新的方法（mixin 模式），新方法的名字就有可能与现有方法产生冲突。如果有一种机制，保证每个属性的名字都是独一无二的就好了，这样就从根本上防止属性名的冲突。这就是 ES6 引入`Symbol`的原因。

ES6 引入了一种新的原始数据类型 `Symbol`，表示独一无二的值。它是 JavaScript 语言的第七种数据类型，前六种是：`undefined`、`null`、布尔值（Boolean）、字符串（String）、数值（Number）、对象（Object）。

Symbol 值通过`Symbol`函数生成。这就是说，对象的属性名现在可以有两种类型，一种是原来就有的字符串，另一种就是新增的 Symbol 类型。凡是属性名属于 Symbol 类型，就都是独一无二的，可以保证不会与其他属性名产生冲突。

- Symbol 不能与其他类型的值进行运算，否则会报错

  ```js
  var sym = Symbol('Test Symbol')
  
  // Symbol 可以显式转换为 String，但不能隐式转换为 String
  var sss = 'hello' + sym //error 运算是隐式转换
  var str = String(sym)// "Symbol(Test Symbol)"
  var str1 = sym.toString()// "Symbol(Test Symbol)"
  
  // Symbol 可以转为布尔值，但不能转为数值
  Boolean(sym)// true
  Number(sym)// error
  ```

- Symbol 作为属性名

  - 调用用 Symbol 定义的对象的属性时，不能用 . 的方式调用，因为 . 调用的是 字符串属性名
  - 关于全局状态下用 `var name = Symbol` 会报错的问题
    - name 是 window 的特有属性，在全局环境下定义的name变量，赋任何值都会自动转化成字符串，而Symbol类型不能直接转化为字符串，所以报错了。

  ```js
  var s = Symbol('a')
  var ss = Symbol('a')
  var obj = {}
  // 方法一
  obj[s] = 'Bill'
  obj[ss] = 'Mary'
  
  // 方法二
  var obj2 = {
      [s]: 'John'
  }
  
  // 方法三
  var obj3 = {}
  Object.defineProperty(obj3,s,{value: 'John'})
  
  // 调用
  console.log(obj[s])
  ```

- Symbol 属性名的遍历

  ```js
  var obj = {name: 'Bill'}
  var a = Symbol('a')
  var b = Symbol('b')
  obj[a] = 'Hello'
  obj[b] = 'World'
  // Object.getOwnPropertySymbols 方法只遍历 Symbol 属性
  var objectSymbols = Object.getOwnPropertySymbols(obj)
  console.log(objectSymbols)// [Symbol(a), Symbol(b)]
  
  // for...in, Object.keys(), Object.getOwnPropertyNames 只能遍历字符串属性
  for (var key in obj) {
      console.log(key)
  }
  // name
  
  // 同时获取 Symbol 和非 Symbol 属性
  console.log(Reflect.ownKeys(obj))// ["name", Symbol(a), Symbol(b)]
  
  // 可以利用 Symbol 的特性为对象添加一些非私有，但是又希望只用于内部的方法
  var size = Symbol('size')
  class Collection {
      constructor() {
          this[size] = 0 // 为对象添加一个 Symbol 类型，名为 size 的属性
      }
      add(item) {
          this[this[size]] = item
          this[size]++
      }
      static sizeOf(instance) {
          return instance[size]
      }
  }
  var cc = new Collection()
  console.log(Collection.sizeOf(cc))
  cc.add('ok')
  cc.add('not ok')
  console.log(Collection.sizeOf(cc))
  console.log(object.keys(cc))// ["0", "1"]
  console.log(Reflect.ownKeys(cc))// ["0", "1", Symbol(size)]
  ```

- Symbol.for & Symbol.keyFor

  - Symbole.for 
    - 有时，我们希望重新使用同一个 Symbol 值，`Symbol.for`方法可以做到这一点。它接受一个字符串作为参数，然后搜索有没有以该参数作为名称的 Symbol 值。如果有，就返回这个 Symbol 值，否则就新建并返回一个以该字符串为名称的 Symbol 值。
    - `Symbol.for()`与`Symbol()`这两种写法，都会生成新的 Symbol。它们的区别是，前者会被登记在全局环境中供搜索，后者不会。`Symbol.for()`不会每次调用就返回一个新的 Symbol 类型的值，而是会先检查给定的`key`是否已经存在，如果不存在才会新建一个值。比如，如果你调用`Symbol.for("cat")`30 次，每次都会返回同一个 Symbol 值，但是调用`Symbol("cat")`30 次，会返回 30 个不同的 Symbol 值。
  - Symbol.keyFor
    - `Symbol.keyFor`方法返回一个已登记的 Symbol 类型值的`key`。

  ```js
  var name1 = Symbol('name')
  var name2 = Symbol('name')
  console.log(name1 === name2)// false
  var s = Symbol.for('x')
  var ss = Symbol.for('x')
  console.log(s === ss)// true
  
  console.log(Symbol.keyFor(s))// x
  console.log(Symbol.keyFor(name1))// undefined 因为直接用Symbol() 方式生成的 Symbol 值不会被登记
  ```


### Proxy

Proxy 用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种“元编程”（meta programming），即对编程语言进行编程。

Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。Proxy 这个词的原意是代理，用在这里表示由它来“代理”某些操作，可以译为“代理器”。

- Proxy 用于拦截对象的操作

  - var obj = new Proxy(target, handler)
    target: 要拦截的对象
    handler: 拦截的动作

  ```js
  var obj1 = {
      name: 'Bill',
      fun() {
          console.log('Function Bill')
      }
  }
  
  var obj2 = {
      name: 'Mike',
      fun() {
          console.log('Function Mike')
      }
  }
  // 调用访问对象前，统一进行操作，也就是拦截
  // 创建代理
  var obj = new Proxy(obj1, {
      get: function (target, key, receiver) {
          console.log('-------------------')
          return Reflect.get(target, key, receiver)
      }
  })
  console.log(obj.name)
  // -------------------
  // Bill
  obj.fun()
  // -------------------
  // Function Bill
  ```

- 拦截属性的读取操作：get

  ```js
  // 通过代理我们可以让读取对象不存在属性时抛出异常
  var product = {
      name: 'ioo'
  }
  var proxy = new Proxy(product,{
      get: function (target, property) {
          // in 操作符: 如果指定的属性在指定的对象或其原型链中，则in 运算符返回true。
          if (property in target) {
              return target[property]
          } else {
              throw new ReferenceError(`属性"${property}"不存在`)
          }
      }
  })
  console.log(proxy.name)
  console.log(proxy.price)
  
  // get 代理继承
  let proto = new Proxy({},{
      get(target, propertyKey, receiver) {
          console.log('GET ' + propertyKey)
          return target[propertyKey]
      }
  })
  // Object.create()方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__。
  let obj = Object.create(proto)
  console.log(obj.name)
  
  // 应用，利用 get 代理读取数组的负索引
  var arr = [1,2,3]
  // arr[0] = arr[-3]; arr[1] = arr[-2]; arr[2] = arr[-1]
  function createSuperArray(...elements) {
      let handler = {
          get(target, key, receiver) {
              let index = Number(key)
              if (index < 0) {
                  key = String(target.length + index)
              }
              return Reflect.get(target, key, receiver)
          }
      }
      return new Proxy(elements, handler)
  }
  
  let arr1 = createSuperArray(1,2,3)
  //arr1[-1]
  //3
  //arr1[-4]
  //undefined
  //arr1[-2]
  //2
  //arr1[-3]
  //1
  ```

- 拦截属性写入操作的：set

  ```js
  // 校验属性值
  var pro = {
      name: 'iooo',
      price: 80// 30-180
  }
  let validator = {
      set(obj, key, value) {
          if (key === 'price') {
              if (!Number.isInteger(value)) {
                  throw new TypeError('价格必须是整数')
              }
              if (value < 30 || value > 180) {
                  throw new RangeError('价格必须在30到180之间')
              }
          }
          obj[key] = value
      }
  }
  let product = new Proxy(pro, validator)
  product.price = 200
  
  // 控制属性是否被访问
  // 对象的内部属性 通常属性名以 _ 开头的，都是内部私有属性
  var handler = {
      get(target, key) {
          invariant(key)
          return target[key]
      },
      set(target, key, value) {
          invariant(key)
          return 'ok'
      }
  }
  
  function invariant(key) {
      if (key[0] === '_') {
          throw new Error('私有属性，不能被访问')
      }
  }
  
  var obj = {
      name:'Bill',
      _value: 20
  }
  var objProxy = new Proxy(obj, handler)
  console.log(objProxy.name) // Bill
  console.log(objProxy._value)// Error: 私有属性，不能被访问
  objProxy._value = 31// Error: 私有属性，不能被访问
  ```

- 拦截函数的调用、call 和 apply：apply

  - `apply`方法拦截函数的调用、`call`和`apply`操作。

    `apply`方法可以接受三个参数，分别是目标对象、目标对象的上下文对象（`this`）和目标对象的参数数组。

  ```js
  var fun = function () {
      return 'hello world!'
  }
  var handler = {
      apply() {
          return '你好' // 改变返回值
      }
  }
  var funProxy = new Proxy(fun, handler)
  funProxy() // 你好
  
  function sum(n1, n2) {
      return n1 + n2
  }
  var twice = {
      apply(target, ctx, args) {
          //Reflect.apply(...arguments) 相当于用Reflect.apply方法调用sum
          return Reflect.apply(...arguments) * 2
      }
  }
  var funProxy = new Proxy(sum, twice)
  console.log(funProxy(1,2))// 6
  console.log(funProxy.call(null,1,2))// 6
  console.log(funProxy.apply(null,[1,2]))// 6
  ```

- 隐藏属性操作：has

  - `has`方法用来拦截`HasProperty`操作，即判断对象是否具有某个属性时，这个方法会生效。典型的操作就是`in`运算符。但是这只会拦截单个属性的 in 判断，for…in 是不会拦截的。

    `has`方法可以接受两个参数，分别是目标对象、需查询的属性名。

  ```js
  var obj = {
      name: 'ioo',
      price: 58,
      _value: 5800,
      _test: 'ok'
  }
  
  var handler = {
      has(target, key) {
          if (key[0] === '_') {
              return false
          }
          return key in target
      }
  }
  var hasProxy = new Proxy(obj, handler)
  console.log('name' in hasProxy)// true
  console.log('price' in hasProxy)// true
  console.log('_value' in hasProxy)// false
  console.log('_test' in hasProxy)// false
  // 不会拦截 for...in 
  for (key in hasProxy) {
      console.log(key)
  }
  // name
  // price
  // _value
  // _test
  ```

  - 如果原对象不可配置或禁止扩展，那么这是 has 拦截会报错
  
  ```js
  var obj = {a: 20}
  // Object.preventExtensions()方法让一个对象变的不可扩展，也就是永远不能再添加新的属性。
  Object.preventExtensions(obj)
  var proxy = new Proxy(obj1,{
      has(target, key) {
          return false
      }
  })
  console.log('a' in proxy)// Uncaught TypeError: 'has' on proxy: trap returned falsish for property 'a' but the proxy target is not extensible
  ```
  
- 拦截 new 指令：construct

  - 用于拦截创建对象的 new 指令

  ```js
  var handler = {
      // target 是传入的构造函数，并且如果返回值不是一个对象会报错
      construct(target, args) {
          console.log('construct')
          return new target()
      }
  }
  var proxy = new Proxy(function () {}, handler)
  new proxy// construct
  ```

- 拦截 delete 操作：deleteProperty

  -  `deleteProperty`方法用于拦截`delete`操作，如果这个方法抛出错误或者返回`false`，当前属性就无法被`delete`命令删除。 

  ```js
  var handler = {
      deleteProperty(target, key) {
          delete target[key]
          console.log(`删除"${key}"属性成功`)
          return true
      }
  }
  var obj = {
      name: 'Bill',
      age: 20
  }
  var proxy = new Proxy(obj, handler)
  delete proxy.age// 删除"age"属性成功
  console.log(proxy.age)// undefined
  ```

- 拦截 defineProperty 操作：defineProperty

  -  `defineProperty`方法拦截了`Object.defineProperty`操作。 拦截动态添加属性的操作

  ```js
  var obj = {}
  var handler = {
      defineProperty(target, key, descriptor) {
          console.log(`<${key}>`)
          // target[key] = descriptor.value
          Reflect.defineProperty(target, key, descriptor)
          return true
      }
  }
  var proxy = new Proxy(obj, handler)
  proxy.name = 'Bill'
  ```

### Reflect

**Reflect** 是一个内置的对象，它提供拦截 JavaScript 操作的方法。这些方法与[处理器对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler)的方法相同。`Reflect`不是一个函数对象，因此它是不可构造的。 

与大多数全局对象不同，`Reflect`不是一个构造函数。你不能将其与一个[new运算符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new)一起使用，或者将`Reflect`对象作为一个函数来调用。`Reflect`的所有属性和方法都是静态的（就像[`Math`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math)对象）。 

  - `Reflect`对象与`Proxy`对象一样，也是 ES6 为了操作对象而提供的新 API。`Reflect`对象的设计目的有这样几个。

    - 将`Object`对象的一些明显属于语言内部的方法（比如`Object.defineProperty`），放到`Reflect`对象上。现阶段，某些方法同时在`Object`和`Reflect`对象上部署，未来的新方法将只部署在`Reflect`对象上。也就是说，从`Reflect`对象上可以拿到语言内部的方法。
    - 修改某些`Object`方法的返回结果，让其变得更合理。比如，`Object.defineProperty(obj, name, desc)`在无法定义属性时，会抛出一个错误，而`Reflect.defineProperty(obj, name, desc)`则会返回`false`。

    ```javascript
    // 老写法
    try {
      Object.defineProperty(target, property, attributes);
      // success
    } catch (e) {
      // failure
    }
    
    // 新写法
    if (Reflect.defineProperty(target, property, attributes)) {
      // success
    } else {
      // failure
    }
    ```

    -  让`Object`操作都变成函数行为。某些`Object`操作是命令式，比如`name in obj`和`delete obj[name]`，而`Reflect.has(obj, name)`和`Reflect.deleteProperty(obj, name)`让它们变成了函数行为。 

    ```javascript
    // 老写法
    'assign' in Object // true
    
    // 新写法
    Reflect.has(Object, 'assign') // true
    ```

    -  `Reflect`对象的方法与`Proxy`对象的方法一一对应，只要是`Proxy`对象的方法，就能在`Reflect`对象上找到对应的方法。这就让`Proxy`对象可以方便地调用对应的`Reflect`方法，完成默认行为，作为修改行为的基础。也就是说，不管`Proxy`怎么修改默认行为，你总可以在`Reflect`上获取默认行为。 

    ```javascript
    Proxy(target, {
      set: function(target, name, value, receiver) {
        var success = Reflect.set(target, name, value, receiver);
        if (success) {
          console.log('property ' + name + ' on ' + target + ' set to ' + value);
        }
        return success;
      }
    });
    ```

    ​	上面代码中，`Proxy`方法拦截`target`对象的属性赋值行为。它采用`Reflect.set`方法将值赋值给对象的属性，确保完成原有的行为，然后再部署额外的功能。

    下面是另一个例子。

    ```javascript
    var loggedObj = new Proxy(obj, {
      get(target, name) {
        console.log('get', target, name);
        return Reflect.get(target, name);
      },
      deleteProperty(target, name) {
        console.log('delete' + name);
        return Reflect.deleteProperty(target, name);
      },
      has(target, name) {
        console.log('has' + name);
        return Reflect.has(target, name);
      }
    });
    ```

    上面代码中，每一个`Proxy`对象的拦截操作（`get`、`delete`、`has`），内部都调用对应的`Reflect`方法，保证原生行为能够正常执行。添加的工作，就是将每一个操作输出一行日志。

    有了`Reflect`对象以后，很多操作会更易读。

    ```javascript
    // 老写法
    Function.prototype.apply.call(Math.floor, undefined, [1.75]) // 1
    
    // 新写法
    Reflect.apply(Math.floor, undefined, [1.75]) // 1
    ```

### Promise

见 Nodejs 笔记，有详细的笔记

如有还有问题，可以参考本文档参考书籍 http://es6.ruanyifeng.com/

### Iterator 和 for...of 循环

JavaScript 原有的表示“集合”的数据结构，主要是数组（`Array`）和对象（`Object`），ES6 又添加了`Map`和`Set`。这样就有了四种数据集合，用户还可以组合使用它们，定义自己的数据结构，比如数组的成员是`Map`，`Map`的成员是对象。这样就需要一种统一的接口机制，来处理所有不同的数据结构。

遍历器（Iterator）就是这样一种机制。它是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署 Iterator 接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）。

Iterator 的作用有三个：一是为各种数据结构，提供一个统一的、简便的访问接口；二是使得数据结构的成员能够按某种次序排列；三是 ES6 创造了一种新的遍历命令`for...of`循环，Iterator 接口主要供`for...of`消费。

Iterator 的遍历过程是这样的。

（1）创建一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上，就是一个指针对象。

（2）第一次调用指针对象的`next`方法，可以将指针指向数据结构的第一个成员。

（3）第二次调用指针对象的`next`方法，指针就指向数据结构的第二个成员。

（4）不断调用指针对象的`next`方法，直到它指向数据结构的结束位置。

每一次调用`next`方法，都会返回数据结构的当前成员的信息。具体来说，就是返回一个包含`value`和`done`两个属性的对象。其中，`value`属性是当前成员的值，`done`属性是一个布尔值，表示遍历是否结束。

下面是一个模拟`next`方法返回值的例子。

```javascript
var it = makeIterator(['a', 'b']);

it.next() // { value: "a", done: false }
it.next() // { value: "b", done: false }
it.next() // { value: undefined, done: true }

function makeIterator(array) {
  var nextIndex = 0;
  return {
    next: function() {
      return nextIndex < array.length ?
        {value: array[nextIndex++], done: false} :
        {value: undefined, done: true};
    }
  };
}
```

​	上面代码定义了一个`makeIterator`函数，它是一个遍历器生成函数，作用就是返回一个遍历器对象。对数组`['a', 'b']`执行这个函数，就会返回该数组的遍历器对象（即指针对象）`it`。

​	指针对象的`next`方法，用来移动指针。开始时，指针指向数组的开始位置。然后，每次调用`next`方法，指针就会指向数组的下一个成员。第一次调用，指向`a`；第二次调用，指向`b`。

​	`next`方法返回一个对象，表示当前数据成员的信息。这个对象具有`value`和`done`两个属性，`value`属性返	回当前位置的成员，`done`属性是一个布尔值，表示遍历是否结束，即是否还有必要再一次调用`next`方法。

​	总之，调用指针对象的`next`方法，就可以遍历事先给定的数据结构。

​	对于遍历器对象来说，`done: false`和`value: undefined`属性都是可以省略的，因此上面的`makeIterator`函数可以简写成下面的形式。

```javascript
function makeIterator(array) {
  var nextIndex = 0;
  return {
    next: function() {
      return nextIndex < array.length ?
        {value: array[nextIndex++]} :
        {done: true};
    }
  };
}
```

​	由于 Iterator 只是把接口规格加到数据结构之上，所以，遍历器与它所遍历的那个数据结构，实际上是分开的，完全可以写出没有对应数据结构的遍历器对象，或者说用遍历器对象模拟出数据结构。下面是一个无限运行的遍历器对象的例子。

```javascript
var it = idMaker();

it.next().value // 0
it.next().value // 1
it.next().value // 2
// ...

function idMaker() {
  var index = 0;

  return {
    next: function() {
      return {value: index++, done: false};
    }
  };
}
```

​	上面的例子中，遍历器生成函数`idMaker`，返回一个遍历器对象（即指针对象）。但是并没有对应的数据结构，或者说，遍历器对象自己描述了一个数据结构出来。

​	如果使用 TypeScript 的写法，遍历器接口（Iterable）、指针对象（Iterator）和`next`方法返回值的规格可以描述如下。

```typescript
interface Iterable {
  [Symbol.iterator]() : Iterator,
}

interface Iterator {
  next(value?: any) : IterationResult,
}

interface IterationResult {
  value: any,
  done: boolean,
}
```

**默认 Iterator 接口**

- Iterator 接口的目的，就是为所有数据结构，提供了一种统一的访问机制，即`for...of`循环（详见下文）。当使用`for...of`循环遍历某种数据结构时，该循环会自动去寻找 Iterator 接口。

  一种数据结构只要部署了 Iterator 接口，我们就称这种数据结构是“可遍历的”（iterable）。

  ES6 规定，默认的 Iterator 接口部署在数据结构的`Symbol.iterator`属性，或者说，一个数据结构只要具有`Symbol.iterator`属性，就可以认为是“可遍历的”（iterable）。`Symbol.iterator`属性本身是一个函数，就是当前数据结构默认的遍历器生成函数。执行这个函数，就会返回一个遍历器。至于属性名`Symbol.iterator`，它是一个表达式，返回`Symbol`对象的`iterator`属性，这是一个预定义好的、类型为 Symbol 的特殊值，所以要放在方括号内（参见《Symbol》一章）。

  ```javascript
  const obj = {
    [Symbol.iterator] : function () {
      return {
        next: function () {
          return {
            value: 1,
            done: true
          };
        }
      };
    }
  };
  ```

  上面代码中，对象`obj`是可遍历的（iterable），因为具有`Symbol.iterator`属性。执行这个属性，会返回一个遍历器对象。该对象的根本特征就是具有`next`方法。每次调用`next`方法，都会返回一个代表当前成员的信息对象，具有`value`和`done`两个属性。

  ES6 的有些数据结构原生具备 Iterator 接口（比如数组），即不用任何处理，就可以被`for...of`循环遍历。原因在于，这些数据结构原生部署了`Symbol.iterator`属性（详见下文），另外一些数据结构没有（比如对象）。凡是部署了`Symbol.iterator`属性的数据结构，就称为部署了遍历器接口。调用这个接口，就会返回一个遍历器对象。

  原生具备 Iterator 接口的数据结构如下。

  - Array
  - Map
  - Set
  - String
  - TypedArray
  - 函数的 arguments 对象
  - NodeList 对象

  下面的例子是数组的`Symbol.iterator`属性。

  ```javascript
  let arr = ['a', 'b', 'c'];
  let iter = arr[Symbol.iterator]();
  
  iter.next() // { value: 'a', done: false }
  iter.next() // { value: 'b', done: false }
  iter.next() // { value: 'c', done: false }
  iter.next() // { value: undefined, done: true }
  ```

  上面代码中，变量`arr`是一个数组，原生就具有遍历器接口，部署在`arr`的`Symbol.iterator`属性上面。所以，调用这个属性，就得到遍历器对象。

  对于原生部署 Iterator 接口的数据结构，不用自己写遍历器生成函数，`for...of`循环会自动遍历它们。除此之外，其他数据结构（主要是对象）的 Iterator 接口，都需要自己在`Symbol.iterator`属性上面部署，这样才会被`for...of`循环遍历。

  对象（Object）之所以没有默认部署 Iterator 接口，是因为对象的哪个属性先遍历，哪个属性后遍历是不确定的，需要开发者手动指定。本质上，遍历器是一种线性处理，对于任何非线性的数据结构，部署遍历器接口，就等于部署一种线性转换。不过，严格地说，对象部署遍历器接口并不是很必要，因为这时对象实际上被当作 Map 结构使用，ES5 没有 Map 结构，而 ES6 原生提供了。

  一个对象如果要具备可被`for...of`循环调用的 Iterator 接口，就必须在`Symbol.iterator`的属性上部署遍历器生成方法（原型链上的对象具有该方法也可）。

  ```javascript
  class RangeIterator {
    constructor(start, stop) {
      this.value = start;
      this.stop = stop;
    }
  
    [Symbol.iterator]() { return this; }
  
    next() {
      var value = this.value;
      if (value < this.stop) {
        this.value++;
        return {done: false, value: value};
      }
      return {done: true, value: undefined};
    }
  }
  
  function range(start, stop) {
    return new RangeIterator(start, stop);
  }
  
  for (var value of range(0, 3)) {
    console.log(value); // 0, 1, 2
  }
  ```

  上面代码是一个类部署 Iterator 接口的写法。`Symbol.iterator`属性对应一个函数，执行后返回当前对象的遍历器对象。

  下面是通过遍历器实现指针结构的例子。

  ```javascript
  function Obj(value) {
    this.value = value;
    this.next = null;
  }
  
  Obj.prototype[Symbol.iterator] = function() {
    var iterator = { next: next };
  
    var current = this;
  
    function next() {
      if (current) {
        var value = current.value;
        current = current.next;
        return { done: false, value: value };
      } else {
        return { done: true };
      }
    }
    return iterator;
  }
  
  var one = new Obj(1);
  var two = new Obj(2);
  var three = new Obj(3);
  
  one.next = two;
  two.next = three;
  
  for (var i of one){
    console.log(i); // 1, 2, 3
  }
  ```

  上面代码首先在构造函数的原型链上部署`Symbol.iterator`方法，调用该方法会返回遍历器对象`iterator`，调用该对象的`next`方法，在返回一个值的同时，自动将内部指针移到下一个实例。

  下面是另一个为对象添加 Iterator 接口的例子。

  ```javascript
  let obj = {
    data: [ 'hello', 'world' ],
    [Symbol.iterator]() {
      const self = this;
      let index = 0;
      return {
        next() {
          if (index < self.data.length) {
            return {
              value: self.data[index++],
              done: false
            };
          } else {
            return { value: undefined, done: true };
          }
        }
      };
    }
  };
  ```

  对于类似数组的对象（存在数值键名和`length`属性），部署 Iterator 接口，有一个简便方法，就是`Symbol.iterator`方法直接引用数组的 Iterator 接口。

  ```javascript
  NodeList.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
  // 或者
  NodeList.prototype[Symbol.iterator] = [][Symbol.iterator];
  
  [...document.querySelectorAll('div')] // 可以执行了
  ```

  NodeList 对象是类似数组的对象，本来就具有遍历接口，可以直接遍历。上面代码中，我们将它的遍历接口改成数组的`Symbol.iterator`属性，可以看到没有任何影响。

  下面是另一个类似数组的对象调用数组的`Symbol.iterator`方法的例子。

  ```javascript
  let iterable = {
    0: 'a',
    1: 'b',
    2: 'c',
    length: 3,
    [Symbol.iterator]: Array.prototype[Symbol.iterator]
  };
  for (let item of iterable) {
    console.log(item); // 'a', 'b', 'c'
  }
  ```

  注意，普通对象部署数组的`Symbol.iterator`方法，并无效果。

  ```javascript
  let iterable = {
    a: 'a',
    b: 'b',
    c: 'c',
    length: 3,
    [Symbol.iterator]: Array.prototype[Symbol.iterator]
  };
  for (let item of iterable) {
    console.log(item); // undefined, undefined, undefined
  }
  ```

  如果`Symbol.iterator`方法对应的不是遍历器生成函数（即会返回一个遍历器对象），解释引擎将会报错。

  ```javascript
  var obj = {};
  
  obj[Symbol.iterator] = () => 1;
  
  [...obj] // TypeError: [] is not a function
  ```

  上面代码中，变量`obj`的`Symbol.iterator`方法对应的不是遍历器生成函数，因此报错。

  有了遍历器接口，数据结构就可以用`for...of`循环遍历（详见下文），也可以使用`while`循环遍历。

  ```javascript
  var $iterator = ITERABLE[Symbol.iterator]();
  var $result = $iterator.next();
  while (!$result.done) {
    var x = $result.value;
    // ...
    $result = $iterator.next();
  }
  ```

  上面代码中，`ITERABLE`代表某种可遍历的数据结构，`$iterator`是它的遍历器对象。遍历器对象每次移动指针（`next`方法），都检查一下返回值的`done`属性，如果遍历还没结束，就移动遍历器对象的指针到下一步（`next`方法），不断循环。

### Generator函数

Generator 函数是 ES6 提供的一种异步编程解决方案，语法行为与传统函数完全不同。 

Generator 函数有多种理解角度。语法上，首先可以把它理解成，Generator 函数是一个状态机，封装了多个内部状态。

执行 Generator 函数会返回一个遍历器对象，也就是说，Generator 函数除了状态机，还是一个遍历器对象生成函数。返回的遍历器对象，可以依次遍历 Generator 函数内部的每一个状态。

形式上，Generator 函数是一个普通函数，但是有两个特征。一是，`function`关键字与函数名之间有一个星号；二是，函数体内部使用`yield`表达式，定义不同的内部状态（`yield`在英语里的意思就是“产出”）。

```js
function* helloWorldGenerator() {
    console.log('第一次')
    yield 'hello'
    console.log('第二次')
    yield 'world'
    console.log('第三次')
    return 'ending'// return可以看成是最后一个状态
}
// Generator 返回一个遍历器对象(Iterator)
var gen = helloWorldGenerator()
// 每次调用next方法都执行一个yield前的语句，并把此时yield定义的值当返回值返回
console.log(gen.next())
// 第一次
// {value: "hello", done: false}
console.log(gen.next())
// 第二次
// {value: "world", done: false}
console.log(gen.next())
// 第三次
// {value: "ending", done: true}
console.log(gen.next())
// {value: undefined, done: true}
```

- yield 语句

  - 我感觉就是 return 的写法，但是又有不同

  ```js
  function sum(...values) {
      var n = 0
      for (let v of values) {
          n += v
      }
      console.log('sum')
      return n
  }
  function* gen() {
      yield 10 + 20
      yield 10 * sum(1, 2, 3, 4)
  }
  var obj = gen()
  console.log(obj.next())
  console.log(obj.next())
  ```

  - Generator 函数也可以不用 yield，这样 Generator 就变成了暂缓执行的函数。

  ```js
  function* fun() {
      console.log('fun')
  }
  // 因为没有yield 有种没有返回值的函数调用的感觉
  var obj1 = fun()
  obj1.next()
  ```

  - yield 用在一个表达式中，必须放在圆括号里

  ```js
  function* gen() {
      // console.log('Hello' + yield 'world') // Error
      console.log('Hello' + (yield 'world'))
  }
  var obj = gen()
  obj.next()// 没输出，因为状态机在执行到 yield 返回后就暂停了
  obj.next()// Helloundefined 继续执行上一步没执行完的代码，又因为 yield语句没有返回值，所以undefined。有种打断点的感觉
  ```

  - yield 语句用作函数参数或用于赋值表达式的右边，可以不加括号

  ```js
  function* gen() {
      console.log(sum(yield 1, yield 2))
      var input = yield 20
  }
  var obj = gen()
  obj.next()// 没输出
  obj.next()// 没输出
  obj.next()// NaN，因为是undefined + undefined，所以是 NaN
  ```

  注：普通函数不能用 yield 当做 return，这样做会抛出异常

- next 方法的参数

  ```js
  function* gen() {
      var n = yield 20
      console.log(n)
  }
  var obj = gen()
  obj.next()
  obj.next(200)// 给!!上一个!!yield返回的地方 返回参数，即给 yield 返回值
  
  function* gen() {
      for (var i = 0; true; i++) {
          var reset = yield i
          if (reset) {
              i = -1
          }
      }
  }
  
  var obj = gen()
  console.log(obj.next().value)// 0
  console.log(obj.next().value)// 1
  console.log(obj.next().value)// 2
  console.log(obj.next(true).value)// 0
  console.log(obj.next().value)// 1
  console.log(obj.next().value)// 2
  console.log(obj.next().value)// 3
  ```

- for … of 自动切换状态

  - 因为 Generator 函数返回的是一个 Iterator 对象，所以可以直接用  for…of 遍历

  ```js
  function* gen() {
      yield 'a'
      yield 'b'
      yield 'c'
      yield 'd'
      return 'x'
  }
  for (var n of gen()) {
      console.log(n)
  }
  // a b c d 没有 x 因为到 return 的时候，done 为 true，就不返回给 n 了
  
  // 斐波那契数列 F(1)=1，F(2)=1, F(n)=F(n-1)+F(n-2)（n>=3，n∈N*）
  function* fibonacci() {
      let [prev, curr] = [0, 1]
      while (true) {
          [prev, curr] = [curr, curr + prev]
          yield curr// 第一次输出是 prev = 1, curr = 1,符合斐波那契数列
      }
  }
  var obj = fibonacci()
  console.log(obj.next().value)// 1
  console.log(obj.next().value)// 2
  console.log(obj.next().value)// 3
  console.log(obj.next().value)// 5
  ```

  - 可以通过 Generator 函数把 Obeject 用 for…of 遍历

  ```js
  function* objectEntries(obj) {
      let propKeys = Reflect.ownKeys(obj)
      for (let propKey of propKeys) {
          yield [propKey, obj[propKey]]
      }
  }
  var obj = {name:'Bill', age: 12}
  for (let [key, value] of objectEntries(obj)) {
      console.log(`${key}: ${value}`)
  }
  // name: Bill
  // age: 12
  ```

- throw 方法

  -  Generator 函数返回的遍历器对象，都有一个`throw`方法，可以在函数体外抛出错误，然后在 Generator 函数体内捕获。 

  ```javascript
  var g = function* () {
    try {
      yield;
    } catch (e) {
      console.log('内部捕获', e);
    }
  };
  
  var i = g();
  i.next();
  
  try {
    i.throw('a');
    i.throw('b');
  } catch (e) {
    console.log('外部捕获', e);
  }
  // 内部捕获 a
  // 外部捕获 b
  ```

  上面代码中，遍历器对象`i`连续抛出两个错误。第一个错误被 Generator 函数体内的`catch`语句捕获。`i`第二次抛出错误，由于 Generator 函数内部的`catch`语句已经执行过了，不会再捕捉到这个错误了，所以这个错误就被抛出了 Generator 函数体，被函数体外的`catch`语句捕获。

  - 我们可以通过 throw 语句提前结束 Generator 的状态
- 但是通常都是用 return 结束的
  
  ```js
  function fun(s) {
      console.log(s + s)
  }
  function* gen() {
      try {
          var a = yield fun('a')
          var b = yield fun('b')
          var c = yield fun('c')
      } catch(e) {
          console.log(e)
      }
  }
  var obj = gen()
  obj.next()// aa
  obj.next()// bb
  obj.throw('stop')// stop
  ```

- return 方法

  - 直接把返回的对象 done 变为 true。
  - 没有 finally 或者 finally 里没有 yield 才返回 return 的参数，不然等执行完 finally 里的所有 yield 才返回 return 的参数。


  ```js
  function* gen() {
      yield 'a'
      yield 'b'
      yield 'c'
  }

  var obj = gen()
  console.log(obj.next())// {value: "a", done: false}
  console.log(obj.return('hello world'))// {value: "hello world", done: true}
  console.log(obj.next())// {value: undefined, done: true}
  ```

​	如果 Generator 函数内部有`try...finally`代码块，且正在执行`try`代码块，那么`return`方法会导致立刻进入`finally`代码块，执行完以后，整个函数才会结束。

```javascript
function* numbers () {
  yield 1;
  try {
    yield 2;
    yield 3;
  } finally {
    yield 4;
    yield 5;
  }
  yield 6;
}
var g = numbers();
g.next() // { value: 1, done: false }
g.next() // { value: 2, done: false }
g.return(7) // { value: 4, done: false } 
g.next() // { value: 5, done: false }
g.next() // { value: 7, done: true }
```

​	上面代码中，调用`return()`方法后，就开始执行`finally`代码块，不执行`try`里面剩下的代码了，然后等到`finally`代码块执行完，再返回`return()`方法指定的返回值。

- yield* 表达式与递归 Generator 函数

  -  如果在 Generator 函数内部，调用另一个 Generator 函数。直接调用是没用的，需要在前者的函数体内部，自己手动完成遍历。 
  -  ES6 提供了`yield*`表达式，作为解决办法，用来在一个 Generator 函数里面执行另一个 Generator 函数。 

  ```js
  // 递归 Generator 函数：在 Generator 函数内部调用 Generator 函数
  
  function* gen1() {
      yield 'a'
      yield 'b'
  }
  function* gen2() {
      yield 1
      yield* gen1()
      yield 2
  }
  var obj = gen2()
  console.log(obj.next())// {value: 1, done: false}
  console.log(obj.next())// {value: "a", done: false}
  console.log(obj.next())// {value: "b", done: false}
  console.log(obj.next())// {value: 2, done: false}
  console.log(obj.next())// {value: undefined, done: true}
  ```

- 用 yield* 进行递归调用

  ```js
  function* enumerateArray(array) {
      if (Array.isArray(array)) {
          for (let i = 0; i < array.length; i++) {
              yield* enumerateArray(array[i])
          }
      } else {
          yield array
      }
  }
  var arr = [1,2,[3,4,[5,6,[7,8]]]]
  for (var value of enumerateArray(arr)) {
      console.log(value)
  }
  ```

- 作为对象属性的 Generator 函数

  - 如果一个对象的属性是 Generator 函数，可以简写成下面的形式。

    ```javascript
    let obj = {
      * myGeneratorMethod() {
        ···
      }
    };
    ```

    上面代码中，`myGeneratorMethod`属性前面有一个星号，表示这个属性是一个 Generator 函数。

    它的完整形式如下，与上面的写法是等价的。

    ```javascript
    let obj = {
      myGeneratorMethod: function* () {
        // ···
      }
    };
    ```

- Generator 函数的 this

  - Generator 函数总是返回一个遍历器，ES6 规定这个遍历器是 Generator 函数的实例，也继承了 Generator 函数的`prototype`对象上的方法。

    ```javascript
    function* g() {}
    
    g.prototype.hello = function () {
      return 'hi!';
    };
    
    let obj = g();
    
    obj instanceof g // true
    obj.hello() // 'hi!'
    ```

    上面代码表明，Generator 函数`g`返回的遍历器`obj`，是`g`的实例，而且继承了`g.prototype`。但是，如果把`g`当作普通的构造函数，并不会生效，因为`g`返回的总是遍历器对象，而不是`this`对象。

    ```javascript
    function* g() {
      this.a = 11;
    }
    
    let obj = g();
    obj.next();
    obj.a // undefined
    ```

    上面代码中，Generator 函数`g`在`this`对象上面添加了一个属性`a`，但是`obj`对象拿不到这个属性。

    Generator 函数也不能跟`new`命令一起用，会报错。

    ```javascript
    function* F() {
      yield this.x = 2;
      yield this.y = 3;
    }
    
    new F()
    // TypeError: F is not a constructor
    ```

    上面代码中，`new`命令跟构造函数`F`一起使用，结果报错，因为`F`不是构造函数。

    下面是一个变通方法。首先，生成一个空对象，使用`call`方法绑定 Generator 函数内部的`this`。这样，构造函数调用以后，这个空对象就是 Generator 函数的实例对象了。

    ```javascript
    function* F() {
      this.a = 1;
      yield this.b = 2;
      yield this.c = 3;
    }
    var obj = {};
    var f = F.call(obj);
    
    f.next();  // Object {value: 2, done: false}
    f.next();  // Object {value: 3, done: false}
    f.next();  // Object {value: undefined, done: true}
    
    obj.a // 1
    obj.b // 2
    obj.c // 3
    ```

    上面代码中，首先是`F`内部的`this`对象绑定`obj`对象，然后调用它，返回一个 Iterator 对象。这个对象执行三次`next`方法（因为`F`内部有两个`yield`表达式），完成 F 内部所有代码的运行。这时，所有内部属性都绑定在`obj`对象上了，因此`obj`对象也就成了`F`的实例。

- Generator 与状态机

  - Generator 是实现状态机的最佳结构。比如，下面的`clock`函数就是一个状态机。

    ```javascript
    var ticking = true;
    var clock = function() {
      if (ticking)
        console.log('Tick!');
      else
        console.log('Tock!');
      ticking = !ticking;
    }
    ```

    上面代码的`clock`函数一共有两种状态（`Tick`和`Tock`），每运行一次，就改变一次状态。这个函数如果用 Generator 实现，就是下面这样。

    ```javascript
    var clock = function* () {
      while (true) {
        console.log('Tick!');
        yield;
        console.log('Tock!');
        yield;
      }
    };
    ```

    上面的 Generator 实现与 ES5 实现对比，可以看到少了用来保存状态的外部变量`ticking`，这样就更简洁，更安全（状态不会被非法篡改）、更符合函数式编程的思想，在写法上也更优雅。Generator 之所以可以不用外部变量保存状态，是因为它本身就包含了一个状态信息，即目前是否处于暂停态。

### 通过 Generator 函数的异步应用

在 Generator 函数出现前，我们通常用的是回调函数来处理异步事件，但是这样如果出现多重嵌套，就会出现回调地狱（可以参见 Nodejs 的文档了解回调地狱）。Promise 就是为了解决回调地狱而出现的，但是Promise 的写法只是回调函数的改进，使用`then`方法以后，异步任务的两段执行看得更清楚了，除此以外，并无新意。

Promise 的最大问题是代码冗余，原来的任务被 Promise 包装了一下，不管什么操作，一眼看去都是一堆`then`，原来的语义变得很不清楚。

- 协程

  - 传统的编程语言，早有异步编程的解决方案（其实是多任务的解决方案）。其中有一种叫做"协程"（coroutine），意思是多个线程互相协作，完成异步任务。

    协程有点像函数，又有点像线程。它的运行流程大致如下。

    - 第一步，协程`A`开始执行。
    - 第二步，协程`A`执行到一半，进入暂停，执行权转移到协程`B`。
    - 第三步，（一段时间后）协程`B`交还执行权。
    - 第四步，协程`A`恢复执行。

    上面流程的协程`A`，就是异步任务，因为它分成两段（或多段）执行。

    举例来说，读取文件的协程写法如下。

    ```javascript
    function* asyncJob() {
      // ...其他代码
      var f = yield readFile(fileA);
      // ...其他代码
    }
    ```

    上面代码的函数`asyncJob`是一个协程，它的奥妙就在其中的`yield`命令。它表示执行到此处，执行权将交给其他协程。也就是说，`yield`命令是异步两个阶段的分界线。

    协程遇到`yield`命令就暂停，等到执行权返回，再从暂停的地方继续往后执行。它的最大优点，就是代码的写法非常像同步操作，如果去除`yield`命令，简直一模一样。

- 协程的 Generator 函数实现

  - Generator 函数是协程在 ES6 的实现，最大特点就是可以交出函数的执行权（即暂停执行）。

    整个 Generator 函数就是一个封装的异步任务，或者说是异步任务的容器。异步操作需要暂停的地方，都用`yield`语句注明。Generator 函数的执行方法如下。

    ```javascript
    function* gen(x) {
      var y = yield x + 2;
      return y;
    }
    
    var g = gen(1);
    g.next() // { value: 3, done: false }
    g.next() // { value: undefined, done: true }
    ```

    上面代码中，调用 Generator 函数，会返回一个内部指针（即遍历器）`g`。这是 Generator 函数不同于普通函数的另一个地方，即执行它不会返回结果，返回的是指针对象。调用指针`g`的`next`方法，会移动内部指针（即执行异步任务的第一段），指向第一个遇到的`yield`语句，上例是执行到`x + 2`为止。

    换言之，`next`方法的作用是分阶段执行`Generator`函数。每次调用`next`方法，会返回一个对象，表示当前阶段的信息（`value`属性和`done`属性）。`value`属性是`yield`语句后面表达式的值，表示当前阶段的值；`done`属性是一个布尔值，表示 Generator 函数是否执行完毕，即是否还有下一个阶段。

### async

ES2017 标准引入了 async 函数，使得异步操作变得更加方便。async 函数是什么？一句话，它就是 Generator 函数的语法糖。只有一部分浏览器支持 ES7 语法

```js
// async 提出以前
function timeout(ms) {
    return new Promise((reslove, reject) => {
        //setTimeout(reslove, ms)
        if (ms % 2 == 0) {
            setTimeout(reslove, ms)
        } else {
            // 必须用 reject 抛出异常，如果直接抛出，那么 async 和 promise 的 catch 都不会捕获异常
            reject(new Error('延时时间必须为偶数'))
        }
    })
}
timeout(2000).then(() => {
    console.log('111')
}).catch((err) => {
    console.log(err)
})
```

- async 方法执行上面方法

  ```js
  async function asyncPrint(value, ms) {
      // 当 promise 状态一转换为 reslove ，即reslove方法一被调用就继续执行
      try{
      	await timeout(ms).then(()=>{console.log('111')})
      	console.log(value)
      } catch(err) {
          console.log(err)
      }
  }
  asyncPrint('hello world', 3000)
  ```

  









