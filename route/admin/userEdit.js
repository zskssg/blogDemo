
const {User} = require('../../model/user');

module.exports = async (req,res)=>{
  //location里存放一下侧边栏路由标识,表示当前访问的是用户管理页面
  req.app.locals.currentLink = 'user';
  //获取错误信息和id信息
  const {message,id} = req.query;
  //如果有id参数
  if(id){
    
    //根据id查找数据
    let user = await User.findOne({_id:id});
    //修改用户操作
    res.render('admin/user-edit.art',{
      message:message,
      user:user,
      link:'/admin/user-modify?id='+id,
    });
  }else{
    //添加用户操作
    res.render('admin/user-edit.art',{
      message:message,
      link:'/admin/user-edit',
    });
  }

 
}