<template>
  <div class="login">
    <div class="prompt">
      <h2>{{ msg }}</h2>
      <h3 class="promptTxt">Enter your name:</h3>
    </div>
    <div class="username">
      <i class="iconfont icon-login_user"></i>
      <input v-model="username" class="nameInput" type="text" @keydown.enter="login" autofocus />
    </div>
    <div class="footer">
      <div class="wrap">
        <h4>Powered by <a href="http://github.com/Yaer23"> {{ author }}</a></h4>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "login",
  data() {
    return {
      username: "",
      author: 'Lydiagogo',
      msg: "Welcome to Lydia's chatting room !"
    };
  },
  methods: {
    login: function() {
      if(this.username){
        this.$router.push({path: '/chatroom', query:{username:this.username}});
        // sessionStorage.setItem('username',this.username);
      } else {
        alert('请输入您的姓名！')
      }
    }
  }
};
</script>

<style scoped>
.login {
   width: 400px;
  height: 600px;
  position: relative;
  border: 1px solid #999;
  margin: 0 auto;
  margin-top: 15px;
  background-color: rgb(94, 93, 180);
  background-image: url('');
}

.prompt {
  margin-top: 50px;
  margin-bottom: 45px;
  padding-left: 20px;
}

.username {
  display: -webkit-flex;
  display: flex;
  justify-content: flex-start;
  margin-left: 75px;
}

.nameInput {
  width: 230px;
  height: 40px;
  border: 0;
  border-radius: 5px;
  background-color: rgb(226, 227, 240);
  margin-left: 15px;
  padding-left: 10px;
  font-size: 18px;
  color: rgb(50, 43, 151);
}
.nameInput:focus {
  outline: none;
  caret-color: rgb(252, 53, 96);
}

.iconfont {
  font-size: 35px;
}

.footer .wrap {
  color:#999;
  text-align: center;
  width: 400px;
}
.footer {
  position: absolute;
  bottom: 10px;
}

.wrap h4 {
  padding: 0 10px;
}

.wrap h4 a {
  text-decoration: none;
}

.footer .wrap {
  display: flex;
  align-items: center;
}

.footer .wrap::before,
.footer .wrap::after {
  content: '';
  display: block;
  background: linear-gradient(#eee,#eee);
  height: 1px;
  flex: 1;
}

</style>