<template>
  <div>
    <h1>期別管理</h1>
    <!-- 1 定期開徵 -->
    <v-alert type="error" :value="isUnValid">起訖時間(民國)不符規範</v-alert>
    <v-card color="lighten-1" class="mt-2 mb-5">
      <v-form ref="periodForm">
        <v-container>
          <v-layout align-center>
            <v-flex xs12 md12>
              <h3>定期開徵明細</h3>
            </v-flex>
          </v-layout>
          <v-layout align-center v-for="(item, index) in ['單期', '四期']" :key="`period-${index}`">
            <v-flex xs12 md1>{{index === 0 ? '選擇期別': ''}}</v-flex>
            <v-flex xs12 md2>
              <v-radio-group v-model="period.unit1" :mandatory="false">
                <v-layout align-center>
                  <v-flex>
                    <v-radio :label="item" :value="index"></v-radio>
                  </v-flex>
                </v-layout>
              </v-radio-group>
            </v-flex>
            {{index === 1 ? '最新期別：' : ''}}
            <v-flex xs12 md2>
              <v-select
                :rules="[rules.required,]"
                :items="yearList"
                v-model="period.requests[index].year"
              ></v-select>
            </v-flex>年
            <v-flex xs12 md1></v-flex>
            <v-flex xs12 md2>
              <v-radio-group v-model="period.requests[index].periodType" :mandatory="false">
                <v-layout align-center>
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
          <v-layout align-center>
            <v-flex xs12 md1></v-flex>
            <v-flex xs12 md2>
              <v-radio-group v-model="period.unit1" :mandatory="false">
                <v-layout align-center>
                  <v-flex>
                    <v-radio label="多期" :value="2"></v-radio>
                  </v-flex>
                </v-layout>
              </v-radio-group>
            </v-flex>
            <v-flex xs12 md2>
              <v-select
                :rules="[rules.required,]"
                :items="yearList"
                v-model="period.requests[2].startYear"
              ></v-select>
            </v-flex>年
            <v-flex xs12 md2>
              <v-radio-group v-model="period.requests[2].startPeriodType" :mandatory="false">
                <v-layout align-center>
                  <v-flex>
                    <v-radio label="上期" :value="1"></v-radio>
                  </v-flex>
                  <v-flex>
                    <v-radio label="下期" :value="2"></v-radio>
                  </v-flex>
                </v-layout>
              </v-radio-group>
            </v-flex>
            <v-flex xs12 md1>~</v-flex>
            <v-flex xs12 md2>
              <v-select
                :rules="[rules.required,]"
                :items="yearList"
                v-model="period.requests[2].endYear"
              ></v-select>
            </v-flex>年
            <v-flex xs12 md2>
              <v-radio-group v-model="period.requests[2].endPeriodType" :mandatory="false">
                <v-layout align-center>
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
          <v-layout align-center>
            <v-flex xs12 md1>選擇類型</v-flex>
            <v-flex xs12 md6>
              <v-radio-group v-model="period.unit2" :mandatory="false">
                <v-layout align-center>
                  <v-flex>
                    <v-radio label="全部" :value="0"></v-radio>
                  </v-flex>
                  <v-flex v-if="!justAllForPeriod">
                    <v-radio label="已繳" :value="1"></v-radio>
                  </v-flex>
                  <v-flex v-if="!justAllForPeriod">
                    <v-radio label="未繳" :value="2"></v-radio>
                  </v-flex>
                </v-layout>
              </v-radio-group>
            </v-flex>
          </v-layout>
          <v-flex xs12 md2>
            <v-btn color="primary" @click="handlePrint(period, periodForm)">列印</v-btn>
          </v-flex>
        </v-container>
      </v-form>
    </v-card>
    <!-- 2 個案開徵明細 -->
    <v-card color="lighten-1" class="mt-2 mb-5">
      <v-form ref="caseTaxForm">
        <v-container>
          <v-layout align-center>
            <v-flex xs12 md12>
              <h3>個案開徵明細</h3>
            </v-flex>
          </v-layout>
          <v-layout align-center>
            <v-flex xs12 md1>期別</v-flex>
            <v-flex xs12 md2>
              <v-select :rules="[rules.required,]" :items="yearList" v-model="caseTax.year"></v-select>
            </v-flex>年
            <v-flex xs12 md1></v-flex>
            <v-flex xs12 md2>
              <v-radio-group v-model="caseTax.periodType" :mandatory="false">
                <v-layout align-center>
                  <v-flex>
                    <v-radio label="上期" :value="1"></v-radio>
                  </v-flex>
                  <v-flex>
                    <v-radio label="下期" :value="2"></v-radio>
                  </v-flex>
                </v-layout>
              </v-radio-group>
            </v-flex>
            <v-flex xs12 md3></v-flex>
          </v-layout>
          <v-flex xs12 md2>
            <v-btn color="primary" @click="handlePrint(caseTax, caseTaxForm)">列印</v-btn>
          </v-flex>
        </v-container>
      </v-form>
    </v-card>
    <!-- 3 金額判斷 -->
    <!-- 具礦產權利金 -->
    <!-- 具核減礦業權費 -->
    <!-- 具欠繳金額 有 -->
    <v-card color="lighten-1" class="mt-2 mb-5">
      <v-form ref="moneyForm">
        <v-container>
          <v-layout align-center>
            <v-flex xs12 md12>
              <h3>金額判斷</h3>
            </v-flex>
          </v-layout>
          <v-layout align-center>
            <v-flex xs12 md2>金額類別</v-flex>
            <v-flex xs12 md6>
              <v-radio-group v-model="money.unit2" :mandatory="false">
                <v-layout align-center>
                  <v-flex>
                    <v-radio label="具礦產權利金" :value="0"></v-radio>
                  </v-flex>
                  <v-flex>
                    <v-radio label="具核減礦業權費" :value="1"></v-radio>
                  </v-flex>
                  <v-flex>
                    <v-radio label="具欠繳金額" :value="2"></v-radio>
                  </v-flex>
                </v-layout>
              </v-radio-group>
            </v-flex>
          </v-layout>
          <v-layout align-center>
            <v-flex xs12 md2>期別</v-flex>
            <v-flex xs12 md2>
              <v-select :rules="[rules.required,]" :items="yearList" v-model="money.year"></v-select>
            </v-flex>年
            <v-flex xs12 md1></v-flex>
            <v-flex xs12 md2>
              <v-radio-group v-model="money.periodType" :mandatory="false">
                <v-layout align-center>
                  <v-flex>
                    <v-radio label="上期" :value="1"></v-radio>
                  </v-flex>
                  <v-flex>
                    <v-radio label="下期" :value="2"></v-radio>
                  </v-flex>
                </v-layout>
              </v-radio-group>
            </v-flex>
            <v-flex xs12 md3></v-flex>
          </v-layout>
          <v-flex xs12 md2>
            <v-btn color="primary" @click="handlePrint(money, moneyForm)">列印</v-btn>
          </v-flex>
        </v-container>
      </v-form>
    </v-card>
    <v-card color="lighten-1" class="mt-2 mb-5">
      <v-form ref="priceForm">
        <v-container>
          <v-layout align-center>
            <v-flex xs12 md12>
              <h3>場交價相關報表</h3>
            </v-flex>
          </v-layout>
          <v-layout align-center>
            <v-flex xs12 md2>選擇報表</v-flex>
            <v-flex xs12 md4>
              <v-radio-group v-model="price.unit2" :mandatory="false">
                <v-layout align-center>
                  <v-flex>
                    <v-radio label="權利金徵收額" :value="0"></v-radio>
                  </v-flex>
                  <v-flex>
                    <v-radio label="場交單價" :value="1"></v-radio>
                  </v-flex>
                </v-layout>
              </v-radio-group>
            </v-flex>
          </v-layout>
          <v-layout align-center>
            <v-flex xs12 md2>期別</v-flex>
            <v-flex xs12 md2>
              <v-select :rules="[rules.required,]" :items="yearList" v-model="price.year"></v-select>
            </v-flex>年
            <v-flex xs12 md1></v-flex>
            <v-flex xs12 md2>
              <v-radio-group v-model="price.periodType" :mandatory="false">
                <v-layout align-center>
                  <v-flex>
                    <v-radio label="上期" :value="1"></v-radio>
                  </v-flex>
                  <v-flex>
                    <v-radio label="下期" :value="2"></v-radio>
                  </v-flex>
                </v-layout>
              </v-radio-group>
            </v-flex>
            <v-flex xs12 md3></v-flex>
          </v-layout>
          <v-flex xs12 md2>
            <v-btn color="primary" @click="handlePrint(price, priceForm)">列印</v-btn>
          </v-flex>
        </v-container>
      </v-form>
    </v-card>
    <!-- 7 -->
    <v-dialog v-model="printDialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="closePrintDialog">
            <v-icon>close</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-layout class="pt-5 pl-5">
          <div id="printReport">
            <Report000
              v-if="printCase === '000'"
              :data="printData"
              :year="period.requests[0].year"
              :periodType="period.requests[0].periodType"
            />
            <Report010
              v-if="printCase === '010'"
              :data="printData"
              :year="period.requests[1].year"
              :periodType="period.requests[1].periodType"
            />
            <Report011
              v-if="printCase === '011'"
              :data="printData"
              :year="period.requests[1].year"
              :periodType="period.requests[1].periodType"
            />
            <Report012
              v-if="printCase === '012'"
              :data="printData"
              :year="period.requests[1].year"
              :periodType="period.requests[1].periodType"
            />
            <Report020
              v-if="printCase === '020'"
              :data="printData"
              :startYear="period.requests[2].startYear"
              :endYear="period.requests[2].endYear"
              :startPeriodType="period.requests[2].startPeriodType"
              :endPeriodType="period.requests[2].endPeriodType"
            />
            <Report021
              v-if="printCase === '021'"
              :data="printData"
              :startYear="period.requests[2].startYear"
              :endYear="period.requests[2].endYear"
              :startPeriodType="period.requests[2].startPeriodType"
              :endPeriodType="period.requests[2].endPeriodType"
            />
            <Report022
              v-if="printCase === '022'"
              :data="printData"
              :startYear="period.requests[2].startYear"
              :endYear="period.requests[2].endYear"
              :startPeriodType="period.requests[2].startPeriodType"
              :endPeriodType="period.requests[2].endPeriodType"
            />
            <Report100
              v-if="printCase === '100'"
              :data="printData"
              :year="caseTax.year"
              :periodType="caseTax.periodType"
            />
            <Report200
              v-if="printCase === '200'"
              :data="printData"
              :year="money.year"
              :periodType="money.periodType"
            />
            <Report201
              v-if="printCase === '201'"
              :data="printData"
              :year="money.year"
              :periodType="money.periodType"
            />
            <Report202
              v-if="printCase === '202'"
              :data="printData"
              :year="money.year"
              :periodType="money.periodType"
            />
            <Report300
              v-if="printCase === '300'"
              :data="collectionPriceData"
              :year="price.year"
              :periodType="price.periodType"
            />
            <Report301
              v-if="printCase === '301'"
              :data="fieldPriceData"
              :year="price.year"
              :periodType="price.periodType"
            />
          </div>
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
import Report000 from '@/components/Reports/Report000.vue'
import Report010 from '@/components/Reports/Report010.vue'
import Report011 from '@/components/Reports/Report011.vue'
import Report012 from '@/components/Reports/Report012.vue'
import Report020 from '@/components/Reports/Report020.vue'
import Report021 from '@/components/Reports/Report021.vue'
import Report022 from '@/components/Reports/Report022.vue'
import Report100 from '@/components/Reports/Report100.vue'
import Report200 from '@/components/Reports/Report200.vue'
import Report201 from '@/components/Reports/Report201.vue'
import Report202 from '@/components/Reports/Report202.vue'
import Report300 from '@/components/Reports/Report300.vue'
import Report301 from '@/components/Reports/Report301.vue'
import {
  getPeriodSingle,
  getPeriodFour,
  getPeriodFourPaid,
  getPeriodFourUnPaid,
  getPeriodMultiple,
  getPeriodMultiplePaid,
  getPeriodMultipleUnPaid,
  getCaseTax,
  getRoyalty,
  getRefund,
  getPeriodSingleUnpaid,
  getCollectionPrice,
  getFieldPrice,
} from '@/http/apis'
import { VForm } from '@/type'
import moment from 'moment'
import _ from 'lodash'

