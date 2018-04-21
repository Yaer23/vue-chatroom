import Vue from 'vue'
import Router from 'vue-router'
import chatroom from '@/components/chatroom'
import login from '@/components/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/chatroom',
      name: 'chatroom',
      component: chatroom
    }
  ]
})
