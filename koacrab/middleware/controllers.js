'use strict'
/**
 * 路由中间件
 */
const fs = require('fs');
const config = require('../config/index.js');

module.exports = function(root, opts) {
  // 控制器缓存
  let controllers = [];

  return function controllers(ctx, next) {

    next();
  }
}；

// 加载控制器
function loadController() {
  let filePath = '';

  if (config.controller) {
    for (let item in config.controller) {
      filePath = `${item}.js`;

      if (fs.existsSync(__dirname + '/' + filePath) && config[item] !== undefined && config[item]['status']) {
        console.log('此次运行加载的中间件：' + item);
        app.regMiddleware(require('./' + filePath));
      }
    }
  } else {
    fs.readdirSync(__dirname).forEach((item) => {
      filePath = `${item}.js`;

      if (fs.existsSync(__dirname + '/' + filePath) && config[item] !== undefined && config[item]['status']) {
        console.log('此次运行加载的中间件：' + item);
        app.regMiddleware(require(filePath));
      }
    });
  }
}
