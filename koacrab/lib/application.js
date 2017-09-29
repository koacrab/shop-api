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
    console.log('test===',this.root);
  }

  init() {
    // 把中间件注册到系统里
    middleware(this);

    for (let item of this.middlewares) {
      this.use(item(this));
    }

    this.run(config.port);
    // this.utils(this.root);
  }

  // 使用koa的中间件
  use(middleware) {
    this.koa.use(middleware);
  }

  // 运行
  run(port) {
    this.koa.listen(port);

    console.log('app in running in port ' + config.port);
  }

  // 注册中间件
  regMiddleware(middleware) {
    this.middlewares.push(middleware);
  }

  // 读取配置
  getConf(dir, name) {

  }

  // 设置配置
  setConf(dir, name, value) {

  }
};
