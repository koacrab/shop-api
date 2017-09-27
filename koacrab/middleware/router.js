'use strict'
/**
 * 路由中间件
 */
const fs = require('fs');
// https://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/001434501628911140e1cb6ce7d42e5af81480f7ecd5802000

module.exports = function(root, opts) {
  return function router(ctx, next) {
    if (ctx.url === '/favicon.ico') {
      return false;
    }

    let parm = ctx.request.query;

    console.log(ctx.controller);

    ctx.hzlCtr = parm.ctr || 'index';
    ctx.hzlAct = parm.act || 'index';

    ctx.hzlRouter = {
      ctr: ctx.hzlCtr,
      act: ctx.hzlAct
    };

    if(!ctx.controller[ctx.hzlCtr]){
      ctx.body = '请求的链接不存在，请检测！';
    }

    try {
      let tmp = new ctx.controller[ctx.hzlCtr]();

      ctx.hzlFun = tmp[ctx.hzlAct];
      let obj = Object.assign(tmp, ctx);
      let content = ctx.hzlFun.call(obj);
      ctx.body = content;

    } catch (err) {
      console.log(err);
      ctx.body = '请求的链接不存在，请检测！';
    }

    next();
  }
}

// 加载控制器
function loadController() {

}
