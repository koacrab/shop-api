/**
 * body中间件 学习
 */

'use strict'



// let view = require('../view/index');

module.exports = function (root, opts) {
    return async function body(ctx, next) {
        await next();
        // next()   return next()
    }
}
