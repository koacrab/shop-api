const Koa = require('koa');
const config = require('../config/index.js');
const convert = require('koa-convert');
const Middles = require('./middleware/index');

class Application {
    constructor(appDir){
        this.middlewares = [];
        this.koa = new Koa();
        this.appDir = appDir;
    }

    init(){
        // register system middlewares
        Middles(this);

       /* // load application components
        component(this);*/

        // TODO: sortMiddleware();

        for (let item of this.middlewares) {
            this.use(item(this));
        }

        this.koa.listen(config.port);
        console.log('app in running in port ' + port);
    }

    // 使用koa的中间件
    use(Middles){
        this.koa.use(Middles);
    }

    // 注册中间件
    regMiddleware(middleware){
        // console.log('test:', middleware);
        this.middlewares.push(middleware);
    }

    // 读取配置
    getConf(dir, name){

    }

    // 设置配置
    setConf(dir, name, value){

    }
}

module.exports = Application;
