const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017/vueShop';
const dbName = 'vueShop';

module.exports = class News {
  constructor() {
    let insertData = function(db, callback){
      let collection = db.collection('col1');

      let data = [{"name":'haizlin', "url": 'http://www.baidu.com'},{"name":"wanglin", "url": "http://www.google.com"}];
      collection.insert(data, function(err, result){
        if(err){
          console.log('Error:' + err);
          return;
        }

        callback(result);
      })
    }
    MongoClient.connect(url, function(err, db){
      if(err) throw err;

      console.log('数据库已创建');

      insertData(db, function(result){
        console.log(result);
        db.close();
      })

      // let dbase = db.db('vueShop');
      /*dbase.createCollection('col1', function(err,res){
        if(err) throw err;

        console.log('创建集合！')
        db.close();
      });*/
    });
  }

  list(userid) {
    /*const insertDocuments = function(db, callback) {
      // Get the documents collection
      const collection = db.collection('documents');
      // Insert some documents
      collection.insertMany([
        {a : 1}, {a : 2}, {a : 3}
      ], function(err, result) {
        assert.equal(err, null);
        assert.equal(3, result.result.n);
        assert.equal(3, result.ops.length);
        console.log("Inserted 3 documents into the collection");
        callback(result);
      });
    }

    insertDocuments(this.db, function() {
      client.close();
    });*/

  }
};
