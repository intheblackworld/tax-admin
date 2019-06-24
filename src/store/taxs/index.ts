import Vue from 'vue'
// import { create } from '@/http/apis'

export default {
  namespaced: true,
  state: {
    // 期別管理的表單
    form: {
      year: null, // 年度(民國)
      type: 1, // 上、下期(1,2)
      periodId: null, // (新增的話為NULL 、 編輯會有值)
      seaAreaOilAndGas: 0, // 海域石油及天然氣(探礦)
      onShoreMine: 0, // 陸上礦種(探礦)
      miningSeaAreaOilAndGas: 0, // 海域石油及天然氣(採礦)
      miningOnShoreMine: 0, // 陸上礦種(採礦)
      royaltyOilAndGas: 0, // 石油及天然氣(礦產權利金比率)
      royaltyMetallogenic: 0, // 金屬礦(礦產權利金比率)
      royaltyOther: 0, // 其他(礦產權利金比率)
      annualRate: 0, // 年利率
    },

    type: 0, // 0 定期開徵 1 個案開徵
  },

  getters: {
    testGetters: (state: { currencyList: any }) => [],
  },

  mutations: {
    toggleTaxType(state: { type: number }, value: number) {
      state.type = value
    },
  },

  actions: {
    // async create(context: any, { ...props }) {
    //   create({ ...props }).then((data: any) => {
    //     context.commit('createSuccess', data)
    //   })
    // },
  },
}
