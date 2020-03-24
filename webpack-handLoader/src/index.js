
// -! 不是让文件 再去通过pre + normal loader来处理了
// ! 没有normal
// !!什么都不要 只要行内处理
// let str = require('-!inline-loader!./a.js')
// console.log('hello')

//loader 默认由两部分组成 pitch(代表loader的头)  normal

// class Mengdian{
//     constructor(){
//         this.name = 'mengdian';

//     }
//     getName(){
//         return this.name;
//     }
// }
// let mengDian = new Mengdian()
// console.log(mengDian.getName())

// import p from './test.jpg';
// let img = document.createElement('img');
// img.src = p;
// img.style.width = '300px';

// document.body.appendChild(img);

import './index.less'