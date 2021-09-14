
/* 
  登录拦截
*/
const guard = (req,res,next)=>{
  //判断用户是否访问的是登录页面
  //如果页面不是登录的则判断登录状态，如果是登录页面则继续向下执行
  if(req.url !='/login' && !req.session.username){
    res.redirect('/admin/login');
  }else{
    //判断登录用户的角色
    //如果是登录状态并且是普通用户，则跳转到博客首页
    if(req.session.role == 'normal'){
       return res.redirect('/home/');
    }
    next();
  }
}

module.exports = guard;