const mongoose = require('mongoose');

/**
 * 活动模型
 */
let WeixinSchema = new mongoose.Schema({
  openId: String,
  addTime: String,
  subject: String,
  startDate: String,
  startTime: String,
  endDate: String,
  endTime: String,
  closeDate: String,
  closeTime: String,
  address: String,
  people: Number,
  tel: String,
  remark: String,
});

module.exports = mongoose.model('activity', WeixinSchema);
