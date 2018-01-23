module.exports = class Admin {
  constructor() {
    // this.shop = new this.services.shop();
  }

  index(){
    this.renderText('商品获取接口首页');
  }

  /**
   * 列表
   * @return {[type]} [description]
   */
  async list(){
    let info = this.request.query || {};
    let limit = info.limit || 10;

    let query = {
      email: '80285586@qq.com'
    }

    let admin = new this.services.admin();

    let result = await admin.list(query, limit);

    this.renderJson(result);
  }

  /**
   * [add description]
   */
  async add(){
    let info = this.request.fields || {};

    let admin = new this.services.admin();
    let result = await admin.add(info);

    if(result){
      this.renderJson({code: 1, message: '添加成功'});
    }
  }

  /**
   * [update description]
   * @return {[type]} [description]
   */
  async update(){
    let info = {
      goods_name: 'haizlin111',
      age: this.age++,
      keywords: '这是关键词',
      description: '这是描述',
    }

    let admin = new Shop();

    let result = await admin.add(info);

    if(result){
      this.renderText('添加成功');
    }
  }

  /**
   * [delete description]
   * @return {[type]} [description]
   */
  async remove(){
    let info = {
      goods_name: 'haizlin111'
    }

    let admin = new this.services.admin();

    let result = await admin.remove(info);

    if(result){
      this.renderText('移除成功');
    }
  }

  /**
   * 商品详情
   * @return {[type]} [description]
   */
  async detail(){
    let info = {
      goods_name: 'haizlin111',
      age: this.age++,
      keywords: '这是关键词',
      description: '这是描述',
    }

    let admin = new Shop();

    let result = await admin.add(info);

    if(result){
      this.renderText('添加成功');
    }
  }
}
