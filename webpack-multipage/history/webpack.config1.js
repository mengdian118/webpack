
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin'); //清除历史打包的文件
module.exports = {
    mode: 'production', //production  development
    entry:{
        home: './src/index.js'
    },
    // 1) 源码映射： 会单独生成一个sourcemao文件，当出错了 会标识当前报错的列和行
    // devtool:'source-map', //增加映射文件，可以帮助我们调试源代码
    // 2) 不会产生单独文件 但是可以显示行和列
    // devtool:'eval-source-map',
    // 3)不会产生列 但是是一个单独的映射文件
    // devtool:'cheap-module-source-map', //产生后可保留
    // 4)不会产生文件 集成在打包后的文件中 不会产生列
    devtool:'cheap-module-eval-source-map',
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