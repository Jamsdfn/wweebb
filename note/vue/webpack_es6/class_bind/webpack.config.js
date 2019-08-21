const htmlWebpackPlugin = require('html-webpack-plugin');
// const VueLoaderPlugin = require('vue-loader/lib/plugin')
const path = require('path')
module.exports = {
    entry: { //main是默认入口,也可以是多入口
        main: './src/main.js'
    },
    //出口
    output: {
        filename: './build.js', //指定js文件
        path: path.join(__dirname, 'dist')          //最好是绝对路径
        //代表当前目录的上一级的dist
    },
    module: {
        //一样的功能rules:   webpack2.x之后新加的
        loaders: [       //require('./a.css||./a.js')
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader',
            },
            {
                test: /\.(jpg|svg|png|gif)$/,
                loader: 'url-loader?limit=4096&name=[name].[ext]',
                //[name].[ext]内置提供的，因为本身是先读这个文件
                // options:{
                //    limit:4096,
                //    name:'[name].[ext]'
                // }
            },
            {//处理ES6的js
                test: /\.js$/,
                loader: 'babel-loader',
                //排除 node_modules下的所有, 因为第三方包也有js文件
                exclude: /node_modules/,
                options: {
                    presets: ['es2015'],//关键字
                    plugins: ['transform-runtime']//函数
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader' // vue-template-compiler 是代码上的依赖，不用自己引入但也要装
            }
        ]
    },
    plugins: [
        //插件的执行顺序是依次执行的
        new htmlWebpackPlugin({
            template: './src/index.html'
        })
        // new VueLoaderPlugin()
        //将src下的template属性描述的文件根据当前配置的output.path，将文件移动到该目录
    ]
}
