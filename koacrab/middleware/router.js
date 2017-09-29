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

    let ctrs = Object.keys(ctx.controller);
    if(ctrs.indexOf(ctx.crabCtr) === -1){
      console.error('控制器' + ctx.crabCtr + '不存在，请检查');
      ctx.body = '请求的链接不存在，请检测！';
      return;
    }

    let ctrsFn = Object.getOwnPropertyNames(ctx.controller[ctx.crabCtr].prototype);
    if(ctrsFn.indexOf(ctx.crabAct) === -1){
      console.error('方法' + ctx.crabAct + '不存在，请检查');
      ctx.body = '请求的链接不存在，请检测！！！';
      return;
    }

    try {
      let tmp = new ctx.controller[ctx.crabCtr]();

      ctx.crabFn = tmp[ctx.crabAct];
      let obj = Object.assign(tmp, ctx);
      ctx.crabFn.call(obj);
    } catch (err) {
      console.error(err);
      ctx.body = '出现异常！请检测！';
    }

    await next();
  }
}
