let WXBizDataCrypt = require('../../libs/WXBizDataCrypt');

module.exports = class Weixin {
  constructor() {
    // this.shop = new this.services.shop();
  }

  index(){
    this.renderText('获取微信小程序接口首页');
  }

  // 发布活动
  async activityAdd(){
    let fields = this.request.fields || {};
    let query = this.request.query || {};

    if(query.id && query.id !== ''){
      fields._id = query.id;
    }

    let weixin = new this.services.weixin();

    let result = await weixin.activityAdd(fields);

    this.renderJson(result);
  }

  // 活动详情
  async activityInfo(){
    let info = this.request.query || {};

    let query = {
      _id: info.id
    }

    let weixin = new this.services.weixin();

    let result = await weixin.activityInfo(query);

    this.renderJson(result);
  }

  // 活动列表
  async activityList(){
    let info = this.request.query || {};

    let query = {
      userid: info.userid
    }

    let weixin = new this.services.weixin();

    let result = await weixin.activityList(query);

    this.renderJson(result);
  }

  // 活动报名列表
  async enrollList(){
    let info = this.request.query || {};

    let query = {
      userid: info.userid
    }

    let weixin = new this.services.weixin();

    let result = await weixin.enrollList(query);

    this.renderJson(result);
  }

  // 活动报名
  async activityEnroll(){
    let query = this.request.query || {};

    let weixin = new this.services.weixin();

    let result = await weixin.activityEnroll(query);

    this.renderJson(result);
  }

  /**
   * 用户登录时授权
   * @return {[type]} [description]
   */
  async login(){
    let appid = 'wx99159edbba6cbcd3';
    let secret = '53b312284ce0a40256f6cb5028995c62';

    let info = this.request.fields || {};
    let query = this.request.query || {};
    let authInfo = {};

    if(query.openid && query.openid !== ''){
      authInfo = info;
      authInfo.openid = query.openid;
    }else{
      authInfo = await this.httpProxy(`https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${info.js_code}&grant_type=${info.grant_type}`);
      authInfo = JSON.parse(authInfo);
    }

    let weixin = new this.services.weixin();
    let result = await weixin.login(authInfo);
    // 返回用户的id
    authInfo.userid = result._id;

    this.renderJson({data: authInfo});
  }

  // 解密
  async jiemi(){
    const appid = 'wx99159edbba6cbcd3';
    let info = this.request.fields || {};

    let sessionKey = info.sessionKey || '';
    let iv = info.iv || '';
    let encryptedData = info.encryptedData || '';

    try{
      let pc = new WXBizDataCrypt(appid, sessionKey);
      let data = pc.decryptData(encryptedData , iv);
      this.renderJson({status:'解密成功', data: data});
    }catch(err){
      this.renderJson({status:'解密失败', data: null});
    }
  }
}
