import Vue from 'vue'
// import { create } from '@/http/apis'

export default {
  namespaced: true,
  state: {},

  getters: {
    testGetters: (state: { currencyList: any }) => [],
  },

  mutations: {
  },

  actions: {
    // async create(context: any, { ...props }) {
    //   create({ ...props }).then((data: any) => {
    //     context.commit('createSuccess', data)
    //   })
    // },
  },
}
