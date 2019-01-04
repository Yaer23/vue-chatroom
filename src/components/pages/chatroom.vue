<template>
  <div class="chatroom">
    <div class="header">
      <div class="menu">
        <router-link :to="{ path: '/menu'}">
          <i class="iconfont icon-moreclass"></i>
        </router-link>
      </div>
      <div class="roomName">
        <p>
          <i class="iconfont icon-users1f"></i>
          ( {{ clientNum }} users)
        </p>
      </div>
      <div class="about">
        <a href="#" @click="showAbout">
          <i class="iconfont icon-info"></i>
        </a>
      </div>
      <transition name="slide-fade">
        <About v-if="isShowAbout"/>
      </transition>
    </div>
    <div class="body">
      <div v-for="(item,index) of msgs" :key="index" class="msgItem">
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
          <div v-if="item.username == currentUser" class="self">
            <div class="bubble">
              <div class="chatBubble">{{ item.msg }}</div>
              <div class="triangle"></div>
            </div>
            <div class="avatar">
              <img :src="item.avatar" alt>
              <div class="user">{{ item.username }}</div>
            </div>
          </div>
          <div v-else class="others">
            <div class="avatar">
              <router-link :to="{ name:'userInfo', params: { user: item.username }}">
                <img :src="item.avatar" alt>
                <div class="user">{{ item.username }}</div>
              </router-link>
            </div>
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
        <transition v-if="showEmoji" name="fade">
          <ul class="emojiList">
            <li v-for="(emoji,index) in emojis" :key="index">
              <a href="#" @click="addEmoji(emoji)">{{emoji}}</a>
            </li>
          </ul>
        </transition>
        <a href="#" @click="showEmoji = !showEmoji">
          <i class="emoji iconfont icon-emoji"></i>
        </a>
        <input
          v-model="msg"
          autofocus
          class="input"
          type="text"
          @keydown.enter="send(msg)"
          placeholder="press Enter to send message"
        >
      </div>
    </div>
  </div>
</template>

<script>
import About from "@/components/common/About.vue";
const moment = require("moment");

