
//webpack自动优化：

//import 在生产环境下 会自动去除掉没用的代码（tree-shaking）
// import calc from './test';

//es6模块会把结果放到default上
let calc = require('./test');
console.log(calc.default.sum(1,2));


//scope hosting 作用域提升

let a = 1;
let b = 2;
let c = 3;
let d = a+b+c; //在webpack中自动省略一些 可以简化代码
console.log(d);