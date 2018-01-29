const mongoose = require('mongoose');

/**
 * 区域
 */
let AreaSchema = new mongoose.Schema({
  name: {
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

module.exports = mongoose.model('Area', AreaSchema);
