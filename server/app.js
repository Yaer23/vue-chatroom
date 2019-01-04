//  获取路由中间件
const express = require("express")
//  引入封装的db模块
const db = require('./models/db')
//  引入formidable模块
const formidable = require("formidable")
const path = require("path")
const PORT = 8889;

//  创建express服务器
const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
server.listen(PORT,function(){console.log("listening on: 8889")});

let router = express.Router()
let clientCount = 0;

//监听client的连接,回调函数传递本次连接的socket
io.on('connection', function (socket) {
  // 接收到某用户上线信息
  socket.on('online', function (data) {
    // 当前在线人数加一
    clientCount++;
    // 广播当前在线人数
    io.emit('clientNum', clientCount);

    socket.username = data
    // 给所有client广播消息（包括当前socket本身）
    io.emit('online', data)
    console.log('user : ' + socket.username + ' connected!')
  })

  // 接收用户发送的消息
  socket.on('msg', function (data) {
    // 广播接收到的消息
    io.emit('broadcastMsg',data);
  })

  // 监听用户断开连接
  socket.on('disconnect', function () {
    // 当前用户减一
    clientCount--;
    // 广播当前用户人数
    io.emit('clientNum', clientCount);

    // 广播用户断开下线
    socket.broadcast.emit('offline', socket.username);
    console.log(socket.username + ' 下线了~')
  })
})

router.post("/doRegister", (req, res, next) => {
  //  解析文件，用包
  var form = new formidable.IncomingForm()
  // 修改上传目录
  form.uploadDir = path.join(__dirname, 'public', 'imgs');
  //  设置编码格式
  form.encoding = 'utf-8';
  // 保持原始文件的扩展名
  form.keepExtensions = true;
  // 解析
  form.parse(req, function (err, fields, files) {
    var username = fields.username;
    var password = fields.password;
    var avatar = ""
    console.log(files);
    if(JSON.stringify(files)!=="{}"){
      console.log("{}")
      avatar = "http://localhost:8889/imgs/"+path.parse(files.avatar.path).base;
    } else {
      console.log("{dssad}")
      avatar = "http://images.lydiagogo.cn/chat_avatar.jpg"
    }
    //  判断用户名是否存在
    console.log(username, password, avatar)
    db.find("user", {
      username
    }, function (err, result) {
      if (err) return next(err);
      if (result.length) {
        res.json({
          code: 300,
          msg: "用户名已存在!"
        })
      } else {
        // 保存数据到数据库
        db.insert("user", {
          username,
          password,
          avatar
        }, function (err, result) {
          if (err) return next(err)
          // 保存位置的cookie
          // res.setHeader('set-cookie', 'location=' + location);
          // 同步提交，浏览器等待页面显示
          res.json({
            code: 200,
            msg: "注册成功！"
          })
        })
      }
    })
  });
}).post("/doLogin", (req, res, next) => {
  //  解析文件，用包
  var form = new formidable.IncomingForm();
  //  设置编码格式
  form.encoding = 'utf-8';
  // 解析
  form.parse(req, function (err, fields, files) {
    if (err) next(err)
    var username = fields.username;
    var password = fields.password;
    //  判断用户名和密码是否正确
    db.find("user", {
      username,
      password
    }, function (err, result) {
      if (err) return next(err);
      if (result.length) {
        res.json({
          code: 200,
          msg: "登陆成功！"
        })
      } else {
        res.json({
          code: 400,
          msg: "用户名或密码错误！"
        })
      }
    })
  });
}).get("/getAvatar", (req, res, next) => {
  var {
    username
  } = req.query;
  db.find("user", {
    username
  }, function (err, result) {
    if (err) next(err)
    if (result.length == 1) {
      console.log("1")
      res.json({
        code: 200,
        msg: result[0].avatar
      })
    } else {
      console.log("0")
      res.json({
        code: 300,
        msg: "未找到!"
      })
    }
  })
})

//  处理静态文件（图片）的路径
app.use(express.static('./public'));

//  将路由中间件加入到app服务器中
app.use(router);