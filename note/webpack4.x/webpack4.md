# webpack4.x

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
npm install -g webpack-cli
# 如果要局部版本，就在工程目录安装相对性版本的 webpack，然后在工程目录的 package.json 文件加上 "scripts": {"webpack":"webpack"} 然后就可以用 npm 运行局部版本的 webpack 了。
npm run webpack
```

### 使用

```shell
# 没有 webpack 配置文件 把 /src/js/entry.js 编译成 /dist/js/bulid.js
webpack /src/js/entry.js /dist/js/bulid.js
# 有 webpack.config.js 文件
webpack
```

####  单入口最简单的配置

```js
const path = require('path')

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.join(__dirname, 'dist'),//必须的属性
        filename: 'bundle.js'//必须属性
    }
}
```

####  多入口最简单的配置

```js
const path = require('path')

module.exports = {
    entry: {
        one: './src/1.js',//这里的 key 就对应 output [name] 占位符的内容
        two: './src/2.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        // 生成 one/two.六位hash.bundle.js 文件
        filename: '[name].[chunkhash:6].bundle.js'
    }
}

```

####  webpack 插件

安装 => 引入 => 配置

```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// clean-webpack-plugin 这个插件最新版本要这样引入，不然会报错
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
module.exports = {
    entry: {
        one: './src/1.js',
        two: './src/2.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].[chunkhash:6].bundle.js'
    },
    plugins: [
        new CleanWebpackPlugin(), //删除 上一次 webpack打包的文件
        new HtmlWebpackPlugin({ // 未提及的参数可以自行到官网或者 github 上查询
            title: 'plugin',// html 标签的 title 标签
            template: './src/template.html',
            filename: 'index.html',
            inject: true,// 值为 head，会把 js 文件在 head 标签里引入，值为 true/body，会把 js 文件在 body 的结束标签前引入
            hash:true,// 在引入文件后加一个hash值，如：xxx.js?0deedada
            chunks: ['one', 'two'],// 引入特定的 js 文件，而不是引入 output 中所有的文件，值为 entry 的 key，
            minify: {// 对 html 文件进行压缩
                collapseWhitespace: true,// 压缩空格
                removeAttributeQuotes: true,// 删除引号，引号删除但依然可有运行
                removeComments: true,// 压缩注释
            }
        }),
        // 多次 new 这个插件就可以生成多个 HTML 文件
        new HtmlWebpackPlugin({
            title: '1',
            template: './src/template.html',
            filename: 'index.html',
            inject: true,
            hash:true,
            chunks: ['one'],
            minify: {
                collapseWhitespace: true,
                removeAttributeQuotes: true,
                removeComments: true,
            }
        })
    ]
}
```

####  用 webpack 配置服务器环境（热加载）

安装

```shell
npm i -D webpack-dev-server
```

配置

```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
        one: './src/1.js',
        two: './src/2.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].bundle.js'// 热加载开发的时候用hash或者去掉chunkhash，在打包上线需要版本控制的时候才加回来
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'plugin',
            template: './src/template.html',
            filename: 'index.html',
            inject: true,
            hash:true,
            chunks: ['one', 'two'],
        }),
    ],
    // 配置服务器
    devServer: {// 其实文件不配置也可以在控制台或者 package.json 中通过输入相关参数来配置服务器
        host: '127.0.0.1',
        port: 3000
    }
}

