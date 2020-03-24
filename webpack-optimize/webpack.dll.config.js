
let path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
let webpack = require('webpack');

module.exports = {
    mode:'development',
    entry:{
        react:['react','react-dom']
    },
    output:{
        filename:'_dll_[name].js', //产生的文件名
        path:path.resolve(__dirname,'dist'),
        library:'_dll_[name]', 
        // libraryTarget:'var' //commonjs var(默认) this umd...
    },
    plugins:[
        new CleanWebpackPlugin(),
        new webpack.DllPlugin({ //name == library 配置动态链接库
            name:'_dll_[name]',
            path:path.resolve(__dirname,'dist','manifest.json')
        })
        
    ]
}