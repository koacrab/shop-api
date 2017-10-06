let Base = require('../base.js');
let news = new (require('../../models/news.js'));

module.exports = class Index extends Base {
  constructor() {
    super('子级传递过去的参数');
    this.name = 'test1111';
  }

  test(){
    console.log('test...');
  }

  async login() {
    console.log('login...');
    let content = await this.proxy('https://www.baidu.com');

    console.log('返回的内容：', this.contentData);
    let data = {test:'test.......'};
    await this.render('admin/view/login.html', data);
  }

  async register(name) {
    let data = {test:'test.......'};
    await this.render('admin/view/register.html', data);
  }
};
