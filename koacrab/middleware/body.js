'use strict'
/**
 * body中间件
 */

// let view = require('../view/index');

module.exports = function(root, opts) {
  return async function body(ctx, next) {
    await next();
    // next()   return next()
  }
};