```

使用

- 方法一

```shell
# 直接运行文件:找到项目的 node_modules 下的 .bin\webpack-dev-server 运行就可以了
.\\node_modules\\.bin\\webpack-dev-server --inline --hot --open
```

- 方法二

  - 先在 package.json 文件加入配置项（没有就在文件夹中建一个）

  ```json
  {
      "scripts": {
          "dev": "webpack-dev-server --inline --hot --open"
      }
  }
  ```

  - 在文件目录下运行命令行

  ```shell
  npm run dev
  ```

- 方法三

```shell
# 全局下安装 devServer
npm i -g webpack-dev-server
# 然后直接运行
webpack-dev-server
```

#### mode 设置代码的运行环境（4.x新增的）

- development  开发环境  

	+ 使用eval构建 module, 提升增量构建速度 
	+ 不需要定义 new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("development") }) 默认 development 
	+ 默认开启 NamedModulesPlugin -> optimization.namedModules 使用模块热替换(HMR)时会显示模块的相对路径  
	+ 有浏览器调试工具，开发阶段的详细错误日志和提示，快速和优化的增量构建机制 
- production 生产环境  

  - 提供 uglifyjs-webpack-plugin 代码压缩 

  - 不需要定义 new webpack.DefinePlugin({"process.env.NODE_ENV": JSON.stringify("production") }) 默认 production 

  - 默认开启 NoEmitOnErrorsPlugin -> optimization.noEmitOnErrors, 编译出错时跳过输出，以确保输出资源不包含错误 

  - 默认开启 ModuleConcatenationPlugin -> optimization.concatenateModules, webpack3 添加的作用域提升(Scope Hoisting) 

  - 开启所有的优化代码，更小的 bundle 大小，去除掉只在开发阶段运行的代码，自动启用uglifyjs对代码进行压缩 

- 也可以在 webpack.config.js 中不写 mode，直接在控制台输入命令时加上 
  - `webpack --mode development`
  - `webpack --mode production`

简单的说就是在上线前不用手动配置生产模式的一大堆配置，比如压缩文件什么的。

配置

```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: {
        one: './src/1.js',
        two: './src/2.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].[chunkhash].bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'plugin',
            template: './src/template.html',
            filename: 'index.html',
        }),
    ],
    mode: 'production'
    //mode: 'development'  
}
```

#### loader

##### css

- 安装

```shell
# 用 3.x 老版本的所用到的插件，官方已经不推荐了
npm i extract-text-webpack-plugin@next -D
# 用一个新出的插件，官方推荐
npm i mini-css-extract-plugin -D
```

- 4.x老插件的使用

```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
module.exports = {
    entry: './src/js/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'js/index.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'plugin',
            template: './src/template.html',
            filename: 'index.html',
        }),
        new ExtractTextPlugin({
            filename: 'css/index.css'
        })
    ],
    module: {
        rules:[
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: 'css-loader',
                    fallback: 'style-loader'
                })
            },
        ]
    },
    devServer: {
        host: '127.0.0.1',
        port: 3000,
        open: true
    }
}
```

- 4.x用新插件

```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
    entry: './src/js/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'js/index.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'plugin',
            template: './src/template.html',
            filename: 'index.html',
        }),
        new MiniCssExtractPlugin({
            filename: 'css/index.css'
        })
    ],
    module: {
        rules:[
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
        ]
    },
    devServer: {
        host: '127.0.0.1',
        port: 3000,
        open: true
    }
}
```

- 对 css 文件进行压缩

安装压缩插件

```shell
npm i optimize-css-assets-webpack-plugin -D
```

使用：

```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')//引入
module.exports = {
    entry: './src/js/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'js/index.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'plugin',
            template: './src/template.html',
            filename: 'index.html',
        }),
        new MiniCssExtractPlugin({
            filename: 'css/index.css'
        }),
        new OptimizeCssAssetsPlugin()// 直接 new 就能压缩了
    ],
    module: {
        rules:[
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
        ]
    },
    devServer: {
        host: '127.0.0.1',
        port: 3000,
        open: true
    }
}
```

##### 图片处理

- file-loader

  - 安装

  ```shell
  npm i file-loader -D
  ```

  - 使用

  ```js
  const path = require('path')
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  const MiniCssExtractPlugin = require('mini-css-extract-plugin')
  const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
  module.exports = {
      entry: './src/js/index.js',
      output: {
          path: path.join(__dirname, 'dist'),
          filename: 'js/index.js'
      },
      plugins: [
          new HtmlWebpackPlugin({
              title: 'plugin',
              template: './src/template.html',
              filename: 'index.html',
          }),
          new MiniCssExtractPlugin({
              filename: 'css/index.css'
          }),
          new OptimizeCssAssetsPlugin()
      ],
      module: {
          rules:[
              {
                  test: /\.css$/,
                  // 因为通常图片和css文件不在同一个文件，所以这样配置会产生路径错误
                  // use: [MiniCssExtractPlugin.loader, 'css-loader']
                  use:[
                      {
                          loader: MiniCssExtractPlugin.loader,
                          options: {
                              // css文件里的所有路径，都在前面统一加一个 ../
                              publicPath: '../'
                          }
                      },
                      'css-loader'
                  ]
              },
              {
                  test: /\.(jpg|png|gif|svg)$/,
                  use:[
                      {
                          loader: 'file-loader',
                          options: {
                              outputPath:'images'//统一放入文件夹中
                          }
                      }
                  ]
              }
          ]
      }
  }
  ```

- url-loader

  - 安装

  ```shell
  # 因为如果给 url-loader 设置限制大小的话，url-loader就会默认用 file-loader 来处理图片，所以file-loader 也要
  npm i url-loader file-loader -D
  ```

  - 使用

  ```js
  const path = require('path')
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  const MiniCssExtractPlugin = require('mini-css-extract-plugin')
  const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
  module.exports = {
      entry: './src/js/index.js',
      output: {
          path: path.join(__dirname, 'dist'),
          filename: 'js/index.js'
      },
      plugins: [
          new HtmlWebpackPlugin({
              title: 'plugin',
              template: './src/template.html',
              filename: 'index.html',
          }),
          new MiniCssExtractPlugin({
              filename: 'css/index.css'
          }),
          new OptimizeCssAssetsPlugin()
      ],
      module: {
          rules:[
              {
                  test: /\.css$/,
                  use:[
                      {
                          loader: MiniCssExtractPlugin.loader,
                          options: {
                              publicPath: '../'
                          }
                      },
                      'css-loader'
                  ]
              },
              {
                  test: /\.(jpg|png|gif|svg)$/,
                  use: [{
                      loader: 'url-loader',
                      options: {
                          limit: 8*1024,
                          outputPath: 'images'
                      }
                  }]
              }
          ]
      },
      devServer: {
          host: '127.0.0.1',
          port: 3000,
          open: true
      }
  }
  ```

##### less

- 安装

```shell
npm i less less-loader -D
```

- 使用

```js
{
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          'css-loader',
          'less-loader'
        ]
      },
