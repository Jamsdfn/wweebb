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

  