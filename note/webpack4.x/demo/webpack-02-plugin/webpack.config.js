const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
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
            filename: 'index1.html',
            inject: true,// 值为 head，会把 js 文件在 head 标签里引入，值为 true/body，会把 js 文件在 body 的结束标签前引入
            hash:true,// 在引入文件后加一个hash值，如：xxx.js?0deedada
            chunks: ['one', 'two'],// 引入特定的 js 文件，而不是引入 output 中所有的文件，值为 entry 的 key，
            minify: {// 对 html 文件进行压缩
                collapseWhitespace: true,// 压缩空格
                removeAttributeQuotes: true,// 删除引号，引号删除但依然可有运行
                removeComments: true,// 压缩注释
            }
        }),
        // 多次 new 就可以生成多个 HTML 文件
        new HtmlWebpackPlugin({
            title: '1',
            template: './src/template.html',
            filename: 'index3.html',
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
