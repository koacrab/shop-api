const mongoose = require('mongoose');

/**
 * 商品模型
 */
let ShopSchema = new mongoose.Schema({
  goods_name: {
    type: String,
    required: true
  },
  cat_id: String,
  category: String,
  goods_img: String,
  goods_desc: String,
  goods_number: Number,
  price: String,
  is_best: {
    type: Boolean,
    default: false
  },
  is_new: {
    type: Boolean,
    default: false
  },
  is_hot: {
    type: Boolean,
    default: false
  },
  is_on_sale: {
    type: Boolean,
    default: false
  },
  // 关键字
  keywords: String,
  // 描述
  description: String,
  content: String,
});

module.exports = mongoose.model('Shop', ShopSchema);
