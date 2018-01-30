const mongoose = require('mongoose');
let adminModel = require('../models/admin');

const DB_URL = 'mongodb://localhost:27017/vueShop';
const DB_NAME = 'vueShop';

module.exports = class Admin {
  constructor() {
    mongoose.connect(DB_URL);
  }

  add(info = {}){
    let shop = new adminModel(info);

    return shop.save();
  }

  list(info = {}, limit = 10) {
    return adminModel.find(info).limit(Number(limit));
  }

  remove(query = {}){
    return adminModel.remove(query);
  }

  findOne(info = {}){

  }
};
