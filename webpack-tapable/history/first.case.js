let {SyncHook} = require('tapable');
class lesson{
    constructor(){
        this.hooks = {
            arch: new SyncHook(['name']),
        }
    };
    tap(){ //注册监听函数
        this.hooks.arch.tap('vue',function(name){
            console.log('vue',name);
        });
        this.hooks.arch.tap('react',function(name){
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