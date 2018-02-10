const mongoose = require('mongoose');
let WeixinSchema = require('../models/weixin');

const DB_URL = 'mongodb://localhost:27017/weixinData';

module.exports = class Weixin {
  constructor() {
    mongoose.connect(DB_URL);
  }

  async add(info = {}){
    let status = await this.findOne(info);

    if(status){
      return {
        code: 0,
        msg: '此活动已存在',
        data: []
      }
    }else{
      let user = new WeixinSchema(info);
      let userInfo = user.save();

      return userInfo;
    }
  }

  async info(info = {}){
    let infos = await this.findOne(info);
    console.log(infos);
    return infos;
  }


  list(info = {}, limit = 10) {
    return WeixinSchema.find(info).limit(Number(limit));
  }

  remove(query = {}){
    return WeixinSchema.remove(query);
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
    return await WeixinSchema.findOne(info);
  }
};
