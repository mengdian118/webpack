
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let webpack = require('webpack')

//happypack 可以实现多线程来打包进程
let happypack = require('happypack');


module.exports = {
    mode: 'development', //development  production 
    entry: './src/index.js',
    devServer:{
        port: 3000,
        open: true,
        inline: true,
        overlay: true,
        stats: 'errors-only',
        contentBase:'./dist' //打包后结果放到指定目录下
    },
    devtool:'cheap-module-eval-source-map',
    module:{
        noParse:/jquery/, //不去解析jquery中依赖的库
        rules:[
            {
                test:/\.js$/,
                use: {
                    loader:'babel-loader',
                    options:{
                        presets:[
                            '@babel/preset-env',
                            '@babel/preset-react'
                        ]
                    }
                },
                include:path.resolve('src'),
                exclude:/node_modules/
            }
        ]
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname,'dist')
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new webpack.DllReferencePlugin({
            manifest:path.resolve(__dirname,'dist','manifest.json')
        }),
        //忽略掉moment的语言包
        new webpack.IgnorePlugin(/\.\/locale/,/moment/)
        
    ]
}