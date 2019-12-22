<template>
  <div>
    <v-card>
      <v-layout>
        <!-- payStatus 繳納狀態(0: 已繳清 1: 未繳清 2: 逾期未繳) -->
        <v-flex
          md4
          :class="`tab ${currentPayStatus === -1 ? 'active' : ''}`"
          @click="currentPayStatus = -1"
        >全部案件</v-flex>
        <v-flex
          md4
          :class="`tab ${currentPayStatus === 0 ? 'active' : ''}`"
          @click="currentPayStatus = 0"
        >已繳清</v-flex>
        <v-flex
          md4
          :class="`tab ${currentPayStatus === 1 ? 'active' : ''}`"
          @click="currentPayStatus = 1"
        >未繳清</v-flex>
        <v-flex
          md4
          :class="`tab ${currentPayStatus === 2 ? 'active' : ''}`"
          @click="currentPayStatus = 2"
        >
          逾期未繳
          <span class="warning">{{this.unPaidCount}}</span>
        </v-flex>
      </v-layout>
    </v-card>
    <!-- <v-btn ripple @click="currentPayStatus = -1">
      <h2>全部案件</h2>
    </v-btn>
    <v-btn ripple @click="currentPayStatus = 0">
      
      <h2>已繳清</h2>
    </v-btn>
    <v-btn ripple @click="currentPayStatus = 1">
      <h2>未繳清</h2>
    </v-btn>
    <v-btn ripple @click="currentPayStatus = 2">
      <h2>逾期未繳</h2>
      
    </v-btn>-->
    <v-card flat>
      <v-form ref="manageForm">
        <v-container>
          <v-layout align-center>
            <v-flex xs12 md2>繳納日</v-flex>
            <v-flex xs12 md12>
              <TimeRange
                title="繳納日"
                :startDate.sync="form.paylimitDateStart"
                :endDate.sync="form.paylimitDateEnd"
              />
            </v-flex>
          </v-layout>
          <v-layout align-center>
            <v-flex xs12 md2>開單日</v-flex>
            <v-flex xs12 md12>
              <TimeRange
                title="開單日"
                :startDate.sync="form.createTaxDateStart"
                :endDate.sync="form.createTaxDateEnd"
              />
            </v-flex>
          </v-layout>
          <v-layout align-center>
            <v-flex xs12 md2>礦區字號</v-flex>
            <v-flex xs12 md4>
              <v-text-field v-model="form.areaNo" label></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout align-center>
            <v-flex xs12 md2>礦場名稱</v-flex>
            <v-flex xs12 md4>
              <v-text-field v-model="form.mineName" label></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout align-center>
            <v-flex xs12 md2>期別</v-flex>
            <v-flex xs12 md2>
              <v-text-field v-model="form.year" label></v-text-field>
            </v-flex>年
            <v-flex xs12 md4>
              <v-radio-group v-model="form.periodType" :mandatory="false">
                <v-layout align-center>
                  <v-flex>
                    <v-radio label="不限" :value="null"></v-radio>
                  </v-flex>
                  <v-flex>
                    <v-radio label="上期" :value="1"></v-radio>
                  </v-flex>
                  <v-flex>
                    <v-radio label="下期" :value="2"></v-radio>
                  </v-flex>
                </v-layout>
              </v-radio-group>
            </v-flex>
          </v-layout>
        </v-container>
      </v-form>
      <v-btn @click="search" color="info">搜尋</v-btn>
      <v-btn @click="resetCurrentForm(manageForm)">清除</v-btn>
    </v-card>
    <v-card color="gray-3" class="mb-5 pl-2 pt-3">
      <v-layout align-center>
        <v-flex md8>
          <v-btn outline color="info" @click="selectHaveTaxPrice">有未繳金額全選</v-btn>
        </v-flex>
        <v-flex md2>
          <!-- <v-btn color="info" @click="showTableDialog">產製明細</v-btn> -->
        </v-flex>
        <v-flex md2>
          <v-btn color="info" @click="showPaymentDialog">產製繳費通知單</v-btn>
        </v-flex>
      </v-layout>

      <Table
        :table-options="taxManageOptions"
        :items="filterByPriceOptionData"
        :selected="taxManage.selected"
        @payAll="showPayAllDialog($event)"
        @payCustom="showPayCustomDialog($event)"
        @updateData="updateTaxManage"
        @showPayment="showPaymentDialog($event)"
        name="tax"
        case="Manage"
        itemKey="taxId"
        canSelect
      />
    </v-card>

    <v-dialog v-model="paymentDialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="closePaymentDialog">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>繳費明細</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-layout class="pt-5 pl-5">
          <!-- <v-layout>
            <v-date-picker
              v-model="taxListReq.PaylimitDate"
              @input="dateMenu = false"
              locale="zh-cn"
            ></v-date-picker>
          </v-layout>-->
          <v-flex md6>
            <h3 class="mb-3">繳納名單</h3>
            <v-layout>
              <v-flex md2>礦區字號</v-flex>
              <v-flex md2>礦場名稱</v-flex>
              <v-flex md2>應繳金額</v-flex>
              <v-flex md2></v-flex>
            </v-layout>
            <v-layout v-for="(item, index) in paymentDialogData" :key="item.taxId">
              <v-flex md2>{{item.areaNo}}</v-flex>
              <v-flex md2>{{item.mineName}}</v-flex>
              <v-flex md2>{{item.totalPrice}}</v-flex>
              <v-flex md2>
                <v-icon @click="deletePaymentRow(index)">delete</v-icon>
                <v-icon @click="paymentIndex = index">search</v-icon>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex md4>
            <h3 class="mb-3">繳納細節</h3>
            <v-layout>
              <v-flex md4>1</v-flex>
              <v-flex md4>礦業權費</v-flex>
              <v-flex md4>{{paymentDialogData[paymentIndex].mineConcessionFee}}</v-flex>
            </v-layout>
            <v-layout>
              <v-flex md4>2</v-flex>
              <v-flex md4>礦產權利金</v-flex>
              <v-flex md4>{{paymentDialogData[paymentIndex].royalty}}</v-flex>
            </v-layout>

            <v-layout>
              <v-flex md4>3</v-flex>
              <v-flex md4>未繳餘額</v-flex>
              <v-flex md4>{{paymentDialogData[paymentIndex].unpaidPrice}}</v-flex>
            </v-layout>
            <v-layout>
              <v-flex md4>4</v-flex>
              <v-flex md4>滯納金</v-flex>
              <v-flex md4>{{paymentDialogData[paymentIndex].fines}}</v-flex>
            </v-layout>
            <v-layout>
              <v-flex md4>5</v-flex>
              <v-flex md4>利息</v-flex>
              <v-flex md4>{{paymentDialogData[paymentIndex].interest}}</v-flex>
            </v-layout>
            <v-layout>
              <v-flex md4>6</v-flex>
              <v-flex md4>扣減金額</v-flex>
              <v-flex md4>{{paymentDialogData[paymentIndex].refund}}</v-flex>
            </v-layout>
            <v-layout>
              <v-flex md4></v-flex>
              <v-flex md4>總額</v-flex>
              <v-flex md4>{{paymentDialogData[paymentIndex].totalPrice}}</v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
        <v-btn @click="fetchAndPrint" color="info">確認列印繳納通知</v-btn>
      </v-card>
    </v-dialog>
    <v-dialog v-model="printDialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="closePrintDialog">
            <v-icon>close</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-layout class="pt-5 pl-5">
          <div id="printContent">
            <div
              class="print-container"
              v-for="item in printData.items"
              :key="`${item.areaNo}-print`"
            >
              <div
                class="print-item"
                v-for="index in 5"
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
                    <div class="col-4">{{item.miningOwner}}</div>
                    <div class="col-2">繳納期限</div>
                    <div
                      class="col-4"
                    >{{`民國${item.paylimitDate.split('-')[0] - 1911}年${item.paylimitDate.split('-')[1]}月${item.paylimitDate.split('-')[2].slice(0, 2)}日`}}</div>

                    <div class="col-2">地址</div>
                    <div class="col-4">{{item.address}}</div>
                    <div class="col-2">礦區面積</div>
                    <div class="col-4">{{Math.floor(item.area)}}公畝{{(item.area - Math.floor(item.area)) * 100}}公畝</div>

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
                        <span style="font-weight: bold">匯款者請註明礦區字號及礦業權者</span> 戶名：經濟部礦務局 帳號：<span style="font-weight: bold">045037090053</span> 行名：台灣銀行城中分行。 (三)礦業權者如有欠繳礦業權費或礦產權利金之情形，將收到2張以上之繳納通知單，如無法全數繳清，請依欠繳之先後期別依序繳納；倘未依序繳納者，本部礦務局將依礦業權費收費辦法第3條第3項或礦產權利金收費辦法第6條第3項規定，由最先欠繳期別依序抵繳所欠礦業權費或礦產權利金與加徵之數額。
                      </p>
                      <img src="../../assets/seal.png" alt />
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
                  <div class="border">
                    正貼郵票
                  </div>
                  雙掛號郵寄
                </div>
              </div>
            </div>
          </div>
        </v-layout>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="printTableDialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="primary" class="noPrint">
          <v-btn icon dark @click="printTableDialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-layout class="pt-5 pl-5">
          <v-flex>
            <v-btn @click="printTable" class="noPrint" color="info">確認列印明細</v-btn>
            <div id="printTable">
              <Table
                :table-options="printTableOptions"
                :items="taxManage.selected"
                name="tax"
                case="Manage"
                itemKey="taxId"
                :take="[99999]"
              />
            </div>
          </v-flex>
        </v-layout>
      </v-card>
    </v-dialog>

    <v-dialog v-model="payAllDialog" hide-overlay width="600" transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="payAllDialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title></v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-layout class="pt-5 pl-5">
          <!-- <v-layout>
            <v-date-picker
              v-model="taxListReq.PaylimitDate"
              @input="dateMenu = false"
              locale="zh-cn"
            ></v-date-picker>
          </v-layout>-->
          <v-flex md12>
            <v-layout align-center>
              <v-flex md4>繳費日期</v-flex>
              <v-flex md7>
                <v-menu
                  v-model="payAllDateMenu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="payAllDialogData.paymentDate"
                      label
                      prepend-icon="event"
                      readonly
                      :rules="[rules.required,]"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="payAllDialogData.paymentDate"
                    @input="payAllDateMenu = false"
                    locale="zh-cn"
                  ></v-date-picker>
                </v-menu>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex md10></v-flex>
          <v-flex md2>
            <v-btn @click="payAll" color="info">確認</v-btn>
          </v-flex>
        </v-layout>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="payCustomDialog"
      hide-overlay
      width="500"
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="payCustomDialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>繳費記錄</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <div class="pt-3 pl-2 pr-2">
          <v-form ref="addCustomForm">
            <v-layout class="add-list pl-2 pr-2 mb-2">
              <v-flex md12>
                <v-layout align-center>
                  <v-flex md4>繳費金額</v-flex>
                  <v-flex md4>
                    <v-text-field v-model="payCustomDialogData.price" :rules="[rules.required,]"></v-text-field>
                  </v-flex>
                  <v-flex md4>
                    <v-btn @click="clearUnpaid">全部結清</v-btn>
                  </v-flex>
                </v-layout>
                <v-layout align-center>
                  <v-flex md4>繳費日期</v-flex>
                  <v-flex md7>
                    <v-menu
                      v-model="payCustomDateMenu"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      lazy
                      transition="scale-transition"
                      offset-y
                      full-width
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="payCustomDialogData.paymentDate"
                          label
                          prepend-icon="event"
                          readonly
                          :rules="[rules.required,]"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="payCustomDialogData.paymentDate"
                        @input="payCustomDateMenu = false"
                        locale="zh-cn"
                      ></v-date-picker>
                    </v-menu>
                  </v-flex>
                </v-layout>
                <v-layout align-center>
                  <v-flex md6></v-flex>
                  <v-flex md3>
                    <v-btn @click="addCustom">新增</v-btn>
                  </v-flex>
                  <v-flex md3>
                    <v-btn @click="clearCustom">清除</v-btn>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-form>
          <v-layout class="mb-3 tempory-list">
            <v-flex md12>
              <v-layout align-center class="head">
                <v-flex md6>繳費金額</v-flex>
                <v-flex md6>繳費日期</v-flex>
              </v-layout>
              <v-layout v-if="!historyList.length" class="empty">尚無繳費記錄</v-layout>
              <v-layout
                v-else
                align-center
                v-for="(item, index) in historyList"
                :key="`${item.taxId}-${index}`"
                class="content"
              >
                <v-flex md6>{{item.paymentAmount}}</v-flex>
                <v-flex md6>{{item.paymentDate}}</v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
          <v-layout class="pay-list">
            <v-flex md12>
              應繳金額
              <v-layout align-center class="head mt-2">
                <v-flex md6>項目</v-flex>
                <v-flex md6>金額</v-flex>
              </v-layout>
              <v-layout align-center class="content">
                <v-flex md6>礦產權利金</v-flex>
                <v-flex md6>{{payCustomDialogData.royalty}}</v-flex>
              </v-layout>
              <v-layout align-center class="content">
                <v-flex md6>礦業權費</v-flex>
                <v-flex md6>{{payCustomDialogData.mineConcessionFee}}</v-flex>
              </v-layout>
              <v-layout align-center class="content">
                <v-flex md6>未繳餘額</v-flex>
                <v-flex md6>{{payCustomDialogData.unpaidPrice}}</v-flex>
              </v-layout>
              <v-layout align-center class="content">
                <v-flex md6>滯納金</v-flex>
                <v-flex md6>{{payCustomDialogData.fines}}</v-flex>
              </v-layout>
              <v-layout align-center class="content">
                <v-flex md6>利息</v-flex>
                <v-flex md6>{{payCustomDialogData.interest}}</v-flex>
              </v-layout>
              <v-layout align-center class="content">
                <v-flex md6>退費金額</v-flex>
                <v-flex md6>{{payCustomDialogData.refund}}</v-flex>
              </v-layout>
              <v-layout align-center class="content">
                <v-flex md6>總額</v-flex>
                <v-flex md6>{{payCustomDialogData.totalPrice}}</v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex md9></v-flex>
            <v-flex md3>
              <v-btn @click="payCustom" color="info">確認</v-btn>
            </v-flex>
          </v-layout>
        </div>
      </v-card>
    </v-dialog>
    <v-dialog v-model="unSelect" hide-overlay width="500" transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="unSelect = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title></v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <div class="pt-5 pl-5 pr-5 pb-5">
          <h3>尚未選擇開徵案件</h3>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<style lang="scss" scoped>
