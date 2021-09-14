
const {User,validateUser} = require('../../model/user.js')
const bcrypt = require('bcrypt');

module.exports = async (req,res,next)=>{
  //接收客户端的请求参数
  const body = req.body;      //post请求参数
  const id = req.query.id;    //get请求id参数
  //根据id查询用户信息
  const user =   await User.findOne({_id:id});

  //密码比对  比对成功true,比对失败false
  const isValid = await bcrypt.compare(body.password,user.password);
  if(isValid){
    //密码比对成功
    //验证信息规则
    const {error, value} = validateUser(body);
    if( typeof(error) !== 'undefined'){
      //重定向到用户编辑页面
      //return res.redirect(`/admin/user-edit?message=${error.message}`);
      //将对象转换为字符串传递到next中，呈递到错误处理中间件中
      return next(JSON.stringify({path:'/admin/user-edit', message: error.message,id:id}));
    }
     //根据post请求参数中邮箱地址查询邮箱是否已经存在
  //如果找到返回对象，找不到返回空
   const userInfo = await User.findOne({email:body.email});

   if(userInfo && userInfo._id != id){
     //如果userInfo不为空且id号也不是正在修改的用id,说明邮箱已经被占用
     //重定向到用户编辑页面
    //return res.redirect(`/admin/user-edit?message=${'邮箱已经被占用'}`);
    return  next(JSON.stringify({path:'/admin/user-edit', message: '邮箱已经被占用',id:id}));
   }
    //将用户信息更新到数据库中
    await User.updateOne({_id:id},{
        username:body.username,
        email:body.email,
        role:body.role,
        state:body.state,
      });
    //更新好后重定向到用户列表页面
    res.redirect('/admin/user');
  }else{
    //密码比对失败
    //触发错误处理中间件
    let obj = {path:'/admin/user-edit',message:'密码比对失败,不能进行修改操作',id:id};
    next(JSON.stringify(obj));
  }

}