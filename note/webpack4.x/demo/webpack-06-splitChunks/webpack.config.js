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
