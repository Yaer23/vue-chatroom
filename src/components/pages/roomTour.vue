<template>
  <div>
    <div class="head">
      <i class="iconfont icon-right" @click="goBack"></i>
    </div>
    <div class="Title">
      <h3>选择房间</h3>
    </div>
    <div class="roomList">
      <ul>
        <li
          v-for="(room,index) in rooms"
          :key="index"
          @click="goToChatroom(room.roomNum)"
          :style="'background-image:url('+room.bgImg+');background-size: 100%;'"
        >{{ room.roomName }}</li>
        <li v-if="rooms.length <= 10" class="addRoom" @click="addRoom">创建房间</li>
      </ul>
    </div>
    <addRoom v-if="showAddRoom" @cancel="addCancel" :roomCount="rooms.length"/>
  </div>
</template>

<script>
import cell from "@/components/common/cell";
import addRoom from "@/components/common/addRoom";
export default {
  name: "roomTour",
  data() {
    return {
      username: "",
      avatar: "",
      rooms: [],
      showAddRoom: false
    };
  },
  created() {
    this.avatar = sessionStorage.getItem("avatar");
    this.username = sessionStorage.getItem("user");
    console.log(this.username)
    if(!this.username){
      alert("未登陆，请先登录")
      this.$router.push('/')
    }
    this.getRooms();
  },
  methods: {
    getRooms() {
      //  获取房间信息
      this.$axios
        .get("/getRooms")
        .then(res => {
          console.log(res);
          if (res.data.code == 300) {
            alert(res.data.msg);
          } else if (res.data.code == 200) {
            this.rooms = res.data.msg;
          }
          console.log(this.rooms);
        })
        .catch(err => {
          console.log(err);
        });
    },
    goBack() {
      this.$router.push('/');
    },
    addRoom() {
      console.log("click event");
      this.showAddRoom = true;
    },
    goToChatroom(roomNum) {
      this.$router.push(`/chatroom/${roomNum}`);
    },
    addCancel(isShow) {
      this.showAddRoom = isShow;
      this.getRooms();
    },
  },
  components: {
    cell,
    addRoom
  }
};
</script>

<style scoped>
/* head */
.head {
  position: absolute;
  top: 1rem;
  left: 21rem;
  margin-right: 0.625rem;
}
.head i {
  font-size: 1.8rem;
}

/* title */

.Title {
  color: rgb(179, 175, 196);
  font-size: 22px;
  padding-left: 1.25rem;
}

/* roomList */
.roomList {
  margin: 0;
  width: 100%;
}

.roomList ul {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  align-items: center;
  padding: 0;
}

.roomList ul li {
  box-sizing: border-box;
  margin-top: 1.25rem;
  list-style: none;
  background-color: #eee;
  border-radius: 0.3125rem;
  width: 16rem;
  height: 9rem;
  color: rgb(139, 79, 124);
  font-weight:bolder;
  line-height: 10rem;
  font-size: 20px;
  text-align: center;
}

.addRoom {
  background-color: rgb(172, 75, 75);
}

.addRoom:before {
  content: "+";
  font-size: 90px;
  color: rgb(70, 25, 25);
  display: inline-block;
}
</style>