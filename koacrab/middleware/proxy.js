'use strict'
/**
 * 代理中间件
 */

const request = require('request-promise');

module.exports = function() {
  return async function httpProxy(ctx, next) {
    if (ctx.httpProxy) return await next();

    ctx.httpProxy = function(url) {
      return new Promise((resolve, reject) => {
        request(url, {}, (err, response, body) => {
          try {
            if (!err) {
              this.contentData = body;
              resolve(body);
            } else {
              console.error('middleware load data error: ', err, err.stack)
            }
          } catch (e) {
            console.error('proxy middleware load error: ', e)
          }
        });
      });
    };

    await next();
  }
}

function test(url, resolve) {
  return request(url, {}, (err, response, body) => {
    try {
      if (!err) {
        resolve('test');
      } else {
        console.error('middleware load data error: ', err, err.stack)
      }
    } catch (e) {
      console.error('proxy middleware load error: ', e)
    }
  });
}

function handleHeader(header) {
  if (!header) {
    return
  }
  for (var attr in header) {
    var trim = attr.trim()
    if (trim.toLowerCase() == 'content-length') {
      delete header[attr]
    } else if (trim != attr) {
      header[trim] = header[attr]
      delete header[attr]
    }
  }
  return header
}
