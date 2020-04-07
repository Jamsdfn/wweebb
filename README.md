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

## 短路运算符

1、只要“||”前面为false，无论“||”后面是true还是false，结果都返回“||”后面的值。

2、只要“||”前面为true，无论“||”后面是true还是false，结果都返回“||”前面的值。

3、只要“&&”前面是false，无论“&&”后面是true还是false，结果都将返“&&”前面的值;

4、只要“&&”前面是true，无论“&&”后面是true还是false，结果都将返“&&”后面的值;

A: 1&&3 => 3  => 3&&1 = >1

B:1&&2 => 2 => 2&&3  =>3

C:1||0=> 1  =>  1||3  =>1

D:0||1=>  1  =>  1||2  =>1

## 回流和重绘

整个在浏览器的渲染过程中（页面初始化，用户行为改变界面样式，动画改变界面样式等）reflow(回流)和repaint(重绘) 会大大影响web性能，尤其是手机页面。因此我们在页面设计的时候要尽量减少reflow和repaint。

**什么是reflow和repaint（原文链接：http://www.cnblogs.com/Peng2014/p/4687218.html）**

reflow：例如某个子元素样式发生改变，直接影响到了其父元素以及往上追溯很多祖先元素（包括兄弟元素），这个时候浏览器要重新去渲染这个子元素相关联的所有元素的过程称为回流。

reflow：几乎是无法避免的。现在界面上流行的一些效果，比如树状目录的折叠、展开（实质上是元素的显 示与隐藏）等，都将引起浏览器的 reflow。鼠标滑过、点击……只要这些行为引起了页面上某些元素的占位面积、定位方式、边距等属性的变化，都会引起它内部、周围甚至整个页面的重新渲 染。通常我们都无法预估浏览器到底会 reflow 哪一部分的代码，它们都彼此相互影响着。

repaint：如果只是改变某个元素的背景色、文 字颜色、边框颜色等等不影响它周围或内部布局的属性，将只会引起浏览器 repaint（重绘）。repaint 的速度明显快于 reflow

下面情况会导致reflow发生

**1：改变窗口大小**

**2：改变文字大小**

**3：内容的改变，如用户在输入框中敲字**

**4：激活伪类，如:hover**

**5：操作class属性**

**6：脚本操作DOM**

**7：计算offsetWidth和offsetHeight**

**8：设置style属性**

那么为了减少回流要注意哪些方式呢？

**1：不要通过父级来改变子元素样式，最好直接改变子元素样式，改变子元素样式尽可能不要影响父元素和兄弟元素的大小和尺寸**

**2：尽量通过class来设计元素样式，切忌用style**

```js
var bstyle = document.body.style; // cache
```

```js
bstyle.padding = "20px"; // reflow, repaint
bstyle.border = "10px solid red"// 再一次的 reflow 和 repaint
```

```js
bstyle.color = "blue"// repaint
bstyle.backgroundColor = "#fad"// repaint
```

```js
bstyle.fontSize = "2em"// reflow, repaint
```

```js
// new DOM element - reflow, repaint
document.body.appendChild(document.createTextNode('dude!'));
```

对上面代码优化：

.b-class{

　　padding:20px;

　　color:blue;

　　border:10px solid red;

　　background-color:#fad;

　　font-size:2em;

}

```
$div.addClass("b-class");
```

**3：实现元素的动画，对于经常要进行回流的组件，要抽离出来，它的position属性应当设为fixed或absolute**

**4：权衡速度的平滑。比如实现一个动画，以1个像素为单位移动这样最平滑，但reflow就会过于频繁，CPU很快就会被完全占用。如果以3个像素为单位移动就会好很多。**

**5：不要用tables布局的另一个原因就是tables中某个元素一旦触发reflow就会导致table里所有的其它元素reflow。在适合用table的场合，可以设置table-layout为auto或fixed，**

**6：这样可以让table一行一行的渲染，这种做法也是为了限制reflow的影响范围。**

**7：css里不要有表达式expression**

**8：减少不必要的 DOM 层级（DOM depth）。改变 DOM 树中的一级会导致所有层级的改变，上至根部，下至被改变节点的子节点。这导致大量时间耗费在执行 reflow 上面。**

**9：避免不必要的复杂的 CSS 选择器，尤其是后代选择器（descendant selectors），因为为了匹配选择器将耗费更多的 CPU。**

