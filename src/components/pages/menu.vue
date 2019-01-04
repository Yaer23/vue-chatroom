<template>
  <div>
    <div class="head">
      <i class="iconfont icon-right"></i>
    </div>
    <div class="userInfo">
      <img :src="avatar" alt="" srcset="">
      <p>{{ username }}</p>
    </div>
    <div class="">
      <cell title="退出登录" :test="test"/>
    </div>
  </div>
</template>

<script>
import cell from '@/components/common/cell'
  export default {
    name: "menu",
    data(){
      return {
        username: "",
        avatar: "",
        test:"mytest"
      }
    },
    created(){
      this.avatar = sessionStorage.getItem("avatar")
      this.username = sessionStorage.getItem("user")
      console.log(this.avatar,this.username)
    },
    components:{
      cell
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
  width: 6.5em;
  height: 6.5rem;
  border-radius: 50%;
}

.userInfo p {
  text-align: center;
  font-size: 1.125rem;
}
</style>