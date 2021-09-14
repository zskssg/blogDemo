
const {Comment} = require('../../model/comment')
module.exports = async(req,res)=>{

  //
  const {content,uid,aid} = req.body;
  //将请求信息添加到评论集合中
  await Comment.create({
    content:content,
    uid:uid,
    aid:aid,
    time:new Date(),
  });
  //重定向为文章详情页面
  res.redirect('/home/article?id='+aid);
}