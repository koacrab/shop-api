const mongoose = require('mongoose');
let UserSchema = require('../models/user');

const DB_URL = 'mongodb://localhost:27017/vueShop';
const DB_NAME = 'vueShop';

module.exports = class User {
  constructor() {
    mongoose.connect(DB_URL);
  }

  async register(info = {}){
    let status = await this.findOne(info);

    if(status){
      return {
        code: 0,
        msg: '此用户已存在',
        data: []
      }
    }else{
      let user = new UserSchema(info);
      let userInfo = user.save();

      return userInfo;
    }
  }

  list(info = {}, limit = 10) {
    return UserSchema.find(info).limit(Number(limit));
  }

  remove(query = {}){
    return UserSchema.remove(query);
  }

  checkUser(query = {}){

  }

  async login(query = {}){
    let status = this.findOne(query);

    if(status){
      return {
        code:200,
        msg:'登录成功',
        data: []
      };
    }else{
      return {
        code:0,
        msg:'登录失败',
        data: []
      };
    }
  }

  async findOne(info = {}){
    return await UserSchema.findOne(info);
  }
};
