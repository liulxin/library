/**
 * Created by Administrator on 2017/4/3.
 */
const express = require('express');
const handler = require('./handler.js');
const router = express.Router();

//跳转到登录页面
router.get('/',handler.login);
// 跳转到主页面
router.post('/login',handler.showIndex);
router.post('/register',handler.showIndex);

// 只是为了重定向方便跳转
router.get('/books',handler.showIndex);
// 跳转到添加图书页面
router.get('/toAdd',handler.toAddBook);
// 保存表单提交的图书信息
router.post('/addBook',handler.addBook);
// 跳转到编辑图书页面
router.get('/toEdit',handler.toEditBook);
// 保存编辑图书的信息
router.post('/editBook',handler.editBook);
// 要删除的数据所对应的id
router.get('/deleteBook',handler.deleteBook);

module.exports = router;