**10: 尽量不要过多的频繁的去增加，修改，删除元素，因为这可能会频繁的导致页面reflow，可以先把该dom节点抽离到内存中进行复杂的操作然后再display到页面上。**

在div.first里面加入div.second,在div.second里面加入div.third:

$divS = $("<div class='second'></div>");

$(div.first).append($divS));//reflow

$divT = $("<div class='third'></div>");

$divS.append($divT);//reflow

优化代码：

$divS = $("<div class='second'></div>");

$divT = $("<div class='third'></div>");

$divS.append($divT);

$(div.first).append($divS));//reflow

或者：

var $divF = $(div.first);

$divS = $("<div class='second'></div>");

$divS.hide();

$(div.first).append($divS));

$divT = $("<div class='third'></div>");

$divS.append($divT);

$divS.show();//reflow

**11：请求如下值offsetTop, offsetLeft, offsetWidth, offsetHeight，scrollTop/Left/Width/Height，clientTop/Left/Width/Height，浏览器会发生reflow，建议将他们合并到一起操作，可以减少回流的次数。**

如果我们要经常去获取和操作这些值，则可以先将这些值缓存起来例如：

var windowHeight = window.innerHeight;//reflow

for(i=0;i<10;i++){

　　$body.height(windowHeight++);

　　一系列关于windowHeight的操作.......

}

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

## React

### pureComponent 与 Component 

在讲这两个组件的差别前我们先来看看Component的声明周期。

![](./3.jpeg)



我们观察这个生命周期后发现，如果想减少组价不必要的render来提高性能，如果我们使用Component的话，就需要自己重写shouldComponentUpdate方法。不然只要props或者state改变了，那又要重新render。

#### shouldComponentUpdate

```js
shouldComponentUpdate(nextProps, nextState)
```

使用shouldComponentUpdate()以让React知道当前状态或属性的改变是否不影响组件的输出，默认返回ture，返回false时不会重写render，而且该方法并不会在初始化渲染或当使用forceUpdate()时被调用，我们要做的只是这样：

```js
shouldComponentUpdate(nextProps, nextState) {
  return nextState.someData !== this.state.someData
}
```

但是，state里的数据这么多，还有对象，还有复杂类型数据，react的理念就是拆分拆分再拆分，这么多子组件，我要每个组件都去自己一个一个对比吗，这样工作量会不会太大了点，因此react就推出了PureComponent这个组件，这个组组件的优势就是内部帮我们重写了shouldComponentUpdate这个方法。

**两者异同**

React.PureComponent 与 React.Component 几乎完全相同，但 React.PureComponent 通过props和state的浅对比来实现 shouldComponentUpate()。

在PureComponent中，如果包含比较复杂的数据结构，可能会因深层的数据不一致而产生错误的否定判断，导致界面得不到更新。

如果定义了 shouldComponentUpdate()，无论组件是否是 PureComponent，它都会执行shouldComponentUpdate结果来判断是否 update。如果组件未实现 shouldComponentUpdate() ，则会判断该组件是否是 PureComponent，如果是的话，会对新旧 props、state 进行 shallowEqual 比较，一旦新旧不一致，会触发 update。

浅对比： 当所有键的值严格相等，且键对应值得类型相等时返回true，当对象键数量不相等、键不相等、键对应的值不相等时返回false。这个浅对比的方法也就是源码中shallowEqual这个方法

**区别点**：
PureComponent自带通过props和state的浅对比来实现 shouldComponentUpate()，而Component没有。
PureComponent缺点
可能会因深层的数据不一致而产生错误的否定判断，从而shouldComponentUpdate结果返回false，界面得不到更新。
PureComponent优势
不需要开发者自己实现shouldComponentUpdate，就可以进行简单的判断来提升性能。
为什么PureComponent比较复杂的数据结构，可能会因深层的数据不一致而产生错误的否定判断？
JavaScript 中的对象一般是可变的（Mutable），因为使用了引用赋值，新的对象简单的引用了原始对象，改变新的对象将影响到原始对象。如 foo={a: 1}; bar=foo; bar.a=2 你会发现此时 foo.a 也被改成了 2。

为了解决这个问题，一般的做法是使用 shallowCopy（浅拷贝）或 deepCopy（深拷贝）来避免被修改，但这样做造成了 CPU 和内存的浪费。

```js
let foo = {a: {b: 1}};
let bar = foo;
bar.a.b = 2;
console.log(foo.a.b);  // 打印 2
console.log(foo === bar); // 打印 true
```

