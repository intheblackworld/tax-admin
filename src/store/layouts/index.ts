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
        // const token = 'eyJhbGciOiJIUzI1N
        // iIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJta
        // W1zdGVzdCIsImdpdmVuX2
        // 5hbWUiOiLnpKbmpa3mmbrmh
        // afnrqHnkIbmuKzoqabluLPomZ8iLCJodHRwOi8vc2NoZW1hcy
        // 5taWNyb3NvZnQuY29tL3dz
        // LzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOlsiUGVvcGxlLlNlYXJjaCIsIlBlb3BsZS5NYW5hZ2UiLCJC
        // aWxsYm9hcmQuTWFuYWdlIiwiU2FmZ
        // S5GaXJzdExldmVsIiwiU2FmZS5TZWNvbmRMZXZlbCIsIlNhZmUuVGhpcmRMZXZlbCIsIllpZWxkLkNQQy
        // IsIllpZWxkLlVuZGVyR3JvdW5kIiwiWW
        // llbGQuTWFuYWdlIiwiWWllbGQuT3BlblBpd
        // CIsIlBlcm1pc3Npb24uTWFuYWdlIiwiQWxsLlN1cGVy
        // Vmlld2VyIiwiVGF4Lk1hbmFnZW1lbnQiL
        // CJNaW5lQ2hlY2suQ2FzZU9mZmljZXIiLCJ
        // NaW5lQ2hlY2suTWFuYWdlciIsIlNhZmVDaGVjay5NYW
        // 5hZ2UiLCJEcmFmdC5BZG1pbiIsIlB1Yk
        // 9wLkNyZWF0ZXJfTGVnaXNsYXRpdmVZYW4
        // iLCJBZG1pbi5NYW5hZ2UiLCJSZXN1bWUuQWRtaW5TYW5j
        // dGlvbi5NYW5hZ2UiLCJSZXN1bWUuU2VhcmN
        // oIiwiUGxhbi5UZWNobmljaWFuIiwiRHJhZnQuVGVjaG5pY2lhbiJdLCJleHAiOjE1Nzg1MDExNj
        // QsImlzcyI6Ik1PRUEiLCJhdWQiOiJBdXRoIn
        // 0.D4LZZ1ojghYZEB0xG33uaX1i3-05Inh_WVzVllsFS78'
        if (token) {
          const decode = jwtDecode(token)
          context.commit('setToken', token)
          context.commit('setLoginInfo', decode)
          if (!decode['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'].includes('Tax.Management')) {
            window.location.href = 'https://www.kase.com.tw/MOEA_Auth/Main'
          }
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
