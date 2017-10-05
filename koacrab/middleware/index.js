'use strict';

const fs = require('fs');
const config = require('../config/middle.js');

module.exports = function(app) {
  let filePath = '';

  if (config) {
    for (let item in config) {
      filePath = `${item}.js`;

      if (fs.existsSync(__dirname + '/' + filePath) && config[item] && config[item]['status']) {
        console.log('此次运行加载的中间件：' + item);
        app.regMiddleware(require('./' + filePath));
      }
    }
  } else {
    fs.readdirSync(__dirname).forEach((item) => {
      filePath = `${item}.js`;

      if (fs.existsSync(__dirname + '/' + filePath) && config[item] && config[item]['status']) {
        console.log('此次运行加载的中间件：' + item);
        app.regMiddleware(require(filePath));
      }
    });
  }
};
