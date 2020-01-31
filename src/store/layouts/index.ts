import Vue from 'vue'
import { login, logout } from '@/http/apis'
const jwtDecode = require('jwt-decode')

export default {
  namespaced: true,
  state: {
     token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJtaW1zdGVzdCIsImdpdmVuX25hbWUiOiLnpKbmpa3mmbrmhafnrqHnkIbmuKzoqabluLPomZ8iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOlsiUGVvcGxlLk1hbmFnZSIsIlBlb3BsZS5TZWFyY2giLCJCaWxsYm9hcmQuTWFuYWdlIiwiU2FmZS5GaXJzdExldmVsIiwiU2FmZS5TZWNvbmRMZXZlbCIsIlNhZmUuVGhpcmRMZXZlbCIsIllpZWxkLkNQQyIsIllpZWxkLlVuZGVyR3JvdW5kIiwiWWllbGQuTWFuYWdlIiwiWWllbGQuT3BlblBpdCIsIlBlcm1pc3Npb24uTWFuYWdlIiwiQWxsLlN1cGVyVmlld2VyIiwiVGF4Lk1hbmFnZW1lbnQiLCJNaW5lQ2hlY2suQ2FzZU9mZmljZXIiLCJNaW5lQ2hlY2suTWFuYWdlciIsIkRyYWZ0LkFkbWluIiwiUHViT3AuQ3JlYXRlcl9MZWdpc2xhdGl2ZVlhbiIsIkFkbWluLk1hbmFnZSIsIlJlc3VtZS5BZG1pblNhbmN0aW9uLk1hbmFnZSIsIlJlc3VtZS5TZWFyY2giLCIgWWllbGQuRGFpbHlSZWNvcmQiLCIgWWllbGQuVHJhbnNjcmlwdC5GcmVlRGVjbGFyZSIsIiBZaWVsZC5Db3N0U3RydWN0dXJlIiwiIFlpZWxkLlRyYW5zY3JpcHQuTW9kaWZpZWQiLCIgWWllbGQuVHJhbnNjcmlwdC5Nb250aFJlcG9ydCIsIiBZaWVsZC5DaGVjayIsIiBZaWVsZC5GaWVsZFByaWNlIiwiIFlpZWxkLlJlcG9ydC5Eb3dubG9hZGVyICIsIiBZaWVsZC5GaWVsZFByaWNlLkVkaXRvciIsIiBZaWVsZC5DaGVjay5FZGl0b3IiLCIgWWllbGQuVHJhbnNjcmlwdC5Nb250aFJlcG9ydC5JbnNwZWN0b3IiLCIgWWllbGQuVHJhbnNjcmlwdC5Nb2RpZmllZC5JbnNwZWN0b3IiLCIgWWllbGQuVHJhbnNjcmlwdC5GcmVlRGVjbGFyZS5JbnNwZWN0b3IiLCIgWWllbGQuQ29zdFN0cnVjdHVyZS5JbnNwZWN0b3IiLCIgWWllbGQuRGFpbHlSZWNvcmQuSW5zcGVjdG9yIiwiUGxhbi5DUEMiLCJQbGFuLlVuZGVyR3JvdW5kIiwiUGxhbi5PcGVuUGl0IiwiUGxhbi5UZWNobmljaWFuIiwiRHJhZnQuVGVjaG5pY2lhbiJdLCJleHAiOjE1ODA0OTA2ODQsImlzcyI6Ik1PRUEiLCJhdWQiOiJBdXRoIn0.h_7hbPzcsLUBZsSeBiLoPcmil4JE7vWxmeGTqUL50Ow",

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
