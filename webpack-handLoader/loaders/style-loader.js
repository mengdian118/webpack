let loaderUtils = require('loader-utils');
function loader(source){
    //在style-loader中导出一个脚本
    let str = `
        let style = document.createElement('style');
        style.innerHTML = ${JSON.stringify(source)};
        document.head.appendChild(style)
    `
    return str;
    //
}
loader.pitch = function (remainingrequest){ //剩余的请求
    console.log(remainingrequest)
    let str = `
        let style = document.createElement('style');
        style.innerHTML = require(${loaderUtils.stringifyRequest(this,
        '!!' + remainingrequest)});
        document.head.appendChild(style);
    `
    return str;
}

module.exports = loader