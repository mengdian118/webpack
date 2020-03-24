class SyncBilHooks { //同步钩子
    constructor(args){
        this.tasks = [];
    };
    tap(name,task){
        this.tasks.push(task);
    };
    call(...args){
        // this.tasks.forEach((task) => task(...args));
        let ret; //当前这个函数的返回值
        let index = 0; //当前需要先执行第一个
        do{
            ret = this.tasks[index++](...args);
        }while(ret === undefined && index < this.tasks.length){

        }
    }
}

let hook = new SyncBilHooks(['name']);
hook.tap('react',function(name){
    console.log('react',name);
    // return '停止向下执行'
    // return undefined
});
hook.tap('vue',function(name){
    console.log('vue',name)
})
hook.call('mengdian')