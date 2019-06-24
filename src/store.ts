import Vue from 'vue'
import Vuex from 'vuex'
import users from './store/users'
import layouts from './store/layouts'
import taxs from './store/taxs'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
  },
  mutations: {},
  actions: {},

  modules: {
    users,
    layouts,
    taxs,
  },
})
