class SyncLoopHooks { //同步钩子
    constructor(args){
        this.tasks = [];
    };
    tap(name,task){
        this.tasks.push(task);
    };
    call(...args){
       this.tasks.forEach(task=>{
        let ret;
           do{
            ret = task(...args);
           }while(ret != undefined){

           }
       })
    }
}

let hook = new SyncLoopHooks(['name']);
let total = 0;
hook.tap('react',function(name){
    console.log('react',name);
    return ++total == 3?undefined :'继续学';
});
hook.tap('vue',function(name){
    console.log('vue',name);
})
hook.tap('webpack',function(name){
    console.log('webpack',name);
})
hook.call('mengdian')