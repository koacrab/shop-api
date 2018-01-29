const mongoose = require('mongoose');
let areaModel = require('../models/area');

const DB_URL = 'mongodb://localhost:27017/vueShop';
const DB_NAME = 'vueShop';

module.exports = class Shop {
  constructor() {
    mongoose.connect(DB_URL);
  }

  count(){

  }

  add(info = {}){
    let area = new areaModel(info);

    return area.save();
  }

  list(query = {}, limit = 10) {
    return areaModel.find(query).limit(Number(limit));
  }

  remove(query = {}){
    return areaModel.remove(query);
  }

  find(query = {}){

  }

  findOne(query = {}) {
    return areaModel.findOne(query);
  }
};
