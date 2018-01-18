'use strict'
const staticCache = require('koa-static-cache');
const statics = require('koa-static');
/**
 * 日志中间件
 */
/*console.log(typeof staticCache({
  dir: '/theme/home/',
  dynamic: true,
}));
module.exports = staticCache;
*/

module.exports = statics(__dirname + '/theme/home/');
