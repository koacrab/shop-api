const mongoose = require('mongoose');

/**
 * 商品模型
 */
let AdminSchema = new mongoose.Schema({
  // 分类名
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: String,
  // 描述
  description: String,
});

module.exports = mongoose.model('Admin', AdminSchema);
