'use strict'
let Base = require('./base');

module.exports = class Index extends Base {
  constructor() {
    super('子级传递过去的参数');
    this.name = 'test';
  }

  index() {
    return 'index...';
  }

  say(name) {
    return 'say';
  }

  demo() {
    let ctr = this.hzlCtr;
    let act = this.hzlAct;

    let t = 'aaaaa';
    // let t = this.demo1();
    let t1 = this._index();

    let data = `
        控制器：${ctr}
        方法：${act}
        内部方法：${t}
        父级方法：${t1}
        自身属性：${this.name}
        父级属性：${this.fname}`;

    // console.log(this.renderJson('ssss'));

    // this.renderJson('ssss');
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
