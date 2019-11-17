# TypeScript

TypeScript 是 JavaScript 的一个超集，支持 ECMAScript 6 标准。

TypeScript 由微软开发的自由和开源的编程语言。

TypeScript 设计目标是开发大型应用，它可以编译成纯 JavaScript，编译出来的 JavaScript 可以运行在任何浏览器上。

- 语言特性

  TypeScript 是一种给 JavaScript 添加特性的语言扩展。增加的功能包括：

  - 类型批注和编译时类型检查
  - 类型推断
  - 类型擦除
  - 接口
  - 枚举
  - Mixin
  - 泛型编程
  - 名字空间
  - 元组
  - Await

  以下功能是从 ECMA 2015 反向移植而来：

  - 类
  - 模块
  - lambda 函数的箭头语法
  - 可选参数以及默认参数

- JavaScript 与 TypeScript 的区别

  TypeScript 是 JavaScript 的超集，扩展了 JavaScript 的语法，因此现有的 JavaScript 代码可与 TypeScript 一起工作无需任何修改，TypeScript 通过类型注解提供编译时的静态类型检查。

  TypeScript 可处理已有的 JavaScript 代码，并只对其中的 TypeScript 代码进行编译。

## 安装

首先用 npm 工具安装 TypeScript

```shell
$ npm install -g typescript
```

 安装完成后我们可以使用 **tsc** 命令来执行 TypeScript 的相关代码，以下是查看版本号 

```shell
$ tsc -v
Version 3.6.4
```

新建一个 test.ts 的文件

```typescript
var message:string = "Hello World!"
console.log(message)
```

通常我们使用 **.ts** 作为 TypeScript 代码文件的扩展名。

然后执行以下命令将 TypeScript 转换为 JavaScript 代码

```shell
$ tsc test.ts
```

 这时候再当前目录下（与 test.ts 同一目录）就会生成一个 test.js 文件，代码如下 

```js
var message = "Hello World!";
console.log(message);
```

使用 node 命令执行 test.js文件

```shell
$ node test.js
Hello World!
```

## TypeScript 基础语法

TypeScript 程序由以下几个部分组成：

- 模块
- 函数
- 变量
- 语句和表达式
- 注释

### TypeScript 保留关键字

TypeScript 保留关键字如下表所示：

| break    | as         | catch      | switch   |
| :------- | ---------- | ---------- | :------- |
| case     | if         | throw      | else     |
| var      | number     | string     | get      |
| module   | type       | instanceof | typeof   |
| public   | private    | enum       | export   |
| finally  | for        | while      | void     |
| null     | super      | this       | new      |
| in       | return     | true       | false    |
| any      | extends    | static     | let      |
| package  | implements | interface  | function |
| new      | try        | yield      | const    |
| continue | do         |            |          |

### 空白和换行

TypeScript 会忽略程序中出现的空格、制表符和换行符。

空格、制表符通常用来缩进代码，使代码易于阅读和理解。

### TypeScript 区分大小写

TypeScript 区分大写和小写字符。

### 分号是可选的

每行指令都是一段语句，你可以使用分号或不使用， 分号在 TypeScript 中是可选的，建议使用。

以下代码都是合法的：

```ts
console.log("Runoob")
console.log("Google");
```

如果语句写在同一行则一定需要使用分号来分隔，否则会报错，如：

```ts
console.log("Runoob");console.log("Google");
```

### TypeScript 注释

注释是一个良好的习惯，虽然很多程序员讨厌注释，但还是建议你在每段代码写上文字说明。

注释可以提高程序的可读性。

注释可以包含有关程序一些信息，如代码的作者，有关函数的说明等。

编译器会忽略注释。

### TypeScript 支持两种类型的注释

