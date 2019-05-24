// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'

// Vuex
Vue.use(Vuex);

Vue.config.productionTip = false

//  工具引入 -- 移动端适配
import '@/utils/rem.js'

//  vuex
const store = new Vuex.Store({
  state: {
    isShowAbout: false,
    socket: null,
  },
  mutations: {
    changeName(state, name) {
      state.name = name;
    },
    showAbout(state, flag) {
      state.isShowAbout = flag;
    },
    addSocket(state, value) {
      state.socket = value
    },
    clearSocket(state) {
      state.socket = null;
    }
  }
});





import Element from 'element-ui';
Vue.use(Element);

import 'element-ui/lib/theme-chalk/index.css';

//  axios
import axios from 'axios'
axios.defaults.baseURL = 'api'; //所有axios请求都是以/api开头
Vue.prototype.$axios = axios;

// router.beforeEach((to, from, next) => {
//   if (to.path === '/') {
//     next()
//   } else {
//     if (!sessionStorage.getItem('username')) { // 判断当前用户是否存在
//       alert('Login first!')
//       next('/')
//     } else {
//       next()
//     }
//   }
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
