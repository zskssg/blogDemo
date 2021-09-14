/* 
博客管理路由
*/const express = require('express');




//创建路由
const admin = express.Router();

admin.get('/login',(req,res)=>{
  res.render('admin/login.art');
});

//实现登录功能
admin.post('/login',require('./admin/login.js'));

admin.get('/user',require('./admin/userPage'));
//添加用户编辑页面路由
admin.get('/user-edit',require('./admin/userEdit.js'));
//实现用户添加功能
admin.post('/user-edit',require('./admin/userEditFn.js'));
//创建实现用户信息修改路由
admin.post('/user-modify',require('./admin/userModify.js'));
//创建用户信息删除功能
admin.get('/delete',require('./admin/userDelete.js'));
//用户退出功能
admin.get('/logout',require('./admin/logout'));

//文章列表路由
admin.get('/article',require('./admin/article'));
//文章编辑页面路由
admin.get('/article-edit',require('./admin/article-edit'));
//文章添加路由
admin.post('/article-add',require('./admin/article-add'));
//创建实现用户信息修改路由
admin.post('/article-modify',require('./admin/articleModify.js'));
//文章删除功能
admin.get('/article-delete',require('./admin/articleDelete'))

module.exports = admin;