
module.exports = class Api {
  constructor() {
    // this.news = new this.model.news();
    this.a = 'aaaa';
  }

  async index(){
    var data = await new this.models.shop;
    data.list(111);

    this.renderText('测试API');
  }
}
