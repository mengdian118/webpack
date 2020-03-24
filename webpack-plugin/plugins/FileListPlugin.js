class FileListPlugin{
    constructor({filename}){
        this.filename = filename
    }
    apply(compiler){
        //文件已经准备好了 要进行发出
        compiler.hooks.emit.tap('FileListPlugin',(compliation)=>{
            let assets = compliation.assets;
            let content = `## 文件名 资源大小\r\n`;
            Object.entries(assets).forEach(([filename,statobj])=>{
                content += `-${filename} ${statobj.size()}\r\n`
            })
            assets[this.filename] = {
                source(){
                    return content;
                },
                size(){
                    return content.length;
                }
            }
        })
    }
}
module.exports = FileListPlugin