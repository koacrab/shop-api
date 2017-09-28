const Koa = require('koa');
const debug = require('debug')('koacrab');
const convert = require('koa-convert');
const lodash = require('lodash');
const config = require('../config/index.js');
const middleware = require('../middleware/index.js');

module.exports = class Application {
  constructor() {
    this.middlewares = [];
    this.koa = new Koa();
  }

  init() {
    // register system middlewares
    middleware(this);

    for (let item of this.middlewares) {
      this.use(item(this));
    }

    this.run(config.port);

    console.log('app in running in port ' + config.port);
  }

  // 使用koa的中间件
  use(middleware) {
    this.koa.use(middleware);
  }

  // 运行
  run(port){
    this.koa.listen(port);
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
