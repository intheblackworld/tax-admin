import Vue from 'vue'
import { login, logout } from '@/http/apis'
const jwtDecode = require('jwt-decode')

export default {
  namespaced: true,
  state: {
    token: '',
    info: {},
    isDrawerOpen: true,
    options: {},
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
      ; (state.options as IParams)[payload.key] = payload.data
    },

    setToken(state: { token: string }, token: string) {
      state.token = token
    },

    setLoginInfo(state: any, info: any) {
      state.info = info
    },
  },

  actions: {
    // async getMineType(context: any) {
    //   getMineType().then((data) => {
    //     context.commit('setOptions', { data, key: 'mineType' })
    //   })
    // },

    async login(context: any) {
      login().then((data: any) => {
        // 1. 沒有 token 就打這隻 API
        // 2. 回傳網址就轉址
        // 3. 回傳 token 就解析然後儲存
        const token = data.token
        if (token) {
          const decode = jwtDecode(token)
          context.commit('setToken', token)
          context.commit('setLoginInfo', decode)
          return
        }
        if (data.url) {
          window.location.href = data.url
          return
        }
      })
    },

    async logout(context: any) {
      logout().then((data: any) => {
        context.commit('setToken', '')
        window.location.reload()
      })
    },
  },
}
