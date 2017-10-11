'use strict'
/**
 * 代理中间件
 */

const request = require('request');

module.exports = function() {
  console.log(1);
  return async function proxy1(ctx, next) {
    console.log(1.1);
    ctx.proxy1 = function(url) {
      console.log(1.2);
      return new Promise(function(resolve, reject) {
        console.log(1.3);
        request(url, function(err, response, body) {

          try {
            if (!err) {
                // var header = handleHeader(response.headers)
                // delete header['content-length'] // 避免长度和设置body长度不一致问题
                // delete header['transfer-encoding'] // 删除该字段，因为现在是下载完毕处理后才发送
                // ctx.response.set(header)
              // ctx.body = body

              // ctx.contentData = body;
              console.log(1.4);
              resolve(11111);
              console.log(1.5);
            } else {
              console.error('middleware load data error: ', err, err.stack)
            }
          } catch (e) {
            console.error('proxy middleware load error: ', e)
          }
        });
      });
    };

    console.log(1.6);

    return await next();

    console.log(1.7);
  }
}
