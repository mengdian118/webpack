class AsyncSeriesWaterfallHooks { 
    constructor(args){
        this.tasks = [];
    };
    tapAsync(name,task){
        this.tasks.push(task);
    };
    callAsync(...args){
        let finalCallback = args.pop();
        let index = 0;
        let next = (err,data) => {
            let task = this.tasks[index];
            if(!task) return finalCallback();
            if(index === 0){
                task(...args,next)
            }else{
                task(data,next)
            }
            index++;
        }
        next();
    }
}

let hook = new AsyncSeriesWaterfallHooks(['name']);
hook.tapAsync('react',function(name,cb){
        setTimeout(()=>{
            console.log('react',name)
            cb(null,'mengdian111');
        },1000)
    
});
hook.tapAsync('vue',function(name,cb){
        setTimeout(()=>{
            console.log('vue',name)
            cb(null);
        },1000)
    
   
})
hook.callAsync('mengdian',function(){
    console.log('end')
})