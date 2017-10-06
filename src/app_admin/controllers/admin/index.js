let Base = require('../base.js');
let news = new (require('../../models/index.js'));

module.exports = class Index extends Base {
  constructor() {
    super('子级传递过去的参数');
    this.name = 'test1111';
  }

  async login() {
    console.log(this.request.method);
    let data = {test:'test.......'};
    await this.render('admin/view/login.html', data);
  }

  async register(name) {
    let data = {test:'test.......'};
    await this.render('admin/view/register.html', data);
  }
};
