
/* 
  joi的使用
*/
//引入joi模块
const Joi = require('joi');

//定义对象验证规则
const schema = Joi.object({
  username: Joi.string().min(2).max(20).required().error(new Error('username属性错误')),    //字符串最小长度2最大长度20
  birth: Joi.number().min(1900).max(2020).error(new Error('生日错误')),



})

//console.log(schema);
//实施验证Joi.validate({数据对象},schema验证规则)

const {error, value} = schema.validate({username:'32',birth:19982});
console.log(error.message);
console.log(value);



async function run(){
  try{
    //返回promise对象
    
    const value = await schema.validateAsync({username:'3'});
    console.log(value)
  }catch(er){
    console.log(er);
    return ;
  }
  console.log('验证通过');
}
//run();