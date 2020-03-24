
let {AsyncSeriesWaterfallHook} = require('tapable');
class lesson{
    constructor(){
        this.index = 0;
        this.hooks = {
            arch: new AsyncSeriesWaterfallHook(['name']),
        }
    };
    tap(){ //注册监听函数
        this.hooks.arch.tapAsync('vue',(name,cb)=>{
           
                setTimeout(()=>{
                    console.log('vue',name)
                    cb('error','mengdian'); //当第一个参数为error时，则不会执行下一个函数，直接执行callAsync()
                    // cb(null,'mengdian'); //当第一个参数传入null时，则会依次执行下一个函数，并将第二个参数值当作下一个函数被执行时的值传入
                },1000)
            
           
        });
        this.hooks.arch.tapAsync('react',(name,cb)=>{
                setTimeout(()=>{
                    console.log('react',name)
                    cb();
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