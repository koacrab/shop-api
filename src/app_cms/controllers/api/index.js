let Base = require('../base.js');
let news = new (require('../../models/news.js'));

module.exports = class Index extends Base {
  constructor() {
    super('子级传递过去的参数');
    this.name = 'test1111';
  }

  async login() {
    await this.renderJson({
      username: 'admin',
      password: '123456',
    });
  }

  async register(name) {

  }
};
