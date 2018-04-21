<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import login from './components/login.vue'
import chatroom from './components/chatroom.vue'

export default {
  name: 'App',
  components: {
    login,
    chatroom,
  }
}
</script>

<style>
html,body {
  margin: 0;
  padding: 0;
}
</style>
