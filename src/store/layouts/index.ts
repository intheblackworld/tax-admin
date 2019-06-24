import Vue from 'vue'

export default {
  namespaced: true,
  state: {
    isDrawerOpen: true,
    options: {},
    token: '',
  },

  getters: {
    testGetters: (state: { currencyList: any }) => [],
  },

  mutations: {
    toggleDrawer(state: { isDrawerOpen: boolean }) {
      state.isDrawerOpen = !state.isDrawerOpen
    },

    setOptions(state: { options: object }, payload: { key: string; data: [] }) {
      interface IParams {
        [key: string]: any
      }
      (state.options as IParams)[payload.key] = payload.data
    },

    // setToken(state: { token: string }, token: string) {
    //   state.token = token
    // },
  },

  actions: {
    // async getMineType(context: any) {
    //   getMineType().then((data) => {
    //     context.commit('setOptions', { data, key: 'mineType' })
    //   })
    // },

    // async login(context: any) {
    //   login().then((data: any) => {
    //     // 1. 沒有 token 就打這隻 API
    //     // 2. 回傳網址就轉址
    //     // 3. 回傳 token 就解析然後儲存
    //     if (data.url) {
    //       // window.location.href = data.url
    //     }
    //     if (data.token) {
    //       context.commit('setToken', data.token)
    //     }
    //   })
    // },

    // async logout(context: any) {
    //   logout().then((data: any) => {
    //     context.commit('setToken', '')
    //   })
    // },
  },
}
