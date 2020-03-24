class AsyncSeriesHooks { 
    constructor(args){
        this.tasks = [];
    };
    tapAsync(name,task){
        this.tasks.push(task);
    };
    callAsync(...args){
        let finalCallback = args.pop();
        let index = 0;
        let next = () => {
            if(this.tasks.length === index) return finalCallback();
            let task = this.tasks[index++];
            task(...args,next);
        }
        next()
    }
}

let hook = new AsyncSeriesHooks(['name']);
let total = 0;
hook.tapAsync('react',function(name,callback){
    
        setTimeout(()=>{
            console.log('react',name)
            callback();
        },1000)
 
});
hook.tapAsync('vue',function(name,callback){
    
        setTimeout(()=>{
            console.log('vue',name)
            callback();
        },1000)
   
})
hook.callAsync('mengdian',function(){
    console.log('end')
})