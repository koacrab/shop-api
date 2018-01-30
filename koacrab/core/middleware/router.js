'use strict'
const helps = require('../utils');

/**
 * 路由中间件
 * restful
 *
 */
module.exports = function() {
  return async function router(ctx, next) {
    if (ctx.url === '/favicon.ico') {
      return false;
    }

    let parm = ctx.request.query;

    let mod = parm.mod || 'index';
    let ctr = parm.ctr || 'index';
    let act = parm.act || 'index';

    delete(parm['mod']);
    delete(parm['ctr']);
    delete(parm['act']);

    ctx.router = {
      mod: mod,
      ctr: ctr,
      act: act,
      parm: parm
    };

    // act的第一个是为_，则是私有方法，不能直接访问
    if(!helps.checkAct(act)){
      console.error('不能直接访问私有方法：' + act);
      ctx.body = '不能直接访问私有方法：' + act;
      return;
    }

    let modAndCtr = mod + '/' + ctr;

    let ctrs = Object.keys(ctx.controller);

    if(ctrs.indexOf(modAndCtr) === -1){
      console.error('模块或者控制器' + modAndCtr + '不存在，请检查');
      ctx.body = '请求的链接不存在，请检测！';
      return;
    }

    let ctrsFn = Object.getOwnPropertyNames(ctx.controller[modAndCtr].prototype);

    if(ctrsFn.indexOf(act) === -1){
      console.error('方法' + act + '不存在，请检查');
      ctx.body = '方法' + act + '不存在，请检查';
      return;
    }

    try {
      // 实例化控制器
      let tmp = {};
      tmp = new ctx.controller[modAndCtr]();

      let obj = Object.assign(tmp, ctx);

      // 前置
      if(ctrsFn.indexOf('_before_' + act) !== -1){
        await tmp['_before_' + act].call(obj);
      }

      // 正常操作
      ctx.actFn = tmp[act];
      await ctx.actFn.call(obj);

      // 后置
      if(ctrsFn.indexOf('_after_' + act) !== -1){
        await tmp['_after_' + act].call(obj);
      }
    } catch (err) {
      console.error(err);
      ctx.body = '出现异常！请检测！' + err;
    }

    await next();
  }
}