可以在fb的shallowEqual方法源码中看到，如下，浅对比只是用Object.is()对Object的value做了一个基本数据类型的比较。

```js
function is(x: mixed, y: mixed): boolean {
  // SameValue algorithm
  if (x === y) { // Steps 1-5, 7-10
    // Steps 6.b-6.e: +0 != -0
    // Added the nonzero y check to make Flow happy, but it is redundant
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    // Step 6.a: NaN == NaN
    return x !== x && y !== y;
  }
}

function shallowEqual(objA: mixed, objB: mixed): boolean {
  if (is(objA, objB)) {
    return true;
  }

  if (typeof objA !== 'object' || objA === null ||
      typeof objB !== 'object' || objB === null) {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  for (let i = 0; i < keysA.length; i++) {
    if (
      !hasOwnProperty.call(objB, keysA[i]) ||
      !is(objA[keysA[i]], objB[keysA[i]])
    ) {
      return false;
    }
  }

  return true;
}
```

我们先来对is()函数进行分析：

在js中 ‘===’ 可以判断数据类型是否相等，但其实这样方式也并不十分严谨，例如

+0 === -0; // js 打印true
NaN === NaN; // js 打印false
1
2
我们希望上述的判断结果，+0和-0为false，NaN与NaN为true，这时候可以用这种方式

1/+0 // 结果为Infinity
1/-0 // 结果为-Infinity
Infinity === -Infinity; // false

解决 NaN === NaN为false，可以通过NaN和自身不相等的特性来解决
x !== x && y !== y

所以is()函数首先是通过 ‘===’ 来对数据类型进行比较，然后解决+0/-0和NaN的比较问题。

接下来分析shallowEqual()函数


```js
function shallowEqual(objA: mixed, objB: mixed): boolean {
  // 首先对两个基本数据类型进行比较
  if (is(objA, objB)) {
    return true;
  }

  // 判断两个数据都为object的情况
  if (typeof objA !== 'object' || objA === null ||
      typeof objB !== 'object' || objB === null) {
    return false;
  }

  // 获得所有的key
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  // 判断两者key的数量是否一致
  if (keysA.length !== keysB.length) {
    return false;
  }

  // 如果key数量相同，使用一层for循环去比较
  for (let i = 0; i < keysA.length; i++) {
    if (
      // 判断对象B中是否包含对象A的key，即两者的keys是否一致
      !hasOwnProperty.call(objB, keysA[i]) ||
      // 通过is()函数对比A和B的key对应的数据
      !is(objA[keysA[i]], objB[keysA[i]])
    ) {
      return false;
    }
  }
```

下面以组件的使用来举例：

例如：

```jsx
class ChildComponent extends React.PureComponent {
  render() {
    return(
      <div>
        {this.props.numbers}
      </div>
    )
  }
}
class MainComponent extends React.Component {
  constructor(props) {
   super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      numbers: [0]
    }
  }
  handleClick() {
    const arr = this.state.numbers;
    arr.push(1);
    this.setState({
      numbers: arr
    })
    console.log(this.state.numbers)
  }
  render() {
    <div>
      <button onClick={this.handleClick} />
      <ChildComponent numbers={this.state.numbers}/>
    </div>
  }
}
```

然而在MainComponent中去修改numbers时，ChildComponent并没有得到刷新。原因在于js使用的是引用赋值，新的对象简单引用了原始对象，改变新对象虽然影响了原始对象，但对象的地址还是一样，使用===比较的方式相等。而在PureComponent中，会被判定prop相等而不触发render()。

避免此类问题最简单的方式是，避免使用值可能会突变的属性或状态，而是使用副本来返回新的变量。

```js
handleClick() {
  this.setState(prevState => ({
    words: [...prevState.words, 'marklar'],
  }));
};
```

另外一种方式是使用Immutable.js

### Function Component

function Component：写纯函数组件非常简洁优雅，官方也推荐这种写法。但是，这并不代表纯函数组件是性能最好的组件写法。
在内部被包装成了一个只有render方法的StatelessComponent组件，在所有情况下都会更新。后来出了Hook来管理组件是否更新。我也在electron的note中的项目中专门讲了React Hook的用法，其实就是使用Effect来判断需要更新组件，把那些改变的的state或者prop放入effect的第二个参数的数组中就可以了。数组中任何一个变量的改变都会更新Fnction Component组件

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




