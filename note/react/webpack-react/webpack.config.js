const path = require('path')
//const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'dist'),//必须的属性
        filename: 'bundle.js'//必须属性
    },
    // plugins: [
    //     new MiniCssExtractPlugin({
    //         filename: '[name].css'
    //     })
    // ],
    module: {
        rules:[
            {
                test: /\.css$/,
                use: [
                    //MiniCssExtractPlugin.loader,
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test:/\.js$/,
                exclude: /node_modules/,
                use: [
                    'react-hot-loader',
                    "babel-loader"
                ]
            }
        ]
    }
}
