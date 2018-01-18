let Base = require('../base.js');
let markdown = require('markdown-it');
// import fs from 'fs';
let fs = require('fs');

module.exports = class Index extends Base {
  constructor() {
    super('子级传递过去的参数!!!!');
    this.name = 'test1111';
  }

  async index() {
    let data = {
      'test': 'test....'
    };

    // console.log(this);
    // this.page();
    // this.test();

    // await this.currController.getType(process.cwd());
    this.render('index/view/index.html', data);
  }

  async newsList(){
    let url = 'http://baike.baidu.com/api/openapi/BaikeLemmaCardApi?scope=103&format=json&appid=379020&bk_key=%E9%93%B6%E9%AD%82&bk_length=600';
    let test = await this.httpProxy(url);

    console.log(test);
    console.log('newsList...');
  }

  test(){
    console.log('test..1111..');
    // this.page();
  }

  async list(name) {
    console.log('test=====', koacrab.version);
    this.utils.test('bbbb');
    this.page.getSize(123);
    // 打印配置文件

    let data = {
      test: 'test.......'
    };
    await this.render('index/view/index.html', data);
  }

  async show() {
    let ctr = this.hzlCtr;
    let act = this.hzlAct;

    let t2 = this.demo2();
    let t1 = this._index();

    let data = `
        控制器：${ctr}
        方法：${act}
        内部方法：${t2}
        父级方法：${t1}
        自身属性：${this.name}
        父级属性：${this.fname}`;
    console.log(data);
    return this.renderText(data);

    // console.log(this.renderJson('ssss'));

    // this.renderJson('ssss');
  }

  async page() {
    /*console.log(this);
    let test = new this.controller['admin/index'];
    test.test();
    this.page.max(11111);*/
    console.log('单页！！！');
  }

  async getType(dirs) {
    let dir = dirs + '/markdown/';
    let children = [];

    fs.readdirSync(dir).forEach(function(filename) {
      console.log(dir, filename);
      let filePath = dir + "/" + filename;
      let stat = fs.statSync(filePath);
      let tempObj = {};

      if (stat && stat.isDirectory()) {
        // readDirSync(filePath, filename);
      } else {
        let baseName = path.basename(filename);

        tempObj[baseName] = filePath;
        Object.assign(children, tempObj);
      }
    });

    console.log(children);
  }

  async readDirSync(dir, type) {
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
};
