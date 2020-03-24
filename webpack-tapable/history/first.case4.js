
let {AsyncParallelHook} = require('tapable');
// 异步的钩子串行 需要等待所有并发的异步事件执行后再执行回调方法
//同时发送多个请求
//注册方法分为 tap tapAsync
class lesson{
    constructor(){
        this.index = 0;
        this.hooks = {
            arch: new AsyncParallelHook(['name']),
        }
    };
    tap(){ //注册监听函数
        this.hooks.arch.tapAsync('vue',(name,cb)=>{
            setTimeout(()=>{
                console.log('vue',name)
                cb();
            },1000);
        });
        this.hooks.arch.tapAsync('react',(name,cb)=>{
            setTimeout(()=>{
                console.log('react',name)
                cb();
            },1000);
        });
    };
    start(){
        this.hooks.arch.callAsync('mengdian',function(){
            console.log('end')
        });
    };
}
let l = new lesson();
l.tap() //注册这俩事件
l.start(); //启动钩子