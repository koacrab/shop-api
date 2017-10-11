// const Model = require('Model');
const mysql = require('mysql');

module.exports = class News {
  constructor() {
    console.log('实例化模块……');
  }

  getUserInfo(userid) {
    let connection = mysql.createConnection({
      host: '127.0.0.1',
      user: 'root',
      password: 'root',
      database: 'test'
    });

    connection.connect(function(err) {
      if (err) {
        console.error('error connecting: ' + err.stack);
        return;
      }

      console.log('连接成功 ' + connection.threadId);
    });


    connection.query('SELECT * from `userinfo`', function(err, rows, fields) {
      if (err) throw err;

      console.log(rows);
    });

    var post = {
      username: 'haizlin',
      departname: 'sss'
    };
    connection.query('INSERT INTO userinfo SET ?', post, function(err, rows, fields) {
      if (err) throw err;

      console.log(rows);
    });

    connection.end();

    return '你提交的用户id为：' + userid;
  }
};
