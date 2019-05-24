<template>
  <div>
    <div class="userInfo">
      <div class="infoTop">
        <div class="head">
          <i class="iconfont icon-right" @click="goBack"></i>
        </div>
        <div class="avatar">
          <img :src="avatar" alt>
        </div>
        <p>{{ $route.params.user }}</p>
        <p class="signature">“你現在過的每一天，都是餘生中最年輕的一天。”</p>
      </div>
      <div class="infoBottom">
        <button>添加好友</button>
        <button @click="goToPrivateChat">私聊</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "userInfo",
  data() {
    return {
      avatar: ""
    };
  },
  created() {
    console.log(this.$route);
    //  获取头像
    this.getAvatar();
  },
  methods: {
    goBack() {
      console.log("emm");
      this.$router.go(-1);
    },
    goToPrivateChat(){
      console.log("private chat")
      this.$router.push(`/privateChat/${this.$route.params.user}`)
    },
    getAvatar(){
      this.$axios
        .get(`/getAvatar?username=${this.$route.params.user}`)
        .then(res => {
          if (res.data.code === 200) {
            this.avatar = res.data.msg;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
.infoTop {
  width: 17rem;
  height: 34rem;
  background-color: rgb(151, 152, 206);
  margin: 0 auto;
  padding: 15px;
  border-bottom-right-radius: 2em;
  border-bottom-left-radius: 2em;
  box-shadow: 8px 8px 5px #585477;
}

.head {
  position: absolute;
  top: 1rem;
  left: 21rem;
  margin-right: 0.625rem;
}
.head i {
  font-size: 1.8rem;
}

.avatar {
  margin: 1.5rem auto;
  width: 10.5rem;
  height: 10.5rem;
  border: 2px solid #eee;
  opacity: .9;
  border-radius: 50%;
  box-sizing: border-box;
}

.avatar img {
  display: block;
  margin: .6rem auto;
  width: 9rem;
  height: 9rem;
  border-radius: 50%;
  box-sizing: border-box;
}

.userInfo p {
  text-align: center;
  font-size: 1.4rem;
}

.signature {
  margin-top: .6rem;
  width: 15rem;
  overflow: hidden;
  height: 14rem;
text-overflow: ellipsis;

/* white-space: nowrap; */
}

/* button */
.infoBottom {
  width: 100%;
  margin-top: 2.2rem;
  height: 6.25rem;
  display: flex;
  justify-content: space-around;
}

.infoBottom button {
  display: inline-block;
  width: 9rem;
  height: 3.125rem;
  border-radius: .625rem;
  border: 0;
  color: rgb(212, 219, 235);
  font-size: 1rem;
  background-color: rgb(47, 56, 138);
  box-shadow: 2px 2px 2px #585477;

}
</style>