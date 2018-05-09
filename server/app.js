var server = require('http').createServer(),
  io = require('socket.io')(server),
  PORT = 8081,
  clientCount = 0;

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

console.log('listening at :' + PORT)

server.listen(PORT);
