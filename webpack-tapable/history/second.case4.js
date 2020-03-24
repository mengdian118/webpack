class AsyncParrallHooks { 
    constructor(args){
        this.tasks = [];
    };
    tapAsync(name,task){
        this.tasks.push(task);
    };
    callAsync(...args){
       let finalCallback = args.pop();
       let count=0;
       let done = ()=>{ //类似于 Promise.all
            count++;
            if(count == this.tasks.length){
                    finalCallback();
            }
       };
       this.tasks.forEach(task=>{
           task(...args,done);
       })
    }
}

let hook = new AsyncParrallHooks(['name']);
let total = 0;
hook.tapAsync('react',function(name,cb){
    setTimeout(()=>{
        console.log('react',name)
        cb();
    },1000)
});
hook.tapAsync('vue',function(name,cb){
    setTimeout(()=>{
        console.log('vue',name)
        cb();
    },1000)
})
hook.callAsync('mengdian',function(){
    console.log('end')
})