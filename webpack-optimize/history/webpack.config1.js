
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let webpack = require('webpack')

//happypack 可以实现多线程来打包进程
let Happypack = require('happypack');


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
                use: 'Happypack/loader?id=js',
                include:path.resolve('src'),
                exclude:/node_modules/
            },
            {
                test:/\.css$/,
                use: 'Happypack/loader?id=css',
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
        new Happypack({
            id:'css',
            use:['style-loader','css-loader']
        }),
        new Happypack({
            id:'js',
            use:[
                {
                    loader:'babel-loader',
                    options:{
                        presets:[
                            '@babel/preset-env',
                            '@babel/preset-react'
                        ]
                    }
                }
            ]
        }),
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