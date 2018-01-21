'use strict'
/**
 * 模型中间件
 */
const fs = require('fs');
const path = require('path');
const config = require('../config/index.js');

module.exports = function() {
  return function services(ctx, next) {
    ctx.services = Object.assign(ctx, loadServices());

    return next();
  }
};

// 加载控制器
function loadServices() {
  // 模型缓存
  let services = {};
  let pathObj = readDirSync(process.cwd() + '/' + config.services || 'services');
  let tempObj = {};

  for (let item of Object.keys(pathObj)) {
    // tempObj[item] = new (require(pathObj[item]));
    tempObj[item] = require(pathObj[item]);
    Object.assign(services, tempObj);
  }

  return services;
}

// 读取控制器目录
let children = {};

function readDirSync(dir, type) {
  fs.readdirSync(dir).forEach(function(filename) {
    let filePath = dir + "/" + filename;
    let stat = fs.statSync(filePath);
    let tempObj = {};

    if (stat && stat.isDirectory()) {
      readDirSync(filePath, filename);
    } else {
      let baseName = '';
      if (type) {
        baseName = type + '/' + path.basename(filename, '.js');
      } else {
        baseName = path.basename(filename, '.js');
      }

      tempObj[baseName] = filePath;
      Object.assign(children, tempObj);
    }
  });

  return children;
}
