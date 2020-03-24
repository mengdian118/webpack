let path = require('path');
class Meng{
    apply(compiler){
        compiler.hooks.emit.tap('emit',function(){
            console.log('emit')
        })
    }
}
class Meng1{
    apply(compiler){
        compiler.hooks.afterPlugins.tap('emit',function(){
            console.log('afterPlugins')
        })
    }
}

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output:{
        filename: 'bundle.js',
        path:path.resolve(__dirname,'dist')
    },
    module:{
        rules:[
            {
                test:/\.less$/,
                use:[
                    path.resolve(__dirname,'loader','style-loader'),
                    path.resolve(__dirname,'loader','less-loader')
                ]
            }
        ]
    },
    plugins:[
        new Meng(),
        new Meng1(),
    ]
}