
let {AsyncSeriesHook} = require('tapable');
class lesson{
    constructor(){
        this.index = 0;
        this.hooks = {
            arch: new AsyncSeriesHook(['name']),
        }
    };
    tap(){ //注册监听函数
        this.hooks.arch.tapPromise('vue',(name)=>{
           return new Promise((resolve,reject) => {
                setTimeout(()=>{
                    console.log('vue',name)
                    resolve();
                },1000)
           })  
           
        });
        this.hooks.arch.tapPromise('react',(name)=>{
            return new Promise((resolve,reject) => {
                setTimeout(()=>{
                    console.log('react',name)
                    resolve();
                },1000)
           })  
       })
      
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