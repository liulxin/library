/**
 * Created by Administrator on 2017/4/3.
 */
	// handler主要实现具体的业务逻辑
const template = require('art-template');
const querystring = require('querystring');
const url = require('url');
const mysql = require('mysql');
const db = require('./db.js')


// 计算数据列表中id的最大值
let countMax = (data) => {
  let arr = [];
  data.forEach((e) => {
	arr.push(e.id);
  });
  let max = Math.max.apply(null, arr);
  return max;
}
//跳转到登录页面
exports.login = (req, res) => {
  //去数据库查询数据
  res.render('login', {});
}
// 跳转到主页 判断登录注册
exports.showIndex = (req, res) => {
  //去数据库把所有数据查询出来  和模板拼接 返回前台
  if (req.url.startsWith('/login')) {
	console.log(1);
	let param = req.body;
	let sql = 'select count(*) as cc from userinfo where username=? and password=?';
	let data = [param.username, param.password];
	db.base(sql, data, (ret) => {
	  console.log(ret);
	  if (ret[0].cc == 1) {
		// 添加图书
		// let connect=mysql.createConnection({
		//  'host':'localhost',
		//  'user':'root',
		//  'password':'',
		//  'database':'book'
		// });
		// connect.connect();
		//
		// let sql='select * from bookinfo';
		// let data=null;
		// connect.query(sql,data,(err,rows,fields)=>{
		//  console.log(rows);
		//  res.render('books',{list:rows})
		// })
		// connect.end()
		let sql = 'select * from bookinfo';
		let data = null;
		db.base(sql, data, (ret) => {
		  res.render('books', {list: ret})
		})
	  } else {
		res.render('confirm', {})
	  }
	});
  }
  if (req.url.startsWith('/register')) {
	console.log(2);
	let sql = 'insert into userinfo(username,password) values(?,?)';
	let data = [req.body.username, req.body.password]
	db.base(sql, data, (ret) => {
	  //console.log(ret);
	  if (ret.affectedRows == 1) {
		console.log('添加成员信息成功');
		res.render('ok', {})
	  }
	})
  }
  if(req.url.startsWith('/books')){
	let sql = 'select * from bookinfo';
	let data = null;
	db.base(sql, data, (ret) => {
	  res.render('books', {list: ret})
	})
  }
}
// 跳转到添加图书页面
exports.toAddBook = (req, res) => {
  res.render('addBook', {});
}
// 保存添加图书信息
exports.addBook = (req, res) => {
  // 把表单数据解析成为对象形式
  //let obj=req.body;
  let sql = 'insert into bookinfo(name,author,category,description) values(?,?,?,?)';
  let data = [req.body.name, req.body.author, req.body.category, req.body.description]
  db.base(sql, data, (ret) => {
	//console.log(ret);
	if (ret.affectedRows == 1) {
	  console.log('添加图书成功');
	  res.redirect('/books')
	}
  })
}
// 跳转到编辑图书页面
exports.toEditBook = (req, res) => {
  let id = req.query.id;
  //通过id去数据库找到对应的那本书  把书的数据和模板拼接起来 返回给前台
  let sql = 'select * from bookinfo where id=?';
  let data = [id];
  db.base(sql, data, (ret) => {
	//console.log(ret);
	if (ret.length == 1) {
	  console.log('查询id为 ' + id + ' 成功');
	  res.render('editBook', ret[0])
	}
  })
}
// 保存编辑图书信息
exports.editBook = (req, res) => {
  let obj = req.body;//post接受的数据
  let sql = 'update bookinfo set name=?,author=?,category=?,description=? where id=?';
  let data = [obj.name, obj.author, obj.category, obj.description, obj.id];
  db.base(sql, data, (ret) => {
	//console.log(ret);
	if (ret.affectedRows == 1) {
	  res.redirect('/books')
	}
  })
}
// 删除图书
exports.deleteBook = (req, res) => {
  let id = req.query.id;
  let sql = 'delete from bookinfo where id = ?';
  let data = [id];
  db.base(sql, data, (ret) => {
	res.redirect('/books')
  });
}