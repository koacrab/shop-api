'use strict'
/**
 * 工具中间件
 */
const fs = require('fs');
const path = require('path');
const config = require('../config/index.js');

module.exports = function() {
  return function utils(ctx, next) {
    ctx.common = loadController();

    return next();
  }
};

// 加载控制器
function loadController() {
  // 控制器缓存
  let utils = {};
  let pathObj = walk(process.cwd() + '/libs/');
  let tempObj = {};

  for (let item of Object.keys(pathObj)) {
    tempObj[item] = require(pathObj[item]);
    Object.assign(utils, tempObj);
  }

  return utils;
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

  return children
}
