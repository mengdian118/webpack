class AsyncPlugin{
    apply(compiler){
        compiler.hooks.emit.tapAsync('AsyncPlugin',(compliation,cb)=>{
            setTimeout(()=>{
                console.log('文件正发送出来，等一下');
                cb();
            },2000);
        });
        compiler.hooks.emit.tapPromise('AsyncPlugin',(compliation)=>{
            return new Promise((resolve,reject)=>{
                setTimeout(()=>{
                    console.log('再等一下');
                    resolve();
                },2000);
            })
        });
    }
    
}
module.exports = AsyncPlugin