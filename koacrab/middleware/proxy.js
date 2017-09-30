'use strict'
/**
 * 代理中间件
 */

let request = require('request');

module.exports = function(url) {
  return async function proxy(ctx, next) {
    url = 'http://www.baidu.com';
    request(url, function(error, response, body) {
      // console.log('error:', error);
      // console.log('statusCode:', response && response.statusCode);
      // console.log('body:', body);
    });
    await next();

    /*return new Promise(function(resolve, reject) {
      // console.log('reqdata:', reqdata);
      request('http://www.baidu.com', function(err, response, body) {
        try {
          if (!err) {
            ctx.logger.debug('load has response data.')
            var header = handleHeader(response.headers)
            delete header['content-length'] // 避免长度和设置body长度不一致问题
            delete header['transfer-encoding'] // 删除该字段，因为现在是下载完毕处理后才发送
            ctx.response.set(header)
            ctx.response.body = body
          } else {
            ctx.logger.error('middleware load data error: ', err, err.stack)
          }
        } catch (e) {
          ctx.logger.error('koa-proxy middleware load error:', e)
        }
        resolve(next())
      })
    })
  }*/


  }
}
