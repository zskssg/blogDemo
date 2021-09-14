
/* 
  处理用户添加功能
*/
//引入 joi验证和用户集合模块
const {User,validateUser} =  require('../../model/user.js');
const bcrypt = require('bcrypt');

module.exports = async (req,res,next)=>{
  //res.send('ok');
  //接收请求参数
  let user = req.body;
   // return  schema.validate(user);
  //解构获得用户信息请求验证结果
  const {error, value} = validateUser(user);
  if( typeof(error) !== 'undefined'){
    //重定向到用户编辑页面
    //return res.redirect(`/admin/user-edit?message=${error.message}`);
    //将对象转换为字符串传递到next中，呈递到错误处理中间件中
    return next(JSON.stringify({path:'/admin/user-edit', message: error.message}));
  }

  //根据邮箱地址查询邮箱是否已经存在
  //如果找到返回对象，找不到返回空
   const userInfo = await User.findOne({email:user.email});
   if(userInfo){
     //如果邮箱已经被占用
     //重定向到用户编辑页面
    //return res.redirect(`/admin/user-edit?message=${'邮箱已经被占用'}`);
    return  next(JSON.stringify({path:'/admin/user-edit', message: '邮箱已经被占用'}));
   }
   
   //密码加密
   //生成随机字符串
   const salt = await bcrypt.genSalt(10);
   //密码加密,返回加密后的暗文
  const password =  await bcrypt.hash(user.password,salt);
  //将请求参数对象的密码替换成暗文
  user.password = password;

  //添加用户信息到数据库
  await User.create(user);
  //添加成功后重定向到用户列表页面
  res.redirect('/admin/user');

}