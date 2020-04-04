# wweebb

## 使用无分号风格

- 当一行代码是以 ： 

  - (
  - [
  - `  //是EcmaScript 6 中新增的一种字符串包裹方式，叫做：模板字符串他支持换行和非常方便的拼接变量

- 开头的时候，则在前面补上一个分号，用以避免一些语法解析错误，这也是有些第三方代码中看到的一上来就打分号，即第一个字符是分号的原因，有些人喜欢玩一些花哨的东西，例如补的不是分号是！~ 等。

- ```javascript
  function say() {
      console.log('hello world!')
  }
  
  say()
  
  ;(function () {
      console.log('hello!')
  })()
  
  say()
  
  ;['a','b'].forEach(function (item) {
      console.log(item)
  })
  
  var foo = `
  bar
  `
  console.log(foo)
  
  ;`hello`.toString()
  ```

## window.onlaod 和 DOMContentloaded 的异同

window.onlaod 和 DOMContentloaded 都是为了解决DOM加载后才绑定事件的问题的

- window.onlaod 
  - 当 `onload`事件触发时，页面上所有的DOM，样式表，脚本，图片，flash都已经加载完成了。
- DOMContentloaded
  - 当 `DOMContentLoaded` 事件触发时，仅当DOM加载完成，不包括样式表，图片，flash。

如果只是为了解决绑定事件的问题，DOMContentLoaded机制更加合理，因为我们可以容忍图片，flash延迟加载，却不可以容忍看见内容后页面不可交互。也就是说，即使用户网速再慢，好歹也给用户看一点东西。

## npx

npx 是 npm 5.0以后才有的命令他又一些有用的地方

- 避免全局安装

  ```shell
  # 比如一些脚手架工具，除了新建工程就么什么用了，但是还有全局安装有点浪费资源
  $ npx create-react-app my-react-project
  ```

- 方便调用项目内部安装模块

  ```shell
  # 比如
  node_modules/.bin/nodemon --version
  # 有了npx后可以直接调用，不用在给package.json的script了
  npx nodemon --version
  ```

## CSS3

- vh单位，视窗高度的百分比
- vw单位，视窗宽度的百分比

## 数组

Array.prototype.sort()

```js

var a = [1,2,5,3]
a.sort((forward,next) => {
    // 如果返回值小于零则为first second 不改变位置，如果大于零则改变位置
    //return forward-next // 升序
    return next-forward// 降序
})
```

## MVC和MVVM

### MVC

MVC: M(Model)、V(View)、C(Controller)，换句话说，一个事件的发生是这样的过程

1. 用户和应用交互
2. 控制器的事件处理器被触发
3. 控制器从模型中请求数据，并将其交给视图
4. 视图将数据呈现给用户

模型：用来存放应用的所有数据对象。模型不必知晓视图和控制器的细节，模型只需包含数据及直接和这些数据相关的逻辑。任何事件处理代码、视图模版，以及那些和模型无关的逻辑都应当隔离在模型之外。
视图：视图层是呈现给用户的，用户与之产生交互。在javaScript应用中，视图大都是由html、css和JavaScript模版组成的。除了模版中简单的条件语句之外，视图不应当包含任何其他逻辑。事实上和模型类似，视图也应该从应用的其他部分中解耦出来
控制器：控制器是模型和视图的纽带。控制器从视图获得事件和输入，对它们进行处理，并相应地更新视图。当页面加载时，控制器会给视图添加事件监听，比如监听表单提交和按钮单击。然后当用户和应用产生交互时，控制器中的事件触发器就开始工作。
例如JavaScript框架早期框架backbone就是采用的MVC模式。

上面的例子似乎太过空洞，下面讲一个生活中的例子进行讲解：

1. 用户提交一个新的聊天信息
2. 控制器的事件处理器被触发
3. 控制器创建了一个新的聊天模型
4. 然后控制器更新视图
5. 用户在聊天窗口看到新的聊天信息

在原生JS中我们可以定义一个构造方法，这个构造方法你们属性就是数据，还可以定义一些模型的方法，例如一些模型是专门又来获取网络数据的，一些是赋值做算法处理的

```js
// es5
function ModelA(x,y) {
    this.x = x || '1'
    this.y = y || 'b'
    this.func = function (){
    	console.log(this.y)
	}
}
// es6
class ModelA {
    constructor(x,y) {
        this.x = x || '1'
        this.y = y || 'b'
    }
    func() {
        console.log(this.x)
    }
}
```

Controller 就可已解锁平常做逻辑处理的js，这里的js通过Model的数据动态修改HTML页面

![图片描述](./1.png)

### MVVM

MVVM:M(Model)、V(View)、VM(ViewModel)，因为用MVC的设计时会时Controller中大量的DOM操作，这样会消耗大量的性能，如果出现卡顿就会降低用户体验，VM是把MVC里的controller的数据加载，加工功能分离出来，把一些消耗性能的功能交给服务器。**我们只用处理业务逻辑**，因为MVVM是数据双向绑定的所以也不用关心DOM的操作。

**View**：View是作为视图模板，用于定义结构、布局。它自己不处理数据，只是将ViewModel中的数据展现出来。此外为了和ViewModel产生关联，那么还需要做的就是数据绑定的声明，指令的声明，事件绑定的声明。这在当今流行的MVVM开发框架中体现的淋淋尽致。在示例图中，我们可以看到ViewModel和View之间是双向绑定，意思就是说ViewModel的变化能够反映到View中，View的变化也能够改变ViewModel的数据值。那如何实现双向绑定呢，例如有这个input元素：

```html
<input type='text' yg-model='message'>
```

随着用户在Input中输入值的变化，在ViewModel中的message也会发生改变，这样就实现了View到ViewModel的单向数据绑定。下面是一些思路：

1. 扫描看哪些节点有yg-xxx属性
2. 自动给这些节点加上onchange这种事件
3. 更新ViewModel中的数据，例如ViewModel.message = xx.innerText

那么ViewModel到View的绑定可以是下面例子：

```html
<p yg-text='message'></p>
```

渲染后p中显示的值就是ViewModel中的message变量值。下面是一些思路：

1. 首先注册ViewModel
2. 扫描整个DOM Tree 看哪些节点有yg-xxx这中属性
3. 记录这些被单向绑定的DOM节点和ViewModel之间的隐射关系
4. 使用innerText,innerHTML = ViewModel.message进行赋值

**ViewModel**：ViewModel起着连接View和Model的作用，同时用于处理View中的逻辑。在MVC框架中，视图模型通过调用模型中的方法与模型进行交互，然而在MVVM中View和Model并没有直接的关系，在MVVM中，ViewModel从Model获取数据，然后应用到View中。相对MVC的众多的控制器，很明显这种模式更能够轻松管理数据，不至于这么混乱。还有的就是处理View中的事件，例如用户在点击某个按钮的时候，这个行动就会触发ViewModel的行为，进行相应的操作。行为就可能包括更改Model,重新渲染View。

**Model**：Model 层，对应数据层的域模型，它主要做域模型的同步。通过 Ajax/fetch 等 API 完成客户端和服务端业务 Model 的同步。在层间关系里，它主要用于抽象出 ViewModel 中视图的 Model。

![](./2.png)

**MVVM设计模式的优点**

1. 双向绑定技术，当Model变化时，View-Model会自动更新，View也会自动变化。很好的做到数据的一致性

2. 由于控制器的功能大都移动到View上处理，大大的对控制器进行了瘦身

3. View的功能进一步强化，具有控制的部分功能，

   若想无限增强它的功能，甚至控制器的全部功能几乎都可以迁移到各个View上

　（不过这样不可取，那样View干不了属于它职责范围内的事情）。

　  View可以像控制器一样具有自己都View-Model 

4. 可以对View或ViewController的数据处理部分抽象出来一个函数处理model。 

   这样它们专职页面布局和页面跳转，它们必然更一步的简化。

**MVVM设计模式的缺点**

1. 数据绑定也使得bug很难被调试。比如你看到页面异常了，有可能是你的View的代码有bug，也可能是你的model的代码有问题。数据绑定使得一个位置的Bug被快速传递到别的位置，要定位原始出问题的地方就变得不那么容易了。

2. 数据双向绑定不利于代码重用。客户端开发最常用的是View，但是数据双向绑定技术，让你在一个View都绑定了一个model，不同的模块model都不同。那就不能简单重用view了

3. 一个大的模块中model也会很大，虽然使用方便了也很容易保证数据的一致性，但是长期持有，不释放内存就造成话费更多的内存。

## 工具

### concurrently

可以用这个插件在一个命令行同时运行两个命令

安装

```shell
$ npm i -D  concurrently
```

使用

```js
// 如果是全局安装的 concurrently 
concurrently "命令1" "命令2"
// 如果是在项目中安装，则在script中加上
"key": "concurrently \"命令1\" \"命令2\""
```

### wait-on

wait-on是跨平台的命令行实用程序，它将等待文件，端口，套接字和http（s）资源变得可用之后再执行另一条指令

安装

```shell
$ npm i -D wait-on
```

使用

```js
wait-on xxx && 命令
// 如 wait-on http://localhost:3000 && electron .
```

### cross-env

运行跨平台设置和使用环境变量的脚本，因为不同平台的脚本运行的时对环境变量的语法是不一样的，而cross-env就解决了这个跨平台的问题

```json
"scripts": {
    "dev": "concurrently \"wait-on http://localhost:3000 && electron .\" \"cross-env BROWSER=none npm start\""
},
```

上面的代码就是为了解决 BROWSER=none 这个环境变量问题的

### classnames

一个帮我们拼接className的插件

```shell
$ npm i classnames
```

使用

```jsx
const fClassName = classNames({
    'nav-link': true,
    'active': file.id === activeId
})
// 这样fClassName 就是拼接好的class字符串，file.id===activeId 则class加上active，为false就不添加
```

### uuid

用 uuid 插件生成 uuid

```shell
$ npm i uuid
```

使用

```jsx
// *为uuid的版本（不是module是版本，就是识别的版本）
import uuidv* from 'uuid/v*'
const newID = uuidv4()
```




