let Base = require('../base.js');
let News = require('../../models/index.js');
let request = require('request');

module.exports = class Index extends Base {
  constructor() {
    super('子级传递过去的参数');
    this.name = 'test1111';
  }

  _before_index(){
    console.log('前置操作……');
  }

  __after_index(){
    console.log('后置操作……');
  }

  index() {
    console.log('index...');
  }

  async say(name) {
    this.common.utils.test('bbbb');
    this.common.page.getSize(123);
    // 打印配置文件
    console.log(this.conf.username);
    console.log('say...');
    let news = new News();
    console.log(news.getUserInfo(333));

    // https://api.github.com/repositories/50917994
    request('https://api.github.com/repositories/50917994', function (error, response, body) {
      console.log('error:', error);
      console.log('statusCode:', response && response.statusCode);
      console.log('body:', body);
    });

    // console.log(this);

    let data = {test:'test.......'};
    await this.render('home/view/index.html', data);
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