const UsersModule = namespace('users')

@Component({
  components: {
    TimeRange,
    Report000,
    Report010,
    Report011,
    Report012,
    Report020,
    Report021,
    Report022,
    Report100,
    Report200,
    Report201,
    Report202,
    Report300,
    Report301,
  },
})
export default class Report extends Vue {
  public rules = {
    required: (value: string) => !!value || '此欄位必填',
  }

  private yearList: Array<{ text: any; value: any }> = []
  private justAllForPeriod: boolean = true
  private printData: any = { items: [{ reportPeroidTax: [] }], total: 0 }
  // 300 權利金徵收額
  private collectionPriceData: any = {
    collectionPrice: [], // 場交價資料
    collectionPriceSum: 0, // 徵收額總額
    gasOilSum: 0, // 天然氣石油徵收額總額
    mineralSum: 0, // 礦種徵收額總額
    period: '', // 年分期別
    totalSum: 0, // 全部總額(礦種徵收額總額+天然氣石油徵收額總額)
  }
  // 301 場交單價
  private fieldPriceData: any = {
    fieldPrice: [], // 場交價資料
    period: '', // 年分期別
  }
  private printCase: string = ''
  private printTitle: string = ''
  private printDialog: boolean = false

  private isUnValid = false

  // 四個區塊，四個v-form
  // 表單一 定期開徵
  get periodForm(): VForm {
    return this.$refs.periodForm as VForm
  }
  private period = {
    requests: [
      // 單
      {
        year: Number(moment().format('YYYY')),
        periodType: 1,
      },
      // 四
      {
        year: Number(moment().format('YYYY')),
        periodType: 1,
      },
      // 多
      {
        startYear: Number(moment().format('YYYY')) - 1,
        endYear: Number(moment().format('YYYY')),
        startPeriodType: 1,
        endPeriodType: 1,
      },
    ],
    unit0: 0,
    unit1: 0, // 期別 0：單期 1：四期 2：多期
    unit2: 0,
  }

