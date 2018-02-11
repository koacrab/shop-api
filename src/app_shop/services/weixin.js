const mongoose = require('mongoose');
let WeixinSchema = require('../models/weixin');

const DB_URL = 'mongodb://localhost:27017/weixinData';

module.exports = class Weixin {
  constructor() {
    mongoose.connect(DB_URL);
  }

  async activityAdd(info = {}){
    let status = await WeixinSchema.activity.findOne(info);

    if(status){
      return {
        code: 0,
        msg: '此活动已存在',
        data: []
      }
    }else if(info._id){
      let user = new WeixinSchema.activity();

      let userInfo = user.update({_id: info.id});

      return userInfo;
    }else{
      let user = new WeixinSchema.activity(info);
      let userInfo = user.save();

      return userInfo;
    }
  }

  async activityInfo(info = {}){
    let infos = await WeixinSchema.activity.findOne(info);
    console.log(infos);
    return infos;
  }


  async activityList(info = {}, limit = 10) {
    return WeixinSchema.activity.find(info).limit(Number(limit));
  }

  remove(query = {}){
    return WeixinSchema.activity.remove(query);
  }

  checkUser(query = {}){

  }

  async login(query = {}){
    let status = await WeixinSchema.user.findOne(query);
    console.log('状态',status);

    if(status){
      return {
        code:200,
        msg:'登录成功',
        data: []
      };
    }else{
      let user = new WeixinSchema.user(query);
      let userInfo = user.save();
      console.log(userInfo);

      return userInfo;
    }
  }

  async findOne(info = {}){
    return await WeixinSchema.activity.findOne(info);
  }
};
