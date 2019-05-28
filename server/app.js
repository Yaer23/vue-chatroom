                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
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
server.listen(PORT, function () {
  console.log("listening on: 8889")
});
// 加密加盐
const bcrypt = require('bcrypt') 
const SALT_WORK_FACTOR = 10

//  获取路由中间件
let router = express.Router()
// let clientCount = 0;
let count = {};

//监听client的连接,回调函数传递本次连接的socket
io.on('connection', function (socket) {
	console.log(socket)
  //  根据房间号加入相应的房间
  socket.on('joinRoom', function (roomNum) {
    socket.roomNum = roomNum;
    if (!count[roomNum]) {
      // 房间不存在，当前人数为1
      count[roomNum] = 1
    } else {
      // 房间存在，当前人数加1
      count[roomNum]++;
    }
    console.log(count)
    socket.join(roomNum);
  })

  // 接收到某用户上线信息
  socket.on('online', function (user) {
    // 广播当前房间在线人数
    io.to(socket.roomNum).emit("clientNum", count[socket.roomNum])
    socket.username = user
    // 给所有在当前房间的client广播消息（不包括当前socket本身）
    socket.broadcast.in(socket.roomNum).emit("online", user)

    console.log('user : ' + socket.username + '上线!')
  })

  // 接收用户发送的消息
  socket.on('msg', function (data) {
    console.log("msg enter")
    // 广播接收到的消息(包括发送给当前socket)
    io.to(socket.roomNum).emit("broadcastMsg", data)
  })

  //  接收到私聊信息
  // socket.on('privateMsg', function (data) {
  //   console.log(data)
  // })

  //  接收用户断开连接的信息
  socket.on('offline', function (user) {
    count[socket.roomNum]--;
    // 广播当前房间在线人数
    io.to(socket.roomNum).emit("clientNum", count[socket.roomNum])
    // 广播用户断开下线
    socket.broadcast.in(socket.roomNum).emit("offline", user);
    socket.leave(socket.roomNum);
    console.log("user : " + user + ' 下线了~')
  })                  

  // 监听用户断开连接
  socket.on('disconnect', function () {
    // 当前socket离开房间
    socket.leave(socket.roomNum);
    // 当前房间人数减1
    count[socket.roomNum]--;
    // 广播当前房间在线人数
    io.to(socket.roomNum).emit("clientNum", count[socket.roomNum])
    // 广播用户断开下线
    socket.broadcast.in(socket.roomNum).emit("offline", socket.username);
    console.log("user : " + socket.username + ' 下线了~')
  })
})

// 路由接口
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
    if (JSON.stringify(files) !== "{}") {
      avatar = "http://localhost:8889/imgs/" + path.parse(files.avatar.path).base;
    } else {
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
        // 加密加盐
        bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
          if (err) return next(err)
          bcrypt.hash(password, salt, (err, hash) => {
            if (err) return next(err)
            password = hash
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
      username
    }, function (err, result) {
      if (err) {
        res.json({
          code: 500,
          msg: "数据库错误"
        })
      } else if (result.length == 0) {
        res.json({
          code: 400,
          msg: "该用户不存在"
        })
      } else {
        bcrypt.compare(password, result[0].password, (err, isMatch) => {
          if (err) {
            res.json({
              code: 500,
              msg: "数据库出错！"
            })
          } else if (isMatch) {
            res.json({
              code: 200,
              msg: "登陆成功！"
            })
          } else {
            res.json({
              code: 400,
              msg: "密码错误！"
            })
          }
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
}).get("/getRooms", (req, res, next) => {
  db.find("rooms", {}, function (err, result) {
    if (err) next(err)
    // if (result.length >= 10) {
    //   res.json({
    //     code: 300,
    //     msg: "房间数目过多，超过十个，添加房间失败"
    //   })
    // } else {
    res.json({
      code: 200,
      msg: result
    })
    // }
  })
}).post("/addRoom", (req, res, next) => {
  //  解析文件，用包
  var form = new formidable.IncomingForm()
  // 修改上传目录
  form.uploadDir = path.join(__dirname, 'public', 'roomBgImg');
  //  设置编码格式
  form.encoding = 'utf-8';
  // 保持原始文件的扩展名
  form.keepExtensions = true;
  // 解析
  form.parse(req, function (err, fields, files) {
    var roomName = fields.roomName;
    var roomNum = fields.roomNum;
    var bgImg = ""
    if (JSON.stringify(files) !== "{}") {
      console.log("{}")
      bgImg = "http://localhost:8889/roomBgImg/" + path.parse(files.bgImg.path).base;
    }
    // 保存数据到数据库
    db.insert("rooms", {
      roomName,
      roomNum,
      bgImg
    }, function (err, result) {
      if (err) return next(err)
      // 保存位置的cookie
      // res.setHeader('set-cookie', 'location=' + location);
      // 同步提交，浏览器等待页面显示
      res.json({
        code: 200,
        msg: "添加成功！"
      })
    });
  })
}).get("/getRoomName", (req, res, next) => {
  var {
    roomNum
  } = req.query;
  db.find("rooms", {
    roomNum: roomNum.toString()
  }, function (err, result) {
    if (err) next(err)
    res.json({
      code: 200,
      msg: result
    })
  })
}).post("/modifyInfo", (req, res, next) => {
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
    var user = fields.user;
    var username = fields.username;
    var oldPassword = fields.oldPassword;
    var password = fields.newPassword;
    var avatar = fields.avatar;
    if (JSON.stringify(files) !== "{}") {
      avatar = "http://localhost:8889/imgs/" + path.parse(files.avatar.path).base;
    }
    db.find("user", {
      username: user
    }, function (err, result) {
      if (err) return next(err)
      bcrypt.compare(oldPassword, result[0].password, (err, isMatch) => {
        if (err) return next(err)
        if (isMatch) {
          // 对新密码进行加密加盐
          bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
            if (err) return next(err)
            bcrypt.hash(password, salt, (err, hash) => {
              if (err) return next(err)
              password = hash
              // 更新数据到数据库
              db.update("user", {
                username: user
              }, {
                username,
                password,
                avatar
              }, function (err, result) {
                if (err) return next(err)
                // 保存位置的cookie
                // res.setHeader('set-cookie', 'location=' + location);
                // 同步提交，浏览器等待页面显示
                console.log(result)
                if(result.result.ok == 1){
                  res.json({
                    code: 200,
                    msg: "修改成功！"
                  })
                }
              });
            })
          })

        } else {
          res.json({
            code: 400,
            msg: "密码错误！"
          })
        }
      })
    })
  })
})


//  处理静态文件（图片）的路径
app.use(express.static(path.join(__dirname, '/public')));

//  将路由中间件加入到app服务器中
app.use(router);