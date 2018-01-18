
module.exports = class Api {
  constructor() {
    // this.news = new this.model.news();
    this.a = 222;
  }

  index(){
    console.log(this.a)
    // this.news.getUserInfo(6);
    this.renderText(111);
  }
}
