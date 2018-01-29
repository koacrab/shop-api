'use strict';
console.log('page.js....');
module.exports = {
  getSize: function(num){
    console.log('获取到的分页数:',num);
  },

  setSize: function(num){
    console.log('设置分页分页数:',num);
  },

  max: function(num){
    console.log('最大分页数:',num);
  }
};
