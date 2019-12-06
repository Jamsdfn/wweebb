const path = require('path')
//const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
    entry: [
        './app/index.js',
    ],
    output: {
        // path: path.join(__dirname, 'dist'),//必须的属性
        filename: 'bundle.js'//必须属性
    },
    // plugins: [
    //     new MiniCssExtractPlugin({
    //         filename: '[name].css'
    //     })
    // ],
    devServer: {
        port:3000,
        open: true,
        inline: true,
        contentBase:'./app'
    },
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
