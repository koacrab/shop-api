const mongoose = require('mongoose');

/**
 * 活动模型
 */
let ActivitySchema = new mongoose.Schema({
  openid: {
    type: String,
    default: ''
  },
  addTime: {
    type: Date,
    default: Date.now()
  },
  subject: String,
  startDate: String,
  startTime: String,
  endDate: String,
  endTime: String,
  closeDate: String,
  closeTime: String,
  address: String,
  people: {
    type:Number,
    default: 0
  },
  tel: String,
  remark: String,
  status:{
    type: Number,
    default: 0 // 活动状态，0报名中，1报名结束，2活动截止报名，3活动结束，4活动取消
  }
});

/**
 * 用户模型
 */
let UserSchema = new mongoose.Schema({
  addTime: {
    type: Date,
    default: Date.now()
  },
  openid: {
    type: String,
    default: ''
  },
  scene: String, //从哪里过来的，场景值
  nickName: String, //用户昵称
  gender: Number, //用户的性别，值为1时是男性，值为2时是女性，值为0时是未知
  language: String, //用户的语言，简体中文为zh_CN
  city: String, //用户所在城市
  province: String, //用户所在省份
  country: String, //用户所在国家
  avatarUrl: String, //用户头像，最后一个数值代表正方形头像大小（有0、46、64、96、132数值可选，0代表640*640正方形头像），用户没有头像时该项为空。若用户更换头像，原有头像URL将失效。
});

/**
 * 用户报名模型
 */
let EnrollSchema = new mongoose.Schema({
  addTime: {
    type: Date,
    default: Date.now()
  },
  activityId: {
    type : mongoose.Schema.ObjectId,
    ref : 'activity'    // activity的Model名
  },
  status: {
    type: Number,
    default: 1
  },
  user: {
    type : mongoose.Schema.ObjectId, //mongoose.Schema.Types.ObjectId
    ref : 'user'    // user的Model名
  },
  scene: String, //从哪里过来的，场景值
});

module.exports = {
  activity: mongoose.model('activity', ActivitySchema),
  user: mongoose.model('user', UserSchema),
  enroll: mongoose.model('enroll', EnrollSchema)
}
