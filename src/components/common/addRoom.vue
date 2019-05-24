<template>
  <div id="addRoom">
    <form>
      <h4>房间名：</h4>
      <input type="text" v-model="form.roomName">
      <h4>背景图：</h4>
      <input type="file" class="fileInput" ref="bgImg">
      <button @click="cancel">取消</button>
      <button @click="submit">提交</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "addRoom",
  props:["roomCount"],
  data() {
    return {
      form: {
        roomName: "",
        bgImg: ""
      }
    };
  },
  methods: {
    cancel() {
      this.$emit("cancel", false);
    },
    submit() {
      var formData = new FormData();
      formData.append("roomName",this.form.roomName)
      formData.append("roomNum",++this.roomCount)
      formData.append("bgImg",this.$refs.bgImg.files[0])
      this.$axios.post("/addRoom",formData).then(res=>{
        console.log(res)
        if(res.data.code == 200){
          alert(res.data.msg)
          this.cancel();
        }
      }).catch(err=>{
        console.log(err)
      })
    }
  }
};
</script>

<style scoped>
#addRoom {
  position: fixed;
  top: 30%;
  left: 20%;
  margin: 0 auto;
  height: 40%;
  width: 60%;
  background-color: #fcc;
  padding: 20px;
  border-radius: 5px;
}

h4 {
  margin: 10px 0px;
}

input[type="text"] {
  width: 11rem;
  display: inline-block;
  padding: 0.5rem;
  margin: 0.5rem 0rem;
  background-color: #fcc;
  color: rgb(168, 160, 160);
  border: 0px;
  border-bottom: 0.05rem solid rgb(22, 16, 16);
  text-align: center;
  font-size: 1.5rem;
  letter-spacing: 2px;
  outline: 0;
}

/* button */
button {
  /* 按钮美化 */
  margin-top: 1.25rem;
  width: 5rem; /* 宽度 */
  height: 2.5rem; /* 高度 */
  border-width: 0px; /* 边框宽度 */
  border-radius: 3px; /* 边框半径 */
  background: #888; /* 背景颜色 */
  cursor: pointer; /* 鼠标移入按钮范围时出现手势 */
  outline: none; /* 不显示轮廓线 */
  font-family: Microsoft YaHei; /* 设置字体 */
  color: white; /* 字体颜色 */
  font-size: 17px; /* 字体大小 */
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

input[type="file"] {
  width: 12rem;
}
</style>