@import '../print.scss';
.warning {
  width: 22px;
  height: 22px;
  border-radius: 999px;
  margin-left: 5px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(150, 40, 27, 1) !important;
}

.tab {
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid #ccc;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  transition: all 0.5s;

  &.active {
    background: #1565c0;
    color: #fff;
  }

  &:nth-last-child(1) {
    border-right: none;
  }
}

.add-list {
  border: 1px solid #eee;
}

.tempory-list {
  border: 1px solid #eee;
  .empty {
    justify-content: center;
    padding: 5px;
  }
  .head {
    background: #ccc;
    padding: 5px;
  }

  .content {
    padding: 5px;
  }
}

.pay-list {
  .head {
    background: #ccc;
    padding: 5px;
  }

  .content {
    padding: 5px;
  }
}

@media print {
  * {
    -webkit-print-color-adjust: exact !important;
  }
  .noBreak {
    break-inside: avoid;
  }
  .noPrint {
    display: none;
  }

  #printTable {
    width: 100%;

    table.v-table thead th:first-child {
      padding: 0 !important;
    }
  }
}

@page {
  size: A4 portrait;
}
</style>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'
import TimeRange from '@/components/TimeRange.vue'
import Table from '@/components/Table.vue'
import { createTax, addPrint, payAll, payCustom, payHistory } from '@/http/apis'
import _ from 'lodash'
import { VForm } from '@/type'

