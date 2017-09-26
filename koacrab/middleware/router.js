'use strict'
/**
 * 路由中间件
 */
const fs = require('fs');
let parm = {};
// https://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/001434501628911140e1cb6ce7d42e5af81480f7ecd5802000

module.exports = function(root, opts) {
  // 控制器缓存
  let controllers = [];

  return function router(ctx, next) {
    if (ctx.url === '/favicon.ico') {
      return false;
    }

    parm = ctx.request.query;
    ctx.hzlMod = parm.mod ? parm.mod : 'admin';
    ctx.hzlCtr = parm.ctr ? parm.ctr : 'index';
    ctx.hzlAct = parm.act ? parm.act : 'index';

    ctx.hzlRouter = {
      mod: ctx.hzlMod,
      ctr: ctx.hzlCtr,
      act: ctx.hzlAct
    };
    ctx.hzlcurPath = '../../../src/app_' + ctx.hzlMod + '/controllers/' + ctx.hzlCtr;

    fs.exists(ctx.hzlcurPath, function(exist) {
      if (exist) {
        // serve file
      } else {
        ctx.body = '请求的链接不存在，请检测！';
      }
    })

    try {
      ctx.hzlClass = require(ctx.hzlcurPath);

      let tmp = new ctx.hzlClass();

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
