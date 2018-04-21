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
  </div>
</template>

<script>

export default {
  name: "login",
  data() {
    return {
      username: "",
      msg: "Welcome to Lydia's chatting room !"
    };
  },
  methods: {
    login: function() {
      if(this.username){
        this.$router.push({path: '/chatroom', query:{username:this.username}});
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
  margin-bottom: 45px;
}

.username {
  display: -webkit-flex;
  display: flex;
  justify-content: flex-start;
  margin-left: 75px;
}

.nameInput {
  width: 300px;
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
</style>