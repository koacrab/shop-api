const mongoose = require('mongoose');
let WeixinSchema = require('../models/weixin');

const DB_URL = 'mongodb://localhost:27017/weixinData';

module.exports = class Weixin {
  constructor() {
    mongoose.connect(DB_URL);
  }

  async login(query = {}){
    let status = await WeixinSchema.user.findOne({openid: query.openid});

    if(status){
      let user = WeixinSchema.user;

      let userInfo = user.update({openid: query.openid},{$set: query}, function(err){
        console.log(err)
      });

      console.log(status);

      return status;
    }else{
      let user = new WeixinSchema.user(query);
      let userInfo = user.save();
      console.log(userInfo);

      return userInfo;
    }
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

    return new Promise(function(resolve, reject) {
      WeixinSchema.enroll.
        find({activityId: info._id}).
        populate('userid').
        exec(function (error, res) {
          if (error) {
              return resolve({
                  code: '1',
                  msg: error
              });
          }

          // 解决不能直接赋值的问题 https://www.jianshu.com/p/e78fa39aa43f
          infos = infos.toObject();
          infos.userList = res;

          return resolve(infos);
      });
    });
  }

  async activityList(info = {}, limit = 10) {
    if (info.userid && !info.userid.match(/^[0-9a-fA-F]{24}$/)) {
      return {code:0, msg: 'userid不合法'};
    }

    return WeixinSchema.activity.find(info).limit(Number(limit));
  }

  async activityEnroll(info = {}){
    if (info.userid && !info.userid.match(/^[0-9a-fA-F]{24}$/)) {
      return {code:0, msg: 'userid不合法'};
    }

    let status = await WeixinSchema.enroll.findOne(info);

    if(status){
      return {
        code:200,
        msg:'已经报过了',
        data: []
      };
    }else{
      let enroll = new WeixinSchema.enroll(info);
      let enrollInfo = enroll.save();

      return enrollInfo;
    }
  }

  async enrollList(info = {}, limit = 10) {
    if (info.userid && !info.userid.match(/^[0-9a-fA-F]{24}$/)) {
      return {code:0, msg: 'userid不合法'};
    }

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

    return new Promise(function(resolve, reject) {
      WeixinSchema.enroll.
        find(info).
        populate('activityId').
        exec(function (error, res) {
          if (error) {
              return resolve({
                  code: '1',
                  msg: error
              });
          }

          return resolve(res);
      });
    });

  }

};
