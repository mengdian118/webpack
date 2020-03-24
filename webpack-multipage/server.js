
let express = require('express');

let app = express();
let webpack = require('webpack');

//中间件
let middle = require('webpack-dev-middleware');
let config = require('./webpack.config');
let compiler = webpack(config);
app.use(middle(compiler));

app.get('/user',(req,res) => {
    res.json({name:'服务端启动测试111'})
})
app.listen(3000);
