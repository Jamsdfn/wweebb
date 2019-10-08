# ES6

## ECMAScript 简介

- ECMAScript 是 JavaScript 语言的标准
- ECMA: European Computer Manufacturers Association（欧洲计算机制造商协会）
- ECMAScript6：简称 ES6，是 JavaScript 语言的下一代标准，也是目前正式发布的最新的 JavaScript 标准。由于 ES6 是在 2015 年发布的，所以 ES6 也称为 ECMAScript2015。
- ECMAScript 是 JavaScript 的标准。JavaScript 是 EcmaScript 的实现，就好像。当然，除了 JavaScript，EcmaScript 还有其他的实现，比如 JScript、ActionScript。
- 学习推荐 书籍 http://es6.ruanyifeng.com/

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
    - 可遍历的对象

  ```js
  let obj1 = {
      0: 'hello',
      1: 'world',
      length: 2
  }
  Array.from(obj1) // ["hello", "world"]
  ```

  



