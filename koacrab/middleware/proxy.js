'use strict'
/**
 * 代理中间件
 */

const request = require('request');

module.exports = function() {
  console.log(0);
  return async function proxy1(ctx, next) {
    console.log(1);
    ctx.proxy1 = function(url) {
      console.log(2);
      return new Promise(function(resolve, reject) {
        console.log(3);
        request(url, function(err, response, body) {

          try {
            if (!err) {
                // var header = handleHeader(response.headers)
                // delete header['content-length'] // 避免长度和设置body长度不一致问题
                // delete header['transfer-encoding'] // 删除该字段，因为现在是下载完毕处理后才发送
                // ctx.response.set(header)
              // ctx.body = body

              // ctx.contentData = body;
              console.log(4);
              resolve(11111);
            } else {
              console.error('middleware load data error: ', err, err.stack)
            }
          } catch (e) {
            console.error('proxy middleware load error: ', e)
          }
        });
      });
    };

    console.log(5);

    await next();

    console.log(6);
  }
}
