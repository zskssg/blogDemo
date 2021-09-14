

const {User} =  require('../../model/user.js');

module.exports = async (req,res)=>{
  //location里存放一下侧边栏路由标识,表示当前访问的是用户管理页面
  req.app.locals.currentLink = 'user';

  //接收客户端当前页参数
  let page = req.query.page || 1;
  //每一页显示数据的条数
  let pagesize = 10;
  //查询用户数据的总数
  let count = await User.countDocuments({});
  //总页数
  let total = Math.ceil(count / pagesize);
  //页码对应的数据查询开始位置
  let start = (page - 1) * pagesize ;
  let users = await User.find({}).limit(pagesize).skip(start);
  res.render('admin/user.art',{
    users:users,
    page:page,
    total:total,
    count:count,
});
  //res.send(user);
}