const TaxsModule = namespace('taxs')

@Component({
  components: {
    TimeRange,
    Table,
  },
})
export default class Default extends Vue {

  get filterByPriceOptionData() {
    if (this.$route.query.type === '0') {
      return this.taxManage.periods.filter((item: any) => {
        return (
          item.payStatus === this.currentPayStatus ||
          this.currentPayStatus === -1
        )
      })
    }

    if (this.$route.query.type === '1') {
      return this.taxManage.cases.filter((item: any) => {
        return (
          item.payStatus === this.currentPayStatus ||
          this.currentPayStatus === -1
        )
      })
    }

    return this.taxManage.items.filter((item: any) => {
      return (
        item.payStatus === this.currentPayStatus || this.currentPayStatus === -1
      )
    })
  }

  get unPaidCount() {
    let count = 0
    this.taxManage.items.forEach((item: any) => {
      if (item.payStatus === 2) {
        count++
      }
    })

    return count
  }
  // @UsersModule.State('step') public step!: number
  public form = {
    paylimitDateStart: '',
    paylimitDateEnd: '',
    createTaxDateStart: '',
    createTaxDateEnd: '',
    areaNo: '',
    mineName: '',
    periodType: null,
    year: null,
  }

  @TaxsModule.Action('getTaxManage') public getTaxManage!: ({}) => {}

