const path = require('path')

module.exports = {
    entry: {
        one: './src/1.js',
        two: './src/2.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].[chunkhash:6].bundle.js'
    }
}
