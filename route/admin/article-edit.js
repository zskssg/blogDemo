const {Article} = require('../../model/article')

module.exports =async (req,res)=>{
  //location里存放一下侧边栏路由标识,表示当前访问的是文章管理页面
  req.app.locals.currentLink = 'article';

   //获取错误信息和id信息
   const {message,id} = req.query;
   //如果有id参数
   if(id){
     
     //根据id查找数据
     let article = await Article.findOne({_id:id});
     //修改用户操作
     res.render('admin/article-edit.art',{
       message:message,
       article:article,
       link:'/admin/article-modify?id='+id,
     });
   }else{
     //添加用户操作
     res.render('admin/article-edit.art',{
       message:message,
       link:'/admin/article-add',
     });
   }
}