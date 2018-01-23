const mongoose = require('mongoose');
let shopModel = require('../models/shop');

const DB_URL = 'mongodb://localhost:27017/vueShop';
const DB_NAME = 'vueShop';

module.exports = class Shop {
  constructor() {
    mongoose.connect(DB_URL);
  }

  add(info = {}){
    let shop = new shopModel(info);

    return shop.save();
  }

  list(info = {}, limit = 10) {
    return shopModel.find(info).limit(Number(limit));
  }

  remove(query = {}){
    return shopModel.remove(query);
  }

  findOne(info = {}){

  }
};
