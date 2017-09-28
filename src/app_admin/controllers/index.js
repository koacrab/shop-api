'use strict'
let Base = require('./base');

module.exports = class Index extends Base {
  constructor() {
    super('子级传递过去的参数');
    this.name = 'test1111';
  }

  index() {
    return 'index...';
  }

  say(name) {
    console.log('say...');
    let data = {test:11111};
    this.render('home/view/index', data);
  }

  demo() {
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

  async demo2(){
    let data = await 111;
    return data;
  }

  async demo1() {
    await this.render('../test.html', {
      name: 'wanglin',
      content: '这是测试的内容'
    });
    // console.log(content);
    // return content;
  }
};
