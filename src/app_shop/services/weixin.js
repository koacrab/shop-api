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
    let status = await WeixinSchema.user.findOne(query.openid);
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
    let status = WeixinSchema.enroll.findOne(query);

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
    // return WeixinSchema.enroll.find(info).limit(Number(limit));
    // 连表查询方法
    /*WeixinSchema.enroll.statics = {
        findActivityInfoByEnrollId:function(enrollId, callback){
                return this
                    .findOne({_id : enrollId}).populate('activityId')  // 关联查询
                    .exec(callback)
            }
    }

    WeixinSchema.enroll.findActivityInfoByEnrollId(info.openid, function (err, student){
        if(err) console.log(err);
        console.log(student);
        //通过studentID查询到对应的学生对象，并通过关联属性clazzID获取到对应classID的班级对象，
        通过对象的clazzName属性返回班级名称
    })*/

    WeixinSchema.enroll.
      findOne(info).
      populate('activityId').
      exec(function (err, res) {
        if (err) return handleError(err);
        console.log(res);
        // prints "The author is Ian Fleming"
    });

  }

};
