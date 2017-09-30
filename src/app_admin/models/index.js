// const Model = require('Model');
console.log('model..');
module.exports = class News{
  constructor(){
    console.log('实例化模块……。');
  }
  getUserInfo(userid){
    return '你提交的用户id为：' + userid;
  }
}
