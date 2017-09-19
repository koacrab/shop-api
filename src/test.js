function controllerContext(){
  this.a = 'aaa';
}

controllerContext.prototype.render = function(a, b) {
    return 'a + b = ' + (a + b);
};

class Blog {
    constructor(name) {
        this._this = this;
        console.log('进入blog类， name = ' + name);
        this.name = name;
    }

    index(a, b) {
        console.log(this.a);
        // this.test();
        console.log(this.render(a, b));
    }

    test(){
        console.log('test...');
    }
};

/*function Blog(name){
  this.name = name;
}

Blog.prototype = {
  index:function(a, b){
    console.log(this);
    this.test();
    console.log(this.render(a, b));
  },
  test:function(){
    console.log('test...');
  }
}*/

var blog = new Blog('测试。。。');

var ct = new controllerContext();
// console.log(ct);

blog.index.call(ct, 1, 2);
