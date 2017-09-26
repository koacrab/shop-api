/**
 * 路由中间件 学习
 */

'use strict'
let cons = require('grace-consolidate');
// let engine = null;

module.exports = function(root, opts) {
    return async function view(ctx, next) {
        ctx.render = render;
        ctx.renderJson = renderJson;
        ctx.renderText = renderText;

        await next();
    }
}

function renderJson(data){
    console.log('json...');
    return data;
}

function renderText(data){
    return text;
}

function render(path, options) {
    let engine = cons['handlebars'];
    /*return new Promise((resolve) => {
          engine(path, options, function(err, html) {
            if (err) throw err;
            resolve(html);
        });
    });*/
}
