
//引入formidable模块
const formidable = require('formidable');
const path = require('path');

const {Article} = require('../../model/article.js');

module.exports = (req,res,next)=>{
   //创建表单解析对象
   const form = new formidable.IncomingForm();
   //2.配置上传文件的存放位置
   form.uploadDir = path.join(__dirname,'../','../','public/uploads');
   //保留上传文件后缀
   form.keepExtensions = true;
   const id = req.query.id;    //get请求id参数
    //解析表单
  //回调函数中参数  err错误对象 fields表单除文件类的普通参数对象 files保存了和上传文件相关的数据对象
  form.parse(req,async (err,fields,files)=>{
    //处理上传文件路径
    if(fields.title.length <4 || fields.title.length >20)
    return next(JSON.stringify({path:'/admin/article-edit',id:id, message: '标题不符合验证规则'}));
   // res.send(files.cover.path.split('public')[1]);
   //修改文章
   await Article.updateOne({_id:id},{
     title: fields.title,
     author:fields.author,
     publishDate:fields.publishDate,
     cover: files.cover.path.split('public')[1],
     content:fields.content,
   });
   //将页面重定向到文章列表页面
  res.redirect('/admin/article');
  })
  
}