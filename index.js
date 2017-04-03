/**
 * Created by Administrator on 2017/4/3.
 */
const express = require('express');
const bodyParser = require('body-parser');
const template = require('art-template');
const router = require('./router.js');
const app = express();

// 启动静态资源服务
app.use('/www',express.static('www'));
// 处理请求参数
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
// 设置模板引擎
app.engine('.html',template.__express);
app.set('views','./view');
app.set('view engine','html');
// 处理动态路由
app.use(router);
// 启动监听
app.listen(3000,() => {
  console.log('running...');
});