<template>
  <div>
    <v-card color="lighten-1" class="mb-5 pl-2 pt-3">
      <v-layout align-center>
        <v-flex md2 class="mb-5">
          <h3>條件</h3>
        </v-flex>
      </v-layout>
      <v-form ref="taxForm">
        <v-container v-if="taxFormstep === 0">
          <v-layout align-center>
            <v-flex xs12 md2>期別</v-flex>
            <v-flex xs12 md2>
              <v-text-field v-model="taxListReq.year" :rules="[rules.required,]" label></v-text-field>
            </v-flex>年
            <v-flex xs12 md2>
              <v-radio-group v-model="taxListReq.type" :mandatory="false">
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
            <v-flex xs12 md2>繳納期限</v-flex>
            <v-flex xs12 md2>
              <v-menu
                v-model="dateMenu"
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
                    v-model="taxListReq.PaylimitDate"
                    label
                    prepend-icon="event"
                    readonly
                    :rules="[rules.required,]"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="taxListReq.PaylimitDate"
                  @input="dateMenu = false"
                  locale="zh-cn"
                  :header-date-format="handleYear"
                ></v-date-picker>
              </v-menu>
            </v-flex>
          </v-layout>
          <v-layout align-center>
            <v-flex xs12 md2>開單日</v-flex>
            <v-flex xs12 md2>
              <v-menu
                v-model="createMenu"
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
                    v-model="taxListReq.CreateTaxDate"
                    label
                    prepend-icon="event"
                    readonly
                    :rules="[rules.required,]"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="taxListReq.CreateTaxDate"
                  @input="createMenu = false"
                  locale="zh-cn"
                  :header-date-format="handleYear"
                ></v-date-picker>
              </v-menu>
            </v-flex>
          </v-layout>
        </v-container>
        <v-container v-if="taxFormstep === 1">
          <v-layout align-center>
            <v-flex xs12 md2>期別</v-flex>
            <v-flex xs12 md2>{{taxListReq.year}}年{{periodTypes[taxListReq.type -1]}}</v-flex>
          </v-layout>
          <v-layout align-center>
            <v-flex xs12 md2>繳納期限</v-flex>
            <v-flex xs12 md2>{{taxListReq.PaylimitDate}}</v-flex>
          </v-layout>
        </v-container>
      </v-form>
      <v-layout>
        <v-flex md12></v-flex>
        <v-flex md3 v-if="taxType === 0 && taxFormstep === 0">
          <v-btn color="info" @click="submitForm(taxListReq)">建立</v-btn>
          <v-btn @click="resetCurrentForm(taxForm)">清除</v-btn>
        </v-flex>
      </v-layout>
    </v-card>
  </div>
</template>

<style lang="sass" scoped>

</style>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'
import { mixins } from 'vue-class-component'
import { VForm } from '@/type'
import moment from 'moment'
import CreateMixin from '@/mixins/CreateMixin'

const TaxsModule = namespace('taxs')

@Component
export default class TaxForm extends mixins(CreateMixin) {
  get taxForm(): VForm {
    return this.$refs.taxForm as VForm
  }

  @TaxsModule.Action('getTaxList') public getTaxList!: ({}) => {}
  @TaxsModule.Action('getTaxUnpaidList') public getTaxUnpaidList!: ({}) => {}
  @TaxsModule.Action('getTaxCase') public getTaxCase!: ({}) => {}

  @Prop() public taxType!: number
  @Prop(Number) public taxFormstep!: number

  @TaxsModule.State('taxListForm') public taxListReq: {
    year: string // 年度(民國)
    type: number // 上、下期(1,2)
    PaylimitDate: string
    CreateTaxDate: string,
  } = {
    year: '', // 年度(民國)
    type: 1, // 上、下期(1,2)
    PaylimitDate: '',
    CreateTaxDate: '',
  }

  private dateMenu = false
  private createMenu = false

  private periodTypes = ['上期', '上期']

  @Watch('taxListReq.PaylimitDate')
  public onChange(val: string) {
    if (this.taxType === 1) {
      this.submitForm(this.taxListReq)
    }
  }

