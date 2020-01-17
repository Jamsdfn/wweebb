# electron

## electron简介

> 官网：https://electronjs.org/

Electron是由Github开发，用HTML，CSS和JavaScript来构建**跨平台桌面应用程序**的一个开源库。 Electron通过将Chromium和Node.js合并到同一个运行时环境中，并将其打包为Mac，Windows和Linux系统下的应用来实现这一目的。

## electron 安装

我们先自己搭electron的架构，熟悉一下electron的架构

首先最简单的应用起码具备以下目录

**your-app/
├── package.json
├── main.js
└── index.html**

可以通过`npm init`来创建 package.json 目录，以下为 package.json 文件的基本内容

```json
{
  "name": "your-app",
  "version": "0.1.0",
  "main": "main.js",
  "scripts": {
    "start": "electron ."
  }
}
```

### 安装 Electron

```shell
$ npm install --save-dev electron
```

用上面的命令安装后可能会出现以下的错误

![1](./1.png)

如果出现了上述错误，则需要手动下载electron-vx.x.x-xxx.zip文件，不然当编号程序执行`npm start`会报错。下载那个文件也就是多执行下面的语句。

```shell
$ node node_modules\electron\install.js
```

执行上述语句是没有任何命令行反馈的，如果等了很久夯实卡死来了那条指令，可能就是网络问题了，科学上网再执行上述语句。万一还是有问题，则参考下面老哥的方案

> https://blog.csdn.net/u013584271/article/details/102764898

### 编写最基本的main.js

```js
const { app, BrowserWindow } = require('electron')

function createWindow () {   
  // 创建浏览器窗口
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // 加载index.html文件
  win.loadFile('index.html')
}

app.on('ready', createWindow)
```

我们应当在 `main.js` 中创建窗口，并处理程序中可能遇到的所有系统事件。 下面我们将完善上述例子，添加以下功能：打开开发者工具、处理窗口关闭事件、在macOS用户点击dock上图标时重建窗口，添加后，main. js 就像下面这样：

```js
const { app, BrowserWindow } = require('electron')

// 保持对window对象的全局引用，如果不这么做的话，当JavaScript对象被
// 垃圾回收的时候，window对象将会自动的关闭
let win

function createWindow () {
  // 创建浏览器窗口。
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // 加载index.html文件
  win.loadFile('index.html')

  // 打开开发者工具
  win.webContents.openDevTools()

  // 当 window 被关闭，这个事件会被触发。
  win.on('closed', () => {
    // 取消引用 window 对象，如果你的应用支持多窗口的话，
    // 通常会把多个 window 对象存放在一个数组里面，
    // 与此同时，你应该删除相应的元素。
    win = null
  })
}

// Electron 会在初始化后并准备
// 创建浏览器窗口时，调用这个函数。
// 部分 API 在 ready 事件触发后才能使用。
app.on('ready', createWindow)

// 当全部窗口关闭时退出。
app.on('window-all-closed', () => {
  // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
  // 否则绝大部分应用及其菜单栏会保持激活。
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // 在macOS上，当单击dock图标并且没有其他窗口打开时，
  // 通常在应用程序中重新创建一个窗口。
  if (win === null) {
    createWindow()
  }
})

// 在这个文件中，你可以续写应用剩下主进程代码。
// 也可以拆分成几个文件，然后用 require 导入。
```

### 编写你的index.html

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Hello World!</title>
    <!-- https://electronjs.org/docs/tutorial/security#csp-meta-tag -->
    <meta http-equiv="Content-Security-Policy" content="script-src 'self' 'unsafe-inline';" />
  </head>
  <body>
    <h1>Hello World!</h1>
    We are using node <script>document.write(process.versions.node)</script>,
    Chrome <script>document.write(process.versions.chrome)</script>,
    and Electron <script>document.write(process.versions.electron)</script>.
  </body>
