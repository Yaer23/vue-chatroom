import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  username: ''
}

const mutations = {
  nameRefresh (state,newname) {
    state.username = newname;
  }
}

export default new Vuex.Store({
  state,
  mutations
})