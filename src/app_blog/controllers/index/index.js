let Base = require('../base.js');
let news = new (require('../../models/index.js'));

module.exports = class Index extends Base {
  constructor() {
    super('子级传递过去的参数!!!!');
    this.name = 'test1111';
  }

  _before_say(){
    this.utils.test('aaaaaa');
    console.log('前置操作……');
  }

  _after_say(){
    console.log('后置操作……');
  }

  index() {
    let data = {'test': 'test....'};
    this.render('index/view/index.html', data);
  }

  async list(name) {
    console.log('test=====',koacrab.version);
    this.utils.test('bbbb');
    this.page.getSize(123);
    // 打印配置文件
    // console.log(this.conf.username);
    console.log('say11111...');
    console.log(news.getUserInfo(333));

    // https://api.github.com/repositories/50917994

    let data = {test:'test.......'};
    await this.render('index/view/index.html', data);
  }

  show() {
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

  page(){
    this.page.max(11111);
    console.log('单页！！！');
  }
};
