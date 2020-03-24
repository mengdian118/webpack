let fs = require('fs'),
    path = require('path'),
    babylon = require('babylon'),
    t = require('@babel/types'),
    ejs = require('ejs'),
    {SyncHook} = require('tapable'),
    traverse = require('@babel/traverse').default,
    generator = require('@babel/generator').default;
 
//babylon 主要就是把源码 转换成ast;
//@babel/traverse 遍历对应的节点
//@babel/types 对当前的节点进行替换
//@babel/generator 对替换好的结果生成
class Compiler{
      constructor(config){
          //entry output
          this.config = config;
          //需要保存入口文件的路径
          this.entryId;  // './src/index/js'
          //需要保存所有的模块依赖
          this.modules = {};
         this.entry = config.entry; //入口路径;
         // 工作路径
         this.root = process.cwd();
         this.hooks = {
             entryOption:new SyncHook(),
             compile:new SyncHook(),
             afterCompile:new SyncHook(),
             afterPlugins:new SyncHook(),
             run:new SyncHook(),
             emit:new SyncHook(),
             done:new SyncHook()
         }
         //如果出檐低了plugin参数
         let plugins = this.config.plugins;
         if(Array.isArray(plugins)){
                plugins.forEach(plugin => {
                    plugin.apply(this);
                })
         }
         this.hooks.afterPlugins.call();
      };
      getSource(modulePath){
          let rules = this.config.module.rules;
          let content = fs.readFileSync(modulePath,'utf8')
          for(let i = 0; i<rules.length; i++){
              let rule = rules[i];
              let {test,use} = rule;
              let len = use.length - 1;
              if(test.test(modulePath)){ //这个模块需要通过loader来转化
                //loader获取对应的loader函数
                function normalLoader(){
                    let loader = require(use[len--]);
                    //递归调用loader实现转化功能
                    content = loader(content);
                    if(len>=0){
                        normalLoader()
                    }
                }
                normalLoader()
              }
          }
          return content;
      };
      //解析源码
      parse(source,parentPath){ //AST解析语法树
         let ast = babylon.parse(source),
             dependencies = [] //依赖数组
         traverse(ast,{
             CallExpression(p){
                 let node = p.node; //拿到对应节点
                 if(node.callee.name === 'require'){
                     node.callee.name = "__webpack_require__";
                     let moduleName = node.arguments[0].value //取到的就是模块的引用名字
                     moduleName = moduleName + (path.extname(moduleName)?'':'.js');
                     moduleName = "./"+path.join(parentPath,moduleName); //'./'+'src/a.js'
                     dependencies.push(moduleName); //添加依赖
                     node.arguments = [t.stringLiteral(moduleName)] //修改源码

                 }
             }
         })
         let sourceCode = generator(ast).code;
         return {sourceCode,dependencies}
      }

      //构建模块
      buildModule(modulePath,isentry){
          //取出模块内容
        let source = this.getSource(modulePath)
        //取模块id 利用总路径-工作路径
        let moduleName = './'+path.relative(this.root,modulePath)
        // console.log(source,moduleName)
        if(isentry){
            this.entryId = moduleName //保存入口名字
        }
        //解析需要把source源码进行改造 返回一个依赖列表
        let {sourceCode,dependencies} = this.parse(source,path.dirname(moduleName))
        // console.log(sourceCode,dependencies)
        
        //把相对路径和模块中的内容 对应起来
        this.modules[moduleName] = sourceCode; 
        dependencies.forEach(dep => { //父模块的加载 递归加载
            // console.log(dep);
            this.buildModule(path.join(this.root,dep),false)
        })

      };
      emitFile(){//发射文件
            // 用数据渲染我们的模板
            let main = path.join(this.config.output.path,this.config.output.filename);
            let templateStr = this.getSource(path.join(__dirname,'main.ejs'));
            let code = ejs.render(templateStr,{entryId:this.entryId,modules:this.modules})
            this.assets = {}
            //资源中的 路径对应的代码
            this.assets[main] = code
            // console.log(main)
            fs.writeFileSync(main,this.assets[main]);
      };
      run(){
          this.hooks.run.call();
          this.hooks.compile.call();
          //执行 并且常见模块的依赖关系
          this.buildModule(path.resolve(this.root,this.entry),true)
          //console.log(this.modules,this.entryId)
          this.hooks.afterCompile.call();
          
          //发射一个文件 打包后的文件
          this.emitFile()
          this.hooks.emit.call();
          this.hooks.done.call();
      }
}
module.exports = Compiler