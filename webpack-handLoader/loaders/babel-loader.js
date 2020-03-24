let babel = require('@babel/core');
let loaderUtils = require('loader-utils');
function loader(source){
    // console.log(Object.keys(this))
    let options = loaderUtils.getOptions(this);
    let cb = this.async();
    babel.transform(source,{
        ...options,
        sourceMap:true,
        filename:this.resourcePath.split('/').pop()
    },function(err,result){
        // console.log(result)
        cb(err,result.code,result.map);
    })
    // console.log(options)
    // return source;
}
module.exports = loader