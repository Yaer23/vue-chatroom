<template>
  <div class="login">
    <div class="header">
      <div class="right">
        <i class="iconfont icon-info" title="关于" @click="showAbout"></i>
        <About v-if="isShowAbout"/>
      </div>
    </div>
    <div class="title">
      <p>{{ currentPage }}</p>
    </div>
    <div class="avatar">
      <img src="http://images.lydiagogo.cn/chat_avatar.jpg" alt class="avatar_img">
    </div>
    <div class="form">
      <div>
        <span class="InputTitle">Username</span>
        <input type="text" class="Input" v-model="form.username">
      </div>
      <div>
        <span class="InputTitle">Password&nbsp;</span>
        <input type="password" class="Input" v-model="form.password">
      </div>
      <div v-if="isRegisterPage">
        <span class="InputTitle avatarTitle">Avatar&nbsp;</span>
        <div class="file">
          <input type="file" class="fileInput">
        </div>
      </div>
    </div>
    <div class="tips">
      <router-link :to="{name: changePage}" class="toCurrentPage">{{ changePage }}
        <i class="iconfont icon-right"></i>
      </router-link>
    </div>
    <div class="footer">
      <div class="wrap">
        <h4>
          Powered by
          <a href="http://github.com/Yaer23">{{ author }}</a>
        </h4>
      </div>
    </div>
  </div>
</template>

<script>
import About from "@/components/common/About.vue";

export default {
  name: "Log_Reg",
  data() {
    return {
      form: {
        username: "",
        password: "",
        avatar:"",
      },
      isShowAbout: false,
      isRegisterPage: false,
      author: "Lydiagogo",
      currentPage: "Login",
      changePage: "Register"
    };
  },
  beforeRouteEnter(to,from,next){
    next(mv=>{
      if(to.name == "Register"){
        console.log("toRegister")
        mv.isRegisterPage = true;
        mv.currentPage = "Register";
        mv.changePage = "Login";
      } else if(to.name == "Login") {
        console.log("toLogin")
        mv.currentPage = "Login";
        mv.changePage = "Register";
      }
    })
  },
  methods: {
    login() {
      if (this.username) {
        this.$router.push({
          path: "/chatroom",
          query: { username: this.username }
        });
        // sessionStorage.setItem('username',this.username);
      } else {
        alert("请输入您的姓名！");
      }
    },
    register(){},
    showAbout() {
      this.isShowAbout = true;
    }
  },
  components: {
    About
  }
};
</script>

<style scoped>
/* .header */
.header {
  position: absolte;
  top: 0;
}

.header .right {
  padding: 0.625rem;
} 

/* title */
.title {
  margin: 0 auto;
  margin-bottom: 3rem;
}
.title p {
  text-align: center;
  font-size: 1.8rem;
}

/* avatar */
.avatar {
  width: 6.25rem;
  height: 6.25rem;
  margin: 0 auto;
}
.avatar_img {
  border-radius: 50%;
  width: 6.25rem;
  height: 6.25rem;
}

/* form */
.form {
  padding: 2rem;
}


/* 输入框样式 */
.Input {
  width: 12rem;
  display: inline-block;
  padding: 0.5rem;
  margin: 0.5rem 0rem;
  background-color: rgb(94, 93, 180);
  color: rgb(168, 160, 160);
  border: 0px;
  border-bottom: 0.05rem solid rgb(22, 16, 16);
  text-align: center;
  font-size: 1.5rem;
  letter-spacing: 2px;
  outline: 0;
}
.InputTitle {
  padding: 0 0.5rem;
  display: inline-block;
  font-size: 1rem;
  color: #eee;
}

/* file */
::-ms-browse,
[type="file"] {
  display: inline-block;
  padding: 0.15em;
  line-height: 1.5rem;
  border: 0;
  background: #f0f3f9;
  color: #34538b;
}
::-webkit-file-upload-button {
  display: inline-block;
  padding: 0 0.5em;
  line-height: 1.7rem;
  border: 0;
  background: rgb(60, 32, 139);
  color: #999;
  border-radius: 5%;
}
.file {
  position: relative;
}
.fileInput {
  width: 13rem;
  position: absolute;
  overflow: hidden;
  right: 0;
  top: 0;
  /* opacity: 0.5; */
}
.avatarTitle {
  position: relative;
  top: 1.5rem;
}

/* tips */
.tips {
  position: relative;
  top: 1rem;
  left: 15rem;
}
.toCurrentPage {
  font-size: 1.3rem;
  text-decoration: none;
}

/* iconfont */
.icon-right {
  font-size: 1.5rem;
}

/* footer */
.footer {
  position: absolute;
  bottom: 0.625rem;
}

.footer .wrap {
  color: #999;
  width: 23.4375rem;
  display: flex;
  align-items: center;
}

.footer .wrap::before,
.footer .wrap::after {
  content: "";
  display: block;
  background: linear-gradient(#eee, #eee);
  height: 1px;
  flex: 1;
}
</style>