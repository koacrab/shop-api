'use strict'
/**
 * 路由中间件
 */
module.exports = function() {
  return async function router(ctx, next) {
    if (ctx.url === '/favicon.ico') {
      return false;
    }

    let parm = ctx.request.query;

    ctx.crabCtr = parm.ctr || 'index';
    ctx.crabAct = parm.act || 'index';

    ctx.crabRouter = {
      ctr: ctx.crabCtr,
      act: ctx.crabAct,
      parm: parm
    };

    /*if(!ctx.controller[ctx.crabCtr]){
      ctx.body = '请求的链接不存在，请检测！';
    }*/

    try {
      let tmp = new ctx.controller[ctx.crabCtr]();

      ctx.crabFun = tmp[ctx.crabAct];
      let obj = Object.assign(tmp, ctx);
      ctx.crabFun.call(obj);
    } catch (err) {
      console.log('error===',err);
      ctx.body = '出现异常！请检测！';
    }

    await next();
  }
}
