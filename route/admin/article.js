
const {Article} = require('../../model/article.js');
//引入mongoose-sex-page模块
const pagination = require('mongoose-sex-page');

module.exports = async (req,res)=>{
  //接收客户端传递过来的页码
  const page = req.query.page || 1;
  //location里存放一下侧边栏路由标识,表示当前访问的是文章管理页面
  req.app.locals.currentLink = 'article';
  //查询所有文章数据和联合查询作者信息
  //pagination(集合构造函数) 将要分页的集合
  //.page()指定当前页   .size()指定当前页的数据条数， display()指定客户端要显示的页码数量
  //.exec()已经指定完查询可以向数据库中发出查询请求了
  let articles = await pagination(Article).find().page(page).size(2).display(3).populate('author').exec();

  //res.send(articles);
  let str = JSON.stringify(articles);
  let json = JSON.parse(str);
  //res.send(json);
  res.render('admin/article.art',{
    json:json,
  }); 
}