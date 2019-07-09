import Vue from 'vue'
import { getTaxList, getTaxUnpaidList } from '@/http/apis'

export default {
  namespaced: true,
  state: {
    // 期別管理的表單
    periodForm: {
      year: null, // 年度(民國)
      type: 1, // 上、下期(1,2)
      periodId: '', // (新增的話為NULL 、 編輯會有值)
      seaAreaOilAndGas: 0, // 海域石油及天然氣(探礦)
      onShoreMine: 0, // 陸上礦種(探礦)
      miningSeaAreaOilAndGas: 0, // 海域石油及天然氣(採礦)
      miningOnShoreMine: 0, // 陸上礦種(採礦)
      royaltyOilAndGas: 0, // 石油及天然氣(礦產權利金比率)
      royaltyMetallogenic: 0, // 金屬礦(礦產權利金比率)
      royaltyOther: 0, // 其他(礦產權利金比率)
      annualRate: 0, // 年利率
    },

    // 開徵作業-定期開徵的表單
    taxListForm: {
      year: null,
      type: 1, // 上、下期(1,2)
    },
    // 開徵作業-定期開徵-已繳清表格
    taxList: {
      items: [],
      total: 0,
      selected: [],
    },
    // 開徵作業-定期開徵-未繳清表格
    taxUnpaidList: {
      items: [],
      total: 0,
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

    setTaxList(state: { taxList: {} }, data: { items: []; total: number }) {
      state.taxList = {
        items: data.items,
        total: data.total,
        selected: [],
      }
    },

    setTaxUnpaidList(
      state: { taxUnpaidList: {} },
      data: { items: []; total: number },
    ) {
      state.taxUnpaidList = {
        items: data.items,
        total: data.total,
      }
    },

    setSelected(state: any, payload: { key: string; data: [] }) {
      interface IParams {
        [key: string]: any
      }
      (state as IParams)[payload.key].selected = payload.data
    },
  },

  actions: {
    // async create(context: any, { ...props }) {
    //   create({ ...props }).then((data: any) => {
    //     context.commit('createSuccess', data)
    //   })
    // },
    async getTaxList(context: any, { ...props }) {
      getTaxList({ ...props }).then((data) => {
        context.commit('setTaxList', data)
      })
    },
    async getTaxUnpaidList(context: any, { ...props }) {
      getTaxUnpaidList({ ...props }).then((data: any) => {
        context.commit('setTaxUnpaidList', data)
      })
    },
  },
}
