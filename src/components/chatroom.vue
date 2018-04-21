<template>
  <div class="chatroom">
    <div class="header">
      <div class="logout">
        <a href=""><i class="iconfont icon-logout"></i></a>
      </div>
      <div class="roomName"> 
        <p>ChatRoom ( {{ clientNum }} users) </p>
      </div>
      <div class="about">
        <a href="https://github.com/Yaer23"><i class="iconfont icon-icon-user"></i></a>
      </div>
    </div>
    <div class="body">
      <div v-for="(item,index) of msgs" :key="index">
        <div v-if="item.msgType == 'online'" class="onlineMsg">
          <div class="sysTime">{{ item.time }}</div>
          <div class="online">{{ item.username }} 上线</div>
        </div>
        <div v-else-if="item.msgType == 'offline'" class="offlineMsg">
          <div class="sysTime">{{ item.time }}</div>
          <div class="offline">{{ item.username }} 下线</div>
        </div>
        <div v-else class="clientMsgs">
          <div class="sysTime">{{ item.time }}</div>
          <div v-if="item.username == $route.query.username" class='self'>
            <div class="bubble">
              <div class="chatBubble">{{ item.msg }}</div>
              <div class="triangle"></div>
            </div>
             <div class="user">{{ item.username }}</div>
          </div>
          <div v-else class="others">
            <div class="user">{{ item.username }}</div>
            <div class="bubble">
              <div class="chatBubble">{{ item.msg }}</div>
              <div class="triangle"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="msgInput">
        <div class="emojiPanel" v-if="showEmoji">
          <ul class="emojiList">
            <li><img src="../assets/QQ/1.gif" alt=""></li>
            <li><img src="../assets/QQ/2.gif" alt=""></li>
            <li><img src="../assets/QQ/3.gif" alt=""></li>
            <li><img src="../assets/QQ/4.gif" alt=""></li>
            <li><img src="../assets/QQ/5.gif" alt=""></li>
            <li><img src="../assets/QQ/6.gif" alt=""></li>
            <li><img src="../assets/QQ/7.gif" alt=""></li>
            <li><img src="../assets/QQ/8.gif" alt=""></li>
            <li><img src="../assets/QQ/9.gif" alt=""></li>
            <li><img src="../assets/QQ/10.gif" alt=""></li>
            <li><img src="../assets/QQ/11.gif" alt=""></li>
            <li><img src="../assets/QQ/12.gif" alt=""></li>
            <li><img src="../assets/QQ/13.gif" alt=""></li>
            <li><img src="../assets/QQ/14.gif" alt=""></li>
            <li><img src="../assets/QQ/15.gif" alt=""></li>
            <li><img src="../assets/QQ/16.gif" alt=""></li>
            <li><img src="../assets/QQ/17.gif" alt=""></li>
            <li><img src="../assets/QQ/18.gif" alt=""></li>
            <li><img src="../assets/QQ/19.gif" alt=""></li>
            <li><img src="../assets/QQ/20.gif" alt=""></li>
            <li><img src="../assets/QQ/21.gif" alt=""></li>
            <li><img src="../assets/QQ/22.gif" alt=""></li>
            <li><img src="../assets/QQ/23.gif" alt=""></li>
            <li><img src="../assets/QQ/24.gif" alt=""></li>
            <li><img src="../assets/QQ/25.gif" alt=""></li>
            <li><img src="../assets/QQ/26.gif" alt=""></li>
            <li><img src="../assets/QQ/27.gif" alt=""></li>
            <li><img src="../assets/QQ/28.gif" alt=""></li>
            <li><img src="../assets/QQ/29.gif" alt=""></li>
            <li><img src="../assets/QQ/30.gif" alt=""></li>
            <li><img src="../assets/QQ/31.gif" alt=""></li>
            <li><img src="../assets/QQ/32.gif" alt=""></li>
            <li><img src="../assets/QQ/33.gif" alt=""></li>
            <li><img src="../assets/QQ/34.gif" alt=""></li>
            <li><img src="../assets/QQ/35.gif" alt=""></li>
            <li><img src="../assets/QQ/36.gif" alt=""></li>
            <li><img src="../assets/QQ/37.gif" alt=""></li>
            <li><img src="../assets/QQ/38.gif" alt=""></li>
            <li><img src="../assets/QQ/39.gif" alt=""></li>
            <li><img src="../assets/QQ/40.gif" alt=""></li>
            <li><img src="../assets/QQ/41.gif" alt=""></li>
            <li><img src="../assets/QQ/42.gif" alt=""></li>
            <li><img src="../assets/QQ/43.gif" alt=""></li>
            <li><img src="../assets/QQ/44.gif" alt=""></li>
            <li><img src="../assets/QQ/45.gif" alt=""></li>
            <li><img src="../assets/QQ/46.gif" alt=""></li>
            <li><img src="../assets/QQ/47.gif" alt=""></li>
            <li><img src="../assets/QQ/48.gif" alt=""></li>
            <li><img src="../assets/QQ/49.gif" alt=""></li>
            <li><img src="../assets/QQ/50.gif" alt=""></li>
            <li><img src="../assets/QQ/51.gif" alt=""></li>
            <li><img src="../assets/QQ/52.gif" alt=""></li>
            <li><img src="../assets/QQ/53.gif" alt=""></li>
            <li><img src="../assets/QQ/54.gif" alt=""></li>
            <li><img src="../assets/QQ/55.gif" alt=""></li>
            <li><img src="../assets/QQ/56.gif" alt=""></li>
            <li><img src="../assets/QQ/57.gif" alt=""></li>
            <li><img src="../assets/QQ/58.gif" alt=""></li>
            <li><img src="../assets/QQ/59.gif" alt=""></li>
            <li><img src="../assets/QQ/60.gif" alt=""></li>
            <li><img src="../assets/QQ/61.gif" alt=""></li>
            <li><img src="../assets/QQ/62.gif" alt=""></li>
            <li><img src="../assets/QQ/63.gif" alt=""></li>
            <li><img src="../assets/QQ/64.gif" alt=""></li>
            <li><img src="../assets/QQ/65.gif" alt=""></li>
            <li><img src="../assets/QQ/66.gif" alt=""></li>
            <li><img src="../assets/QQ/67.gif" alt=""></li>
            <li><img src="../assets/QQ/68.gif" alt=""></li>
            <li><img src="../assets/QQ/69.gif" alt=""></li>
            <li><img src="../assets/QQ/70.gif" alt=""></li>
          </ul>
        </div>
        <a href="#" @click="showEmoji = !showEmoji"><i class="emoji iconfont icon-emoji"></i></a>
        <input v-model="msg" autofocus class="input" type="text" @keydown.enter="send(msg)" placeholder="press Enter to send message" >
      </div>
    </div>
  </div>
