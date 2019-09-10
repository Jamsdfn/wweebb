const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const glob = require('glob')
const PurifyCSSPlugin = require('purifycss-webpack')


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
    new OptimizeCssAssetsPlugin(),
    new PurifyCSSPlugin({
      paths: glob.sync(path.join(__dirname, 'src/*.html')).concat(glob.sync(path.join(__dirname, 'src/*/*.js'))),
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
      }
    ]
  },
  devServer: {
    host: '127.0.0.1',
    port: 3000,
    open: true
  }
}
