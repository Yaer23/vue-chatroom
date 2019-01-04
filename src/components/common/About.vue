<template>
  <transition name="showAbout">
    <div class="about">
      <i class="iconfont icon-roundclose" @click="closeAbout"></i>
      <h3>关于</h3>
      <p>聊天室功能:</p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;支持单独聊天、群聊。头像上传、发图片、表情</p>
      <p>技术栈：</p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;vue2、vue-router、vuex、axios、express、mongoDB</p>
      <h3 class="findMe">Find me</h3>
      <ul>
        <li><a href="https://github.com/Yaer23">Github</a></li>
        <li><a href="http://lydiagogo.cn">Lydiagogo</a></li>
      </ul>
    </div>
  </transition>
</template>

<script>
export default {
  name: "About",
  data() {
    return {
    };
  },
  methods:{
    closeAbout(){
      this.$store.commit("showAbout",false)
    }
  }
};
</script>

<style scoped>
.about {
  position: absolute;
  top: 9rem;
  left: 2rem;
  right: 2rem;
  background-color: #eee;
  z-index: 100;
  border-radius: 2%;
  padding: 0.5rem 1rem;
}

.icon-roundclose {
  font-size: 1.25rem;
  float: right;
}

.findMe {
  color: crimson;
  font-weight: bolder;
}
</style>