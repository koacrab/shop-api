module.exports = class Area {
  constructor() {
    // this.shop = new this.services.shop();
  }

  index(){
    this.renderText('商品获取接口首页');
  }

  /**
   * 区域列表
   * @return {[type]} [description]
   */
  async list(){
    let info = this.request.query || {};
    let limit = info.limit || 10;

    let query = {

    }

    let area = new this.services.area();

    let result = await area.list(query, limit);

    this.renderJson(result);
  }

  /**
   * 商品详情
   * @return {[type]} [description]
   */
  async detail(){
    let info = this.request.query || {};
    let id = info.id || '';

    let query = {
      _id: id
    }

    let area = new this.services.area();
    let result = await area.findOne(query);

    if(result){
      this.renderJson({code: 1, msg: '', data: result});
    }
  }

  /**
   * [add description]
   */
  async add(){
    let info = this.request.fields || {};

    let area = new this.services.area();
    let result = await area.add(info);

    if(result){
      this.renderJson({code: 1, msg: '添加成功'});
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

    let area = new area();

    let result = await area.add(info);

    if(result){
      this.renderJson({code: 1, msg: '更新成功'});
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

    let area = new this.services.area();

    let result = await area.remove(info);

    if(result){
      this.renderJson({code: 1, msg: '移除成功'});
    }
  }

  /**
   * 搜索
   * @return {[type]} [description]
   */
  async search(){
    let info = this.request.query || {};
    let limit = info.limit || 10;
    let key = info.key || '';

    if(key === ''){
      this.renderJson({code:0, msg:'请输入关键词进行搜索'});
      return;
    }

    let reg = new RegExp(key, 'i');
    let query = {
      goods_name: reg
    }

    let area = new this.services.area();

    let result = await area.list(query, limit);

    this.renderJson(result);
  }

  /**
   * 添加分类
   * @return {[type]} [description]
   */
  async typeAdd(){
    let info = this.request.query || {};
    let limit = info.limit || 10;
    let key = info.key || '';

    if(key === ''){
      this.renderJson({code:0, msg:'请输入关键词进行搜索'});
      return;
    }

    let reg = new RegExp(key, 'i');
    let query = {
      goods_name: reg
    }

    let area = new this.services.area();

    let result = await area.list(query, limit);

    this.renderJson(result);
  }

  /**
   * 分类列表
   * @return {[type]} [description]
   */
  async typeList(){
    let info = this.request.query || {};
    let limit = info.limit || 10;
    let key = info.key || '';

    if(key === ''){
      this.renderJson({code:0, msg:'请输入关键词进行搜索'});
      return;
    }

    let reg = new RegExp(key, 'i');
    let query = {
      goods_name: reg
    }

    let area = new this.services.area();

    let result = await area.list(query, limit);

    this.renderJson(result);
  }
}
