class AsyncParrallHooks { 
    constructor(args){
        this.tasks = [];
    };
    tapPromise(name,task){
        this.tasks.push(task);
    };
    promise(...args){
        let tasks = this.tasks.map(task=>task(...args));
        return Promise.all(tasks)
    }
}

let hook = new AsyncParrallHooks(['name']);
let total = 0;
hook.tapPromise('react',function(name){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log('react',name)
            resolve();
        },1000)
    })
});
hook.tapPromise('vue',function(name){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log('vue',name)
            resolve();
        },1000)
    })
})
hook.promise('mengdian').then(function(){
    console.log('end')
})