  @TaxsModule.State('taxManage') public taxManage!: {
    items: [] // 不限
    cases: [] // 個案
    periods: [] // 定期
    selected: [],
  }

  @TaxsModule.Mutation('setSelected') public setSelected!: (value: {}) => {}

  private printDialog: boolean = false

  private printTableDialog: boolean = false

  private rules = {
    required: (value: string) => !!value || '此欄位必填',
  }

  private payAllDateMenu = false
  private payCustomDateMenu = false

  private unSelect = false

  private ticketList = [
    '一、通知及收據聯：繳納人作為收據',
    '二、報核聯：收款單位報經濟部',
    '三、存查聯：收款單位存查',
    '四、存根聯：本聯由填發單位存查',
    '五、稽核聯：稽核單位留存',
  ]

  private taxManageOptions = {
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
        key: 'hasPaidPrice',
      },
      {
        title: '欠繳金額',
        key: 'unpaidPrice',
      },
      {
        title: '開徵日期',
        key: 'createTaxDate',
      },
      {
        title: '繳納期限',
        key: 'paylimitDate',
      },
      {
        title: '核減退費金額',
        key: 'refund',
      },
      {
        title: '動作',
        key: 'taxId',
      },
    ],
    control: 'multiple', // 繳費(全繳), 繳費(非全繳), 編輯, 前往開徵履歷頁,  產製催繳通知
  }

  private printTableOptions = {
    columns: [
      // {
      //   title: '案號',
      //   key: 'taxId',
      // },
      {
        title: '礦區字號',
        key: 'areaNo',
      },
      {
        title: '礦場名稱',
        key: 'mineName',
      },
      {
        title: '開徵時間',
        key: 'createTaxDate',
      },
      {
        title: '開徵類型',
        key: 'type',
      },
      {
        title: '期別',
        key: 'period',
      },
      {
        title: '繳納期限',
        key: 'paylimitDate',
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
        title: '退費金額',
        key: 'refund',
      },
      {
        title: '應繳金額',
        key: 'totalPrice',
      },
      {
        title: '未繳餘額',
        key: 'unpaidPrice',
      },
      // {
      //   title: '動作',
      //   key: 'taxId',
      // },
    ],
    control: '', // 繳費(全繳), 繳費(非全繳), 編輯, 前往開徵履歷頁,  產製催繳通知
  }

  private currentPayStatus = -1

  private historyList: any[] = []

  private payAllDialog = false
  private payAllDialogData = {}
  private payCustomDialog = false
  private payCustomDialogData: {
    taxId: string
    paymentDate: string
    price: number
    royalty: number
    mineConcessionFee: number
    fines: number
    interest: number
    refund: number
    unpaidPrice: number
    totalPrice: number
    list: Array<{ taxId: string; paymentDate: string; price: number }>,
  } = {
    taxId: '',
    paymentDate: '',
    royalty: 0,
    mineConcessionFee: 0,
    fines: 0,
    interest: 0,
    refund: 0,
    unpaidPrice: 0,
    totalPrice: 0,
    price: 0,
    list: [],
  }

  private paymentDialog = false
  private paymentIndex = 0
  private paymentDialogData = [
    {
      taxId: '',
      mineConcessionFee: 0,
      royalty: 0,
      unpaidPrice: 0,
      fines: 0,
      interest: 0,
      refund: 0,
      totalPrice: 0,
    },
  ]

  private printData: { items: any[]; total: number } = {
    items: [],
    total: 0,
  }

  public created() {
    // @TODO this.searchAPI
    this.search()
  }

  public updateTaxManage() {
    this.getTaxManage(this.form)
  }

  private closePrintDialog() {
    this.printDialog = false
    this.printData = {
      items: [],
      total: 0,
    }
  }

  private search() {
    this.getTaxManage(this.form)
  }

  private selectHaveTaxPrice() {
    const list = this.taxManage.items.filter(
      (item: { unpaidPrice: number }) => item.unpaidPrice > 0,
    )

    this.setSelected({ key: 'taxManage', data: list })
  }

  private getPayHistory(No: string, Type: number, Year: number) {
    payHistory({ No, Type, Year }).then((data: any) => {
      this.historyList = data
    })
  }

  private showPaymentDialog(data: any) {
    if (data.areaNo) {
      this.paymentDialogData = [data]
      this.paymentDialog = true
    } else {
      if (this.taxManage.selected.length) {
        this.paymentDialogData = this.taxManage.selected
        this.paymentDialog = true
      } else {
        this.unSelect = true
        return
      }
    }
  }

  private showTableDialog(data: any) {
    this.printTableDialog = true
  }

  private closePaymentDialog() {
    this.paymentDialogData = []
    this.paymentDialog = false
  }

  private showPayAllDialog(data: any) {
    this.payAllDialog = true
    this.payAllDialogData = {
      taxId: data.taxId,
      paymentDate: '',
      price: '',
    }
  }
  private payAll() {
    payAll(this.payAllDialogData).then(() => {
      this.payAllDialog = false
      this.updateTaxManage()
    })
  }

  private payCustom() {
    let count = 0
    if (this.payCustomDialogData.list.length) {
      this.payCustomDialogData.list.forEach((data) => {
        payCustom(data).then(() => {
          count++
          if (count === this.payCustomDialogData.list.length) {
            this.payCustomDialog = false
            this.payCustomDialogData.list = []
            this.updateTaxManage()
          }
        })
      })
    } else {
      this.payCustomDialog = false
      this.payCustomDialogData.list = []
    }
  }

  private showPayCustomDialog(data: any) {
    this.payCustomDialog = true
    this.getPayHistory(data.areaNo, data.periodType, data.periodYear)
    this.payCustomDialogData = {
      taxId: data.taxId,
      paymentDate: '',
      price: 0,
      royalty: data.royalty,
      mineConcessionFee: data.mineConcessionFee,
      fines: data.fines,
      interest: data.interest,
      refund: data.refund,
      unpaidPrice: data.unpaidPrice,
      totalPrice: data.totalPrice,
      list: [],
    }
  }

  private deletePaymentRow(index: number) {
    if (this.paymentDialogData.length <= 1) {
      return
    }
    this.paymentDialogData.splice(index, 1)
  }

  private fetchAndPrint() {
    const taxIdList = this.paymentDialogData.map((item) => item.taxId)
    this.paymentDialog = false
    this.printDialog = true
    addPrint({ taxId: taxIdList }).then((data: any) => {
      this.printData = data
      setTimeout(() => {
        this.print()
      }, 2000)
    })
  }

  private print() {
    const element = document.getElementById('printContent') as any
    const win = window.open('', '_blank') as any
    win.document.write(`
      <html>
        <head>
          <link rel="stylesheet" type="text/css" href="../print.css">
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

  private printTable() {
    setTimeout(() => {
      // document.close()
      // focus()
      window.print()
      // win.close()
    }, 1000)
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
    if (n < 1) { return (num < 0 ? minus : '') + digits[0] }

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
      //check writing reserve the first "一"
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
    const prvString = sliceList.map((slice) => '零' + slice).join('')
    const total = prvString + this.toWords(money)
    return total.split('')
  }

  private clearUnpaid() {
    this.payCustomDialogData.price = this.payCustomDialogData.unpaidPrice
  }

  private addCustom() {
    ; (this.$refs.addCustomForm as VForm).validate()
    const { taxId, paymentDate, price } = this.payCustomDialogData
    this.historyList.push({
      paymentAmount: price,
      paymentDate,
    })
    this.payCustomDialogData.list.push({
      taxId,
      paymentDate,
      price,
    })
  }

  private clearCustom() {
    this.payCustomDialogData.list = []
  }
}
</script>