- **单行注释 ( // )** − 在 // 后面的文字都是注释内容。
- **多行注释 (/\* \*/)** − 这种注释可以跨越多行。

注释实例：

```ts
//	单行注释
/*
	多行注释
	多行注释
*/
```

### TypeScript 与面向对象

面向对象是一种对现实世界理解和抽象的方法。

TypeScript 是一种面向对象的编程语言。

面向对象主要有两个概念：对象和类。

- 对象：对象是类的一个实例（**对象不是找个女朋友**），有状态和行为。例如，一条狗是一个对象，它的状态有：颜色、名字、品种；行为有：摇尾巴、叫、吃等。
- 类：类是一个模板，它描述一类对象的行为和状态。
- 方法：方法是类的操作的实现步骤。

下图中 **girl、boy** 为类，而具体的每个人为该类的对象：

![img](https://www.runoob.com/wp-content/uploads/2013/12/object-class.jpg)

TypeScript 面向对象编程实例：

```ts
class Site { 
   name():void { 
      console.log("Runoob") 
   } 
} 
var obj = new Site(); 
obj.name();
```

以上实例定义了一个类 Site，该类有一个方法 name()，该方法在终端上输出字符串 Runoob。

new 关键字创建类的对象，该对象调用方法 name()。

编译后生成的 JavaScript 代码如下：

```ts
var Site = /** @class */ (function () {
    function Site() {
    }
    Site.prototype.name = function () {
        console.log("Runoob");
    };
    return Site;
}());
var obj = new Site();
obj.name();
```

执行以上 JavaScript 代码，输出结果如下:

```
Runoob
```

## TypeScript 基础类型

TypeScript 包含的数据类型如下表: sadf

| 数据类型   | 关键字    | 描述                                                         |
| :--------- | :-------- | :----------------------------------------------------------- |
| 任意类型   | any       | 声明为 any 的变量可以赋予任意类型的值。                      |
| 数字类型   | number    | 双精度 64 位浮点值。它可以用来表示整数和分数。`let binaryLiteral: number = 0b1010; // 二进制 let octalLiteral: number = 0o744;    // 八进制 let decLiteral: number = 6;    // 十进制 let hexLiteral: number = 0xf00d;    // 十六进制` |
| 字符串类型 | string    | 一个字符系列，使用单引号（**'**）或双引号（**"**）来表示字符串类型。反引号（**`**）来定义多行文本和内嵌表达式。`let name: string = "Runoob"; let years: number = 5; let words: string = `您好，今年是 ${ name } 发布 ${ years + 1} 周年`;` |
| 布尔类型   | boolean   | 表示逻辑值：true 和 false。`let flag: boolean = true;`       |
| 数组类型   | 无        | 声明变量为数组。`// 在元素类型后面加上[] let arr: number[] = [1, 2]; // 或者使用数组泛型 let arr: Array<number> = [1, 2];` |
| 元组       | 无        | 元组类型用来表示已知元素数量和类型的数组，各元素的类型不必相同，对应位置的类型需要相同。`let x: [string, number]; x = ['Runoob', 1];    // 运行正常 x = [1, 'Runoob'];    // 报错 console.log(x[0]);    // 输出 Runoob` |
| 枚举       | enum      | 枚举类型用于定义数值集合。`enum Color {Red, Green, Blue}; let c: Color = Color.Blue; console.log(c);    // 输出 2` |
| void       | void      | 用于标识方法返回值的类型，表示该方法没有返回值。`function hello(): void {    alert("Hello Runoob"); }` |
| null       | null      | 表示对象值缺失。                                             |
| undefined  | undefined | 用于初始化变量为一个未定义的值                               |
| never      | never     | never 是其它类型（包括 null 和 undefined）的子类型，代表从不会出现的值。 |

**注意：**TypeScript 和 JavaScript 没有整数类型。

------

## Any 类型

任意值是 TypeScript 针对编程时类型不明确的变量使用的一种数据类型，它常用于以下三种情况。

```tsx
<p>1、变量的值会动态改变时，比如来自用户的输入，任意值类型可以让这些变量跳过编译阶段的类型检查，示例代码如下：</p>

let x: any = 1;    // 数字类型
x = 'I am who I am';    // 字符串类型
x = false;    // 布尔类型
```

改写现有代码时，任意值允许在编译时可选择地包含或移除类型检查，示例代码如下：

```ts
let x: any = 4;
x.ifItExists();    // 正确，ifItExists方法在运行时可能存在，但这里并不会检查
x.toFixed();    // 正确
```

定义存储各种类型数据的数组时，示例代码如下：

```ts
let arrayList: any[] = [1, false, 'fine'];
arrayList[1] = 100;
```

## Null 和 Undefined

### null

在 JavaScript 中 null 表示 "什么都没有"。

null是一个只有一个值的特殊类型。表示一个空对象引用。

用 typeof 检测 null 返回是 object。

### undefined

在 JavaScript 中, undefined 是一个没有设置值的变量。

typeof 一个没有值的变量会返回 undefined。

Null 和 Undefined 是其他任何类型（包括 void）的子类型，可以赋值给其它类型，如数字类型，此时，赋值后的类型会变成 null 或 undefined。而在TypeScript中启用严格的空校验（--strictNullChecks）特性，就可以使得null 和 undefined 只能被赋值给 void 或本身对应的类型，示例代码如下：

```ts
// 启用 --strictNullChecks
let x: number;
x = 1; // 运行正确
x = undefined;    // 运行错误
x = null;    // 运行错误
```

上面的例子中变量 x 只能是数字类型。如果一个类型可能出行 null 或 undefined， 可以用 | 来支持多种类型，示例代码如下：

```ts
// 启用 --strictNullChecks
let x: number | null | undefined;
x = 1; // 运行正确
x = undefined;    // 运行正确
x = null;    // 运行正确
```

------

## never 类型

never 是其它类型（包括 null 和 undefined）的子类型，代表从不会出现的值。这意味着声明为 never 类型的变量只能被 never 类型所赋值，在函数中它通常表现为抛出异常或无法执行到终止点（例如无限循环），示例代码如下：

```ts
let x: never;
let y: number;

// 运行错误，数字类型不能转为 never 类型
x = 123;

// 运行正确，never 类型可以赋值给 never类型
x = (()=>{ throw new Error('exception')})();

// 运行正确，never 类型可以赋值给 数字类型
y = (()=>{ throw new Error('exception')})();

// 返回值为 never 的函数可以是抛出异常的情况
function error(message: string): never {
    throw new Error(message);
}

// 返回值为 never 的函数可以是无法被执行到的终止点的情况
function loop(): never {
    while (true) {}
}
```

## TypeScript 变量声明

变量是一种使用方便的占位符，用于引用计算机内存地址。

我们可以把变量看做存储数据的容器。

TypeScript 变量的命名规则：

- 变量名称可以包含数字和字母。
- 除了下划线 **_** 和美元 **$** 符号外，不能包含其他特殊字符，包括空格。
- 变量名不能以数字开头。

变量使用前必须先声明，我们可以使用 var 来声明变量。

我们可以使用以下四种方式来声明变量：

声明变量的类型及初始值：

```ts
var [变量名] : [类型] = 值;
```

例如：

```ts
var uname:string = "Runoob";
```

声明变量的类型及但没有初始值，变量值会设置为 undefined：

```ts
var [变量名] : [类型];
```

例如：

```ts
var uname:string;
```

声明变量并初始值，但不设置类型类型，该变量可以是任意类型：

```ts
var [变量名] = 值;
```

例如：

```ts
var uname = "Runoob";
```

声明变量没有设置类型和初始值，类型可以是任意类型，默认初始值为 undefined：

```ts
var [变量名];
```

例如：

```ts
var uname;
```

实例：

```ts
// ts
var uname:string = "Runoob";
var score1:number = 50;
var score2:number = 42.50
var sum = score1 + score2
console.log("名字: "+uname)
console.log("第一个科目成绩: "+score1)
console.log("第二个科目成绩: "+score2)
console.log("总成绩: "+sum)

// 编译后的js
var uname = "Runoob";
var score1 = 50;
var score2 = 42.50;
var sum = score1 + score2;
console.log("名字: " + uname);
console.log("第一个科目成绩: " + score1);
console.log("第二个科目成绩: " + score2);
console.log("总成绩: " + sum);
/* 结果
名字: Runoob
第一个科目成绩: 50
第二个科目成绩: 42.5
总成绩: 92.5
*/
```

**注意：**变量不要使用 name 否则会与 DOM 中的全局 window 对象下的 name 属性出现了重名。

### 类型断言（Type Assertion）

- 类型断言可以用来手动指定一个值的类型，即允许变量从一种类型更改为另一种类型。

语法格式：

```ts
<类型>值
```

或:

```ts
值 as 类型
```

实例：

```ts
var str: string = '1'
// 编译前 str 因为声明时为 string 型，而 string 和 number 类型没有子集关系
// 所以要先把 str 转为 any 类型，再转为 number 类型，才能赋值给 str2
var str2: number = <number> <any> str
// 编译后 str、str2 是 string 类型
console.log(str2)
console.log(typeof str2)
```

- TypeScript 是怎么确定单个断言是否足够

当 S 类型是 T 类型的子集，或者 T 类型是 S 类型的子集时，S 能被成功断言成 S。这是为了在进行类型断言时提供额外的安全性，完全毫无根据的断言是危险的，如果你想这么做，你可以使用 any。

它之所以不被称为**类型转换**，是因为转换通常意味着某种运行时的支持。但是，类型断言纯粹是一个编译时语法，同时，它也是一种为编译器提供关于如何分析代码的方法。

编译后，以上代码会生成如下 JavaScript 代码：

```ts
var str = '1';
var str2 = str;
console.log(str2);
```

执行输出结果为：

```
1
```

### 类型推断

当类型没有给出时，TypeScript 编译器利用类型推断来推断类型。

如果由于缺乏声明而不能推断出类型，那么它的类型被视作默认的动态 any 类型。

```ts
var num = 2;    // 类型推断为 number*
console.log("num 变量的值为 "+num);
num = "12";    // 编译错误*
console.log(num);
```

- 第一行代码声明了变量 num 并=设置初始值为 2。 注意变量声明没有指定类型。因此，程序使用类型推断来确定变量的数据类型，第一次赋值为 2，**num** 设置为 number 类型。

- 第三行代码，当我们再次为变量设置字符串类型的值时，这时编译会错误。因为变量已经设置为了 number 类型。

  ```
  error TS2322: Type '"12"' is not assignable to type 'number'.
  ```

### 变量作用域

变量作用域指定了变量定义的位置。

程序中变量的可用性由变量作用域决定。

TypeScript 有以下几种作用域：

- **全局作用域** − 全局变量定义在程序结构的外部，它可以在你代码的任何位置使用。
- **类作用域** − 这个变量也可以称为 **字段**。类变量声明在一个类里头，但在类的方法外面。 该变量可以通过类的对象来访问。类变量也可以是静态的，静态的变量可以通过类名直接访问。
- **局部作用域** − 局部变量，局部变量只能在声明它的一个代码块（如：方法）中使用。

以下实例说明了三种作用域的使用：

```ts
var global_num = 12          // 全局变量
class Numbers {
   num_val = 13;             // 实例变量
   static sval = 10;         // 静态变量

   storeNum():void {
      var local_num = 14;    // 局部变量
   }
}
console.log("全局变量为: "+global_num)  
console.log(Numbers.sval)   // 静态变量
var obj = new Numbers();
console.log("实例变量: "+obj.num_val)
```

以上代码使用 tsc 命令编译为 JavaScript 代码为：

```js
var global_num = 12; // 全局变量
var Numbers = /** @class */ (function () {
    function Numbers() {
        this.num_val = 13; // 类变量
    }
    Numbers.prototype.storeNum = function () {
        var local_num = 14; // 局部变量
    };
    Numbers.sval = 10; // 静态变量
    return Numbers;
}());
console.log("全局变量为: " + global_num);
console.log(Numbers.sval); // 静态变量
var obj = new Numbers();
console.log("类变量: " + obj.num_val);
```

执行以上 JavaScript 代码，输出结果为：

```
全局变量为: 12
10
类变量: 13
```

如果我们在方法外部调用局部变量 local_num，会报错：

```
error TS2322: Could not find symbol 'local_num'.
```

## 函数的声明

```ts
function function_name():return_type { 
    // 语句
    return value; 
}
```

- return_type 是返回值的类型。
- return 关键词后跟着要返回的结果。
- 一个函数只能有一个 return 语句。
- 返回值的类型需要与函数定义的返回类型(return_type)一致。

### 带参数函数

在调用函数时，您可以向其传递值，这些值被称为参数。

这些参数可以在函数中使用。

您可以向函数发送多个参数，每个参数使用逗号 **,** 分隔：

语法格式如下所示：

```ts
function func_name( param1 [:datatype], param2 [:datatype]) {   
}
```

- param1、param2 为参数名。
- datatype 为参数类型。

**实例**

```ts
function add(x: number, y: number): number {
    return x + y;
}
console.log(add(1,2))
```

- 实例中定义了函数 *add()*，返回值的类型为 number。
- *add()* 函数中定义了两个 number 类型的参数，函数内将两个参数相加并返回。

编译以上代码，得到以下 JavaScript 代码：

```js
function add(x, y) {
    return x + y;
}
console.log(add(1, 2));
/* 结果
3
*/
```

### 可选参数和默认参数

- 可选参数

在 TypeScript 函数里，如果我们定义了参数，则我们必须传入这些参数，除非将这些参数设置为可选，可选参数使用问号标识 ？。

**实例**

```ts
function buildName(firstName: string, lastName: string) {
    return firstName + " " + lastName;
}
 
let result1 = buildName("Bob");                  // 错误，缺少参数
let result2 = buildName("Bob", "Adams", "Sr.");  // 错误，参数太多了
let result3 = buildName("Bob", "Adams");         // 正确
```

以下实例，我么将 lastName 设置为可选参数：

```ts
function buildName(firstName: string, lastName?: string) {
    if (lastName)
        return firstName + " " + lastName;
    else
        return firstName;
}
 
let result1 = buildName("Bob");  // 正确
let result2 = buildName("Bob", "Adams", "Sr.");  // 错误，参数太多了
let result3 = buildName("Bob", "Adams");  // 正确
```

**注意**：可选参数必须跟在必需参数后面。 如果上例我们想让 firstName 是可选的，lastName 必选，那么就要调整它们的位置，把 firstName 放在后面。

如果都是可选参数就没关系。

- 默认参数

我们也可以设置参数的默认值，这样在调用函数的时候，如果不传入该参数的值，则使用默认参数，语法格式为：

```ts
function function_name(param1[:type],param2[:type] = default_value) { 
}
```

​	**注意**：参数不能同时设置为可选和默认。

**实例**

以下实例函数的参数 rate 设置了默认值为 0.50，调用该函数时如果未传入参数则使用该默认值：

```ts
function calculate_discount(price:number,rate:number = 0.50) { 
    var discount = price * rate; 
    console.log("计算结果: ",discount); 
} 
calculate_discount(1000) 
calculate_discount(1000,0.30)
```

编译以上代码，得到以下 JavaScript 代码：

```js
function calculate_discount(price, rate) {
    if (rate === void 0) { rate = 0.50; }
    var discount = price * rate;
    console.log("计算结果: ", discount);
}
calculate_discount(1000);
calculate_discount(1000, 0.30);
```

输出结果为：

```
计算结果:  500
计算结果:  300
```

### 剩余参数

有一种情况，我们不知道要向函数传入多少个参数，这时候我们就可以使用剩余参数来定义。

剩余参数语法允许我们将一个不确定数量的参数作为一个数组传入。

```tsx
function buildName(firstName: string, ...restOfName: string[]) {
    return firstName + " " + restOfName.join(" ");
}
  
let employeeName = buildName("Joseph", "Samuel", "Lucas", "MacKinzie");
```

函数的最后一个命名参数 restOfName 以 ... 为前缀，它将成为一个由剩余参数组成的数组，索引值从0（包括）到 restOfName.length（不包括）。类似于 ES6 的 rest参数。

```ts
function addNumbers(...nums:number[]) {  
    var i;   
    var sum:number = 0; 
    
    for(i = 0;i<nums.length;i++) { 
       sum = sum + nums[i]; 
    } 
    console.log("和为：",sum) 
 } 
 addNumbers(1,2,3) 
 addNumbers(10,10,10,10,10)
```

编译以上代码，得到以下 JavaScript 代码：

```js
function addNumbers() {
    var nums = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        nums[_i] = arguments[_i];
    }
    var i;
    var sum = 0;
    for (i = 0; i < nums.length; i++) {
        sum = sum + nums[i];
    }
    console.log("和为：", sum);
}
addNumbers(1, 2, 3);
addNumbers(10, 10, 10, 10, 10);
/* 结果
和为： 6
和为： 50
*/
```

### Lambda 函数

和 ES6 的箭头函数的基本用法差不多，但是可以在参数上定义类型`var foo = (x:number) => x + 10`

### 函数重置

- 重载是指不同的函数使用相同的函数名，但是函数的参数个数或类型不同。调用的时候根据函数的参数来区别不同的函数。

- 重载是方法名字相同，而参数不同，返回类型可以相同也可以不同。

- 每个重载的方法（或者构造函数）都必须有一个独一无二的参数类型列表。

参数类型不同：

```ts
function disp(string):void; 
function disp(number):void;
```

参数数量不同：

```ts
function disp(n1:number):void; 
function disp(x:number,y:number):void;
```

参数类型顺序不同：

```ts
function disp(n1:number,s1:string):void; 
function disp(s:string,n:number):void;
```

如果参数类型不同，则参数类型应设置为 **any**。

参数数量不同你可以将不同的参数设置为可选。

**实例**

以下实例定义了参数类型与参数数量不同：

```ts
function disp(s1:string):void; 
function disp(n1:number,s1:string):void; 
 
function disp(x:any,y?:any):void { 
    console.log(x); 
    console.log(y); 
} 
disp("abc") 
disp(1,"xyz");
```

编译以上代码，得到以下 JavaScript 代码：

```js
function disp(x, y) {
    console.log(x);
    console.log(y);
}
disp("abc");
disp(1, "xyz");
```

输出结果为：

```
abc
undefined
1
xyz
```

### 注

未提及的部分基本和 js 一致

## TypeScript接口

接口是一系列抽象方法的声明，是一些方法特征的集合，这些方法都应该是抽象的，需要由具体的类去实现，然后第三方就可以通过这组抽象方法调用，让具体的类执行具体的方法。

接口（英文：Interface），在JAVA编程语言中是一个抽象类型，是抽象方法的集合，接口通常以interface来声明。一个类通过继承接口的方式，从而来继承接口的抽象方法。(在TypeScript中也类似)

接口并不是类，编写接口的方式和类很相似，但是它们属于不同的概念。类描述对象的属性和方法。接口则包含类要实现的方法。

除非实现接口的类是抽象类，否则该类要**定义接口中的所有方法**。

- TypeScript 接口定义如下

  ```ts
  interface interface_name {
  }
  ```

- 实例

  以下实例中，我们定义了一个接口 IPerson，接着定义了一个变量 customer，它的类型是 IPerson。

  customer 实现了接口 IPerson 的属性和方法。

  ```ts
  interface IPerson {
      firstName:string,
      lastName:string,
      sayHi: ()=>string
  }
  
  var customer:IPerson = {
      firstName:"Tom",
      lastName:"Hanks",
      sayHi: ():string =>{return "Hi there"}
  }
  
  console.log("Customer 对象 ")
  console.log(customer.firstName)
  console.log(customer.lastName)
  console.log(customer.sayHi())  
  
  var employee:IPerson = {
      firstName:"Jim",
      lastName:"Blakes",
      sayHi: ():string =>{return "Hello!!!"}
  }
  
  console.log("Employee  对象 ")
  console.log(employee.firstName)
  console.log(employee.lastName)
  ```

  **需要注意接口不能转换为 JavaScript。 它只是 TypeScript 的一部分。**

  编译以上代码，得到以下 JavaScript 代码：

  ```js
  var customer = {
      firstName: "Tom",
      lastName: "Hanks",
      sayHi: function () { return "Hi there"; }
  };
  console.log("Customer 对象 ");
  console.log(customer.firstName);
  console.log(customer.lastName);
  console.log(customer.sayHi());
  var employee = {
      firstName: "Jim",
      lastName: "Blakes",
      sayHi: function () { return "Hello!!!"; }
  };
  console.log("Employee  对象 ");
  console.log(employee.firstName);
  console.log(employee.lastName);
  /* 结果
  Customer 对象
  Tom
  Hanks
  Hi there
  Employee  对象
  Jim
  Blakes
  */
  ```

### 联合类型和接口

  以下实例演示了如何在接口中使用联合类型

  ```ts
  interface RunOptions {
      program:string;
      commandline:string[]|string|(()=>string);
  }
  
  // commandline 是字符串
  var options:RunOptions = {program:"test1",commandline:"Hello"};
  console.log(options.commandline)  
  
  // commandline 是字符串数组
  options = {program:"test1",commandline:["Hello","World"]};
  console.log(options.commandline[0]);
  console.log(options.commandline[1]);  
  
  // commandline 是一个函数表达式
  options = {program:"test1",commandline:()=>{return "**Hello World**";}};
  
  var fn:any = options.commandline;
  console.log(fn());
  ```

  编译以上代码，得到以下 JavaScript 代码：

  ```js
  // commandline 是字符串
  var options = { program: "test1", commandline: "Hello" };
  console.log(options.commandline);
  // commandline 是字符串数组
  options = { program: "test1", commandline: ["Hello", "World"] };
  console.log(options.commandline[0]);
  console.log(options.commandline[1]);
  // commandline 是一个函数表达式
  options = { program: "test1", commandline: function () { return "**Hello World**"; } };
  var fn = options.commandline;
  console.log(fn());
  
  /* 输出结果
  Hello
  Hello
  World
  **Hello World**
  */
  ```

### 接口和数组

接口中我们可以将数组的索引值和元素设置为不同类型，索引值可以是数字或字符串。

```ts
interface namelist {
   [index:number]:string
}

var list2:namelist = ["John",1,"Bran"] // 错误元素 1 不是 string 类型
interface ages {
   [index:string]:number
}

var agelist:ages;
agelist["John"] = 15   // 正确
agelist[2] = "nine"   // 错误，因为 agelist 是 ages 接口的实现，此接口数组的索引必须为字符串，值必须为数字 
```

### 接口继承

接口继承就是说接口可以通过其他接口来扩展自己。

Typescript 允许接口继承多个接口。

继承使用关键字 **extends**。

- 单接口继承语法格式：`Child_interface_name extends super_interface_name`
- 多接口继承语法格式：`Child_interface_name extends super_interface1_name, super_interface2_name,…,super_interfaceN_name`
- 继承的各个接口使用逗号 **,** 分隔。

- 单继承实例

  ```ts
  interface Person {
     age:number
  }
  
  interface Musician extends Person {
     instrument:string
  }
  
  var drummer = <Musician>{};
  drummer.age = 27
  drummer.instrument = "Drums"
  console.log("年龄:  "+drummer.age)
  console.log("喜欢的乐器:  "+drummer.instrument)
  ```

  编译以上代码，得到以下 JavaScript 代码

  ```js
  var drummer = {};
  drummer.age = 27;
  drummer.instrument = "Drums";
  console.log("年龄:  " + drummer.age);
  console.log("喜欢的乐器:  " + drummer.instrument);
  
  /* 结果
  年龄:  27
  喜欢的乐器:  Drums
  */
  ```

- 多继承实例

  ```ts
  interface IParent1 {
      v1:number
  }
  
  interface IParent2 {
      v2:number
  }
  
  interface Child extends IParent1, IParent2 { }
  var Iobj:Child = { v1:12, v2:23}
  console.log("value 1: "+Iobj.v1+" value 2: "+Iobj.v2)
  ```

  编译以上代码，得到以下 JavaScript 代码：

  ```js
  var Iobj = { v1: 12, v2: 23 };
  console.log("value 1: " + Iobj.v1 + " value 2: " + Iobj.v2);
  /* 结果
  value 1: 12 value 2: 23
  */
  ```

## TypeScript的类

TypeScript 是面向对象的 JavaScript。

类描述了所创建的对象共同的属性和方法。

TypeScript 支持面向对象的所有特性，比如 类、接口等。

TypeScript 类定义方式如下：

```ts
class class_name { 
    // 类作用域
}
```

定义类的关键字为 class，后面紧跟类名，类可以包含以下几个模块（类的数据成员）：

- **字段** − 字段是类里面声明的变量。字段表示对象的有关数据。
- **构造函数** − 类实例化时调用，可以为类的对象分配内存。
- **方法** − 方法为对象要执行的操作。

**实例**

创建一个 Person 类：

```ts
class Person {
}
```

编译以上代码，得到以下 JavaScript 代码

```js
var Person = /** @class */ (function () {
    function Person() {
    }
    return Person;
}());
```

### 创建类成员

以下实例我们声明了类 Car，包含字段为 engine，构造函数在类实例化后初始化字段 engine。

this 关键字表示当前类实例化的对象。注意构造函数的参数名与字段名相同，this.engine 表示类的字段。

此外我们也在类中定义了一个方法 disp()。

```ts
class Car {
    // 字段
    engine:string;

    // 构造函数
    constructor(engine:string) {
        this.engine = engine
    }  

    // 方法
    disp():void {
        console.log("发动机为 :   "+this.engine)
    }
}
```

编译以上代码，得到以下 JavaScript 代码

```js
var Car = /** @class */ (function () {
    // 构造函数
    function Car(engine) {
        this.engine = engine;
    }
    // 方法
    Car.prototype.disp = function () {
        console.log("发动机为 :   " + this.engine);
    };
    return Car;
}());
```

### 创建实例化对象

我们使用 new 关键字来实例化类的对象，语法格式如下：

```ts
var object_name = new class_name([ arguments ])
```

类实例化时会调用构造函数，例如：

```ts
var obj = new Car("Engine 1")
```

类中的字段属性和方法可以使用 **.** 号来访问：

```ts
// 访问属性
obj.field_name 

// 访问方法
obj.function_name()
```

**完整实例**

以下实例创建来一个 Car 类，然后通过关键字 new 来创建一个对象并访问属性和方法：

```ts
class Car {
   // 字段
   engine:string;
   
   // 构造函数
   constructor(engine:string) {
      this.engine = engine
   }  
   
   // 方法
   disp():void {
      console.log("函数中显示发动机型号  :   "+this.engine)
   }
}

// 创建一个对象
var obj = new Car("XXSY1")

// 访问字段
console.log("读取发动机型号 :  "+obj.engine)  

// 访问方法
obj.disp()
```

编译以上代码，得到以下 JavaScript 代码：

```js
var Car = /** @class */ (function () {
    // 构造函数
    function Car(engine) {
        this.engine = engine;
    }
    // 方法
    Car.prototype.disp = function () {
        console.log("函数中显示发动机型号  :   " + this.engine);
    };
    return Car;
}());
// 创建一个对象
var obj = new Car("XXSY1");
// 访问字段
console.log("读取发动机型号 :  " + obj.engine);
// 访问方法
obj.disp();
/* 输出结果
读取发动机型号 :  XXSY1
函数中显示发动机型号  :   XXSY1
*/
```

### 类的继承

TypeScript 支持继承类，即我们可以在创建类的时候继承一个已存在的类，这个已存在的类称为父类，继承它的类称为子类。

类继承使用关键字 **extends**，子类除了不能继承父类的私有成员(方法和属性)和构造函数，其他的都可以继承。

TypeScript 一次只能继承一个类，不支持继承多个类，但 TypeScript 支持多重继承（A 继承 B，B 继承 C）。

语法格式如下：

```ts
class child_class_name extends parent_class_name
```

**实例**

类的继承：实例中创建了 Shape 类，Circle 类继承了 Shape 类，Circle 类可以直接使用 Area 属性：

```ts
class Shape {
   Area:number
   
   constructor(a:number) {
      this.Area = a
   }
}

class Circle extends Shape {
   disp():void {
      console.log("圆的面积:  "+this.Area)
   }
}
 
var obj = new Circle(223);
obj.disp()
```

编译以上代码，得到以下 JavaScript 代码

```js
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Shape = /** @class */ (function () {
    function Shape(a) {
        this.Area = a;
    }
    return Shape;
}());
var Circle = /** @class */ (function (_super) {
    __extends(Circle, _super);
    function Circle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Circle.prototype.disp = function () {
        console.log("圆的面积:  " + this.Area);
    };
    return Circle;
}(Shape));
var obj = new Circle(223);
obj.disp();
/* 输出结果
圆的面积:  223
*/
```

需要注意的是子类只能继承一个父类，**TypeScript 不支持继承多个类，但支持多重继承**，如下实例：

```ts
class Root {
   str:string;
}

class Child extends Root {}
class Leaf extends Child {} // 多重继承，继承了 Child 和 Root 类

var obj = new Leaf();
obj.str ="hello"
console.log(obj.str)
// 编译后输出结果 hello
```

### 继承类的方法重写

类继承后，子类可以对父类的方法重新定义，这个过程称之为方法的重写。

其中 super 关键字是对父类的直接引用，该关键字可以引用父类的属性和方法。

```ts
class PrinterClass {
   doPrint():void {
      console.log("父类的 doPrint() 方法。")
   }
}

class StringPrinter extends PrinterClass {
   doPrint():void {
      super.doPrint() // 调用父类的函数
      console.log("子类的 doPrint()方法。")
   }
}
var obj = new StringPrinter();
obj.doPrint();
/* 编译后输出的结果
父类的 doPrint() 方法。
子类的 doPrint()方法。
*/
```

### static 关键字

static 关键字用于定义类的数据成员（属性和方法）为静态的，静态成员可以直接通过类名调用，即不用new就可以调用。

```ts
class StaticMem {  
   static num:number;
   
   static disp():void {
      console.log("num 值为 "+ StaticMem.num)
   }
}

StaticMem.num = 12     // 初始化静态变量
StaticMem.disp()       // 调用静态方法
/* 编译后输出结果
num 值为 12
*/
```

### instanceof 运算符

instanceof 运算符用于判断对象是否是指定的类型，如果是返回 true，否则返回 false。

```ts
class Person{ }
var obj = new Person()
var isPerson = obj instanceof Person;
console.log("obj 对象是 Person 类实例化来的吗？ " + isPerson);
/* 编译后输出结果
obj 对象是 Person 类实例化来的吗？ true
*/
```

### 访问控制修饰符

TypeScript 中，可以使用访问控制符来保护对类、变量、方法和构造方法的访问。TypeScript 支持 3 种不同的访问权限。

- **public（默认）** : 公有，可以在任何地方被访问。
- **protected** : 受保护，可以被其自身以及其子类和父类访问。
- **private** : 私有，只能被其定义所在的类访问。

以下实例定义了两个变量 str1 和 str2，str1 为 public，str2 为 private，实例化后可以访问 str1，如果要访问 str2 则会编译错误。

```ts
class Encapsulate {
   str1:string = "hello"
   private str2:string = "world"
}
 
var obj = new Encapsulate()
console.log(obj.str1)     // 可访问
console.log(obj.str2)   // 编译错误， str2 是私有的
```

### 类和接口

类可以实现接口，使用关键字 implements。同样此类必须实现接口的所有成员。也可以把类当成接口实现混合（有点一次性继承多个类的感觉）。

以下实例红 AgriLoan 类实现了 ILoan 接口，并将 interest 字段作为类的属性使用：

```ts
interface ILoan {
   interest:number
}

class AgriLoan implements ILoan {
   interest:number
   rebate:number
   
   constructor(interest:number,rebate:number) {
      this.interest = interest
      this.rebate = rebate
   }
}

var obj = new AgriLoan(10,1)
console.log("利润为 : "+obj.interest+"，抽成为 : "+obj.rebate )
/* 编译后输出结果
利润为 : 10，抽成为 : 1
*/
```

## TypeScript 模块

TypeScript 模块的设计理念是可以更换的组织代码。

模块是在其自身的作用域里执行，并不是在全局作用域，这意味着定义在模块里面的变量、函数和类等在模块外部是不可见的，除非明确地使用 export 导出它们。类似地，我们必须通过 import 导入其他模块导出的变量、函数、类等。

两个模块之间的关系是通过在文件级别上使用 import 和 export 建立的。

模块使用模块加载器去导入其它的模块。 在运行时，模块加载器的作用是在执行此模块代码前去查找并执行这个模块的所有依赖。 大家最熟知的JavaScript模块加载器是服务于 Node.js 的 CommonJS 和服务于 Web 应用的 Require.js。

此外还有有 SystemJs 和 Webpack。

模块导出使用关键字 **export** 关键字，语法格式如下：

```ts
// 文件名 : SomeInterface.ts
export interface SomeInterface {
   // 代码部分
}
```

要在另外一个文件使用该模块就需要使用 **import** 关键字来导入:

```ts
import someInterfaceRef = require("./SomeInterface");
```

**实例**

```ts
// 下面那段代码是命名空间的语法，详细解读在下一节
/// <reference path = "IShape.ts" />
export interface IShape {
   draw();
}
// Circle.ts 文件代码：
import shape = require("./IShape");
export class Circle implements shape.IShape {
   public draw() {
      console.log("Cirlce is drawn (external module)");
   }
}
// Triangle.ts 文件代码
import shape = require("./IShape");
export class Triangle implements shape.IShape {
   public draw() {
      console.log("Triangle is drawn (external module)");
   }
}
// TestShape.ts 文件代码：
import shape = require("./IShape");
import circle = require("./Circle");
import triangle = require("./Triangle");  

function drawAllShapes(shapeToDraw: shape.IShape) {
   shapeToDraw.draw();
}

drawAllShapes(new circle.Circle());
drawAllShapes(new triangle.Triangle());
```

使用 tsc 命令编译以上代码（Commonjs）：

```shell
# 用 commonjs 的规范来编译文件
$ tsc --module commonjs TestShape.ts 
# 因为 node 的模块化是遵循 CommonJS 规范的，所以可以直接用 node 查看结果
$ node TestShape.js
# 输出结果
# Cirlce is drawn (external module)
# Triangle is drawn (external module)
```

使用 tsc 命令编译以上代码（AMD）：

```shell
# 用 AMD 的规范编译文件
$ tsc --module amd TestShape.ts 
```

## TypeScript 命名空间

命名空间一个最明确的目的就是解决重名问题。

假设这样一种情况，当一个班上有两个名叫小明的学生时，为了明确区分它们，我们在使用名字之外，不得不使用一些额外的信息，比如他们的姓（王小明，李小明），或者他们父母的名字等等。

命名空间定义了标识符的可见范围，一个标识符可在多个名字空间中定义，它在不同名字空间中的含义是互不相干的。这样，在一个新的名字空间中可定义任何标识符，它们不会与任何已有的标识符发生冲突，因为已有的定义都处于其他名字空间中。

TypeScript 中命名空间使用 **namespace** 来定义，语法格式如下：

```ts
namespace SomeNameSpaceName {
   export interface ISomeInterfaceName {      }  
   export class SomeClassName {      }  
}
```

以上定义了一个命名空间 SomeNameSpaceName，如果我们需要在外部可以调用 SomeNameSpaceName 中的类和接口，则需要在类和接口添加 **export** 关键字。

要在另外一个命名空间调用语法格式为：

```ts
SomeNameSpaceName.SomeClassName;
```

如果一个命名空间在一个单独的 TypeScript 文件中，则应使用三斜杠 /// 引用它，语法格式如下：

```ts
/// <reference path = "SomeFileName.ts" />
```

以下实例演示了命名空间的使用，定义在不同文件中：

```ts
// IShape.ts 文件代码 
/// <reference path = "IShape.ts" />
namespace Drawing {
    export interface IShape {
        draw();
    }
}  
// Circle.ts 文件代码
/// <reference path = "IShape.ts" />
namespace Drawing {
    export class Circle implements IShape {
        public draw() {
            console.log("Circle is drawn");
        }  
    }
}
// Triangle.ts 文件代码
/// <reference path = "IShape.ts" />
namespace Drawing {
    export class Triangle implements IShape {
        public draw() {
            console.log("Triangle is drawn");
        }
    }
}
// TestShape.ts 文件代码
/// <reference path = "IShape.ts" />  
/// <reference path = "Circle.ts" />
/// <reference path = "Triangle.ts" />  
function drawAllShapes(shape:Drawing.IShape) {
    shape.draw();
}
drawAllShapes(new Drawing.Circle());
drawAllShapes(new Drawing.Triangle());
```

使用 tsc 命令编译以上代码：

```shell
tsc --out app.js TestShape.ts 
```

得到以下 JavaScript 代码

```js
/// <reference path = "IShape.ts" />
var Drawing;
(function (Drawing) {
    var Circle = /** @class */ (function () {
        function Circle() {
        }
        Circle.prototype.draw = function () {
            console.log("Circle is drawn");
        };
        return Circle;
    }());
    Drawing.Circle = Circle;
})(Drawing || (Drawing = {}));
/// <reference path = "IShape.ts" />
var Drawing;
(function (Drawing) {
    var Triangle = /** @class */ (function () {
        function Triangle() {
        }
        Triangle.prototype.draw = function () {
            console.log("Triangle is drawn");
        };
        return Triangle;
    }());
    Drawing.Triangle = Triangle;
})(Drawing || (Drawing = {}));
/// <reference path = "IShape.ts" />  
/// <reference path = "Circle.ts" />
/// <reference path = "Triangle.ts" />  
function drawAllShapes(shape) {
    shape.draw();
}
drawAllShapes(new Drawing.Circle());
drawAllShapes(new Drawing.Triangle());
```

使用 node 命令查看输出结果为：

```shell
$ node app.js
# 输出结果
# Circle is drawn
# Triangle is drawn
```

### 嵌套命名空间

命名空间支持嵌套，即你可以将命名空间定义在另外一个命名空间里头。

```ts
namespace namespace_name1 {
    export namespace namespace_name2 {
        export class class_name {    }
    }
}
```

成员的访问使用点号 **.** 来实现，如下实例：

```ts
// Invoice.ts 文件代码：
namespace Runoob {
   export namespace invoiceApp {
      export class Invoice {
         public calculateDiscount(price: number) {
            return price * .40;
         }
      }
   }
}
//InvoiceTest.ts 文件代码：
/// <reference path = "Invoice.ts" />
var invoice = new Runoob.invoiceApp.Invoice();
console.log(invoice.calculateDiscount(500));
```

使用 tsc 命令编译以上代码：

```shell
$ tsc --out app.js InvoiceTest.ts
```

得到以下 JavaScript 代码：

```js
var Runoob;
(function (Runoob) {
    var invoiceApp;
    (function (invoiceApp) {
        var Invoice = /** @class */ (function () {
            function Invoice() {
            }
            Invoice.prototype.calculateDiscount = function (price) {
                return price * .40;
            };
            return Invoice;
        }());
        invoiceApp.Invoice = Invoice;
    })(invoiceApp = Runoob.invoiceApp || (Runoob.invoiceApp = {}));
})(Runoob || (Runoob = {}));
/// <reference path = "Invoice.ts" />
var invoice = new Runoob.invoiceApp.Invoice();
console.log(invoice.calculateDiscount(500));
```

使用 node 命令查看输出结果为：

```shell
$ node app.js
# 输出结果
# 200
```

## TypeScript 声明文件

TypeScript 作为 JavaScript 的超集，在开发过程中不可避免要引用其他第三方的 JavaScript 的库。虽然通过直接引用可以调用库的类和方法，但是却无法使用TypeScript 诸如类型检查等特性功能。为了解决这个问题，需要将这些库里的函数和方法体去掉后只保留导出类型声明，而产生了一个描述 JavaScript 库和模块信息的声明文件。通过引用这个声明文件，就可以借用 TypeScript 的各种特性来使用库文件了。

假如我们想使用第三方库，比如 jQuery，我们通常这样获取一个 id 是 foo 的元素：

```ts
$('#foo');
// 或
jQuery('#foo');
```

但是在 TypeScript 中，我们并不知道 $ 或 jQuery 是什么东西：

```ts
jQuery('#foo');

// index.ts(1,1): error TS2304: Cannot find name 'jQuery'.
```

这时，我们需要使用 declare 关键字来定义它的类型，帮助 TypeScript 判断我们传入的参数类型对不对：

```ts
declare var jQuery: (selector: string) => any;

jQuery('#foo');
```

declare 定义的类型只会用于编译时的检查，编译结果中会被删除。

上例的编译结果是：

```js
jQuery('#foo');
```

**声明文件**

声明文件以 **.d.ts** 为后缀，例如：

```ts
runoob.d.ts
```

声明文件或模块的语法格式如下：

```ts
declare module Module_Name {
}
```

TypeScript 引入声明文件语法格式：

```ts
/// <reference path = " runoob.d.ts" />
```

当然，很多流行的第三方库的声明文件不需要我们定义了，比如 jQuery 已经有人帮我们定义好了：[jQuery in DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/jquery/index.d.ts)。

**实例**

以下定义一个第三方库来演示：

```js
//CalcThirdPartyJsLib.js 文件代码：
var Runoob;  
(function(Runoob) {
    var Calc = (function () {
        function Calc() {
        }
    })
    Calc.prototype.doSum = function (limit) {
        var sum = 0;

        for (var i = 0; i <= limit; i++) {
            sum = sum + i;
        }
        return sum;
    }
    Runoob.Calc = Calc;
    return Calc;
})(Runoob || (Runoob = {}));
var test = new Runoob.Calc();
```

如果我们想在 TypeScript 中引用上面的代码，则需要设置声明文件 Calc.d.ts，代码如下：

```ts
// Calc.d.ts 文件代码：
declare module Runoob {
   export class Calc {
      doSum(limit:number) : number;
   }
}
```

声明文件不包含实现，它只是类型声明，把声明文件加入到 TypeScript 中：

```ts
// CalcTest.ts 文件代码：
/// <reference path = "Calc.d.ts" />
var obj = new Runoob.Calc();
// obj.doSum("Hello"); // 编译错误
console.log(obj.doSum(10));
```

下面这行导致编译错误，因为我们需要传入数字参数：

```ts
obj.doSum("Hello");
```

使用 tsc 命令来编译以上代码文件：

```shell
tsc CalcTest.ts
```

生成的 JavaScript 代码如下：

```js
// CalcTest.js 文件代码
/// <reference path = "Calc.d.ts" />
var obj = new Runoob.Calc();
//obj.doSum("Hello"); // 编译错误
console.log(obj.doSum(10));
```

最后我们编写一个 runoob.html 文件，引入 CalcTest.js 文件及第三方库 CalcThirdPartyJsLib.js：

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Test</title>
<script src = "CalcThirdPartyJsLib.js"></script>
<script src = "CalcTest.js"></script>
</head>
<body>
    <h1>声明文件测试</h1>
    <p>Test</p>
</body>
</html>
```

## TypeScript 声明合并

如果两个或多个接口、模块存在同名现象且没有相同变量，则编译器会把此接口合并，如果有相同变量则报错，若果有相同变量名的函数则重载。

## TypeScript 泛型

> https://www.tslang.cn/docs/handbook/generics.html

## 参考资料

>  https://www.runoob.com/typescript/ts-tutorial.html 

>   https://www.tslang.cn/docs/home.html 