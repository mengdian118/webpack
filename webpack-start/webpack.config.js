

let path = require('path'); //node的核心模块，不需要安装
let HtmlWebpackPlugin = require('html-webpack-plugin'); //处理html文件
let MiniCssExtractPlugin = require('mini-css-extract-plugin'); //webpack4使用当前的这个，抽离css 并用link引用
let OptimizeCss = require('optimize-css-assets-webpack-plugin')//压缩css文件
let UglifyJsPlugin = require('uglifyjs-webpack-plugin'); //优化js
const {CleanWebpackPlugin} = require('clean-webpack-plugin'); //清除历史打包的文件
module.exports = {
    devServer:{ //开发服务器的配置
        port:3000,  //服务端口设置
        progress:false, //开启打包时进度
        contentBase:'./dist', //指定目录下文件运行静态服务
        open:true, //自动打开浏览器
        hot:true, //启动热模块替换
        compress:true //启动gzip压缩

    },
    // optimization:{ //在生产环境(production)下走这块 -- 优化项
    //     minimizer:[
    //         new UglifyJsPlugin({
    //             cache:true, //是否缓存
    //             parallel:true, //是否压缩多个
    //             sourceMap:true  //是否源码映射 ，便于调试
    //         }),
    //         new OptimizeCss() //优化css
    //     ]
    // },
    mode: 'development', //模式，默认两种 production development
    entry: "./src/index.js",    //入口文件
    output:{                    //出口文件
        filename: "bundle.[hash:8].js",  //打包后文件名 [hash:8]-- 添加文件的hash值，并可以限制hash值的位数
        path: path.resolve(__dirname,'dist'), //路径必须是一个绝对路径 (__dirname--一般会加上它，表示以当前目录下产生的打包后的目录)
        // publicPath:'http://www.test.com'  这是个假的路径 可根据自己需求去配置cdn路径
    },
    plugins:[ //这里放着所有webpack插件
        new HtmlWebpackPlugin({
            template:'./src/index.html',  //指定模板文件
            filename:'index.html',
            minify:{
                // removeAttributeQuotes: true, //删除html的引号
                collapseWhitespace:true //折叠换行
            },
            hash: true //为资源添加hash
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename:'css/main.css'
        })

    ],
    module:{ //放置模块
        rules:[ //规则  

            
            /*
               一、loader的特点： 希望单一.
               二、loader的用法：
                    1，字符串只用一个loader；
                    2，多个loader 需要用数组[]；
                    3，loader加载顺序是从右向左执行，从下到上执行
                    4，还可以写成 对象格式--loader:{} 它可以传入参数
            */
            //css-loader 处理@import 这种语法
            //style-loader 将css插入head的标签中
            
            {
                test:/\.html$/,
                use:'html-withimg-loader'
            },
            {
                test:/\.(png|jpg|gif|svg|jpeg)$/,
                //为了减少网络请求 对小图片做优化：当我们图片小于多少k的时候 用base64来转化，否者使用file-loader产出真实图片
                use:{
                     loader:'url-loader',
                     options:{
                         name:'[hash:8].[name].[ext]',
                         limit:320*1024, //我这里因为引入图片相对大，所以这里为了测试能看到base64转化效果 用了较大的限制值
                        //  publicPath:'http://www.test.com', 单独针对图片添加前缀cdn路径
                         outputPath:'img/',
                         esModule:false
                        }
                }
            },
            { //处理css文件
            test:/\.css$/,
            use:[
                MiniCssExtractPlugin.loader,
                'css-loader',
                'postcss-loader'
                ]
            },
            { //处理sass文件
                test:/\.scss$/, 
                use:[
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                    'postcss-loader'
                    ]
            },
            { //处理js文件
                test:/\.js$/,
                use:{
                    loader:'babel-loader',
                    options:{ //用babel-loader 需要把es6--es5
                        presets:[
                            '@babel/preset-env'
                        ],
                        plugins:[
                            ["@babel/plugin-proposal-decorators",{"legacy":true}],
                            ['@babel/plugin-proposal-class-properties',{"loose":true}],
                            '@babel/plugin-transform-runtime'
                        ]
                    }
                },
                include:path.resolve(__dirname,'src'), //包括编译文件
                exclude: /node_modules/  //排除被编译文件
            },
            // {
            //     test:/\.js$/,
            //     use:{
            //         loader:'eslint-loader', //校验js规范
            //         options:{
            //             enforce:'pre' //previous----在普通loader之前执行  post--在普通loader之后执行
            //         }
            //     },
            //     include:path.resolve(__dirname,'src'),
            //     exclude: /node_modules/ 
            // },
            {
                test:require.resolve('jquery'),
                use:'expose-loader?$'
            }



        ]
    }

}