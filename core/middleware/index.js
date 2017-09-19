'use strict';

const fs = require('fs');
const curPath = __dirname;
const config = require('./config');

module.exports = function(app) {
    if (config) {
        for(let item in config){
            let filePath = `${curPath}/${item}/index.js`;
            if (fs.existsSync(filePath) && config[item] !== undefined && config[item]['status']) {
                console.log('此次运行加载的中间件：' + item);
                app.regMiddleware(require(filePath));
            }
        }
    } else {
        fs.readdirSync(curPath).forEach((item) => {
            let filePath = `${curPath}/${item}/index.js`;
            if (fs.existsSync(filePath) && config[item] !== undefined && config[item]['status']) {
                console.log('此次运行加载的中间件：' + item);
                app.regMiddleware(require(filePath));
            }
        });
    }

}
