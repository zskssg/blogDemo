
/* 
  用户集合
*/
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Joi = require('joi');

//集合规则
const userSchema = mongoose.Schema({
  username:{    //用户名
    type:String,
    required:true,
    minlength:2,
    maxlength:20,
  },
  email:{     //邮箱
    type:String,
    unique:true,    //地址唯一性
    required:true,
  },
  password:{    //密码
    type:String,
    required:true,
  },
  role:{      //角色  admin超级管理员  normal普通用户
    type:String,
  },
  state:{   //状态 0表示启用，1表示禁用
    type:Number,
    default:0,    //默认为0启用状态
  }
})

//创建集合
mongoose.set('useCreateIndex', true);
const User = mongoose.model('User',userSchema);

async function createUser(){
  //随机字符串
  const salt = await bcrypt.genSalt(10);
  //使用随机字符串密码加密
  const pass = await bcrypt.hash('123456',salt);
  //添加一条用户
 const user = await User.create({
  username:'zsk',
  email:'2511276124@qq.com',
  password:pass,
  role:'admin',
  state:0
})
}
//createUser();

//验证用户信息
const validateUser = (user)=>{
  //设置验证规则
  const schema = Joi.object({
    username: Joi.string().min(2).max(20).required().error(new Error('用户名不符合验证规则')),
    email: Joi.string().email().required().error(new Error('邮箱不符合验证规则')),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required().error(new Error('用户密码不符合验证规则')),
    role: Joi.string().valid('normal','admin').required().error(new Error('角色不符合验证规则')),
    state: Joi.number().valid(0,1).required().error(new Error('状态不符合验证规则')),   //合法值只有0和1
  });

  //实施验证 error错误信息 value验证结果返回的对象

    return  schema.validate(user);
}


//开放集合
module.exports = {
  User:User,
  validateUser:validateUser,
}