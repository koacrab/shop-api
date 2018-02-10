module.exports = class Weixin {
  constructor() {
    // this.shop = new this.services.shop();
  }

  index(){
    this.renderText('获取用户接口首页');
  }

  // 发布活动
  async activity(){
    let info = this.request.fields || {};

    let weixin = new this.services.weixin();

    let result = await weixin.add(info);

    this.renderJson(result);
  }

  // 活动详情
  async activityInfo(){
    let info = this.request.query || {};

    let query = {
      _id: info.id
    }

    let weixin = new this.services.weixin();

    let result = await weixin.info(query);

    this.renderJson(result);
  }

  // 活动列表
  async activityList(){
    let info = this.request.query || {};

    let query = {
      openId: info.openId
    }

    let weixin = new this.services.weixin();

    let result = await weixin.list(query);

    this.renderJson(result);
  }

  // 活动报名
  async activityEnroll(){

  }

  /**
   * 登录授权
   * @return {[type]} [description]
   */
  async login(){
    let info = this.request.fields || {};
    let content = await this.httpProxy(`https://api.weixin.qq.com/sns/jscode2session?appid=${info.appid}&secret=${info.secret}&js_code=${info.js_code}&grant_type=${info.grant_type}`);

    this.renderJson({status:'获取成功', data: content});
  }
}
