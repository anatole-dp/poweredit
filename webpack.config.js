const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    entry: './src/index.js',
    plugins: [new MiniCssExtractPlugin()],
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'poweredit.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            }
        ]
    }
}