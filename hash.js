
/* 
  bcrypt使用
*/
const bcrypt = require('bcrypt');



async function run(params) {
  // .genSalt(number) number值越大，随机字符串复杂度越大，默认为10
//生成随机字符串并返回
const salt = await bcrypt.genSalt(10);
//加密密码
//.hash('明文',随机字符串) 返回加密后的密码
const result = await bcrypt.hash('123456',salt);

console.log(salt);
console.log(result);
}
run();