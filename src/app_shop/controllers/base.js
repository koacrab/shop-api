'use strict'

class Base {
  constructor(name) {
    this.name = name;
  }

  _index(name) {
    return '这是父级的_index方法！' + name;
  }
};

module.exports = Base;
