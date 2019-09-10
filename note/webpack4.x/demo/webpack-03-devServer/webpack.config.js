const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
        one: './src/1.js',
        two: './src/2.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].bundle.js'// 热加载开发的时候用hash或者去掉chunkhash，在打包上线的时候才加回来，热加载不需要热替换
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
    mode: 'production'
}
