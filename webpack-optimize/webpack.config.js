
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let webpack = require('webpack')


module.exports = {
    mode: 'production', //development  production 
    entry: {
        index: './src/index.js'
    },
    devServer:{
        port: 3000,
        open: true,
        inline: true,
        overlay: true,
        hot:true, //启用热更新
        stats: 'errors-only',
        contentBase:'./dist' //打包后结果放到指定目录下
    },
    resolve:{
        extensions:[".js",".css",".json"]
    },
    /*
        若是使用cheap-module-eval-source-map时，
        无论在开发还是生产环境，
        webpack内置的优化：tree-shaking会失效，若是使用了source-map webpack的tree-shaking仍有效
    */
    // devtool:'cheap-module-eval-source-map',  
    
    module:{
        noParse:/jquery/, //不去解析jquery中依赖的库
        rules:[
            {
                test:/\.js$/,
                use: [
                    {
                        loader:'babel-loader',
                        options:{
                            presets:[
                                '@babel/preset-env',
                                '@babel/preset-react'
                            ]
                        }
                    }
                ],
                include:path.resolve('src'),
                exclude:/node_modules/
            },
            {
                test:/\.css$/,
                use: ['style-loader','css-loader'],
                include:path.resolve('src'),
                exclude:/node_modules/
            }
        ]
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname,'dist')
    },
    plugins:[
       
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        // new webpack.DllReferencePlugin({
        //     manifest:path.resolve(__dirname,'dist','manifest.json')
        // }),
        //忽略掉moment的语言包
        new webpack.IgnorePlugin(/\.\/locale/,/moment/),
        new webpack.HotModuleReplacementPlugin(), //热更新插件
        new webpack.NamedModulesPlugin() //打印更新模块路径
        
    ],
    performance:{
        hints:false
    }
}