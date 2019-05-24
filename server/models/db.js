const MongoClient = require('mongodb').MongoClient;
const {
  dbUrl,
  database,
} = require("../config")

const client = new MongoClient(dbUrl);
let db = {};

//  连接数据库函数
function _connect(cb) {
  //  配置链接信息
  MongoClient.connect(dbUrl, function (err, client) {
    if (err) throw err;
    cb(client);
    console.log("Connect successfully to server");
  })
}

//  初始化连接数据库 -- 连接数据库并创建索引，提高查询效率
function _init(cname) {
  _connect(function (client) {
    const col = client.db(database).collection(cname);
    col.createIndex({
      "username": "text"
    }, function (err) {
      if (err) throw err;
      console.log('username索引创建成功');
      client.close();
    });
  });
}

// 数据初始化
_init("user");

//  增
db.insert = function (colName, data, cb) {
  _connect(function (client) {
    const col = client.db(database).collection(colName);
    col.insertOne(data, function (err, result) {
      //  抛出数据或错误，交给外部处理
      cb(err, result);
      //  关闭连接
      client.close();
    })
  })
}

//  删
db.delete = function (colName, match, cb) {
  _connect(function (client) {
    const col = client.db(database).collection(colName);
    col.deleteMany(match, function (err, result) {
      //  抛出数据或错误，交给外部处理
      cb(err, result);
      //  关闭连接
      client.close();
    })
  })
}

//  改
db.update = function(colName, match, updated, cb){
  _connect(function(client){
    const col = client.db(database).collection(colName);
    col.update(match,{$set:updated},function(err, result){
      //  抛出数据或错误，交给外部处理
      cb(err, result);
      //  关闭连接
      client.close();
    })
  })
}

//  查
db.find = function (colName, match, cb){
  _connect(function(client){
    const col = client.db(database).collection(colName);
      col.find(match).toArray(function (err, result) {
        //  将错误或数据叫诶外部处理
        cb(err, result);
        //  关闭连接
        client.close();
      })    
  })
}

module.exports = db;