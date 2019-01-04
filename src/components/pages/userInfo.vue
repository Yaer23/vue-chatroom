<template>
  <div>
    <div class="head">
      <i class="iconfont icon-right"></i>
    </div>
    <div class="userInfo">
      <img :src="avatar" alt="" srcset="">
      <p>{{ $route.params.user }}</p>
    </div>
    
  </div>
</template>

<script>
  export default {
    name: "userInfo",
    data(){
      return {
        avatar: "",
      }        
    },
    created(){
      //  获取资料卡片用户头像
      this.$axios
        .get(`/getAvatar?username=${this.$route.params.user}`)
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
  }
</script>

<style scoped>
.head {
  position: absolute;
  top: 1rem;
  left: 21rem;
  margin-right: .625rem;
}
.head i {
  font-size: 1.8rem;
}
.userInfo {
  margin-top: 3.5rem;
}
.userInfo img{
  display: block;
  margin: 0 auto;
  /* height: 9.375rem; */
  width: 100%;
  /* width: 6.5rem; */
  /* height: 6.5rem; */
}

.userInfo p {
  text-align: center;
  font-size: 1.125rem;
}
</style>