import Vue from 'vue'
import Vuex from 'vuex'
import users from './store/users'
import layouts from './store/layouts'
import taxs from './store/taxs'

Vue.use(Vuex)

interface ILayoutState {
  token: string,
  info: object,
}

interface IState {
  layouts: ILayoutState
}

export default new Vuex.Store<IState>({
  mutations: {},
  actions: {},

  modules: {
    users,
    layouts,
    taxs,
  },
})
