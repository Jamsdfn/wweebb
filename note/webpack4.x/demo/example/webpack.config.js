const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const webpack = require('webpack')

module.exports = {
    entry: {
        index: './src/js/index.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'js/[name].bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            minify: {
                collapseWhitespace: true,
                removeAttributeQuotes: true,
            }
        }),
        new MiniCssExtractPlugin({
            filename: 'css/index.css'
        }),
        new OptimizeCssAssetsPlugin(),
        new webpack.HotModuleReplacementPlugin(),// 热更新
        new webpack.ProvidePlugin({
            $: 'jquery'
        })
    ],
    devServer: {
        host: '127.0.0.1',
        port: 3000,
        open: true,
        hot: true
    },
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
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            interpolate: 'require' // 让页面使用 ES6 的语法把模块引入进来
                        }
                    }
                ]
            },
            {
                test: /\.(gif|png|jpg|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 50*1024,
                            outputPath: 'images'
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                include: path.join(__dirname, 'src/components'),
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
