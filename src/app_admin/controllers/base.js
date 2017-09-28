'use strict'

class Base {
    constructor(name) {
        this.fname = name;
    }

    _index(name) {
        console.log('父级1。。。');
        return '这是首页！' + this.name;
    }
};

module.exports = Base;
