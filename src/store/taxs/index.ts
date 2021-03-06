import Vue from 'vue'
import {
  getTaxList,
  getTaxUnpaidList,
  getTaxCase,
  getTaxManage,
  getHistory,
} from '@/http/apis'

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
      royaltyOilAndGas: 0, // 石油及天然氣(礦產礦產權利金繳納比率)
      royaltyMetallogenic: 0, // 金屬礦(礦產礦產權利金繳納比率)
      royaltyOther: 0, // 其他(礦產礦產權利金繳納比率)
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
      filters: [],
      total: 0,
    },

    taxCase: {
      items: [],
      toal: 0,
      filters: [],
      selected: [],
    },

    type: 0, // 0 定期開徵 1 個案開徵

    // 開徵管理
    taxManage: {
      items: [],
      selected: [],
      cases: [],
      periods: [],
      total: 0,
    },

    // 開徵履歷
    taxHistory: {
      items: [],
    },
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
      state: { taxUnpaidList: {items: [], filters: [], total: number} },
      data: { items: []; total: number },
    ) {
      state.taxUnpaidList = {
        items: data.items,
        filters: data.items,
        total: data.total,
      }
    },

    setSelected(state: any, payload: { key: string; data: [] }) {
      interface IParams {
        [key: string]: any
      }
      ; (state as IParams)[payload.key].selected = payload.data
    },

    setTaxCase(state: { taxCase: {} }, data: { items: []; total: number }) {
      state.taxCase = {
        items: data.items, // 首次接到所有資料
        filters: [...data.items ], // 根據條件搜尋過後的資料
        selected: [], // 選擇了之後加到了表格，下一步用來檢視的資料
        total: data.total,
      }
    },

    resetAllTax(state: { taxCase: {}; taxList: {}; taxUnpaidList: {} }) {
      // 開徵作業-定期開徵-已繳清表格
      state.taxList = {
        items: [],
        total: 0,
        selected: [],
      }
      // 開徵作業-定期開徵-未繳清表格
      state.taxUnpaidList = {
        items: [],
        total: 0,
      }

      state.taxCase = {
        items: [],
        toal: 0,
        filters: [],
        selected: [],
      }
    },

    setTaxManage(state: { taxManage: {} }, data: { items: []; total: number }) {
      state.taxManage = {
        items: data.items,
        periods: data.items.filter((item: any) => item.type === 0),
        cases: data.items.filter((item: any) => item.type === 1),
        total: data.total,
        selected: [],
      }
    },

    setTaxHistory(
      state: { taxHistory: { items: [] } },
      data: { items: []; total: number },
    ) {
      state.taxHistory.items = data.items
    },
  },

  actions: {
    // async create(context: any, { ...props }) {
    //   create({ ...props }).then((data: any) => {
    //     context.commit('createSuccess', data)
    //   })
    // },
    async getTaxList(context: any, props: any) {
      getTaxList({ ...props }).then((data) => {
        context.commit('setTaxList', data)
      })
    },
    async getTaxUnpaidList(context: any, props: any) {
      getTaxUnpaidList({ ...props }).then((data: any) => {
        context.commit('setTaxUnpaidList', data)
      })
    },

    async getTaxCase(context: any, props: any) {
      getTaxCase({ ...props }).then((data: any) => {
        context.commit('setTaxCase', data)
      })
    },

    async getTaxManage(context: any, props: any) {
      getTaxManage({ ...props }).then((data: any) => {
        context.commit('setTaxManage', data)
      })
    },

    async getHistory(context: any, props: any) {
      getHistory({ ...props }).then((data: any) => {
        context.commit('setTaxHistory', data)
      })
    },
  },
}
