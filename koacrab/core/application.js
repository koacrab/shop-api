/***
 *      _  __                    ___                    _
 *     | |/ /    ___    __ _    / __|     _ _   __ _   | |__
 *     | ' <    / _ \  / _` |  | (__     | '_| / _` |  | '_ \
 *     |_|\_\   \___/  \__,_|   \___|   _|_|_  \__,_|  |_.__/
 *    _|"""""|_|"""""|_|"""""|_|"""""|_|"""""|_|"""""|_|"""""|
 *    "`-0-0-'"`-0-0-'"`-0-0-'"`-0-0-'"`-0-0-'"`-0-0-'"`-0-0-'
 */

// http://patorjk.com/software/taag/#p=testall&c=c&f=Graffiti&t=KoaCrab
const Koa = require('koa');
const path = require('path');
const fs = require('fs');
const debug = require('debug')('koacrab');
const convert = require('koa-convert');
const lodash = require('lodash');
const config = require('./config/index.js');
const pkg = require('../../package.json');
const log = require('./log.js');
const middleware = require('./middleware/index.js');
const color = require('cli-color');

const statics = require('koa-static');

module.exports = class Application {
  constructor() {
    global.koacrab = pkg;

    this.middlewares = [];
    this.koa = koacrab.koa = new Koa();
    // this.koa.proxy = true;
    // 项目运行的根路径
    this.root = process.cwd();
    this.conf = {};
  }

  init(port) {
    // 把默认的中间件注册到系统里
    middleware(this);

    for (let item of this.middlewares) {
      this.use(item(this));
    }

    console.log(statics(this.root + '/theme/home/'));
    this.use(statics(this.root + '/theme/home/'));

    this.printChart();
    this.run(port || config.port, 1, 2);
    this.conf = this.loadConf(this.root);
  }

  // 使用koa的中间件
  use(middleware) {
    this.koa.use(middleware);
  }

  // 运行
  run(...args) {
    this.koa.listen(...args);

    console.log('app running on port ' + args[0]);
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

  // 输出字符
  printChart() {
    let str = `
  ***************************************************************
  *                                                             *
  *    _  __                    ___                    _        *
  *   | |/ /    ___    __ _    / __|     _ _   __ _   | |__     *
  *   | ' <    / _ \\  / _' |  | (__     | '_| / _' |  | '_ \\    *
  *   |_|\\_\\   \\___/  \\__,_|   \\___|   _|_|_  \\__,_|  |_.__/    *
  *  _|"""""|_|"""""|_|"""""|_|"""""|_|"""""|_|"""""|_|"""""|   *
  *  "'-0-0-'"'-0-0-'"'-0-0-'"'-0-0-'"'-0-0-'"'-0-0-'"'-0-0-'   *
  *                                                             *
  *                                                             *
  ***************************************************************
    `;
  console.log(color.green(str));
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
