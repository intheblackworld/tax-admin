<template>
  <div>
    <h1>開徵作業</h1>
    <div class="custom-type">
      <v-layout align-center>
        <v-flex md2>類別</v-flex>
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
    </div>
    <TaxForm ref="taxForm" :taxType="taxType" :taxFormstep="step" />
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
            :selected="taxList.selected"
            name="tax"
            case="List"
            itemKey="licesenNo"
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
            itemKey="taxId"
          />
        </v-card>
        <v-layout>
          <v-flex md11></v-flex>
          <v-flex md1>
            <v-btn color="info" @click="step = 1">下一步</v-btn>
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
      <div v-show="step === 0">
        <TaxCaseSearchComponent />
        <v-layout align-center>
          <v-flex md1>
            <v-btn color="info" @click="step = 1">下一步</v-btn>
          </v-flex>
        </v-layout>
      </div>
      <div v-show="step === 1">
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
            <v-btn color="info" @click="submitTaxAdd">確認</v-btn>
          </v-flex>
          <v-flex md1>
            <v-btn @click="step = 0">上一步</v-btn>
          </v-flex>
        </v-layout>
      </div>
    </div>
    <v-dialog v-model="printDialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="closePrintDialog">
            <v-icon>close</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-layout class="pt-5 pl-5">
          <v-btn @click="fetchAndPrint">列印繳費通知單</v-btn>
          <div id="printContent">
            <div
              class="print-container"
              v-for="item in printData.items"
              :key="`${item.areaNo}-print`"
            >
              <div>
                <div
                  class="print-item"
                  v-for="index in 3"
                  :key="`${item.areaNo}-print-item-${index - 1}`"
                >
                  <p class="hint">{{ticketList[index - 1]}}</p>
                  <div class="content">
                    <div class="title">經濟部礦業權費及礦產權利金繳納通知單</div>
                    <div class="title">
                      <p>礦區字號： {{item.areaNo}}</p>
                      <p>執照字號：{{item.licesenNo}}</p>
                      <p>繳費單編號： {{item.number}}</p>
                    </div>
                    <div class="table">
                      <div class="col-2">礦業權人</div>
                      <div class="col-4">{{item.miningOwner}}(代表人)</div>
                      <div class="col-2">繳納期限</div>
                      <div
                        class="col-4"
                      >{{`民國${item.paylimitDate.split('-')[0] - 1911}年${item.paylimitDate.split('-')[1]}月${item.paylimitDate.split('-')[2].slice(0, 2)}日`}}</div>

                      <div class="col-2">地址</div>
                      <div class="col-4">{{item.address}}</div>
                      <div class="col-2">礦區面積</div>
                      <div
                        class="col-4"
                      >{{Math.floor(item.area)}}公畝{{((item.area - Math.floor(item.area)) * 100).toFixed(0)}}公頃{{((item.area - item.area.toFixed(2)) * 10000).toFixed(0)}}平方公尺</div>
                      <div class="col-1">項</div>
                      <div class="col-3">項目</div>
                      <div class="col-2">金額</div>
                      <div class="col-1">項</div>
                      <div class="col-3">項目</div>
                      <div class="col-2">金額</div>

                      <div class="col-1">1</div>
                      <div class="col-3">{{item.period}}礦業權費</div>
                      <div class="col-2">{{item.mineConcessionFee}}</div>
                      <div class="col-1">4</div>
                      <div class="col-3">利息</div>
                      <div class="col-2">{{item.interest}}</div>

                      <div class="col-1">2</div>
                      <div class="col-3">{{item.period}}礦產權利金</div>
                      <div class="col-2">{{item.royalty}}</div>
                      <div class="col-1">5</div>
                      <div class="col-3"></div>
                      <div class="col-2"></div>

                      <div class="col-1">3</div>
                      <div class="col-3">滯納金</div>
                      <div class="col-2">{{item.fines}}</div>
                      <div class="col-1">6</div>
                      <div class="col-3">合計</div>
                      <div class="col-2">{{item.totalPrice}}</div>

                      <div class="col-12">
                        總計應徵
                        <span
                          :key="`money-${index}`"
                          class="money"
                          v-for="(string, index) in sum(item.totalPrice)"
                        >{{string}}</span>
                        元
                      </div>
                      <div class="desc">
                        <p style="margin: 0;letter-spacing: 1px;">
                          注意事項：
                          (一)欠繳礦業權費或礦產權利金2年以上者，除依礦業法第38條第3款規定廢止其礦業權之核准外， 其未繳之礦業權費或礦產權利金及依第56條加徵之數額，依法移送強制執行。 (二)
                          <span
                            style="font-weight: bold"
                          >匯款者請註明礦區字號及礦業權者</span> 戶名：經濟部礦務局 帳號：
                          <span style="font-weight: bold">045037090053</span> 行名：台灣銀行城中分行。 (三)礦業權者如有欠繳礦業權費或礦產權利金之情形，將收到2張以上之繳納通知單，如無法全數繳清，請依欠繳之先後期別依序繳納；倘未依序繳納者，本部礦務局將依礦業權費收費辦法第3條第3項或礦產權利金收費辦法第6條第3項規定，由最先欠繳期別依序抵繳所欠礦業權費或礦產權利金與加徵之數額。
                        </p>
                        <img src="../assets/seal.png" alt />
                      </div>
                    </div>
                  </div>
                  <p class="date-hint">請注意繳納時限</p>
                </div>
              </div>
              <div>
                <div
                  class="print-item"
                  v-for="index in [4, 5]"
                  :key="`${item.areaNo}-print-item-${index - 1}`"
                >
                  <p class="hint">{{ticketList[index - 1]}}</p>
                  <div class="content">
                    <div class="title">經濟部礦業權費及礦產權利金繳納通知單</div>
                    <div class="title">
                      <p>礦區字號： {{item.areaNo}}</p>
                      <p>執照字號：{{item.licesenNo}}</p>
                      <p>繳費單編號： {{item.number}}</p>
                    </div>
                    <div class="table">
                      <div class="col-2">礦業權人</div>
                      <div class="col-4">{{item.miningOwner}}(代表人)</div>
                      <div class="col-2">繳納期限</div>
                      <div
                        class="col-4"
                      >{{`民國${item.paylimitDate.split('-')[0] - 1911}年${item.paylimitDate.split('-')[1]}月${item.paylimitDate.split('-')[2].slice(0, 2)}日`}}</div>

                      <div class="col-2">地址</div>
                      <div class="col-4">{{item.address}}</div>
                      <div class="col-2">礦區面積</div>
                      <div
                        class="col-4"
                      >{{Math.floor(item.area)}}公畝{{((item.area - Math.floor(item.area)) * 100).toFixed(0)}}公頃{{((item.area - item.area.toFixed(2)) * 10000).toFixed(0)}}平方公尺</div>
                      <div class="col-1">項</div>
                      <div class="col-3">項目</div>
                      <div class="col-2">金額</div>
                      <div class="col-1">項</div>
                      <div class="col-3">項目</div>
                      <div class="col-2">金額</div>

                      <div class="col-1">1</div>
                      <div class="col-3">{{item.period}}礦業權費</div>
                      <div class="col-2">{{item.mineConcessionFee}}</div>
                      <div class="col-1">4</div>
                      <div class="col-3">利息</div>
                      <div class="col-2">{{item.interest}}</div>

                      <div class="col-1">2</div>
                      <div class="col-3">{{item.period}}礦產權利金</div>
                      <div class="col-2">{{item.royalty}}</div>
                      <div class="col-1">5</div>
                      <div class="col-3"></div>
                      <div class="col-2"></div>

                      <div class="col-1">3</div>
                      <div class="col-3">滯納金</div>
                      <div class="col-2">{{item.fines}}</div>
                      <div class="col-1">6</div>
                      <div class="col-3">合計</div>
                      <div class="col-2">{{item.totalPrice}}</div>

                      <div class="col-12">
                        總計應徵
                        <span
                          :key="`money-${index}`"
                          class="money"
                          v-for="(string, index) in sum(item.totalPrice)"
                        >{{string}}</span>
                        元
                      </div>
                      <div class="desc">
                        <p style="margin: 0;letter-spacing: 1px;">
                          注意事項：
                          (一)欠繳礦業權費或礦產權利金2年以上者，除依礦業法第38條第3款規定廢止其礦業權之核准外， 其未繳之礦業權費或礦產權利金及依第56條加徵之數額，依法移送強制執行。 (二)
                          <span
                            style="font-weight: bold"
                          >匯款者請註明礦區字號及礦業權者</span> 戶名：經濟部礦務局 帳號：
                          <span style="font-weight: bold">045037090053</span> 行名：台灣銀行城中分行。 (三)礦業權者如有欠繳礦業權費或礦產權利金之情形，將收到2張以上之繳納通知單，如無法全數繳清，請依欠繳之先後期別依序繳納；倘未依序繳納者，本部礦務局將依礦業權費收費辦法第3條第3項或礦產權利金收費辦法第6條第3項規定，由最先欠繳期別依序抵繳所欠礦業權費或礦產權利金與加徵之數額。
                        </p>
                        <img src="../assets/seal.png" alt />
                      </div>
                    </div>
                  </div>
                  <p class="date-hint">請注意繳納時限</p>
                </div>
                <div class="address">
                  <h3 class="top">
                    經濟部礦務局
                    <br />10042 台北市中華路一段53號
                  </h3>
                  <h3 class="center">
                    {{item.address}}
                    <br />
                    {{item.miningOwner}}(代表人)收
                  </h3>
                  <div class="right">
                    <div class="border">正貼郵票</div>雙掛號郵寄
                  </div>
                </div>
              </div>
            </div>
          </div>
        </v-layout>
      </v-card>
    </v-dialog>
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
              <v-flex md4>1</v-flex>
              <v-flex md4>礦業權費</v-flex>
              <v-flex md4>{{dialogData.mineConcessionFee}}</v-flex>
            </v-layout>
            <v-layout>
              <v-flex md4>2</v-flex>
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
@import './print.scss';
.custom-type {
  transform: translate(24px, 40px);
  position: absolute;
  z-index: 1;
  width: 100%;
}
</style>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'
import _ from 'lodash'
import TimeRange from '@/components/TimeRange.vue'
import TaxForm from '@/components/TaxForm.vue'
import Table from '@/components/Table.vue'
import TaxCaseSearchComponent from '@/components/TaxCaseSearchComponent.vue'
import { createTax, addPrint } from '@/http/apis'
import { VForm } from '@/type'

