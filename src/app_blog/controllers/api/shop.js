module.exports = class Api {
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
    let query = {
      goods_name: 'haizlin111'
    }

    let shop = new this.services.shop();

    let result = await shop.list(query);

    this.renderJson(result);
  }

  /**
   * [add description]
   */
  async add(){
    let info = {
      goods_name: 'haizlin111',
      age: this.age++,
      keywords: '这是关键词',
      description: '这是描述',
    }

    let shop = new this.services.shop();
    let result = await shop.add(info);

    if(result){
      this.renderText('添加成功');
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

    let shop = new Shop();

    let result = await shop.add(info);

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

    let shop = new this.services.shop();

    let result = await shop.remove(info);

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

    let shop = new Shop();

    let result = await shop.add(info);

    if(result){
      this.renderText('添加成功');
    }
  }
}
