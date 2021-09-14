
const {Article} = require('../../model/article');
module.exports = async (req,res)=>{

   //获取请求参数ID
   const id = req.query.id;
   //根据id删除用户
   await Article.findOneAndDelete({_id:id});
   //用户删除成功后重定向到用户列表页面
   res.redirect('/admin/article');

}