/* 
  1.引入mongoose模块
  2.创建文章集合
  3。根据集合创建规则
  4.将集合作为模块成员进行导出
*/

const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title:{     //标题
    type:String,
    minlength:4,
    maxlength:20,
    required:[true,'请填写文章标题'],
  },
  author:{      //作者
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true,'请传递作者'],
  },
  publishDate:{   //发布日期
    type:Date,
    default:Date.now,
  },
  cover:{   //文章封面
    type:String,
    default: null,
  },
  content:{   //文章内容
    type:String,
  }
})

const Article = mongoose.model('Article',articleSchema);


module.exports ={
  Article:Article,
}