
//
const express = require('express');
const path = require('path');
//引入bodyparser用于处理post请求参数
const bodyParser = require('body-parser');
//引入express-session模块
const session = require('express-session');
const template = require('art-template');
//引入dateformat第三方模块
const dateFormat = require('dateformat');

//创建网站服务器
const app = express();
//数据库连接
require('./model/connect.js');

//处理post请求参数
app.use(bodyParser.urlencoded({extended:false}));

//配置session  secret参数意思是存储一个密钥
app.use(session({
  secret:'secret key',
  saveUninitialized:false,
  cookie:{
    maxAge: 24*60*60*1000,  //cookie最大存在时间1天
  }
}));


//设置模板位置
app.set('views',path.join(__dirname,'views'));
//设置模板默认后缀
app.set('view engine','art');
//设置相应模板后缀的模板引擎
app.engine('art',require('express-art-template'));
//向模板引擎导入dateFormat变量
template.defaults.imports.dateFormat = dateFormat

//开放静态资源文件
app.use(express.static(path.join(__dirname,'public')));



//登录拦截 判断用户状态
app.use('/admin',require('./middleware/loginGuard.js'))

//使用路由
const home =  require('./route/home.js');
const admin = require('./route/admin.js');
//为路由拼配请求路径
app.use('/home',home);
app.use('/admin',admin);

//错误处理中间件
app.use((err,req,res,next)=>{
  //将字符串转换为对象
  const errResult =  JSON.parse(err);
  let params = [];
  for( let attr in errResult)
    if(attr != 'path'){
      params.push(attr +"="+errResult[attr]);  //message=message值
    }
  //重定向
  res.redirect(`${errResult.path}?${params.join('&')}`);
})

//监听端口
app.listen(80);
console.log('ok');