const converter = require('number-to-chinese-words')

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
  get taxType() {
    return this.type
  }

  set taxType(value) {
    this.step = 0
    this.toggleTaxType(value)
  }

  get selectedCount() {
    const count = this.taxList.selected.length
    return count
  }
  @TaxsModule.State('type') public type!: number
  @TaxsModule.State('taxList') public taxList!: {
    items: []
    total: number
    selected: [],
  }
  @TaxsModule.State('taxUnpaidList') public taxUnpaidList!: {
    items: []
    total: number,
  }
  @TaxsModule.Mutation('setSelected') public setSelected!: (value: {}) => {}
  @TaxsModule.Mutation('toggleTaxType') public toggleTaxType!: (
    value: number,
  ) => {}

  @TaxsModule.Mutation('resetAllTax') public resetAllTax!: () => {}

  @TaxsModule.State('taxCase') public taxCase!: {
    items: []
    filters: any[]
    selected: any[]
    total: number,
  }

  private step = 0

  private detailDialog = false

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
        title: '礦業權者',
        key: 'miningOwner',
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
        title: '年度',
        key: 'year',
      },
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
        title: '礦業權者',
        key: 'miningOwner',
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
        title: '礦業權者',
        key: 'miningOwner',
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

  private ticketList = [
    '一、通知及收據聯：繳納人作為收據',
    '二、報核聯：收款單位報經濟部',
    '三、存查聯：收款單位存查',
    '四、存根聯：本聯由填發單位存查',
    '五、稽核聯：稽核單位留存',
  ]

  private printList: any[] = []

  private printDialog: boolean = false

  private printData: { items: any[]; total: number } = {
    items: [],
    total: 0,
  }

  private dialogData = {}

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

  public created() {
    // @TODO this.searchAPI
  }

  private closePrintDialog() {
    this.printDialog = false
    this.printData = {
      items: [],
      total: 0,
    }
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

  private showDetailDialog(id: string) {
    let collection
    if (this.taxType === 0) {
      collection = [...this.taxList.selected, ...this.taxUnpaidList.items]
    } else {
      collection = [...this.taxCase.selected]
    }
    const data = _.find(collection, { mineAreaId: id })
    this.dialogData = data as object
    this.detailDialog = true
  }

  private submitTaxAdd() {
    const { year } = (this.$refs.taxForm as any).taxListReq
    const { type } = (this.$refs.taxForm as any).taxListReq

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
    createTax(reqData).then((data: any) => {
      this.printList = data
      this.printDialog = true
      this.resetAll()
    }).catch((err) => {
      window.alert(err)
    })
  }
  // 參考 https://github.com/mycure-inc/vue-html-to-paper#readme
  private print() {
    // function addStyles(win: any) {
    //   let link = win.document.createElement('link')
    //   let styleTag = document.createElement('style')
    //   let css = '* { background: red; }'
    //   styleTag.type = 'text/css'
    //   ;(<any>styleTag).styleSheet.cssText = css
    //   win.document.getElementsByTagName('head')[0].appendChild(styleTag)
    // }
    const element = document.getElementById('printContent') as any
    const win = window.open('', '_blank') as any
    win.document.write(`
      <html>
        <head>
          <link rel="stylesheet" type="text/css" href="./print.css">
        </head>
        <body>
          ${element.innerHTML}
        </body>
      </html>
    `)

    setTimeout(() => {
      win.document.close()
      win.focus()
      win.print()
      // win.close()
    }, 1000)
  }

  private fetchAndPrint() {
    addPrint({ taxId: this.printList }).then((data: any) => {
      this.printData = data
      setTimeout(() => {
        this.print()
      }, 1000)
    })
  }

  private destroyed() {
    this.resetAllTax()
  }

  private intToChinese(
    num: number,
    digits = [
      '',
      '拾',
      '佰',
      '仟',
      '萬',
      '拾',
      '佰',
      '仟',
      '億',
      '拾',
      '佰',
      '仟',
      '兆',
      '拾',
      '佰',
      '仟',
      '京',
      '拾',
      '佰',
      '仟',
      '垓',
    ],
    units = ['零', '壹', '貳', '參', '肆', '伍', '陸', '柒', '捌', '玖'],
    minus: string,
    isCheque: boolean,
  ) {
    let str = ''
    let n = Math.floor(Math.abs(num))
    if (n < 1) {
      return (num < 0 ? minus : '') + digits[0]
    }

    const uc = units.slice()
    while (n > 0) {
      const u = uc.shift()
      const d = n % 10
      str = digits[d] + u + str //((d > 0) ? u : '') + str;

      n = Math.floor(n / 10)
    }

    const smallUnit = units[1] + units[2] + units[3]
    const bigUnit = units[4] + units[8] + units[12] + units[16] + units[20]
    const zero = digits[0]

    str = str
      .replace(new RegExp('(' + zero + ')[' + smallUnit + ']', 'g'), '$1') //零千,零百,零十 keeps 零
      .replace(
        new RegExp(
          '([' + bigUnit + '])[^' + smallUnit + ']+([' + bigUnit + '])',
          'g',
        ),
        '$1' + zero,
      ) //大數中間沒細數，補零
      .replace(
        new RegExp(
          '([' + smallUnit + '])' + zero + '+([' + bigUnit + '])',
          'g',
        ),
        '$1$2' + zero,
      )
      .replace(new RegExp('(' + digits[0] + ')+', 'g'), '$1') //group 零
      .replace(new RegExp(zero + '+$'), '') //tail zero remove

    if (isCheque !== true) {
      // check writing reserve the first "一"
      str = str.replace(new RegExp('^' + digits[1] + units[1]), units[1]) //^一十 == 十
    }

    return (num < 0 ? minus : '') + str
  }

  private toWords(num: number) {
    const digits = ['零', '壹', '貳', '參', '肆', '伍', '陸', '柒', '捌', '玖']
    const units = [
      '',
      '拾',
      '佰',
      '仟',
      '萬',
      '拾',
      '佰',
      '仟',
      '億',
      '拾',
      '佰',
      '仟',
      '兆',
      '拾',
      '佰',
      '仟',
      '京',
      '拾',
      '佰',
      '仟',
      '垓',
    ]
    return this.intToChinese(num, digits, units, '負', false)
  }

  private sum(money: number) {
    const length = money.toString().split('').length
    const units = ['', '拾', '佰', '仟', '萬', '拾', '佰', '仟', '億']
    const sliceList = units.slice(length, units.length).reverse()
    const prvString = sliceList.map((slice: string) => '零' + slice).join('')
    const total = prvString + this.toWords(money)
    return total.split('')
  }
}
</script>