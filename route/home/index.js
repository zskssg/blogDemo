
const {Article} = require('../../model/article');
//导入分页模块
const pagination = require('mongoose-sex-page');

module.exports = async (req,res)=>{
  //获取页码值
  const page = req.query.page;

  //查询文章数据
  let articles = await pagination(Article).page(page).size(6).display(5).find().populate('author').exec();
  //将数据类型转换为json字符串
  let str = JSON.stringify(articles);
  let result = JSON.parse(str);
  res.render('home/index.art',{
    result:result,
  });
}