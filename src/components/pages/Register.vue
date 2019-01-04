<template>
  <div class="register">
    <div class="header">
      <div class="right">
        <i class="iconfont icon-info" title="关于" @click="showAbout"></i>
        <transition name="slide-fade">
          <About v-if="isShowAbout"/>
        </transition>
      </div>
    </div>
    <div class="title">
      <p>Register</p>
    </div>
    <div class="avatar">
      <img :src="form.avatar" alt class="avatar_img">
    </div>
    <div class="form" ref="form">
      <div class="avatarInput">
        <span class="InputTitle avatarTitle">Avatar&nbsp;</span>
        <div class="file">
          <input type="file" class="fileInput" @change="changeAvatar" ref="avatar">
        </div>
      </div>
      <div>
        <span class="InputTitle">Username</span>
        <input type="text" class="Input" v-model="form.username" @keyup.enter="register">
      </div>
      <div>
        <span class="InputTitle">Password&nbsp;</span>
        <input type="password" class="Input" v-model="form.password" @keyup.enter="register">
      </div>
    </div>
    <div class="tips">
      <router-link :to="{name: 'Login'}" class="toLogin">
        Login
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
  name: "Register",
  data() {
    return {
      form: {
        username: "",
        password: "",
        avatar: "http://images.lydiagogo.cn/chat_avatar.jpg"
      },
      author: "Lydiagogo"
    };
  },
  computed:{
    isShowAbout(){
      return this.$store.state.isShowAbout
    }
  },
  methods: {
    goToLogin() {
      this.$router.push("/");
    },
    showAbout() {
      this.$store.commit("showAbout", true);
    },
    register() {
      var formData = new FormData();
      formData.append("username",this.form.username)
      formData.append("password",this.form.password)
      formData.append("avatar",this.$refs.avatar.files[0])
      this.$axios.post("/doRegister",formData).then(res=>{
        console.log(res)
        if(res.data.code == 300){
          alert(res.data.msg);
        } else if(res.data.code == 200){
          alert(res.data.msg);
          this.goToLogin();
        } else {
          alert("something wrong!")
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    changeAvatar(e) {
      this.form.avatar = this.getObjectURL(e.target.files[0]);
      console.log(this.form.avatar);
    },
    getObjectURL(file) {
      var url = null;
      // 下面函数执行的效果是一样的，只是需要针对不同的浏览器执行不同的 js 函数而已
      if (window.createObjectURL != undefined) {
        // basic
        url = window.createObjectURL(file);
      } else if (window.URL != undefined) {
        // mozilla(firefox)
        url = window.URL.createObjectURL(file);
      } else if (window.webkitURL != undefined) {
        // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
      }
      return url;
    }
  },
  components:{About}
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

/* input */
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

/* avatarInput */
.avatarInput {
  margin: 1.8rem 0rem;
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
  left: 16rem;
  margin-top: 2rem;
}
/* tologin */
.toLogin {
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

/* transition */
.slide-fade-enter-active {
  transition: all .5s ease;
}
.slide-fade-leave-active {
  transition: all .4s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
/* .slide-fade-leave-active for below version 2.1.8 */ 
.slide-fade-enter, .slide-fade-leave-to
{
  transform: translateX(-10px);
  opacity: 1;
}
</style>