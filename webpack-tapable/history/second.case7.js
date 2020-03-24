class AsyncSeriesHooks { 
    constructor(args){
        this.tasks = [];
    };
    tapPromise(name,task){
        this.tasks.push(task);
    };
    promise(...args){
        let [first,...others] = this.tasks;
        return others.reduce((pro,next) => {
           return pro.then(() => next(...args))
        },first(...args))
        
    }
}

let hook = new AsyncSeriesHooks(['name']);
hook.tapPromise('react',function(name){
    return new Promise((resolve,reject) => {
        setTimeout(()=>{
            console.log('react',name)
            resolve();
        },1000)
    })
});
hook.tapPromise('vue',function(name){
    return new Promise((resolve,reject) => {
        setTimeout(()=>{
            console.log('vue',name)
            resolve();
        },1000)
    })
   
})
hook.promise('mengdian').then(function(){
    console.log('end')
})