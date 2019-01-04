import Vue from 'vue'
import Router from 'vue-router'
import chatroom from '@/components/pages/chatroom'
import Login from '@/components/pages/Login'
import Register from '@/components/pages/Register'
import Log_Reg from '@/components/common/log_reg'
import privateChat from '@/components/pages/privateChat'
import menu from '@/components/pages/menu'
import userInfo from '@/components/pages/userInfo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/chatroom',
      name: 'chatroom',
      component: chatroom
    },
    {
      path: '/privateChat',
      name: 'privateChat',
      component: privateChat
    },
    {
      path: '/menu',
      name: 'menu',
      component: menu
    },
    {
      path: '/userInfo',
      name: 'userInfo',
      component: userInfo
    }
  ]
})
