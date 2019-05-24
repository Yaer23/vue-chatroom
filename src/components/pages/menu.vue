<template>
  <div>
    <div class="head">
      <i class="iconfont icon-right" @click="goBack"></i>
    </div>
    <div class="avatar">
      <img :src="avatar" alt  @click="goToModify">
      <p  @click="goToModify">{{ username }} </p>
    </div>
    <div class="panel_wrap">
      <div class="panel" @click="goToModify">修改个人信息</div>
      <div class="panel" @click="goToRoomTour">选择房间</div>
      <div class="panel" @click="logout">注销</div>
    </div>
  </div>
</template>

<script>
import cell from "@/components/common/cell";
export default {
  name: "menu",
  data() {
    return {
      username: "",
      avatar: "",

    };
  },
  created() {
    this.avatar = sessionStorage.getItem("avatar");
    this.username = sessionStorage.getItem("user");
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    addRoom() {
      console.log("click event");
    },
    goToChatroom(roomNum) {
      this.$router.push(`/chatroom/${roomNum}`);
    },
    goToModify(){
      this.$router.push(`/modifyInfo/${this.username}`)
    },
    goToRoomTour(){
      this.$router.push('/roomTour')
    },
    logout(){
      sessionStorage.setItem("user", "");
      this.$router.push('/');
    }
  },
  components: {
    cell
  }
};
</script>

<style scoped>
.head {
  position: absolute;
  top: 1rem;
  left: 21rem;
  margin-right: 0.625rem;
}
.head i {
  font-size: 1.8rem;
}

/* avatar */
.avatar img {
  width: 34%;
  height: 34%;
  margin-left: 33%;
  margin-top: 15%;
  border-radius: 50%;
}
.avatar p {
  text-align: center;
  font-weight: bolder;
  font-size: 20px;
}

/* panel */
.panel_wrap {
  margin-top: 50px;
}

.panel {
  margin: 0 auto;
  background-color: rgb(166, 111, 173);
  width: 80%;
  height: 50px;
  text-align: center;
  line-height: 50px;
  color: rgb(236, 225, 225);
  border-radius: 5px;
  margin-top: 20px;
  box-shadow: rgb(73, 71, 77) 0px 0px 10px;
}
</style>