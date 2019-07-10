<template>
  <div>
    <v-card color="lighten-1" class="mb-2 pl-2">
      <v-layout align-center>
        <v-flex md2>
          <h3>開徵作業</h3>
        </v-flex>
        <v-flex md4>
          <v-radio-group v-model="taxType" :mandatory="false">
            <v-layout align-center>
              <v-flex>
                <v-radio label="定期開徵" :value="0"></v-radio>
              </v-flex>
              <v-flex>
                <v-radio label="個案開徵" :value="1"></v-radio>
              </v-flex>
            </v-layout>
          </v-radio-group>
        </v-flex>
      </v-layout>
    </v-card>

    <TaxForm ref="taxForm" :taxType="taxType" :taxFormstep="step"/>
    <div v-if="taxType === 0">
      <div v-if="step === 0">
        <v-card color="gray-3" class="mb-5 pl-2 pt-3">
          <v-layout align-center>
            <v-flex md2>
              <h3>選擇本期開徵礦業權者</h3>
            </v-flex>
          </v-layout>
          <v-layout align-center>
            <v-flex md2>
              <p>已選{{selectedCount}}項</p>
            </v-flex>
          </v-layout>
          <v-layout align-center>
            <v-flex md2>
              <v-btn @click="selectHaveTaxPrice">有未繳金額全選</v-btn>
            </v-flex>
          </v-layout>
          <Table
            :table-options="taxListOptions"
            :items="taxList.items"
            name="tax"
            :selected="taxList.selected"
            itemKey="areaNo"
            canSelect
          />
        </v-card>

        <v-card color="gray-3" class="mb-2 pl-2 pt-3">
          <v-layout align-center>
            <v-flex md2>
              <h3>過去期別未繳清礦業權者</h3>
            </v-flex>
          </v-layout>
          <Table
            :table-options="taxUnpaidListOptions"
            :items="taxUnpaidList.items"
            name="taxUnpaid"
            itemKey="areaNo"
          />
        </v-card>
        <v-layout align-center>
          <v-flex md1>
            <v-btn @click="step = 1">下一步</v-btn>
          </v-flex>
          <v-flex md1>
            <v-btn>清除</v-btn>
          </v-flex>
        </v-layout>
      </div>
      <div v-else-if="step === 1">
        <v-card color="gray-3" class="mb-5 pl-2 pt-3">
          <v-layout align-center>
            <v-flex md2>
              <h3>本期開徵清單</h3>
            </v-flex>
          </v-layout>
          <Table
            :table-options="taxListOptions"
            :items="taxList.selected"
            name="tax"
            @showDialog="showDetailDialog($event)"
          />
        </v-card>

        <v-card color="gray-3" class="mb-2 pl-2 pt-3">
          <v-layout align-center>
            <v-flex md2>
              <h3>過去期別未繳清清單</h3>
            </v-flex>
          </v-layout>
          <Table
            :table-options="taxUnpaidListOptions"
            :items="taxUnpaidList.items"
            name="taxUnpaid"
            @showDialog="showDetailDialog($event)"
          />
        </v-card>
        <v-layout align-center>
          <v-flex md1>
            <v-btn @click="submitTaxAdd">確認</v-btn>
          </v-flex>
          <v-flex md1>
            <v-btn @click="step = 0">上一步</v-btn>
          </v-flex>
        </v-layout>
      </div>
    </div>
    <!-- 個案開徵 -->
    <div v-else>
      <div v-if="step === 0">
        <TaxCaseSearchComponent />
        <v-layout align-center>
            <v-flex md1>
              <v-btn @click="step = 1">下一步</v-btn>
            </v-flex>
            <v-flex md1>
              <v-btn>清除</v-btn>
            </v-flex>
          </v-layout>  
      </div>
      <div v-else-if="step === 1">
        <v-card color="gray-3" class="mb-5 pl-2 pt-3">
          <v-layout align-center>
            <v-flex md2>
              <h3>開徵清單</h3>
            </v-flex>
          </v-layout>
          <Table
            :table-options="taxCaseOptions"
            :items="taxCase.selected"
            name="tax"
            @showDialog="showDetailDialog($event)"
          />
        </v-card>
        <v-layout align-center>
          <v-flex md1>
            <v-btn @click="submitTaxAdd">確認</v-btn>
          </v-flex>
          <v-flex md1>
            <v-btn @click="step = 0">上一步</v-btn>
          </v-flex>
        </v-layout>
      </div>
    </div>

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
              <v-flex md4>礦場編號</v-flex>
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
              <v-flex md4>1</v-flex>
              <v-flex md4>礦產權利金</v-flex>
              <v-flex md4>{{dialogData.royalty}}</v-flex>
            </v-layout>
            <v-layout>
              <v-flex md4>2</v-flex>
              <v-flex md4>礦業權費</v-flex>
              <v-flex md4>{{dialogData.mineConcessionFee}}</v-flex>
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
              <v-flex md4>{{dialogData.actualPay}}</v-flex>
            </v-layout>
            <v-layout>
              <v-flex md4></v-flex>
              <v-flex md4>總額</v-flex>
              <v-flex md4>{{dialogData.taxPrice}}</v-flex>
            </v-layout>
          </v-flex>
          <v-flex md4>
            <h3 class="mb-3">參考資料</h3>
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
              <v-flex md4>{{0.000}}</v-flex>
            </v-layout>
            <v-layout>
              <v-flex md4>超過繳納期限</v-flex>
              <v-flex md4>{{dialogData.daysOverdue > 0 ? '是' : '否'}}</v-flex>
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
            <v-layout>
              <v-flex md4>欠繳總額</v-flex>
              <v-flex md4>{{0.000}}</v-flex>
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
import _ from 'lodash'
import TimeRange from '@/components/TimeRange.vue'
import TaxForm from '@/components/TaxForm.vue'
import Table from '@/components/Table.vue'
import TaxCaseSearchComponent from '@/components/TaxCaseSearchComponent.vue'
import { createTax } from '@/http/apis'
import { VForm } from '@/type'