```

##### 去除多余的 css 样式

对于一些 ui 框架，比如 bootstrap 其实有一大部分的样式我们都是用不到的，如果全部引进来，会让引入的文件体积过大，导致用户体验不好，就要用到这个 去除多余 css 样式的插件来减小体积。

- 安装

```shell
npm i purifycss-webpack purify-css -D
```

- 使用

```js
...
const glob = require('glob')// 必须引入
const PurifyCSSPlugin = require('purifycss-webpack')// 引入

module.exports = {
  entry: './src/js/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'js/index.js'
  },
  plugins: [
    ...
    new PurifyCSSPlugin({  // new 就可以了
      paths: glob.sync(path.join(__dirname, 'src/*.html')),// 扫描src目录下的 html 文件
    }),
  ],
  ...
}
```

##### babel-loader 解析EcmaScript6

- 安装（建议不要安装最高版本，坑巨多，loader更新太快，别的配套的那几个插件更新跟不上）

```shell
npm i -D babel-loader@7.1.5 babel-core babel-preset-env
```

- 使用

```js
{
        test: /\.js$/,
            // 下面那句话是排除查询 node_modules 文件夹 和 include 等效
        // exclude: /node_modules/,
          //限定查询范围 限定在配置的路径里
        include: path.join(__dirname, 'src/js'),
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['env']
            }
          }
        ]
      }
    ]
  },
```

##### react 的 JSX 解析

- 安装react

```shell
npm i react react-dom babel-preset-react -D
```

- 使用

```js
{
  test: /\.js$/,
  // exclude: /node_modules/,
  include: path.join(__dirname, 'src/js'),
  use: [
    {
      loader: 'babel-loader',
      options: {
        presets: ['env','react']
      }
    }
  ]
},
```

如果要用到 jsx 语句，又用 purifycss 去除多余的 css 时，配置的时候 glob.sync 中配置所有你引用过样式的文件（注意路径），如 html,jsx。

```js
new PurifyCSSPlugin({
    // arr1.concat(arr2),返回一个合并的数组
      paths: glob.sync(path.join(__dirname, 'src/*.html')).concat(glob.sync(path.join(__dirname, 'src/*/*.js'))),
    }),