</html>
```

安装好 electron、在 package.json 的 script 加上命令、编好 main.js、编好 index.html 后就可以执行了

```shell
$ npm start
```

**注**：要想不出现滚动条，brower的区域要比html插入的区域宽多14高多57；如果出现上下滚动条，则brower的区域要比html的区域宽多31，高随意。不过最方便的还是自适应。

### 快速搭建应用

在想创建应用的目录下 从 GItHub上下载实例代码

```shell
$ git clone https://github.com/electron/electron-quick-start
```

不喜欢目录名乐意改掉目录名，然后在项目里的package.json 把name也改掉。删除项目里 .git 文件

安装项目依赖

```shell
$ npm install
```

启动项目

```shell
$ npm start
```

### 快速搭建 electron+react 应用

先从 github 上下载搭建好的框架

```shell
$ git clone --depth 1 --single-branch --branch master https://github.com/electron-react-boilerplate/electron-react-boilerplate.git your-project-name

# 我自己清理了一下，下次可以直接用这个干净的
$ git clone https://github.com/Jamsdfn/electron-react-start.git
```

进入工程安装依赖(因为yarn服务器在国外，所以我们通常都要翻墙)

```shell
$ yarn
```

启动开发者模式

```shell
$ yarn dev
```

注意：如果不翻墙可以安装yrm并切换镜像

```shell
$ npm install yrm -g

# 查看所有镜像
yrm ls

#切换镜像
yrm use taobao
```



### 快速搭建 electron+vue 应用

先全局装一下 vue-cli 这个脚手架

```shell
$ npm install vue-cli -g
```

创建工程

```shell
$ vue init simulatedgreg/electron-vue project-name
```

进入工程

```shell
$ cd project-name
```

安装依赖

```shell
$ yarn
```

启动开发模式

```shell
$ yarn dev
```

可能会出现的问题

问题一：如果脚手架配置是选择使用node-sass

Windows 无法编辑 node-sass

解决方案

```shell
npm i -g node-gyp
npm i -g -production windows-build-tools
```

问题二：使用electron-vue出现Webpack ReferenceError: process is not defined

> https://blog.csdn.net/Gabriel_wei/article/details/92785089

解决
简单粗暴，不知道会不会有什么影响，直接将报错文件index.ejs的一句话删掉这段代码去掉

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>electron-vue-start</title>
    <% if (htmlWebpackPlugin.options.nodeModules) { %>
      <!-- Add `node_modules/` to global paths so `require` works properly in development -->
      <script>
        require('module').globalPaths.push('<%= htmlWebpackPlugin.options.nodeModules.replace(/\\/g, '\\\\') %>')
      </script>
    <% } %>
  </head>
  <body>
    <div id="app"></div>
-------------Delete from------------------
    <!-- Set `__static` path to static files in production -->
    <% if (!process.browser) { %>
      <script>
        if (process.env.NODE_ENV !== 'development') window.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
      </script>
    <% } %>

    <!-- webpack builds are automatically injected -->
------------Delete to-------------------
  </body>
</html>
```

## Electron 应用架构

在我们深入了解Electron的API之前，我们需要探讨一下在Electron中可能遇到的两种进程类型。 它们是完全不同的，因此理解它们非常重要。

### 主进程和渲染器进程

Electron 运行 `package.json` 的 `main` 脚本的进程被称为**主进程**。 在主进程中运行的脚本通过创建web页面来展示用户界面。 一个 Electron 应用总是有且只有一个主进程。

由于 Electron 使用了 Chromium 来展示 web 页面，所以 Chromium 的多进程架构也被使用到。 每个 Electron 中的 web 页面运行在它自己的**渲染进程**中。

在普通的浏览器中，web页面通常在沙盒环境中运行，并且无法访问操作系统的原生资源。 然而 Electron 的用户在 Node.js 的 API 支持下可以在页面中和操作系统进行一些底层交互。

**主进程和渲染进程支架的区别**

主进程使用 `BrowserWindow` 实例创建页面。 每个 `BrowserWindow` 实例都在自己的渲染进程里运行页面。 当一个 `BrowserWindow` 实例被销毁后，相应的渲染进程也会被终止。

主进程管理所有的web页面和它们对应的渲染进程。 每个渲染进程都是独立的，它只关心它所运行的 web 页面。

