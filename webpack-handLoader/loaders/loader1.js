
function loader(source){ //loader的参数就是源码
    console.log('source1------')
    return source;
}
loader.pitch = function(){
    // return 'stop'  有返回值时 不去执行loader1 无返回值时执行loader1
}
module.exports = loader