</template>

<script>
var moment = require("moment");

export default {
  name: "chatroom",
  data() {
    return {
      socket: null,
      msg: "",
      msgs: [],
      clientNum: 0,
      showEmoji: false
    };
  },
  mounted: function() {
    this.socket = io("ws://localhost:8081");

    // 检测用户是否登录
    if (this.$route.query.username) {
      // 用户已登录，客户端发送上线信息给服务器
      this.socket.emit("online", this.$route.query.username);
    } else {
      // 用户未登录，提醒用户登录并跳转到登录页面
      alert("You haven't login yet!!!");
      this.$router.push("/");
    }

    // 用户上线提示
    this.socket.on("online", data => {
      this.msgs.push({
        msgType: "online",
        username: data,
        time: moment().format("HH:mm:ss")
      });
    });

    // 接收消息
    this.socket.on("broadcastMsg", data => {
      this.msgs.push({
        msgType: "clientMsg",
        username: data.username,
        msg: data.msg,
        time: moment().format("HH:mm:ss")
      });
    });

    // 用户下线提醒
    this.socket.on("offline", data => {
      this.msgs.push({
        msgType: "offline",
        username: data,
        time: moment().format("HH:mm:ss")
      });
    });

    // 监听当前在线人数
    this.socket.on("clientNum", num => {
      this.clientNum = num;
    });

    //添加点击事件

  },
  updated: function() {
    this.$nextTick(function() {
      var oBody = document.querySelector(".body");
      oBody.scrollTop = oBody.scrollHeight;
    });
  },
  methods: {
    send: function(data) {
      if(data){
        this.socket.emit("msg", {
          msg: data,
          username: this.$route.query.username
        });
        this.msg = "";
      } else {
        alert('消息为空！');
      }
    }
  }
  
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  text-decoration: none;
}

