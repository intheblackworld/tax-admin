<template>
  <div>
    <h1>礦區開徵作業履歷</h1>
    <v-card color="lighten-1" class="mb-5">
      <v-form ref="historyForm">
        <v-container>
          <v-layout align-center>
            <v-flex xs12 md2>礦區字號</v-flex>
            <v-flex xs12 md2>
              <v-text-field v-model="form.areaNo" label></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout align-center>
            <v-flex xs12 md2>執照字號</v-flex>
            <v-flex xs12 md2>
              <v-text-field v-model="form.licesenNo" label></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout align-center>
            <v-flex xs12 md2>礦業權者</v-flex>
            <v-flex xs12 md2>
              <v-text-field v-model="form.miningOwner" label></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-form>
      <v-btn @click="search">新建</v-btn>
      <v-btn @click="resetCurrentForm(periodForm)">清除</v-btn>
    </v-card>
    <v-layout>
      <v-flex md3>
        <v-card class="side">
          <div
            v-for="(item, index) in taxHistory.items"
            :key="item.title"
            :class="`side-item ${sideIndex === index ? 'active' : ''}`"
            @click="findHistory(item.title.split(' ')[0], index)"
          >{{item.title}}</div>
        </v-card>
      </v-flex>
      <v-flex md9>
        <v-card>
          <v-layout>
            <v-flex
              md4
              :class="`tab ${historyType === 0 ? 'active' : ''}`"
              @click="historyType = 0"
            >繳費記錄</v-flex>
            <v-flex
              md4
              :class="`tab ${historyType === 1 ? 'active' : ''}`"
              @click="historyType = 1"
            >開徵記錄</v-flex>
            <v-flex
              md4
              :class="`tab ${historyType === 2 ? 'active' : ''}`"
              @click="historyType = 2"
            >繳納通知單記錄</v-flex>
          </v-layout>
        </v-card>
        <Table :table-options="tableOptions" :items="resultData.items" name="tax" />
      </v-flex>
    </v-layout>
  </div>
</template>

<style lang="scss" scoped>
.side {
  height: 626px;
  overflow: scroll;
}
.side-item {
  padding: 10px;
  cursor: pointer;
  &.active {
    background: #2196f3;
    color: #fff;
  }
}
.tab {
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid #ccc;
  cursor: pointer;
  transition: all 0.5s;

  &.active {
    background: #1565c0;
    color: #fff;
  }
}
</style>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'
import TimeRange from '@/components/TimeRange.vue'
import { mixins } from 'vue-class-component'
import Table from '@/components/Table.vue'
import { VForm } from '@/type'
import { getPaymentHistory, getNoticeHistory, getTaxHistory } from '@/http/apis'
import CreateMixin from '@/mixins/CreateMixin'

const UsersModule = namespace('users')
const TaxsModule = namespace('taxs')

@Component({
  components: {
    TimeRange,
    Table,
  },
})
export default class History extends mixins(CreateMixin) {
  get historyForm(): VForm {
    return this.$refs.historyForm as VForm
  }

  @UsersModule.Action('create') public createPerson!: (params: object) => {}

  @TaxsModule.Action('getHistory') public getHistory!: ({}) => {}

  @TaxsModule.Mutation('setTaxHistory') public setTaxHistory!: ({}) => {}

  @TaxsModule.State('taxHistory') public taxHistory!: {
    items: Array<{ title: any}>, // 不限
  }

  public form = {
    areaNo: '',
    licesenNo: '',
    miningOwner: '',
  }

  public resultData = {
    items: [],
  }

  private sideIndex: any = 0

  private tableOptions: {
    columns: Array<{ title: string; key: string }>
    control: string,
  } = {
    columns: [],
    control: '',
  }

  private table1Options = {
    columns: [
      {
        title: '期別',
        key: 'period',
      },
      {
        title: '礦業權費',
        key: 'mineConcessionFee',
      },
      {
        title: '礦產權利金',
        key: 'royalty',
      },

      {
        title: '滯納金',
        key: 'fines',
      },
      {
        title: '利息',
        key: 'interest',
      },
      {
        title: '應繳金額',
        key: 'totalPrice',
      },
      {
        title: '已繳金額',
        key: 'paymentAmount',
      },
      {
        title: '欠繳餘額',
        key: 'unpaidPrice',
      },
      {
        title: '繳納日期',
        key: 'paymentDate',
      },
      {
        title: '核減退費金額',
        key: 'refunds',
      },
      // {
      //   title: '繳費日期',
      //   key: 'paymentAmount',
      // },
      // {
      //   title: '上期開徵日期',
      //   key: 'position',
      // },
    ],
    control: '', // link | edit | delete | watch, seperate multiple by comma
  }

  private table2Options = {
    columns: [
      {
        title: '類型',
        key: 'type',
      },
      {
        title: '期別',
        key: 'period',
      },
      {
        title: '開徵時間',
        key: 'createTaxDate',
      },
      {
        title: '繳納期限',
        key: 'paylimitDate',
      },
    ],
    control: '', // link | edit | delete | watch, seperate multiple by comma
  }

  private table3Options = {
    columns: [
      {
        title: '通知類別',
        key: 'type',
      },
      {
        title: '繳納通知單編號',
        key: 'number',
      },
      {
        title: '礦區字號',
        key: 'areaNo',
      },
      {
        title: '執照字號',
        key: 'licesenNo',
      },
      {
        title: '礦業權者',
        key: 'miningOwner',
      },
      {
        title: '年份',
        key: 'year',
      },
      {
        title: '期別',
        key: 'period',
      },
      {
        title: '開單日期',
        key: 'creationDate',
      },
      {
        title: '繳費期限',
        key: 'paylimitDate',
      },
      {
        title: '開立紀錄時間',
        key: 'recordDate',
      },
    ],
    control: '', // link | edit | delete | watch, seperate multiple by comma
  }

  private historyType = 0

  @Watch('historyType')
  public onChange(val: string) {
    this.findHistory(this.taxHistory.items[this.sideIndex].title.split(' ')[0], this.sideIndex)
  }

  public mounted() {
    // @TODO this.searchAPI
    if (this.$route.query.areaNo) {
      this.findHistoryByPath(this.$route.query.areaNo)
      setTimeout(() => {
        this.findHistory(this.taxHistory.items[0].title.split(' ')[0], 0)
      }, 500)
    } else {
      this.search()
    }
  }

  public destroyed() {
    this.setTaxHistory({ key: `taxHistory`, data: {items: []} })
  }

  private search() {
    this.getHistory(this.form)
  }

  private findHistory(No: string, sideIndex: number) {
    switch (this.historyType) {
      case 0:
        getPaymentHistory({ No }).then((data: any) => {
          this.resultData.items = data
        })
        this.tableOptions = this.table1Options
        this.sideIndex = sideIndex
        break
      case 1:
        getTaxHistory({ No }).then((data: any) => {
          this.resultData.items = data
        })
        this.tableOptions = this.table2Options
        this.sideIndex = sideIndex
        break
      case 2:
        getNoticeHistory({ No }).then((data: any) => {
          this.resultData.items = data
        })
        this.tableOptions = this.table3Options
        this.sideIndex = sideIndex
        break

      default:
        break
    }
  }

  private findHistoryByPath(No: any) {
    this.getHistory({areaNo: No})
  }
}
</script>