<template>
  <div class="chatroom">
    <div class="header">
      <div class="logout">
        <i class="iconfont icon-moreclass" @click="goToMenu"></i>
      </div>
      <div class="roomName">
        <p>
          <i class="iconfont icon-users"></i>
          {{this.$route.params.user}}
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
          <div v-if="item.username == currentUser" class="self">
            <div class="bubble">
              <div class="chatBubble">{{ item.msg }}</div>
              <div class="triangle"></div>
            </div>
            <div class="avatar">
              <router-link :to="{ path: '/privateChat', params: { user: currentUser }}">
                <img :src="item.avatar" alt>
                <div class="user">{{ item.username }}</div>
              </router-link>
            </div>
          </div>
          <div v-else class="others">
            <div class="avatar">
              <img :src="item.avatar" alt>
              <div class="user">{{ item.username }}</div>
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
            <!-- <li><img src="../assets/QQ/1.gif" alt=""></li> -->
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
  name: "privateChat",
  data() {
    return {
      msg: "",
      msgs: [],
      clientNum: 0,
      showEmoji: false,
      emoji: [],
      currentUser: "",
      socket: null
    };
  },
  created() {
    this.socket = this.$store.state.socket;
    console.log(this.$route.params.user);
    this.currentUser = sessionStorage.getItem("user");

    // 接收消息
    this.socket.on("privateMsg", data => {
      console.log(data);
    });
    // this.socket.on("broadcastMsg", data => {
    //   this.msgs.push({
    //     msgType: "clientMsg",
    //     username: data.username,
    //     msg: data.msg,
    //     avatar: data.avatar,
    //     time: moment().format("HH:mm:ss")
    //   });
    //   console.log(data);
    // });
    // 用户下线提醒
    this.socket.on("offline", data => {
      if (data == this.$route.params.user) {
        this.msgs.push({
          msgType: "offline",
          username: data,
          time: moment().format("HH:mm:ss")
        });
      }
    });
  },
  //  设置窗口滚动
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
        this.socket.emit("privateMsg", {
          msg: data,
          to: this.$route.params.user,
          from: sessionStorage.getItem("user")
        });
        this.msg = "";
      } else {
        alert("消息为空！");
      }
    },
    showAbout() {
      this.$store.commit("showAbout", true);
    },
    goToMenu(){
      this.$router.push('/menu')
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

.logout,
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
  position: relative;
  height: 5.5rem;
}

.self,
.others {
  position: absolute;
}

.self {
  right: 0.875rem;
}

.others {
  left: 0.875rem;
}

.avatar {
  width: 3.5rem;
  /* height: 4rem; */
  display: inline-block;
}
.avatar img {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
}

.bubble {
  display: inline-block;
  position: relative;
  top: -2rem;
}

.self .bubble {
  right: 1rem;
}

.others .bubble {
  left: 1rem;
}

.chatBubble {
  height: 2rem;
  text-align: center;
  line-height: 2rem;
  background-color: rgb(198, 205, 243);
  font-size: 1rem;
  color: rgb(58, 58, 58);
  border-radius: 0.625rem;
  padding: 0 0.7rem;
}

.self .triangle {
  position: absolute;
  right: -0.625rem;
  top: 0.625rem;
  border-left: 0.625rem solid rgb(198, 205, 243);
  border-bottom: 0.625rem solid transparent;
}
.others .triangle {
  position: absolute;
  left: -0.625rem;
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
  width: 1.5625rem;
  height: 9.0625rem;
  position: absolute;
  bottom: 1.875rem;
  border: 1px solid #ccc;
  background-color: rgb(244, 248, 250);
  box-sizing: border-box;
  display: inline;
  padding: 0rem;
}

.emojiList li {
  display: inline-block;
  margin: 0;
  cursor: pointer;
  width: 1.5rem;
  height: 1.5rem;
  box-sizing: border-box;
}

.emojiList li:hover {
  border: 1px solid #ccc;
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
  font-size: 1.125rem;
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