export default {
  name: "chatroom",
  data() {
    return {
      msg: "",
      msgs: [],
      clientNum: 0,
      showEmoji: false,
      emoji: [],
      currentUser: "",
      emojis: ["😀","😬","😂","😆","😇","😉","😊","😋","😌","😍","😘","😗","😝","😛","😎","😏","😶","😑","😒","😳","😞","😟","😠","😡","😔","😕","😣","😫","😤","😮","😨","😰","😯","😦","😧","😢","😭","😵","😷","😈","💤","💩","👻","🎃","👽","👀","👯","🌈","🚦","🚧","⚽","🎱","🎹","🎼","🎮","🎲","🐼","🍎","🎂",'🍩',"🐣","🐝","🐛","🐌","🐞"],
    };
  },
  created: function() {
    this.currentUser = sessionStorage.getItem("user");
    // 检测用户是否登录
    if (this.currentUser) {
      // 用户已登录，客户端发送上线信息给服务器
      socket.emit("online", this.currentUser);
    } else {
      // 用户未登录，提醒用户登录并跳转到登录页面
      alert("Login first!");
      this.$router.push("/");
    }
    // 用户上线提示
    socket.on("online", data => {
      this.msgs.push({
        msgType: "online",
        username: data,
        time: moment().format("HH:mm:ss")
      });
    });
    // 接收消息
    socket.on("broadcastMsg", data => {
      this.msgs.push({
        msgType: "clientMsg",
        username: data.username,
        msg: data.msg,
        avatar: data.avatar,
        time: moment().format("HH:mm:ss")
      });
      console.log(data);
    });
    // 用户下线提醒
    socket.on("offline", data => {
      this.msgs.push({
        msgType: "offline",
        username: data,
        time: moment().format("HH:mm:ss")
      });
    });
    // 监听当前在线人数
    socket.on("clientNum", num => {
      this.clientNum = num;
    });
  },
  updated: function() {
    this.$nextTick(function() {
      var oBody = document.querySelector(".body");
      oBody.scrollTop = oBody.scrollHeight;
    });
  },
  computed: {
    isShowAbout() {
      return this.$store.state.isShowAbout;
    }
  },
  methods: {
    send(data) {
      if (data) {
        socket.emit("msg", {
          msg: data,
          username: this.currentUser,
          avatar: sessionStorage.getItem("avatar")
        });
        this.msg = "";
      } else {
        alert("消息为空！");
      }
    },
    showAbout() {
      this.$store.commit("showAbout", true);
    },
    addEmoji(emoji){
      this.msg += emoji;
    },
    openMenu(){
      console.log("open")
    }
  },
  components: { About }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chatroom {
  background-color: #fff;
}

a:hover {
  color: brown;
}

.chatroom {
  width: 23.4375rem;
  height: 41.6875rem;
  position: relative;
  margin: 0 auto;
}
.header {
  background-color: rgb(112, 114, 175);
  height: 3.125rem;
  display: -webkit-flex;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.body {
  height: 35.3rem;
  width: 100%;
  overflow: auto;
  text-align: center;
}

.iconfont {
  font-size: 1.5rem;
}

.menu,
.about {
  padding: 0.4375rem;
}

.sysTime {
  color: #999;
  font-size: 0.8125rem;
  margin-bottom: 0.5rem;
}

.onlineMsg,
.offlineMsg,
.clientMsgs {
  margin-bottom: 0.625rem;
  height: 3.125rem;
  width: 100%;
}

.online,
.offline {
  display: inline-block;
  height: 1.4375rem;
  padding-left: 0.625rem;
  padding-right: 0.625rem;
  border-radius: 0.1875rem;
  color: #999;
  text-align: center;
  line-height: 1.4375rem;
  background-color: rgb(209, 209, 209);
  font-size: 1rem;
  box-sizing: border-box;
}

.clientMsgs {
  height: 5.5rem;
  clear: both;
}

.self,.others {
  position: relative;
}

.self {
  float: right;
  padding-right: .5rem;
}

.others {
  float: left;
  padding-left: .5rem;
}

.avatar {
  position: absolute;
  width: 3.5rem;
  top: 0rem;
}

.self .avatar {
  right: .625rem;
}

.other .avatar {
  left: 625rem;
}

.avatar img {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
}

.bubble {
  display: inline-block;
  position: relative;
  top: 0rem;
}

.self .bubble {
  right: 1rem;
  padding-right: 3.5rem;
}

.others .bubble {
  padding-left: 3.5rem;
  left: 1rem;
}

.chatBubble {
  word-wrap:break-word;
  max-width: 16rem;
  overflow: hidden;
  text-align: left;
  line-height: 2rem;
  background-color: rgb(198, 205, 243);
  font-size: 1rem;
  color: rgb(58, 58, 58);
  border-radius: 0.625rem;
  padding: 0 0.7rem;
}

.self .triangle {
  position: absolute;
  right: 2.9rem;
  top: 0.625rem;
  border-left: 0.625rem solid rgb(198, 205, 243);
  border-bottom: 0.625rem solid transparent;
}
.others .triangle {
  position: absolute;
  left: 2.9rem;
  top: 0.625rem;
  border-right: 0.625rem solid rgb(198, 205, 243);
  border-bottom: 0.625rem solid transparent;
}

.footer {
  height: 2.8125rem;
  width: 23.4375rem;
  position: absolute;
  bottom: 0;
  display: -webkit-flex;
  display: flex;
}

.emoji {
  position: absolute;
  left: 0.625rem;
  top: 0.625rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.emojiList {
  height: 10rem;
  position: absolute;
  bottom: 1.875rem;
  border: 1px solid #ccc;
  background-color: rgb(244, 248, 250);
  box-sizing: border-box;
  display: inline-block;
  padding: 0.5rem;
}

.emojiList li {
  display: inline-block;
  margin: 0;
  cursor: pointer;
  width: 1.7rem;
  height: 1.7rem;
  box-sizing: border-box;
}

.emojiList li:active {
  border: 1px solid #ccc;
}

.emojiList li a {
  box-sizing: border-box;
  font-size: 1.7rem;
  line-height: 1.8rem;
  height: 1.8rem;
}

.msgInput {
  position: relative;
  width: 100%;
  height: 2.8125rem;
}

.msgInput .input {
  box-sizing: border-box;
  width: 23.4375rem;
  height: 2.8125rem;
  border: 1px solid #eee;
  padding-left: 3.125rem;
  background-color: #eee;
  font-size: 1.2rem;
  caret-color: rgb(62, 141, 231);
  color: rgb(55, 125, 182);
}

/* transition */
.slide-fade-enter-active {
  transition: all 0.5s ease;
}
.slide-fade-leave-active {
  transition: all 0.4s cubic-bezier(1, 0.5, 0.8, 1);
}
/* .slide-fade-leave-active for below version 2.1.8 */
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(-10px);
  opacity: 1;
}
</style>
