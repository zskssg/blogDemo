
/* 
  登录功能

*/
const bcrypt = require('bcrypt');
const {User} = require('../../model/user');

const login = async (req,res)=>{
  //接收请求参数
  //结构对象
  const {email,password} = req.body;
  //如果用户没有填写邮箱或者密码
  if(email.trim().length == 0 || password.trim().length == 0)
    return res.status(400).render('admin/error.art',{message:'用户邮箱或者密码错误'});
  
  //根据邮箱地址查询用户
  //如果查询成功 user变量为对象类型，查询不成功user为null
  let user = await User.findOne({email:email});
  if(user){
    //密码比对 bcrypt.compare('明文密码','暗文密码') 相等则返回true
     let  isValid = await bcrypt.compare(password,user.password);
    if(isValid){
      //登录成功
      //将用户名存储在请求session中
      req.session.username = user.username;
      //将用户角色存储在请求session中
      req.session.role = user.role;
      //将用户信息放入app.locals对象中  req.app = app.js中的app对象
      req.app.locals.userInfo = user;
      if(user.role == 'admin'){
         //重定向到用户列表页面
        res.redirect('/admin/user');
      }else{
         //重定向到文章列表页面
      res.redirect('/home/');
      }
     
    }else{
    return res.status(400).render('admin/error.art',{message:'用户邮箱或者密码错误'});
    }
  }else{
    return res.status(400).render('admin/error.art',{message:'用户邮箱或者密码错误'});
  }

}

module.exports = login;