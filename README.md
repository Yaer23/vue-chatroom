# chatroom

基于vue2.0和websocket的一个实时聊天小项目

[项目地址](https://github.com/Yaer23/vue-chatroom)

## 项目介绍

 - 基于vue2.0和websocket的一个实时聊天小项目，支持最基本的聊天功能如用户对话、上下线提醒
 - 使用vue2.0对前端页面进行了简单展示
 - 对聊天气泡的处理（css画出气泡的三角）
 - vue-router对页面路由切换
 - 通过编程式导航进行路由间通信，传递用户名信息
 - flex简单实现login页面页脚部分

## 项目展示

### login页

![Login](http://oofwms1or.bkt.clouddn.com/chat-login.png)

### chatroom页面

![chatroom](http://oofwms1or.bkt.clouddn.com/chat-room.png)

## websocket相关

[实时通信和websocket](https://blog.csdn.net/qq_35936643/article/details/79928532)
[socket.io](https://socket.io/)

### 使用情况

 - io.on('connection',function(){}) 服务器监听，客户端连接时触发
 - io.on('disconnect',function(){}) 服务器监听，客户端断开连接时触发
 - socket.on('event',function(){}) 监听客户端/服务器发送的事件'event'
 - io.emit('event',function(){}) 服务器发送相关事件
 - socket.emit('event',function(){}) 客户端发送相关事件

### 区分：

 - socket.emit() ：向建立**该连接**的客户端广播  
 - socket.broadcast.emit() ：向除去建立该连接的客户端的所有客户端广播(项目中，用于用户上下线提醒部分) 
 - io.sockets.emit()/io.emit()：给所有client广播消息,包括当前socket本身（项目中用于消息的战士部分）

## How to run

### npm run server

打开控制台 输入`npm run server`，启动server，监听客户端的连接

### npm run dev

另开一个控制台 输入`npm run dev`,启动客户端连接