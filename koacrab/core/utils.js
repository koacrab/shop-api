'use strict';

module.exports = {
  // 检测控制器是否为私有
  checkAct: function(name){
    if(name && name.substr(0, 1) === '_'){
      return false;
    }

    return true;
  }
};
