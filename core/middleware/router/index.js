/**
 * 路由中间件 学习
 */

'use strict'

var fs = require('fs');
let parm = {};


module.exports = function(root, opts) {
    return function router(ctx, next) {
        if (ctx.url === '/favicon.ico') {
            return false;
        }

        console.log(ctx.renderJson());

        parm = ctx.request.query;
        ctx.hzlMod = (parm.mod === '' || parm.mod === undefined) ? 'admin' : parm.mod;
        ctx.hzlCtr = (parm.ctr === '' || parm.ctr === undefined) ? 'index' : parm.ctr;
        ctx.hzlAct = (parm.act === '' || parm.act === undefined) ? 'index' : parm.act;
        ctx.hzlRouter = { mod: ctx.hzlMod, ctr: ctx.hzlCtr, act: ctx.hzlAct };
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