a:hover {
  color: brown;
}

.chatroom {
  width: 400px;
  height: 600px;
  position: relative;
  border: 1px solid #999;
  margin: 0 auto;
  margin-top: 15px;
}
.header {
  background-color: rgb(112, 114, 175);
  height: 50px;
  display: -webkit-flex;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.body {
  height: 505px;
  width: 100%;
  overflow: auto;
  text-align: center;
}

.iconfont {
  font-size: 24px;
}

.logout,
.about {
  padding: 7px;
}

.sysTime {
  color: #999;
  font-size: 13px;
  margin-bottom: 3px;
}

.onlineMsg,
.offlineMsg,
.clientMsgs {
  margin-bottom: 10px;
  height: 50px;
  width: 100%;
}

.clientMsgs {
  position: relative;
}

.online,
.offline {
  display: inline-block;
  height: 23px;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 3px;
  color: #999;
  text-align: center;
  line-height: 23px;
  background-color: rgb(209, 209, 209);
  font-size: 16px;
  box-sizing: border-box;
}

.self {
  position: absolute;
  right: 14px;
}

.others {
  position: absolute;
  left: 14px;
}

.bubble {
  display: inline-block;
  position: relative;
}

.chatBubble {
  height: 30px;
  line-height: 30px;
  background-color: rgb(198, 205, 243);
  font-size: 16px;
  color: rgb(58, 58, 58);
  border-radius: 10px;
  padding-left: 10px;
  padding-right: 10px;
}

.self .triangle {
  position: absolute;
  right: -10px;
  top: 10px;
  border-left: 10px solid rgb(198, 205, 243);
  border-bottom: 10px solid transparent;
}
.others .triangle {
  position: absolute;
  left: -10px;
  top: 10px;
  border-right: 10px solid rgb(198, 205, 243);
  border-bottom: 10px solid transparent;
}

.self .user {
  display: inline-block;
  margin-left: 10px;
}

.others .user {
  display: inline-block;
  margin-right: 10px;
}

.footer {
  height: 45px;
  width: 100%;
  position: absolute;
  bottom: 0;
  display: -webkit-flex;
  display: flex;
}

.emoji {
  position: absolute;
  left: 10px;
  top: 10px;
}

.emojiPanel {
  width: 400px;
  height: 145px;
  position: absolute;
  bottom: 45px;
  border: 1px solid #ccc;
  background-color: rgb(244, 248, 250);
  box-sizing: border-box;
}

.emojiList {
  display: inline;
  padding: 0px;
}

.emojiList li {
  display: inline-block;
  margin: 0;
  cursor: pointer;
  width: 24px;
  height: 24px;
  box-sizing: border-box;
}

.emojiList li:hover {
  border: 1px solid #ccc;
}

.msgInput {
  position: relative;
  width: 100%;
  height: 45px;
}

.msgInput .input {
  box-sizing: border-box;
  width: 400px;
  height: 45px;
  border: 1px solid #eee;
  padding-left: 50px;
  background-color: #eee;
  font-size: 18px;
  caret-color: rgb(62, 141, 231);
  color: rgb(55, 125, 182);
}
</style>
