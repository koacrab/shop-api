'use strict'
/**
 * 模板中间件
 */
const nunjucks = require('nunjucks');
const {
  resolve,
  join
} = require('path');
// let cons = require('grace-consolidate');
// let engine = null;

module.exports = function() {
  let mime = ['text/plain','text/html','application/json'];

  return async function view(ctx, next) {
    if (ctx.render) return await next();

    ctx.renderJson = function(data) {
      return renderJson(ctx, data);
    };

    ctx.renderText = function(data) {
      return renderText(ctx, data);
    };

    let options = {
      autoescape: true,
      extension: '.html',
    };

    let env = nunjucks.configure(process.cwd() + '/theme', options);

    ctx.render = (file, data = {}) => {
      return new Promise((resolve, reject) => {
        env.render(file, data, (error, result) => {
          if (error) {
            result = error.message;
          }

          // 加了个这个就会报错：Can't set headers after they are sent.
          ctx.type = 'text/html';
          ctx.body = result;
          resolve(result);
        })
      });
    };

    await next();
  }
};

function renderJson(ctx, data) {
  ctx.type = 'application/json';
  return ctx.body = data;
}

function renderText(ctx, data) {
  ctx.type = 'text/plain';
  return ctx.body = data;
}

function render(ctx, next, path, options) {
  // let engine = cons['handlebars'];
  /*return new Promise((resolve) => {
        engine(path, options, function(err, html) {
          if (err) throw err;
          resolve(html);
      });
  });*/
}