const TaxsModule = namespace('taxs')

@Component({
  components: {
    TimeRange,
    TaxForm,
    Table,
    TaxCaseSearchComponent,
  },
})
export default class Operation extends Vue {
  @TaxsModule.State('type') public type!: number
  @TaxsModule.State('taxList') public taxList!: {
    items: []
    total: number
    selected: []
  }
  @TaxsModule.State('taxUnpaidList') public taxUnpaidList!: {
    items: []
    total: number
  }
  @TaxsModule.Mutation('setSelected') public setSelected!: (value: {}) => {}
  @TaxsModule.Mutation('toggleTaxType') public toggleTaxType!: (
    value: number,
  ) => {}

  @TaxsModule.State('taxCase') public taxCase!: {
    items: []
    filters: any[]
    selected: any[]
    total: number
  }

  @TaxsModule.State('taxListForm') public taxListReq!: {
    year: null // 年度(民國)
    type: 1 // 上、下期(1,2)
    PaylimitDate: ''
  }

  private step = 0

  private detailDialog = false

  get taxType() {
    return this.type
  }

  set taxType(value) {
    this.step = 0
    this.toggleTaxType(value)
  }

  @Watch('step')
  public onChangeStep(val: number) {
    if (val > 0) {
      this.taxListOptions.control = 'detail'
      this.taxUnpaidListOptions.control = 'detail'
      this.taxCaseOptions.control = 'detail'
    } else {
      this.taxListOptions.control = 'edit'
      this.taxUnpaidListOptions.control = 'edit'
      this.taxCaseOptions.control = 'edit,delete'
    }
  }

  private taxListOptions = {
    columns: [
      {
        title: '礦區字號',
        key: 'areaNo',
      },
      {
        title: '執照字號',
        key: 'licesenNo',
      },
      {
        title: '礦權業者',
        key: 'miningOwner',
      },
      {
        title: '礦產權利金',
        key: 'royalty',
      },
      {
        title: '礦業權費',
        key: 'mineConcessionFee',
      },
      {
        title: '應徵額',
        key: 'taxPrice',
      },
      {
        title: '礦權狀態',
        key: 'mineStatus',
      },
      {
        title: '廢止時間',
        key: 'revokeDate',
      },
      {
        title: '動作',
        key: 'taxId',
      },
    ],
    control: 'edit', // link | edit | delete, seperate multiple by comma
  }

  private taxUnpaidListOptions = {
    columns: [
      {
        title: '期別',
        key: 'periodType',
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
        title: '礦權業者',
        key: 'miningOwner',
      },
      {
        title: '礦產權利金',
        key: 'royalty',
      },
      {
        title: '礦業權費',
        key: 'mineConcessionFee',
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
        title: '應徵額',
        key: 'taxPrice',
      },
      {
        title: '礦權狀態',
        key: 'mineStatus',
      },
      {
        title: '廢止時間',
        key: 'revokeDate',
      },
      {
        title: '動作',
        key: 'taxId',
      },
    ],
    control: 'edit', // link | edit | delete, seperate multiple by comma
  }

  private taxCaseOptions = {
    columns: [
      {
        title: '礦區字號',
        key: 'areaNo',
      },
      {
        title: '執照字號',
        key: 'licesenNo',
      },
      {
        title: '礦權業者',
        key: 'miningOwner',
      },
      {
        title: '礦產權利金',
        key: 'royalty',
      },
      {
        title: '礦業權費',
        key: 'mineConcessionFee',
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
        title: '應徵額',
        key: 'taxPrice',
      },
      {
        title: '礦權狀態',
        key: 'mineStatus',
      },
      {
        title: '廢止時間',
        key: 'revokeDate',
      },
      {
        title: '動作',
        key: 'taxId',
      },
    ],
    control: 'edit,delete', // link | edit | delete, seperate multiple by comma
  }

  created() {
    // @TODO this.searchAPI
  }

  get selectedCount() {
    let count = this.taxList.selected.length
    return count
  }

  private selectHaveTaxPrice() {
    const list = this.taxList.items.filter(
      (item: { taxPrice: number }) => item.taxPrice > 0,
    )
    this.setSelected({ key: 'taxList', data: list })
  }

  private resetAll() {
    this.step = 0
    this.taxList = {
      items: [],
      total: 0,
      selected: [],
    }

    this.taxUnpaidList = {
      items: [],
      total: 0,
    }
    this.taxCase = {
      items: [],
      total: 0,
      filters: [],
      selected: [],
    }
  }

  private dialogData = {}

  private showDetailDialog(id: string) {
    let collection
    if (this.taxType === 0) {
      collection = [...this.taxList.selected, ...this.taxUnpaidList.items]
    } else {
      collection = [...this.taxCase.selected]
    }
    const data = _.find(collection, { mineAreaId: id })
    this.dialogData = <Object>data
    this.detailDialog = true
  }

  private submitTaxAdd() {
    const { year, type } = this.taxListReq
    let collection
    if (this.taxType === 0) {
      collection = [...this.taxList.selected, ...this.taxUnpaidList.items]
    } else {
      collection = [...this.taxCase.selected]
    }
    const reqData = {
      year,
      periodtype: type,
      type: this.taxType,
      taxListResponse: collection,
    }
    createTax(reqData).then(() => {
      this.resetAll()
    })
  }
}
</script>