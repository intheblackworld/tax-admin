<template>
  <div>
    <h1>通知單開立紀錄</h1>
    <v-card color="lighten-1" class="mb-5">
      <v-form ref="noticeForm">
        <v-container>
          <v-layout align-center>
            <v-flex xs12 md2>礦業權者</v-flex>
            <v-flex xs12 md2>
              <v-text-field v-model="form.owner" label></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout align-center>
            <v-flex xs12 md2>礦區字號</v-flex>
            <v-flex xs12 md2>
              <v-text-field v-model="form.no" label></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout align-center>
            <v-flex xs12 md2>通知類別</v-flex>
            <v-flex xs12 md6>
              <v-radio-group v-model="form.type" :mandatory="false">
                <v-layout align-center>
                  <v-flex>
                    <v-radio label="繳納通知" :value="0"></v-radio>
                  </v-flex>
                  <v-flex>
                    <v-radio label="催繳通知" :value="1"></v-radio>
                  </v-flex>
                </v-layout>
              </v-radio-group>
            </v-flex>
          </v-layout>
          <div>開立時間</div>
          <TimeRange
            title=""
            :startDate.sync="form.createtimeStart"
            :endDate.sync="form.createtimeEnd"
          />
        </v-container>
      </v-form>
      <v-btn @click="search()">搜尋</v-btn>
      <v-btn @click="resetCurrentForm(noticeForm)">清除</v-btn>
    </v-card>
    <Table :table-options="tableOptions" :items="resultData.items" @showDialog="showDetailDialog($event)" name="number" />
    <v-dialog v-model="detailDialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="detailDialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>繳費明細</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-layout class="pt-5 pl-5">
          <v-flex md4>
            <h3 class="mb-3">礦場資料</h3>
            <v-layout>
              <v-flex md4>礦區字號</v-flex>
              <v-flex md8>{{dialogData.areaNo}}</v-flex>
            </v-layout>
            <v-layout>
              <v-flex md4>礦場名稱</v-flex>
              <v-flex md8>{{dialogData.mineName}}</v-flex>
            </v-layout>
            <v-layout>
              <v-flex md4>礦業權狀態</v-flex>
              <v-flex md8>{{dialogData.mineStatus}}</v-flex>
            </v-layout>
            <v-layout>
              <v-flex md4>礦業權廢止時間</v-flex>
              <v-flex md8>{{dialogData.revokeDate}}</v-flex>
            </v-layout>
          </v-flex>
          <v-flex md4>
            <h3 class="mb-3">金額明細</h3>
            <v-layout>
              <v-flex md4>2</v-flex>
              <v-flex md4>礦業權費</v-flex>
              <v-flex md4>{{dialogData.mineConcessionFee}}</v-flex>
            </v-layout>
            <v-layout>
              <v-flex md4>1</v-flex>
              <v-flex md4>礦產權利金</v-flex>
              <v-flex md4>{{dialogData.royalty}}</v-flex>
            </v-layout>

            <v-layout>
              <v-flex md4>3</v-flex>
              <v-flex md4>未繳餘額</v-flex>
              <v-flex md4>{{dialogData.unpaidPrice}}</v-flex>
            </v-layout>
            <v-layout>
              <v-flex md4>4</v-flex>
              <v-flex md4>滯納金</v-flex>
              <v-flex md4>{{dialogData.fines}}</v-flex>
            </v-layout>
            <v-layout>
              <v-flex md4>5</v-flex>
              <v-flex md4>利息</v-flex>
              <v-flex md4>{{dialogData.interest}}</v-flex>
            </v-layout>
            <v-layout>
              <v-flex md4>6</v-flex>
              <v-flex md4>扣減金額</v-flex>
              <v-flex md4>{{dialogData.refund}}</v-flex>
            </v-layout>
            <v-layout>
              <v-flex md4></v-flex>
              <v-flex md4>總額</v-flex>
              <v-flex md4>{{dialogData.totalPrice}}</v-flex>
            </v-layout>
          </v-flex>
          <v-flex md4>
            <h3 class="mb-3">參考資料</h3>
            <v-layout>
              <v-flex md4>礦區面積</v-flex>
              <v-flex md4>{{dialogData.area}}</v-flex>
            </v-layout>
            <v-layout>
              <v-flex md4>計算年度</v-flex>
              <v-flex md4>{{dialogData.year}}</v-flex>
            </v-layout>
            <v-layout>
              <v-flex md4>定存利率</v-flex>
              <v-flex md4>{{dialogData.rate}}</v-flex>
            </v-layout>
            <v-layout>
              <v-flex md4>場交價</v-flex>
              <v-flex md10>
                <v-layout md8 v-for="item in dialogData.royaltyReference" :key="item.mineral">
                  <v-flex md5>{{item.mineral}}</v-flex>
                  <v-flex md5>{{item.fieldPrice}}</v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
            <v-layout>
              <v-flex md4>超過繳納期限</v-flex>
              <v-flex md4>{{dialogData.daysOverdue}}</v-flex>
            </v-layout>
            <v-layout>
              <v-flex md4>權費 + 權利金 - 退費</v-flex>
              <v-flex md4>{{dialogData.mineConcessionFee + dialogData.royalty - dialogData.refund}}</v-flex>
            </v-layout>
            <v-layout>
              <v-flex md4>滯納金</v-flex>
              <v-flex md4>{{dialogData.fines}}</v-flex>
            </v-layout>
            <v-layout>
              <v-flex md4>利息</v-flex>
              <v-flex md4>{{dialogData.interest}}</v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-card>
    </v-dialog>
  </div>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'
import TimeRange from '@/components/TimeRange.vue'
import { mixins } from 'vue-class-component'
import Table from '@/components/Table.vue'
import { VForm } from '@/type'
import CreateMixin from '@/mixins/CreateMixin'
import { getNotice } from '@/http/apis'
import _ from 'lodash'

const UsersModule = namespace('users')

@Component({
  components: {
    TimeRange,
    Table,
  },
})
export default class Notice extends mixins(CreateMixin) {
  get noticeForm(): VForm {
    return this.$refs.noticeForm as VForm
  }

  @UsersModule.Action('create') public createPerson!: (params: object) => {}

  public form = {
    owner: '', // 礦業權者
    no: '', // 礦區字號
    type: '', // 通知類別(0繳納通知,1催繳通知)
    createtimeStart: '', // 開立時間(開始)
    createtimeEnd: '', // 開立時間(結束)
  }

  public resultData: any = {
    items: [],
  }

  private tableOptions = {
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
        key: 'periodType',
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
    control: 'detail', // link | edit | delete | watch, seperate multiple by comma
  }
  private dialogData = {}

  private detailDialog = false

  private search() {
    getNotice(this.form).then((data) => {
      this.resultData = data
    })
  }

  private showDetailDialog(id: string) {
    const data = _.find(this.resultData.items, { number: id })
    this.dialogData = data.taxListResponse as object
    this.detailDialog = true
  }

  private created() {
    // @TODO this.searchAPI
  }
}
</script>