在页面中调用与 GUI 相关的原生 API 是不被允许的，因为在 web 页面里操作原生的 GUI 资源是非常危险的，而且容易造成资源泄露。 如果你想在 web 页面里使用 GUI 操作，其对应的渲染进程必须与主进程进行通讯，请求主进程进行相关的 GUI 操作。

> #### 题外话：进程间通讯
>
> Electron为主进程（ main process）和渲染器进程（renderer processes）通信提供了多种实现方式，如可以使用[`ipcRenderer`](https://electronjs.org/docs/api/ipc-renderer) 和 [`ipcMain`](https://electronjs.org/docs/api/ipc-main)模块发送消息，使用 [remote](https://electronjs.org/docs/api/remote)模块进行RPC方式通信。 这里也有一个常见问题解答：[web页面间如何共享数据](https://electronjs.org/docs/faq#how-to-share-data-between-web-pages)。

#### 渲染器进程debug

在 `npm start` 后直接 `ctrl+shift+i` 就可以打开像chrome浏览器一样的开发者模式了

#### 主进程debug

如果想主程序debug的话，就要改一下命令行指令，加上 `--inspect=[port]`，我们要改变 package.json 文件的 script ,把
`"start":"electron ."`改成 `"start":"electron --inspect=[port] ."`。

然后打开Chrome浏览器 输入`chrome://inspect`，点击configure按钮添加ip `localhost:[port]`

重启npm start 就可以在remote target中看到要监视的主进程了，我们点击inspect `ctrl+p` 输入main.js 就可以看到主进程了，可以加断点debug了

### 使用 Electron 的 API

Electron在主进程和渲染进程中提供了大量API去帮助开发桌面应用程序， 在主进程和渲染进程中，你可以通过require的方式将其包含在模块中以此，获取Electron的API

```javascript
const electron = require('electron')Copy
```

所有Electron的API都被指派给一种进程类型。 许多API只能被用于主进程或渲染进程中，但其中一些API可以同时在上述两种进程中使用。 每一个API的文档都将声明你可以在哪种进程中使用该API。

Electron中的窗口是使用`BrowserWindow`类型创建的一个实例， 它只能在主进程中使用。

```javascript
// 这样写在主进程会有用，但是在渲染进程中会提示'未定义'
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()Copy
```

因为进程之间的通信是被允许的, 所以渲染进程可以调用主进程来执行任务。 Electron通过`remote`模块暴露一些通常只能在主进程中获取到的API。 为了在渲染进程中创建一个`BrowserWindow`的实例，我们通常使用remote模块为中间件：

```javascript
//这样写在渲染进程中时行得通的，但是在主进程中是'未定义'
const { remote } = require('electron')
const { BrowserWindow } = remote

const win = new BrowserWindow()
```

### 使用 Node.js 的 API

Electron同时对主进程和渲染进程暴露了Node.js 所有的接口。 这里有两个重要的定义：

1)所有在Node.js可以使用的API，在Electron中同样可以使用。 在Electron中调用如下代码是有用的：

```javascript
const fs = require('fs')
 
const root = fs.readdirSync('/')

// 这会打印出磁盘根级别的所有文件
// 同时包含'/'和'C:\'。
console.log(root)Copy
```

正如您可能已经猜到的那样，如果您尝试加载远程内容， 这会带来重要的安全隐患。 您可以在我们的 [安全文档 ](https://electronjs.org/docs/tutorial/security)中找到更多有关加载远程内容的信息和指南。

2)你可以在你的应用程序中使用Node.js的模块。 选择您最喜欢的 npm 模块。 npm 提供了目前世界上最大的开源代码库，那里包含良好的维护、经过测试的代码，提供给服务器应用程序的特色功能也提供给Electron。

例如，在你的应用程序中要使用官方的AWS SDK，你需要首先安装它的依赖：

```sh
npm install --save aws-sdkCopy
```

然后在你的Electron应用中，通过require引入并使用该模块，就像构建Node.js应用程序那样：

```javascript
// 准备好被使用的S3 client模块
const S3 = require('aws-sdk/clients/s3')Copy
```

有一个非常重要的提示: 原生Node.js模块 (即指，需要编译源码过后才能被使用的模块) 需要在编译后才能和Electron一起使用。

