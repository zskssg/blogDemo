
/* 

  退出登录功能
*/
const logout = (req,res)=>{
  //清除用户模板信息
  req.app.locals.userInfo = null;
  //删除session
  req.session.destroy(function(){
    //删除cookie
    res.clearCookie('connect.sid');
    //重定向到登录页面
    res.redirect('/admin/login');
  })
}

module.exports = logout;