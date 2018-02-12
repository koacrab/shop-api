const mongoose = require('mongoose');
let WeixinSchema = require('../models/weixin');

const DB_URL = 'mongodb://localhost:27017/weixinData';

module.exports = class Weixin {
  constructor() {
    mongoose.connect(DB_URL);
  }

  async activityAdd(info = {}){
    if (info._id && !info._id.match(/^[0-9a-fA-F]{24}$/)) {
      return {code:0, msg: 'ID不合法'};
    }

    if(info._id){
      let activity = WeixinSchema.activity;

      let activityInfo = activity.update({_id: info._id},{$set: info}, function(err){
        console.log(err)
      });

      return activityInfo;
    }else{
      let status = await WeixinSchema.activity.findOne(info);
      if(status){
        return {
          code: 0,
          msg: '此活动已存在',
          data: []
        }
      }

      let activity = new WeixinSchema.activity(info);
      let activityInfo = activity.save();

      return activityInfo;
    }
  }

  async activityInfo(info = {}){
    let infos = await WeixinSchema.activity.findOne(info);
    return infos;
  }

  async activityList(info = {}, limit = 10) {
    return WeixinSchema.activity.find(info).limit(Number(limit));
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

  async activityEnroll(query = {}){
    let status = await WeixinSchema.enroll.findOne(query);

    if(status){
      return {
        code:200,
        msg:'已经报过了',
        data: []
      };
    }else{
      let enroll = new WeixinSchema.enroll(query);
      let enrollInfo = enroll.save();

      return enrollInfo;
    }
  }

  async enrollList(info = {}, limit = 10) {
    return WeixinSchema.enroll.find(info).limit(Number(limit));
  }

};
