// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

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
  components: {
    App
  },
  template: '<App/>'
})
