const Koa = require('koa');
const path = require('path');
const fs = require('fs');
const debug = require('debug')('koacrab');
const convert = require('koa-convert');
const lodash = require('lodash');
const config = require('../config/index.js');
const utils = require('./utils.js');
const middleware = require('../middleware/index.js');

module.exports = class Application {
  constructor() {
    this.middlewares = [];
    this.koa = new Koa();
    this.crab = {};
    // 项目运行的根路径
    this.root = process.cwd();
    this.conf = {};
    console.log('test===', this.root);
  }

  init() {
    // 把中间件注册到系统里
    middleware(this);

    for (let item of this.middlewares) {
      this.use(item(this));
    }

    this.run(config.port);
    this.conf = this.loadConf(this.root);
  }

  // 使用koa的中间件
  use(middleware) {
    this.koa.use(middleware);
  }

  // 运行
  run(port,...args) {
    this.koa.listen(port,...args);

    console.log('app in running in port ' + config.port);
  }

  // 注册中间件
  regMiddleware(middleware) {
    this.middlewares.push(middleware);
  }

  // 读取配置
  getConf(file, name) {
    return this.conf[file][name];
  }

  // 设置配置
  setConf(file, name, value) {

  }

  // 加载配置文件
  loadConf(dir) {
    let children = {};
    let dirs = dir + '/config/'

    fs.readdirSync(dirs).forEach(function(filename) {
      let baseName = path.basename(filename, '.config.js');
      let filePath = dirs + "/" + filename;
      let stat = fs.statSync(filePath);
      let tempObj = {};

      if (stat && stat.isDirectory()) {
        children = children.concat(walk(filePath));
      } else {
        tempObj[baseName] = require(filePath);
        Object.assign(children, tempObj);
      }
    });

    console.log(children);

    return children;
  }
};
