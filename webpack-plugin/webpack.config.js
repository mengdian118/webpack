let path = require('path'),
    DonePlugin = require('./plugins/DonePlugin'),
    AsyncPlugin = require('./plugins/AsyncPlugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    FileListPlugin = require('./plugins/FileListPlugin'),
    MiniCssExtractPlugin = require('mini-css-extract-plugin'),
    InlineSourcePlugin = require('./plugins/inlineSource'),
    UploadPlugin = require('./plugins/UploadPlugin');
module.exports = {
    mode:'development',
    entry:'./src/index.js',
    output:{
        filename:'bundle.js',
        path:path.resolve(__dirname,'dist')
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[MiniCssExtractPlugin.loader,'css-loader']
            }
        ]
    },
    plugins:[
        new MiniCssExtractPlugin({
            filename:'main.css'
        }),
        new HtmlWebpackPlugin({
                template:'./src/index.html'
        }),
        new　FileListPlugin({
            filename:'list.md'
        })
        // new UploadPlugin({
        //     bucket:'', //上传哪个资源上
        //     domain:'', //上传哪个域名上
        //     accessKey:'Mj76wS2JAEiLxPsVfPhV-utxdX725cS3MmhZpiAi', //访问的key
        //     secretkey:'URKjwYUzIpmLtd1fT_9kq-ctVTHrAzKTHp32Rpcz', //密钥key

        // })
        // new InlineSourcePlugin({
        //     match:/\.(js|css)$/
        // })
        // new DonePlugin(), 
        // new AsyncPlugin()
    ]
}