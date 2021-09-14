/* 
  博客列表路由
*/

const express = require('express');


//创建路由
const home = express.Router();

home.get('/',require('./home/index.js'));
home.get('/article',require('./home/article.js'));

//用户退出功能
home.get('/logout',require('./home/logout'));
//用户评论功能
home.post('/comment',require('./home/comment'));

module.exports = home;