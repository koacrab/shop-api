const mongoose = require('mongoose');

/**
 * 商品模型
 */
let UserSchema = new mongoose.Schema({
  mobile: String,
  email: String,
  password: {
    type: String,
    required: true
  },
  name: String,
  description: String,
  // 用户状态
  status: [],
  regTime: Date,
  logTime: Date

});

module.exports = mongoose.model('User', UserSchema);
