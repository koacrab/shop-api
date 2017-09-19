var mongoose = require('mongoose');
var DB_URL = 'mongodb://127.0.0.1:27017/test';
var db = mongoose.connect(DB_URL);

mongoose.connection.on('connected', function(){
    console.log('connection open to ' + DB_URL);
});

mongoose.connection.on('disconnected', function(){
    console.log('error');
});

module.exports = mongoose;