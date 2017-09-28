'use strict'

class Base {
  constructor(name) {
    this.fname = name;
  }

  _index(name) {
    return '这是父级的_index方法！' + this.name;
  }
};

module.exports = Base;
