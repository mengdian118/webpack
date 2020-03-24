
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin'); //清除历史打包的文件
module.exports = {
    //多入口
    mode:'development',
    entry:{
        home: './src/index.js',
        other:'./src/other.js'
    },
    output:{
        filename:'[name].[hash:8].js',
        path:path.resolve(__dirname,'dist')
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./index.html',
            filename:'home.html',
            chunks:['home']
        }),
        new HtmlWebpackPlugin({
            template:'./index.html',
            filename:'other.html',
            chunks:['other']
        }),
        new CleanWebpackPlugin()
    ]
}