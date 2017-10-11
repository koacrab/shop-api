'use strict'
/**
 * 模板中间件
 */
const nunjucks = require('nunjucks');
const { resolve, join } = require('path');
// let cons = require('grace-consolidate');
// let engine = null;

module.exports = function() {
  console.log(2.1);
  return async function view(ctx, next) {
    ctx.renderJson = renderJson;
    ctx.renderText = renderText;

    let options = {
      autoescape: true,
      extension: '.html',
    };

    let env = nunjucks.configure(process.cwd() + '/theme', options);
    console.log(2.2);

    ctx.render = (file, data = {}) => {
      console.log(2.3);
      return new Promise((resolve, reject) => {
        console.log(2.4);
        env.render(file, data, (error, result) => {
          console.log(2.5);
          if (error) {
            result = error.message;
          }

          // 加了个这个就会报错：Can't set headers after they are sent.
          ctx.type = 'text/html';
          ctx.body = result;
          resolve(result);
        })
      });
    }

    console.log(2.6);

    return await next();
    console.log(2.7);
  }
};

function renderJson(data) {
  console.log('json...');
  return data;
}

function renderText(data) {
  return data;
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
