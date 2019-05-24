import Vue from 'vue'
import Router from 'vue-router'
import chatroom from '@/components/pages/chatroom'
import Login from '@/components/pages/Login'
import Register from '@/components/pages/Register'
import Log_Reg from '@/components/common/log_reg'
import privateChat from '@/components/pages/privateChat'
import menu from '@/components/pages/menu'
import userInfo from '@/components/pages/userInfo'
import roomTour from '@/components/pages/roomTour'
import modifyInfo from '@/components/pages/modifyInfo'


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
      path: '/chatroom/:roomNum',
      name: 'chatroom',
      component: chatroom
    },
    {
      path: '/privateChat/:user',
      name: 'privateChat',
      component: privateChat
    },
    {
      path: '/roomTour',
      name: 'roomTour',
      component: roomTour
    },
    {
      path: '/menu',
      name: 'menu',
      component: menu
    },
    {
      path: '/userInfo/:user',
      name: 'userInfo',
      component: userInfo
    },{
      path: '/modifyInfo/:user',
      name: 'modifyInfo',
      component: modifyInfo
    }
  ]
})
