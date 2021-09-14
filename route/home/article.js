
const {Article} = require('../../model/article');
const {Comment} = require('../../model/comment');

module.exports =async (req,res)=>{
  //获取请求参数id
  const id = req.query.id;
  //根据id查找内容
  let article = await Article.findOne({_id:id}).populate('author').lean();
  let comment = await Comment.find({aid:id}).populate('uid').lean();

  res.render('home/article.art',{
    article,
    comment,
  });
}