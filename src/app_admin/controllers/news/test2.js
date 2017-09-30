'use strict'
let Base = require('../base.js');

module.exports = class Test extends Base {
    constructor() {
        super('子级传递过去的参数');
        this.name = 'test';
    }

    index() {
        return 'index...';
    }

    say(name) {
        return 'say';
    }

    demo() {
        var mod = this.hzlMod;
        var ctr = this.hzlCtr;
        var act = this.hzlAct;

        var t = this.demo1();
        var t1 = this._index();

        let data =  `
        模块：${mod}
        方法：${ctr}
        控制器：${act}
        内部方法：${t}
        父级方法：${t1}
        自身属性：${this.name}
        父级属性：${this.fname}`;

        // console.log(this.renderJson('ssss'));

        this.renderJson('ssss');
    }

    async demo1() {
        await this.render('../test.html', { name: 'wanglin', content: '这是测试的内容' });
        // console.log(content);
        // return content;
    }
};