绝大多数的Node.js模块都*不*是原生的， 在650000个模块中只有400是原生的。 当然了，如果你的确需要原生模块，可以在这里查询[如何重新为Electron编译原生模块](https://electronjs.org/docs/tutorial/using-native-node-modules)(很简单)。

## BrowerWindow

> https://electronjs.org/docs/api/browser-window

创建和控制浏览器窗口

关于窗口的设置都可以看看这个官方文档，挺详细的，根据需求使用api就好了。

## app常用事件

> https://electronjs.org/docs/all

app.on

- ready: 当 Electron 完成初始化时被触发
- window-all-close：所有窗口关闭
- before-quit：在应用程序开始关闭窗口之前触发
- will-quit：当所有窗口都已关闭并且应用程序将退出时触发
- quit:在应用程序退出时触发

**webContents**

new BrowserWindow().webContents.on

- did-finish-load: 导航完成时触发，即选项卡的旋转器将停止旋转，并指派`onload`事件后。
- dom-ready: 一个框架中的文本加载完成后触发该事件。(所有dom加载完后触发)

## 进程对象

> https://electronjs.org/docs/api/process

官方文档比较详细的阐述了process对象的属性和方法，其实这个对象是主要那本机信息的，通常用于根据电脑配置的不同对用户进行不同的操作或者给用户一些提示。有需要就看官方文档，这里就不展开陈述了。

## File对象

> https://electronjs.org/docs/api/file-object

DOM的文件接口提供了关于原生文件的抽象，以便用户可以直接使用HTML5文件API处理原生文件。 Electron已经向 `文件` 接口添加了一个 `path` 属性, 在文件系统上暴露出文件的真实路径

官方示例：获取拖拽到app上的文件的真实路径

```html
<div id="holder">
  Drag your file here
</div>

<script>
  document.addEventListener('drop', (e) => {
    e.preventDefault();
    e.stopPropagation();

    for (const f of e.dataTransfer.files) {
      console.log('File(s) you dragged here: ', f.path)
    }
  });
  document.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.stopPropagation();
  });
</script>
```

获得了真是路径后，因为electron是基于node的，所以就可以对文件进行操作了。

**例子**：读取文件内容并在控制台打印

```html
    <div id="holder" style="background:#ccc;width:100%;height:400px">
        <h2>File对象</h2>
        <span>往这里拖文件</span>
    </div>
<script>
const dragwrapper = document.querySelector('#holder')
// console.log(dragwrapper)
dragwrapper.addEventListener('drop',(e)=>{
    e.preventDefault()
    e.stopPropagation()
    const files = e.dataTransfer.files
    if (files && files.length > 0) {
        const path = files[0].path
        // console.log('path:' + path)
        // 读出文件内容
        console.log(fs.readFileSync(path).toString())
    }
})
dragwrapper.addEventListener('dragover',(e)=>{
    e.preventDefault()
    e.stopPropagation()
})
</script>
```

## webview 标签

> https://electronjs.org/docs/api/webview-tag

在一个独立的 frame 和进程里显示外部 web 内容。

进程: [Renderer](https://electronjs.org/docs/glossary#renderer-process)

使用 `webview` 标签在Electron 应用中嵌入 "外来" 内容 (如 网页)。外来"内容包含在 `webview` 容器中。 应用中的嵌入页面可以控制外来内容的布局和重绘。

与 `iframe` 不同, `webview` 在与应用程序不同的进程中运行。它与您的网页没有相同的权限, 应用程序和嵌入内容之间的所有交互都将是异步的。 这将保证你的应用对于嵌入的内容的安全性。 **注意:** 从宿主页上调用 webview 的方法大多数都需要对主进程进行同步调用。

**实例**

若要在应用程序中嵌入网页, 请将 `webview` 标签添加到应用程序的被嵌入页面中 (这是将显示外来内容的应用程序页)。 在最简单的例子中, `webview` 标签包括网页的 `src` 和控制 `webview` 容器外观的 css 样式:

```html
<webview id="foo" src="https://www.github.com/" style="display:inline-flex; width:100%; height:480px"></webview>
```

**注**：当electron版本大于等于5后webview是默认禁止的，要想使用，就要在设置中打开

```js
mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
    // 无边框设置
        // frame:false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            // 允许在原生js中使用nodejs
            nodeIntegration: true,
            // 运行webview标签
            webviewTag:true
        }
    })
```

如果要以任何方式控制外来内容, 则可以写用于侦听 `webview` 事件的 JavaScript, 并使用 `webview` 方法响应这些事件。 下面是包含两个事件侦听器的示例代码: 一个侦听网页开始加载, 另一个用于网页停止加载, 并在加载时显示 "loading..." 消息:

```html
<script>
  onload = () => {
    const webview = document.querySelector('webview')
    const indicator = document.querySelector('.indicator')

    const loadstart = () => {
      indicator.innerText = 'loading...'
    }

    const loadstop = () => {
      indicator.innerText = ''
    }

    webview.addEventListener('did-start-loading', loadstart)
    webview.addEventListener('did-stop-loading', loadstop)
  }
</script>
```

**注**：这个webview功能很多，我们可以看文档实现想要的功能，比如给网页注入js。

## window.open

> https://electronjs.org/docs/api/window-open

打开一个新的electron窗口，内容为open参数中的url地址的渲染内容。

当调用 `window.open` 以在网页中创建新窗口时，将为`url`创建一个新的[BrowserWindow](https://electronjs.org/docs/api/browser-window) 实例，并返回一个代理至 `window.open` 以让页面对其进行有限的控制。

该代理具有有限的标准功能，与传统网页兼容。要完全控制新窗口，你应该直接创建一个`BrowserWindow`。

默认情况下, 新创建的 `BrowserWindow` 将继承父窗口的选项。若要重写继承的选项, 可以在 `features` 字符串中设置它们。

 **window.open(url[, frameName\][, features])**

- `url` String
- `frameName` String（可选）
- `features` String（可选）

Returns [`BrowserWindowProxy`](https://electronjs.org/docs/api/browser-window-proxy) - 创建一个新窗口，并返回一个 `BrowserWindowProxy` 类的实例。

`features` 字符串遵循标准浏览器的格式，但每个 feature 必须是`BrowserWindow` 选项中的字段。 These are the features you can set via `features` string: `zoomFactor`, `nodeIntegration`, `preload`, `javascript`, `contextIsolation`, `webviewTag`.

例如：

```javascript
window.open('https://github.com', '_blank', 'nodeIntegration=no')
```

**注意：**

- 如果在父窗口中禁用了 Node integration, 则在打开的 `window` 中将始终被禁用。
- 如果在父窗口中启用了上下文隔离, 则在打开的 `window` 中将始终被启用。
- 父窗口禁用 Javascript，打开的 `window` 中将被始终禁用
- `features` 中给定的非标准特性 (不由 Chromium 或 Electron 处理) 将被传递到 `additionalFeatures` 参数中的任何已注册 `webContent` 的 `new-window` 事件处理程序。

### brower-window-proxy

> 操纵子浏览器窗口

进程: 渲染进程

使用 `window.open` 创建一个新窗口时会返回一个 `BrowserWindowProxy`对象，并提供一个有限功能的子窗口.

- 实例方法

	+ `BrowserWindowProxy` 对象具有以下实例方法:

- win.blur()

	+ 将焦点从子窗口中移除.

- win.close()

	+ 不调用卸载事件，便关闭了子窗口。

- win.eval(code)

	+ `code` String

	Eval子窗口中的代码

- win.focus()

	+ 聚焦子窗口(即窗口置顶)

- win.print()

	+ 调用子窗口上的打印对话框

- win.postMessage(message, targetOrigin)

	+ `message` any
	+ `targetOrigin` String

	调通过指定位置或用`*`来代替不明位置，向子窗口发送信息
	

**除了这些方法,子窗口还可以无特性和使用单一方法来实现 `window.opener` 对象.**

- 实例属性

	+ `BrowserWindowProxy` 对象具有以下实例属性:

- win.closed

	+ 在子窗口关闭后设置为 true 的 `Boolean`。

## dialog

> https://electronjs.org/docs/api/dialog

显示用于**打开和保存文件**、警报等的本机系统对话框。

An example of showing a dialog to select multiple files:

```javascript
const { dialog } = require('electron')
console.log(dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'] }))Copy
```

这个对话框是从Electron的主线程上打开的。如果要使用渲染器进程中的对话框对象, 可以使用remote来获得:

```javascript
const { dialog } = require('electron').remote
console.log(dialog)
```

详细使用方法参考官方文档。

## 定制快捷键功能

> https://electronjs.org/docs/api/global-shortcut

字面意思，就是定制快捷键的功能

`globalShortcut` 模块可以在操作系统中注册/注销全局快捷键, 以便可以为操作定制各种快捷键。

### 快捷键（Accelerator）

> 定义键盘快捷键。

快捷键可以包含多个功能键和一个键码的字符串，由符号`+`结合，用来定义你应用中的键盘快捷键

示例：

- `CommandOrControl+A`
- `CommandOrControl+Shift+Z`

快捷方式使用 [`register`](https://electronjs.org/docs/api/global-shortcut#globalshortcutregisteraccelerator-callback) 方法在 [`globalShortcut`](https://electronjs.org/docs/api/global-shortcut) 模块中注册, 即:

```javascript
const { app, globalShortcut } = require('electron')

app.on('ready', () => {
  // Register a 'CommandOrControl+Y' shortcut listener.
  globalShortcut.register('CommandOrControl+Y', () => {
    // Do stuff when Y and either Command/Control is pressed.
  })
})Copy
```

**跨平台提醒**

在 Linux 和 Windows 上, `Command` 键没有任何效果, 所以使用 `CommandOrControl`表述, macOS 是 `Command` ，在 Linux 和 Windows 上是`Control`。

使用 `Alt` 代替`Option`. `Option` 键只在 macOS 系统上存在, 而 `Alt` 键在任何系统上都有效.

`Super`键是指 Windows 和 Linux 系统上的 `Windows` 键，但在 macOS 里为 `Cmd` 键.

**可用的功能键**

- `Command` (缩写为`Cmd`)
- `Control` (缩写为`Ctrl`)
- `CommandOrControl` (缩写为 `CmdOrCtrl`)
- `Alt`
- `Option`
- `AltGr`
- `Shift`
- `Super`

**可用的普通按键**

- `0` 到 `9`
- `A` 到 `Z`
- `F1` 到 `F24`
- 类似`~`, `!`, `@`, `#`, `$`的标点符号
- `Plus`
- `Space`
- `Tab`
- `大写锁定（Capslock）`
- `数字锁定（Numlock）`
- `滚动锁定`
- `Backspace`
- `Delete`
- `Insert`
- `Return` (等同于 `Enter`)
- `Up`, `Down`, `Left` and `Right`
- `Home` 和 `End`
- `PageUp` 和 `PageDown`
- `Escape` (缩写为 `Esc`)
- `VolumeUp`, `VolumeDown` 和 `VolumeMute`
- `MediaNextTrack`、`MediaPreviousTrack`、`MediaStop` 和 `MediaPlayPause`
- `PrintScreen`
- 小键盘按键
  - `num1`-`num9` -数字1-数字9
  - `numdec` - 小数点
  - `numadd` - 加号
  - `numsub` - 减号
  - `nummult` - 乘号
  - `numdiv` - 除号

### 定制功能

**注意:** 快捷方式是全局的; 即使应用程序没有键盘焦点, 它也仍然在持续监听键盘事件。 在应用程序模块发出 `ready` 事件之前, 不应使用此模块。

```javascript
const { app, globalShortcut } = require('electron')

app.on('ready', () => {
  // 注册一个 'CommandOrControl+X' 的全局快捷键
  const ret = globalShortcut.register('CommandOrControl+X', () => {
    console.log('CommandOrControl+X is pressed')
  })

  if (!ret) {
    console.log('registration failed')
  }

  // 检查快捷键是否注册成功
  console.log(globalShortcut.isRegistered('CommandOrControl+X'))
})

app.on('will-quit', () => {
  // 注销快捷键
  globalShortcut.unregister('CommandOrControl+X')

  // 注销所有快捷键
  globalShortcut.unregisterAll()
})Copy
```

**方法**

`globalShortcut` 模块具有以下方法:

**globalShortcut.register(accelerator, callback)**

- `accelerator` [Accelerator](https://electronjs.org/docs/api/accelerator)
- `callback` Function

Returns `Boolean` - Whether or not the shortcut was registered successfully.

注册指定的 `accelerator` 为全局快捷键。当用户按下该注册的快捷键时, 将调用 `callback`回调函数。

如果指定的快捷键已经被其他应用程序注册掉, 调用会默默失败。 该特性由操作系统定义，因为操作系统不希望多个程序的全局快捷键互相冲突。

在 macOS 10.14 Mojave 下面，如果 app 没有被授权为[可信任使用的客户端](https://developer.apple.com/library/archive/documentation/Accessibility/Conceptual/AccessibilityMacOSX/OSXAXTestingApps.html)，那么下列快捷键会注册失败：

- "Media Play/Pause"
- "Media Next Track"
- "Media Previous Track"
- "Media Stop"

**globalShortcut.registerAll(accelerators, callback)**

- `accelerators` String[] - an array of [Accelerator](https://electronjs.org/docs/api/accelerator)s.
- `callback` Function

Registers a global shortcut of all `accelerator` items in `accelerators`. The `callback` is called when any of the registered shortcuts are pressed by the user.

When a given accelerator is already taken by other applications, this call will silently fail. 该特性由操作系统定义，因为操作系统不希望多个程序的全局快捷键互相冲突。

在 macOS 10.14 Mojave 下面，如果 app 没有被授权为[可信任使用的客户端](https://developer.apple.com/library/archive/documentation/Accessibility/Conceptual/AccessibilityMacOSX/OSXAXTestingApps.html)，那么下列快捷键会注册失败：

- "Media Play/Pause"
- "Media Next Track"
- "Media Previous Track"
- "Media Stop"

**globalShortcut.isRegistered(accelerator)**

- `accelerator` [Accelerator](https://electronjs.org/docs/api/accelerator)

Returns `Boolean` - 表示 `accelerator` 全局快捷键是否注册成功

当快捷键已经被其他应用程序注册时, 此调用将返回 `false`。 该特性由操作系统定义，因为操作系统不希望多个程序的全局快捷键互相冲突。

**globalShortcut.unregister(accelerator)**

- `accelerator` [Accelerator](https://electronjs.org/docs/api/accelerator)

注销 `accelerator` 的全局快捷键。

**globalShortcut.unregisterAll()**

注销所有的全局快捷键（清空该应用程序的全局快捷键）。

## 主进程与渲染器进程的通信

### ipcMain

> https://electronjs.org/docs/api/ipc-main

从主进程到渲染进程的异步通信。

下面是在渲染和主进程之间发送和处理消息的一个例子：（同名则相互通信；主进程中需要event才能给渲染器进程进行发送，而渲染器可以直接send发送）

```javascript
// 在主进程中.
const { ipcMain } = require('electron')
ipcMain.on('asynchronous-message', (event, arg) => {
  console.log(arg) // prints "ping"
  event.reply('asynchronous-reply', 'pong')
})

ipcMain.on('synchronous-message', (event, arg) => {
  console.log(arg) // prints "ping"
    // 同步sendSunc的方法才能这样发送
  event.returnValue = 'pong'
})
//在渲染器进程 (网页) 中。
const { ipcRenderer } = require('electron')
console.log(ipcRenderer.sendSync('synchronous-message', 'ping')) // prints "pong"

ipcRenderer.on('asynchronous-reply', (event, arg) => {
  console.log(arg) // prints "pong"
})
ipcRenderer.send('asynchronous-message', 'ping')
```

### ipcRenderer

> https://electronjs.org/docs/api/ipc-renderer

从渲染器进程到主进程的异步通信。

## menu

> https://electronjs.org/docs/api/menu

设置原生应用菜单和上下文菜单（就是右键点击的菜单）

### menuItem

> https://electronjs.org/docs/api/menu-item

原生菜单的菜单项，因为功能有点多，详细情况还是参考官方文档

**注：**官方文档里的那个什么角色，是直译，翻译的问题，其实就是 role 差不多是功能的意思，就是官方给我们的功能，不用自己编程click事件

**menu 使用** (点击鼠标右键出菜单)

```js
const {remote} = require('electron')

const {Menu, MenuItem} = remote

function openMenu() {
    const template = [
        // json 格式设置菜单项
        {label:'Exit',role:'quit'},
        {label: '第一个菜单项目', submenu: [
            {label: 'redo',role:'redo',accelerator:'CommandOrControl+E'},
            {label: '子菜单2111111111111111',role:'undo',accelerator:'CommandOrControl+Q'}
        ]},
        {label: '点击测试', click: () => {
            console.log('点击事件触发了')
        }},
        {label: '重写', role:'redo'},
        {label: '撤销', role:'undo'},
        {label: '旅游', type: 'checkbox', checked: true},
        {label: '吃', type: 'checkbox', checked: true},
        {label: '逛街', type: 'checkbox', checked: false},
        // new MenuItem格式设置菜单 option和json格式的菜单是一样的
        new MenuItem({label: '这是MenuItem生成的菜单', click: () => {
            console.log('这是MenuItem生成的菜单')
        }})
    ]
    const menu = Menu.buildFromTemplate(template)
    // 下面的方法就是把应用程序顶头的菜单栏也改了，不加这句就可以不改的
    // 注意 菜单的快捷键只有加了下面那句话，也就是变成了顶头的菜单栏才会生效
    Menu.setApplicationMenu(menu)
    menu.popup()
}

document.querySelector('html').onmousedown = function (e) {
    // 鼠标右键出菜单
    if (e.button === 2) {
        openMenu()
    }
}
```

## net

> https://electronjs.org/docs/api/net

使用Chromium的原生网络库发出HTTP / HTTPS请求

`net` 模块是一个发送 HTTP(S) 请求的客户端API。 它类似于Node.js的[HTTP](https://nodejs.org/api/http.html) 和 [HTTPS](https://nodejs.org/api/https.html) 模块 ，但它使用的是Chromium原生网络库来替代Node.js的实现，提供更好的网络代理支持。

下面是一个非详尽的列表, 用于说明为什么使用 `net` 模块而不是原生Node. js 模块:

- 系统代理配置的自动管理, 支持 wpad 协议和代理 pac 配置文件。
- HTTPS 请求的自动隧道。
- 支持使用basic、digest、NTLM、Kerberos 或协商身份验证方案对代理进行身份验证。
- 支持传输监控代理: 类似于Fiddler代理，用于访问控制和监视。

The API components (including classes, methods, properties and event names) are similar to those used in Node.js.

Example usage:

```javascript
const { app } = require('electron')
app.on('ready', () => {
  const { net } = require('electron')
  const request = const request = net.request({
  method: 'GET',
  protocol: 'https:',
  hostname: 'github.com',
  port: 443,
  path: '/'
})
  request.on('response', (response) => {
    console.log(`STATUS: ${response.statusCode}`)
    console.log(`HEADERS: ${JSON.stringify(response.headers)}`)
    response.on('data', (chunk) => {
      console.log(`BODY: ${chunk}`)
    })
    response.on('end', () => {
      console.log('No more data in response.')
    })
  })
  request.end()
})Copy
```

只有在应用程序发出 `ready` 事件之后, 才能使用 `net` API。尝试在 `ready` 事件之前使用该模块将抛出一个错误。

**方法**

`net` 模块具有以下方法:

- net.request(options)

	+ `options` (ClientRequestConstructorOptions | String) - The `ClientRequest` constructor options.

  返回 [`ClientRequest`](https://electronjs.org/docs/api/client-request)

  使用 `options` 创建 [`ClientRequest`](https://electronjs.org/docs/api/client-request) 实例, 这些选项直接转发到 `ClientRequest` 的构造函数。 `net.request` 方法将根据 `options` 对象中的指定协议方案, 去发送安全和不安全的 HTTP 请求（ both secure and insecure HTTP requests）。

## 注意

Electron的主线程才能用的功能。如果在渲染器进程中想使用的话, 就要引入 remote ，这个remote就包含了主进程中所有的功能。详细解释参见上文 **主进程和渲染器进程** 一节的题外话。