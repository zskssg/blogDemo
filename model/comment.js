//引入mongoose模块
const mongoose = require('mongoose');


//创建评论集合规则
const commentSchema = mongoose.Schema({
  aid:{   //文章id
    type:mongoose.Schema.Types.ObjectId,
    ref:'Article',
  },
  uid:{   //用户id
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
  },
  time:{    //评论时间
    type:Date,
  },
  content:{   //评论内容
    type:String,
  }
});

//创建集合
const Comment = mongoose.model('Comment',commentSchema);


//开发评论集合
module.exports = {
  Comment,
}
