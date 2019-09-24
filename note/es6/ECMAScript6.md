# ES6

## ECMAScript 简介

- ECMAScript 是 JavaScript 语言的标准
- ECMA: European Computer Manufacturers Association（欧洲计算机制造商协会）

- ECMAScript6：简称 ES6，是 JavaScript 语言的下一代标准，也是目前正式发布的最新的 JavaScript 标准。由于 ES6 是在 2015 年发布的，所以 ES6 也称为 ECMAScript2015。
- ECMAScript 是 JavaScript 的标准。JavaScript 是 EcmaScript 的实现，就好像。当然，除了 JavaScript，EcmaScript 还有其他的实现，比如 JScript、ActionScript。

## 运行 ECMAScript 的方法

- 浏览器 （都是只支持部分 ES6 代码，有的支持的多，有的支持的少）
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
        let x = n => n + 1;
        console.log(x(3))
      </script>
    </body>
    </html>
    ```