  public created() {
    {
      // 定期
      if (this.taxType === 0) {
        this.taxListReq.PaylimitDate = `${Number(moment().format('YYYY'))}-9-30`
        this.taxListReq.CreateTaxDate = `${Number(moment().format('YYYY'))}-9-1`
      } else {
        // 個案
        this.taxListReq.PaylimitDate = ''
      }
    }
  }

  // 定期，個案
  @Watch('taxType') public onTaxTypeChange(val: number) {
    if (this.taxType === 1) {
      this.taxListReq.PaylimitDate = ''
      this.taxListReq.CreateTaxDate = moment().format('YYYY-MM-DD')
    } else {
      if (this.taxListReq.type === 1) {
        this.taxListReq.PaylimitDate = `${Number(moment().format('YYYY'))}-9-30`
        this.taxListReq.CreateTaxDate = `${Number(moment().format('YYYY'))}-9-1`
      }

      if (this.taxListReq.type === 2) {
        this.taxListReq.PaylimitDate = `${Number(moment().format('YYYY')) +
          1}-3-31`
        this.taxListReq.CreateTaxDate = `${Number(moment().format('YYYY')) +
          1}-4-1`
      }
    }
  }

  // 期別
  @Watch('taxListReq.type') public onTypeChange(val: string) {
    if (this.taxType === 0) {
      if (this.taxListReq.type === 1) {
        this.taxListReq.PaylimitDate = `${
          this.taxListReq.year
            ? Number(this.taxListReq.year) + 1911
            : Number(moment().format('YYYY'))
        }-9-30`
        this.taxListReq.CreateTaxDate = `${
          this.taxListReq.year
            ? Number(this.taxListReq.year) + 1911
            : Number(moment().format('YYYY'))
        }-9-1`
      }

      if (this.taxListReq.type === 2) {
        this.taxListReq.PaylimitDate = `${
          this.taxListReq.year
            ? Number(this.taxListReq.year) + 1911 + 1
            : Number(moment().format('YYYY')) + 1
        }-3-31`
        this.taxListReq.CreateTaxDate = `${
          this.taxListReq.year
            ? Number(this.taxListReq.year) + 1911 + 1
            : Number(moment().format('YYYY')) + 1
        }-4-1`
      }
    }
  }

  @Watch('taxListReq.year') public onYearChange(val: string) {
    if (this.taxType === 0) {
      if (this.taxListReq.type === 1) {
        this.taxListReq.PaylimitDate = `${Number(this.taxListReq.year) +
          1911}-9-30`
        this.taxListReq.CreateTaxDate = `${Number(this.taxListReq.year) +
          1911}-9-1`
      }

      if (this.taxListReq.type === 2) {
        this.taxListReq.PaylimitDate = `${Number(this.taxListReq.year) +
          1911 +
          1}-3-31`
        this.taxListReq.CreateTaxDate = `${Number(this.taxListReq.year) +
          1911 +
          1}-4-1`
      }
    }
  }

  private getList(reqData: any) {
    this.getTaxList(reqData)
    const reqDataUnpaid = {
      PaylimitDate: reqData.PaylimitDate,
      CreateTaxDate: reqData.CreateTaxDate,
    }
    this.getTaxUnpaidList(reqDataUnpaid)
  }

  private getCase(reqData: any) {
    const reqDataCase = {
      PaylimitDate: reqData.PaylimitDate,
      CreateTaxDate: reqData.CreateTaxDate,
    }
    this.getTaxCase(reqDataCase)
  }

  private submitForm(reqData: any) {
    ; (this.$refs.taxForm as VForm).validate()

    if (this.taxType === 0) {
      this.getList(reqData)
    } else {
      this.getCase(reqData)
    }
  }

  private handleYear = (date: any) => {
    const year = date.split('-')[0]
    const month = date.split('-')[1]
    return `民國${year - 1911}年${month}月`
  }

  // private handleDate = (date: any) => {
  //   const year = date.split('-')[0]
  //   const month = date.split('-')[1]
  //   return `民國${year - 1911}年${month}月`
  // }
}
</script>


