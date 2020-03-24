
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin'); //清除历史打包的文件
let copyWebpackPlugin = require('copy-webpack-plugin');
let webpack = require('webpack')
// 1)cleanWbpackPlugin
// 2)copyWebpackPlugin
// 3)bannerPlugin

module.exports = {
    entry:{
        home: './src/index.js'
    },
    devServer:{ //配置代理
        // 1)
        // proxy:{
        //     // '/api':'http://localhost:3000'
        //     '/api':{
        //         target:'http://localhost:3000',
        //         pathRewrite:{'/api':''}
        //     }
        // }
        // 2) 前端想单纯模拟数据
        // before(app){
        //         app.get('/user',(req,res) => {
        //             res.json({name:'前端数据模拟.before'})
        //         })
        // }
        // 3) 有服务端时 不想用代理来处理，能不能在服务端启动webpack 端口用服务端端口
    },
    resolve:{ //解析 第三方common
        modules:[path.resolve('node_modules')],
        extensions:['.js','.css','.json','.vue']
        // mainFields:['style','main']
        // mainFiles:[], //指定入口文件名字
        // alias:{ //别名
        //     bootstrap:'bootstrap/dist/css/bootstrap.css'
        // }
    },
    output:{
        filename:'[name].[hash:8].js',
        path:path.resolve(__dirname,'dist')
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:['style-loader','css-loader']

            },
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
        new webpack.DefinePlugin({  //定义环境变量
            DEV: JSON.stringify('dev'), //production or dev
            FLAG: 'true',
            EXPORESSION: JSON.stringify('1+1')
        }),
        new HtmlWebpackPlugin({
            template:'./index.html',
            filename:'index.html'
        }),
        new CleanWebpackPlugin(),
        // new copyWebpackPlugin([ //拷贝文件
        //     {from:'doc',to:'./'}
        // ]),
        // new webpack.BannerPlugin('make 2020 by ns')
    ]
}