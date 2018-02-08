module.exports = class User {
  constructor() {
    // this.shop = new this.services.shop();
  }

  index(){
    this.renderText('获取用户接口首页');
  }

  /**
   * 登录
   * @return {[type]} [description]
   */
  async login(){
    let info = this.request.fields || {};
    let content = await this.httpProxy(`https://api.weixin.qq.com/sns/jscode2session?appid=${info.appid}&secret=${info.secret}&js_code=${info.js_code}&grant_type=${info.grant_type}`);

    this.renderJson({status:'获取成功', data: content});
  }
}
