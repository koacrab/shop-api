'use strict'
/**
 * 路由中间件
 */
module.exports = function() {
  return async function router(ctx, next) {
    console.log('进来路由器了……。');
    if (ctx.url === '/favicon.ico') {
      return false;
    }

    let parm = ctx.request.query;

    ctx.crabMod = parm.mod || 'index';
    ctx.crabCtr = parm.ctr || 'index';
    ctx.crabAct = parm.act || 'index';

    ctx.crabRouter = {
      ctr: ctx.crabMod,
      ctr: ctx.crabCtr,
      act: ctx.crabAct,
      parm: parm
    };

    let modAndCtr = ctx.crabMod + '/' + ctx.crabCtr;
    // console.log(modAndCtr);

    let ctrs = Object.keys(ctx.controller);
    if(ctrs.indexOf(modAndCtr) === -1){
      console.error('模块或者控制器' + modAndCtr + '不存在，请检查');
      ctx.body = '请求的链接不存在，请检测！';
      return;
    }

    let ctrsFn = Object.getOwnPropertyNames(ctx.controller[modAndCtr].prototype);
    if(ctrsFn.indexOf(ctx.crabAct) === -1){
      console.error('方法' + ctx.crabAct + '不存在，请检查');
      ctx.body = '请求的链接不存在，请检测！！！';
      return;
    }

    try {
      let tmp = new ctx.controller[modAndCtr]();

      let obj = Object.assign(tmp, ctx);

      // 前置
      if(ctrsFn.indexOf('_before_' + ctx.crabAct) !== -1){
        tmp['_before_' + ctx.crabAct].call(obj);
      }

      // 正常操作
      ctx.crabFn = tmp[ctx.crabAct];
      ctx.crabFn.call(obj);

      // 后置
      if(ctrsFn.indexOf('_after_' + ctx.crabAct) !== -1){
        tmp['_after_' + ctx.crabAct].call(obj);
      }
    } catch (err) {
      console.error(err);
      ctx.body = '出现异常！请检测！';
    }

    await next();
  }
}
