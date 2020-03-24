class SyncHooks { //同步钩子
    constructor(args){
        this.tasks = [];
    };
    tap(name,task){
        this.tasks.push(task);
    };
    call(...args){
        this.tasks.forEach((task) => task(...args));
    }
}

let hook = new SyncHooks(['name']);
hook.tap('react',function(name){
    console.log('react',name);
});
hook.tap('vue',function(name){
    console.log('vue',name)
})
hook.call('mengdian')