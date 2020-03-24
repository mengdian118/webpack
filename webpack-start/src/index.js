
/*  一，测试处理样式*/
import './index.scss';

import testImg from './test.jpg'; //把图片引入，返回的结果是一个新的图片地址

let img = new Image();
console.log(testImg)
img.src=testImg
document.body.appendChild(img)

/*
    二，测试处理全局变量引入
*/
// import $ from 'jquery'
// console.log(window.$)
console.log("hello! my name is ns++1")

/*
   三， 测试处理es6语法
*/
 let fn = () => {
     console.log("这里是使用了ES6语法的箭头函数")
 }
 fn();
 
//  @decorator
 class A{
     a=1;
 }
let a = new A()
console.log(a.a)

// function decorator(target){
//     console.log(target,'23')
// }

/*
    四，处理图片（利用webpack打包图片）
        图片常规引入方式：
        1）在js中创建图片来引入;
            file-loader 默认会在内部生成一张图片 到dist目录下，把生成的图片的名字返回回来
        2）在css中引入background:url('');
        3）在html中利用<img src="" alt="" />引入

*/

