
let {AsyncSeriesHook} = require('tapable');
class lesson{
    constructor(){
        this.index = 0;
        this.hooks = {
            arch: new AsyncSeriesHook(['name']),
        }
    };
    tap(){ //注册监听函数
        this.hooks.arch.tapAsync('vue',(name,callback)=>{
           
                    setTimeout(()=>{
                        console.log('vue',name)
                        callback();
                    },1000)
           
        });
        this.hooks.arch.tapAsync('react',(name,callback)=>{
            
                setTimeout(()=>{
                    console.log('react',name)
                    callback();
                },1000)
       })
      
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