  // 表單二 個案開徵
  get caseTaxForm(): VForm {
    return this.$refs.caseTaxForm as VForm
  }
  private caseTax = {
    year: Number(moment().format('YYYY')),
    periodType: 1,
    unit0: 1,
    unit1: 0,
    unit2: 0,
  }

  // 表單三 金額判斷
  get moneyForm(): VForm {
    return this.$refs.moneyForm as VForm
  }
  private money = {
    year: Number(moment().format('YYYY')),
    periodType: 1,
    unit0: 2,
    unit1: 0, // 期別 0：單期 1：四期 2：多期
    unit2: 0,
  }

  // 表單四 場交價
  get priceForm(): VForm {
    return this.$refs.priceForm as VForm
  }
  private price = {
    year: Number(moment().format('YYYY')),
    periodType: 1,
    unit0: 3,
    unit1: 0,
    unit2: 0,
  }

  // public validateAndNext(step: number, form: VForm | VForm[]) {
  public handlePrint(request: any, form: VForm) {
    form.validate()
    if (form.validate()) {
      // 根據編號打不同 API，參照 apis.ts 最下方的 comment
      this.printCase =
        request.unit0.toString() +
        request.unit1.toString() +
        request.unit2.toString()

      // 13 種報表
      if (this.printCase.split('')[0] !== '0') {
        request = _.omit(request, ['unit0', 'unit1', 'unit2'])
      }

      switch (this.printCase) {
        // 000
        case '000':
          getPeriodSingle(request.requests[0]).then((data: any) => {
            this.printData = data
            setTimeout(() => {
              this.print()
            }, 2000)
          })
          break
        // 010
        case '010':
          getPeriodFour(request.requests[1]).then((data: any) => {
            this.printData = data
            setTimeout(() => {
              this.print()
            }, 2000)
          })
          break
        // 011
        case '011':
          getPeriodFourPaid(request.requests[1]).then((data: any) => {
            this.printData = data
            setTimeout(() => {
              this.print()
            }, 2000)
          })
          break
        // 012
        case '012':
          getPeriodFourUnPaid(request.requests[1]).then((data: any) => {
            this.printData = data
            setTimeout(() => {
              this.print()
            }, 2000)
          })
          break
        // 020
        // 021
        // 022
        case '020':
          getPeriodMultiple(request.requests[2]).then((data: any) => {
            this.printData = data
            setTimeout(() => {
              this.print()
            }, 2000)
          })

          break
        case '021':
          getPeriodMultiplePaid(request.requests[2]).then((data: any) => {
            this.printData = data
            setTimeout(() => {
              this.print()
            }, 2000)
          })
          break
        case '022':
          getPeriodMultipleUnPaid(request.requests[2]).then((data: any) => {
            this.printData = data
            setTimeout(() => {
              this.print()
            }, 2000)
          })
          break
        // 100
        case '100':
          getCaseTax(request).then((data: any) => {
            this.printData = data
            setTimeout(() => {
              this.print()
            }, 2000)
          })
          break
        // 200
        case '200':
          getRoyalty(request).then((data: any) => {
            this.printData = data
            setTimeout(() => {
              this.print()
            }, 2000)
          })
          break
        // 201
        case '201':
          getRefund(request).then((data: any) => {
            this.printData = data
            setTimeout(() => {
              this.print()
            }, 2000)
          })
          break
        // 202
        case '202':
          getPeriodSingleUnpaid(request).then((data: any) => {
            this.printData = data
            setTimeout(() => {
              this.print()
            }, 2000)
          })
          break
        // 300
        case '300':
          getCollectionPrice(request).then((data: any) => {
            this.collectionPriceData = data
            setTimeout(() => {
              this.print()
            }, 2000)
          })
          break
        // 301
        case '301':
          getFieldPrice(request).then((data: any) => {
            this.fieldPriceData = data
            setTimeout(() => {
              this.print()
            }, 2000)
          })
          break

        default:
          break
      }
    }
  }

