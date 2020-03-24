
let {AsyncParallelHook} = require('tapable');
// 异步的钩子串行 需要等待所有并发的异步事件执行后再执行回调方法
//同时发送多个请求
//注册方法分为 tap tapAsync

//tapable库总结---三种注册方法： tap同步注册  tapAsync(cb) tapPromise(注册是promise)



class lesson{
    constructor(){
        this.index = 0;
        this.hooks = {
            arch: new AsyncParallelHook(['name']),
        }
    };
    tap(){ //注册监听函数
        this.hooks.arch.tapPromise('vue',(name)=>{
           return new Promise((resolve,reject)=>{
                    setTimeout(()=>{
                        console.log('vue',name)
                        resolve();
                    },1000)
           })
        });
        this.hooks.arch.tapPromise('react',(name)=>{
            return new Promise((resolve,reject)=>{
                setTimeout(()=>{
                    console.log('react',name)
                    resolve();
                },1000)
       })
        });
    };
    start(){
        this.hooks.arch.promise('mengdian').then(function(){
            console.log('end')
        });
    };
}
let l = new lesson();
l.tap() //注册这俩事件
l.start(); //启动钩子