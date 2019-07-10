<template>
  <div>
    <v-card color="lighten-1" class="mb-5 pl-2 pt-3">
      <v-layout align-center>
        <v-flex md2>
          <h3>條件篩選</h3>
        </v-flex>
      </v-layout>
      <v-form ref="taxForm">
        <v-container v-if="taxFormstep === 0">
          <v-layout align-center v-if="taxType === 0">
            <v-flex xs12 md2>期別</v-flex>
            <v-flex xs12 md2>
              <v-text-field v-model="taxListReq.year" label></v-text-field>
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
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="taxListReq.PaylimitDate"
                  @input="dateMenu = false"
                  locale="zh-cn"
                ></v-date-picker>
              </v-menu>
            </v-flex>
          </v-layout>
        </v-container>
        <v-container v-if="taxFormstep === 1">
          <v-layout align-center v-if="taxType === 0">
            <v-flex xs12 md2>期別</v-flex>
            <v-flex xs12 md2>{{taxListReq.year}}年{{periodTypes[taxListReq.type -1]}}</v-flex>
          </v-layout>
          <v-layout align-center>
            <v-flex xs12 md2>繳納期限</v-flex>
            <v-flex xs12 md2>{{taxListReq.PaylimitDate}}</v-flex>
          </v-layout>
        </v-container>
      </v-form>
      <v-layout v-if="taxFormstep === 0">
        <v-btn @click="submitForm(taxListReq)">建立</v-btn>
        <v-btn @click="resetCurrentForm(taxForm)">清除</v-btn>
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

  private dateMenu = false

  @TaxsModule.State('taxListForm') public taxListReq!: {
    year: null // 年度(民國)
    type: 1 // 上、下期(1,2)
    PaylimitDate: ''
  }

  private periodTypes = ['上期', '上期']

  private getList(reqData: any) {
    this.getTaxList(reqData)
    let reqDataUnpaid = {
      PaylimitDate: reqData.PaylimitDate,
    }
    this.getTaxUnpaidList(reqDataUnpaid)
  }

  private getCase(reqData: any) {
    let reqDataCase = {
      PaylimitDate: reqData.PaylimitDate,
    }
    this.getTaxCase(reqDataCase)
  }

  private submitForm(reqData: any) {
    if (this.taxType === 0) {
      this.getList(reqData)
    } else {
      this.getCase(reqData)
    }
  }
}
</script>


