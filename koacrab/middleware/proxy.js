'use strict'
/**
 * 代理中间件
 */

const request = require('request');

module.exports = function() {
  return async function proxy(ctx, next) {
    /* request(url, function(error, response, body) {
       // console.log('error:', error);
       // console.log('statusCode:', response && response.statusCode);
       // console.log('body:', body);
     });
     await next();*/

     /*ctx.proxy = function(url){
      console.log('url===', url);
     }*/

     // return await next();

    ctx.proxy = function(url) {
      return new Promise(function(resolve, reject) {
        request(url, function(err, response, body) {
          try {
            if (!err) {
              console.log('load has response data.')
                // var header = handleHeader(response.headers)
                // delete header['content-length'] // 避免长度和设置body长度不一致问题
                // delete header['transfer-encoding'] // 删除该字段，因为现在是下载完毕处理后才发送
                // ctx.response.set(header)
              // ctx.body = body
              // console.log('body===',body);
              resolve(body);
              ctx.contentData = body;
            } else {
              console.error('middleware load data error: ', err, err.stack)
            }
          } catch (e) {
            console.error('koa-proxy middleware load error:', e)
          }
          console.log(111);
          // resolve(next())
        })
      })
    };

    await next();
  }
}
