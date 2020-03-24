
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin'); //清除历史打包的文件



module.exports = {
    mode: 'production', //production  development
    entry:{
        home: './src/index.js'
    },
    watch:true,
    watchOptions:{ //监控的选项
        poll:1000, //每秒监控1000次
        aggregateTimeout: 500, //防抖
        ignored: /node_modules/  //排除不需要进行监控文件
    },
    output:{
        filename:'[name].[hash:8].js',
        path:path.resolve(__dirname,'dist')
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:['@babel/preset-env']
                    }
                }
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./index.html',
            filename:'index.html'
        }),
        new CleanWebpackPlugin()
    ]
}