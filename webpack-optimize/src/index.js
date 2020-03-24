// let button = document.createElement('button');
// button.innerHTML = '懒加载';

// // vue 懒加载 react懒加载
// button.addEventListener('click',function(){
//     // console.log("click");
//     // es6草案的语法 通过jsonp实现动态加载文件
//     import('./source').then(data => {  //2020 3 21 去使用import时，已经不需要了@babel/plugin-syntax-dynamic-import(动态导入插件)
//         console.log(data.default)
//     })
// })
// document.body.appendChild(button);

import str from './source';
console.log(str)
if(module.hot){
    module.hot.accept('./source',()=>{
        let str = require('./source')
        console.log('文件更新了')
    })
    
}