  public created() {
    this.generateYearList()
  }

  private print() {
    const element = document.getElementById('printReport') as any
    const win = window.open('', '_blank') as any
    win.document.write(`
      <html>
        <head>
          <link rel="stylesheet" type="text/css" href="../report.css">
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
      this.closePrintDialog()
    }, 1000)
  }

  private generateYearList() {
    const thisYear = Number(moment().format('YYYY'))
    const pastYear = thisYear - 9
    this.yearList = _.range(thisYear, pastYear).map((year: number) => ({
      text: year - 1911,
      value: year,
    }))
  }

  private closePrintDialog() {
    this.printDialog = false
    this.printData = {
      items: [{ reportPeroidTax: [] }],
      total: 0,
    }
    // 300 權利金徵收額
    this.collectionPriceData = {
      collectionPrice: [], // 場交價資料
      collectionPriceSum: 0, // 徵收額總額
      gasOilSum: 0, // 天然氣石油徵收額總額
      mineralSum: 0, // 礦種徵收額總額
      period: '', // 年分期別
      totalSum: 0, // 全部總額(礦種徵收額總額+天然氣石油徵收額總額)
    }
    // 301 場交單價
    this.fieldPriceData = {
      fieldPrice: [], // 場交價資料
      period: '', // 年分期別
    }
  }

  @Watch('period', { immediate: false, deep: true })
  private handlePeriodRequest() {
    if (
      moment(this.period.requests[2].startYear).isAfter(
        this.period.requests[2].endYear,
      )
    ) {
      this.period.requests[2].startYear = Number(moment().format('YYYY')) - 1
      this.generateYearList()
      this.isUnValid = true

      setTimeout(() => {
        this.isUnValid = false
        this.period.requests[2].endYear = Number(moment().format('YYYY'))
      }, 2000)
    }
    if (this.period.unit1 === 0) {
      this.justAllForPeriod = true
    } else {
      this.justAllForPeriod = false
    }
  }
}
</script>