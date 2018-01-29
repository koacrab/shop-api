let Base = require('../base.js');

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
    let content = await this.httpProxy('https://www.baidu.com');
    // let content = await this.httpProxy('https://api.github.com/repos/vmg/redcarpet/issues/629');


    console.log('proxy返回的内容:', this.contentData);
    // console.log('proxy返回的内容1:', contents);
    let data = {test:'test.......'};
    return await this.render('admin/view/login.html', data);
  }

  async register(name) {
    let data = {test:'test.......'};
    await this.render('admin/view/register.html', data);
  }
};
