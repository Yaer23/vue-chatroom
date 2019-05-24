const path = require("path");
module.exports = {
  dbUrl: 'mongodb://chatroomUser:123456@127.0.0.1:27017/chatroom',
  database: 'chatroom',
  colName: 'user',
  appPort: 9999,
  staticDir: path.resolve('./public'),
  uploadDir: path.resolve('./public/imgs')
}