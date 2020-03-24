class SyncWaterfallHooks { //同步钩子
    constructor(args){
        this.tasks = [];
    };
    tap(name,task){
        this.tasks.push(task);
    };
    call(...args){
        let [first,...others] = this.tasks;
        let ret = first(...args);
        others.reduce((a,b)=>{
            return b(a);
        },ret)
    }
}

let hook = new SyncWaterfallHooks(['name']);
hook.tap('react',function(name){
    console.log('react',name);
    return 'react--ok'
    // return undefined
});
hook.tap('vue',function(name){
    console.log('vue',name);
    return 'vue--ok'
})
hook.tap('webpack',function(name){
    console.log('webpack',name);
})
hook.call('mengdian')