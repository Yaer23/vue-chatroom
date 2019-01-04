<template>
  <div class="login">
    <div class="header">
      <div class="right">
        <i class="iconfont icon-info" title="关于" @click="showAbout"></i>
        <transition name="slide-fade">
          <About v-if="isShowAbout"/>
        </transition>
      </div>
    </div>
    <div class="title">
      <p>Login</p>
    </div>
    <div class="avatar">
      <img :src="avatar" alt="avatar" class="avatar_img">
    </div>
    <div class="form">
      <div>
        <span class="InputTitle">Username</span>
        <input
          type="text"
          class="Input"
          v-model="form.username"
          @change="checkAvatar"
          @keyup.enter="login"
        >
      </div>
      <div>
        <span class="InputTitle">Password&nbsp;</span>
        <input type="password" class="Input" v-model="form.password" @keyup.enter="login">
      </div>
    </div>
    <div class="tips">
      <router-link :to="{name: 'Register'}" class="toRegister">
        Register
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
    <!-- <div class="block">
      <p>组件值：{{ value13 }}</p>
      <el-date-picker
        v-model="value13"
        type="daterange"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :default-time="['00:00:00', '23:59:59']"
      ></el-date-picker>
    </div>
    <div class="block">
      <el-date-picker v-model="value5" type="year" placeholder="选择年" @change="changeYear"></el-date-picker>
    </div> -->


        <!-- <el-date-picker
      v-model="value"
      type="daterange"
      type1="year"
      align="right"
      unlink-panels
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :picker-options="pickerOptions">
    </el-date-picker>
          <el-date-picker v-model="value1" type="year" placeholder="选择年" @change="changeYear"></el-date-picker> -->
  </div>
</template>

<script>
import About from "@/components/common/About.vue";

export default {
  name: "Login",
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      author: "Lydiagogo",
      avatar: "http://images.lydiagogo.cn/chat_avatar.jpg",
      value: "",
      value1: '',
    };
  },
  computed: {
    isShowAbout() {
      return this.$store.state.isShowAbout;
    }
  },
  methods: {
    // changeYear(e) {
    //   const date = new Date(e);
    //   const pickedYear = date.getFullYear();
    //   this.value = [`${pickedYear}-01-01`,`${pickedYear}-12-31`]
    // },
    //  非空判断
    checkLogin() {
      if (this.form.username.trim() && this.form.password.trim()) {
        return true;
      } else {
        return false;
      }
    },
    login() {
      if (this.checkLogin()) {
        //  登陆操作：检查用户名和密码是否一致（为防止恶意试探用户名，只提示“用户名或密码有误”）
        this.$axios
          .post("/doLogin", {
            username: this.form.username,
            password: this.form.password
          })
          .then(res => {
            if (res.data.code === 200) {
              sessionStorage.setItem("user", this.form.username);
              this.$router.push("/chatroom");
              alert(res.data.msg);
            } else {
              alert(res.data.msg);
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        alert("您输入的用户名或密码长度有问题！");
      }
    },
    showAbout() {
      this.$store.commit("showAbout", true);
    },
    checkAvatar() {
      //  通过this.form.username在数据库中查询是否有相关的用户，并将其头像反应到页面上
      this.$axios
        .get(`/getAvatar?username=${this.form.username}`)
        .then(res => {
          console.log(res);
          if (res.data.code === 200) {
            this.avatar = res.data.msg;
          } else {
            this.avatar = "http://images.lydiagogo.cn/chat_avatar.jpg";
          }
          sessionStorage.setItem("avatar",this.avatar)
        })
        .catch(err => {
          console.log(err);
        });
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

/* tips */
.tips {
  position: relative;
  top: 1rem;
  left: 15rem;
}
.toRegister {
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