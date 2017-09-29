'use strict'
/**
 * 控制器中间件
 */
const fs = require('fs');
const path = require('path');
const config = require('../config/index.js');

module.exports = function() {
  return function controllers(ctx, next) {
    ctx.controller = loadController();

    return next();
  }
};

// 加载控制器
function loadController() {
  // 控制器缓存
  let controllers = {};
  let pathObj = walk(process.cwd() + '/' + config.controller || 'controllers');
  let tempObj = {};

  for (let item of Object.keys(pathObj)) {
    tempObj[item] = require(pathObj[item]);
    Object.assign(controllers, tempObj);
  }

  return controllers;
}

function walk(dir) {
  let children = {};

  fs.readdirSync(dir).forEach(function(filename) {
    let baseName = path.basename(filename, '.js');
    let filePath = dir + "/" + filename;
    let stat = fs.statSync(filePath);
    let tempObj = {};

    if (stat && stat.isDirectory()) {
      children = children.concat(walk(filePath));
    } else {
      tempObj[baseName] = filePath;
      Object.assign(children, tempObj);
    }
  });

  return children;
}