```

##### html-loader 实现组件化

安装

```shell
npm i -D html-loader
```

使用

```js
module: {
    rules: [
        {
            test: /\.html$/,
            use: [
                {
                    loader: 'html-loader',
                    options: {
                        // 让页面可以使用 ES6 语法把模块引进来
                        interpolate: 'require'
                    }
                }
            ]
        }
    ]
}
```

```html
<!-- template.html -->
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
    <!-- 引入组件 -->
  ${require('./components/head/head.html')}
  ${require('./components/body/body.html')}
  ${require('./components/footer/footer.html')}
</body>
</html>
```

#### 引入第三方包

可以直接 import ，也可以用下面的方法（webpack 内置的插件）

```js
// 引入
const webpack = require('webpack')
// 插件调用
new webpack.ProvidePlugin({
      $: 'jquery',
      _: 'underscore'
    }),
```

#### 分离第三方包

webpack4.3 版本以下可以用以前 3.x 版本时候用的 CommonsChunkPlugin。4.3版本以上的就不能用这个了。要用到 optimization 属性：

- 能被提取的条件 
  - 模块被重复引用或者来自node_modules中的模块
  - 模块压缩前至少有30kb   （小于30kb的模块不值得再单独发送一次请求，在很小的模块的前提下，相比与多次打包，减少请求次数成本要低）
  - 按需（异步）请求的数量小于5个
  - 初始化加载时，请求数量小于等于3


```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: {
    a: './src/js/a.js',
    b: './src/js/b.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'js/[name].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'a',
      template: './src/template.html',
      filename: 'a.html',
      // 需要引入的 js 文件
      chunks: ['a', 'vendor']
    }),
    new HtmlWebpackPlugin({
      title: 'b',
      template: './src/template.html',
      filename: 'b.html',
      chunks: ['a', 'vendor']
    }),
    new MiniCssExtractPlugin({
      filename: 'css/index.css'
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          'css-loader'
        ]
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8 * 1024,
              outputPath: 'images'
            }
          }
        ]
      },
    ]
  },
  devServer: {
    host: '127.0.0.1',
    port: 3000,
    open: true
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        js: {
          name: 'vendor',
          test: /\.js$/,
          chunks: 'initial'
        }
      }
    }
  }
}

```

### 其他

#### require.ensure (异步加载/代码切割)

主要用于动态加载模块，比如第三方模块过大，并且只在特定条件下才有用，一打开就加载他的话用户体验很不好，那么就在特定条件触发时才加载第三方模块，并执行。

- require.ensure在需要的时候才下载依赖的模块，当参数指定的模块都下载下来了（下载下来的模块还没执行），便执行

- 参数指定的回调函数。require.ensure会创建一个chunk，且可以指定该chunk的名称，如果这个chunk名已经存在了，则将本次依赖的模块合并到已经存在的chunk中，最后这个chunk在webpack构建的时候会单独生成一个文件。

- 语法: require.ensure(dependencies: String[], callback: function([require]), [chunkName: String])

  ​	1. dependencies: 依赖的模块数组

  ​	2. callback: 回调函数，该函数调用时会传一个require参数

  ​	3. chunkName: 模块名，用于构建时生成文件时命名使用

注意点：requi.ensure的模块只会被下载下来，不会被执行，只有在回调函数使用require(模块名)后，这个模块才会被执行。

```js
$('#center').click(() => {
    // require.ensure在需要的时候才下载依赖的模块，当参数指定的模块都下载下来了（下载下来的模块还没执行），便执行
    // 第一个参数 声明依赖文件 第二个参数 执行依赖文件
    require.ensure(['../img/img.js'], require => require('../img/img.js'))
})

```



