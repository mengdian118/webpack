
let {SyncLoopHook} = require('tapable');
// 同步遇到某个不返回undefined的监听函数会多次执行
class lesson{
    constructor(){
        this.index = 0;
        this.hooks = {
            arch: new SyncLoopHook(['name']),
        }
    };
    tap(){ //注册监听函数
        this.hooks.arch.tap('vue',(name)=>{
            console.log('vue',name);
            return ++this.index === 3? undefined:'learning' 
        });
        this.hooks.arch.tap('react',(name)=>{
            console.log('react',name);
        });
    };
    start(){
        this.hooks.arch.call('mengdian');
    };
}
let l = new lesson();
l.tap() //注册这俩事件
l.start(); //启动钩子