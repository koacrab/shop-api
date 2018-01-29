const mongoose = require('mongoose');

/**
 * banner模型
 */
let BannerSchema = new mongoose.Schema({
  url: String,
  title: String,
  description: String,
});

module.exports = mongoose.model('Banner', BannerSchema);
