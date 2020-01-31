<template>
  <div>
    <v-card color="lighten-1" class="mb-5">
      <v-form ref="periodForm">
        <v-container>
          <v-layout align-center>
            <v-flex xs12 md2>期別</v-flex>
            <v-flex xs12 md1>
              <v-text-field v-model="periodReq.year" label></v-text-field>
            </v-flex>年
            <v-flex xs12 md2>
              <v-radio-group v-model="periodReq.type" :mandatory="false">
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
            <v-flex xs12 md2>礦業權費率</v-flex>
            <v-flex xs12 md2>探礦業權費率</v-flex>
            <v-flex xs12 md2>海域石油及天然氣</v-flex>
            <v-flex xs12 md1>
              <v-text-field v-model="periodReq.seaAreaOilAndGas" label></v-text-field>
            </v-flex>元/萬公頃
          </v-layout>
          <v-layout align-center>
            <v-flex xs12 md2></v-flex>
            <v-flex xs12 md2></v-flex>
            <v-flex xs12 md2>陸上礦種</v-flex>
            <v-flex xs12 md1>
              <v-text-field v-model="periodReq.onShoreMine" label></v-text-field>
            </v-flex>元/公頃
          </v-layout>
          <v-layout align-center>
            <v-flex xs12 md2></v-flex>
            <v-flex xs12 md2>採礦業權費率</v-flex>
            <v-flex xs12 md2>海域石油及天然氣</v-flex>
            <v-flex xs12 md1>
              <v-text-field v-model="periodReq.miningSeaAreaOilAndGas" label></v-text-field>
            </v-flex>元/萬公頃
          </v-layout>
          <v-layout align-center>
            <v-flex xs12 md2></v-flex>
            <v-flex xs12 md2></v-flex>
            <v-flex xs12 md2>陸上礦種</v-flex>
            <v-flex xs12 md1>
              <v-text-field v-model="periodReq.miningOnShoreMine" label></v-text-field>
            </v-flex>元/公頃
          </v-layout>
          <v-layout align-center>
            <v-flex xs12 md2>礦產礦產權利金繳納比率</v-flex>
            <v-flex xs12 md2>石油及天然氣</v-flex>
            <v-flex xs12 md2></v-flex>
            <v-flex xs12 md1>
              <v-text-field v-model="periodReq.royaltyOilAndGas" label></v-text-field>
            </v-flex>%
          </v-layout>
          <v-layout align-center>
            <v-flex xs12 md2></v-flex>
            <v-flex xs12 md2>金屬礦</v-flex>
            <v-flex xs12 md2></v-flex>
            <v-flex xs12 md1>
              <v-text-field v-model="periodReq.royaltyMetallogenic" label></v-text-field>
            </v-flex>%
          </v-layout>
          <v-layout align-center>
            <v-flex xs12 md2></v-flex>
            <v-flex xs12 md2>其他</v-flex>
            <v-flex xs12 md2></v-flex>
            <v-flex xs12 md1>
              <v-text-field v-model="periodReq.royaltyOther" label></v-text-field>
            </v-flex>%
          </v-layout>
          <v-layout align-center>
            <v-flex xs12 md2>年利率</v-flex>
            <v-flex xs12 md1>
              <v-text-field v-model="periodReq.annualRate" label></v-text-field>
            </v-flex>%
          </v-layout>
        </v-container>
      </v-form>
      <v-layout>
        <v-flex md12></v-flex>
        <v-flex md3>
          <v-btn color="info" @click="submitForm(periodReq)">新建</v-btn>
          <v-btn @click="resetCurrentForm(periodForm)">清除</v-btn>
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
import { createPeriod, getPeriods } from '@/http/apis'
import { VForm } from '@/type'
import CreateMixin from '@/mixins/CreateMixin'

const TaxsModule = namespace('taxs')

@Component
export default class PeriodForm extends mixins(CreateMixin) {
  get periodForm(): VForm {
    return this.$refs.periodForm as VForm
  }

  @TaxsModule.State('periodForm') public periodReq: {
    year: null // 年度(民國)
    type: 1 // 上、下期(1,2)
    periodId: '' // (新增的話為NULL 、 編輯會有值)
    seaAreaOilAndGas: 25 // 海域石油及天然氣(探礦)
    onShoreMine: 75 // 陸上礦種(探礦)
    miningSeaAreaOilAndGas: 75 // 海域石油及天然氣(採礦)
    miningOnShoreMine: 225 // 陸上礦種(採礦)
    royaltyOilAndGas: 10 // 石油及天然氣(礦產礦產權利金繳納比率)
    royaltyMetallogenic: 5 // 金屬礦(礦產礦產權利金繳納比率)
    royaltyOther: 2 // 其他(礦產礦產權利金繳納比率)
    annualRate: 0, // 年利率
  } = {
    year: null, // 年度(民國)
    type: 1, // 上、下期(1,2)
    periodId: '', // (新增的話為NULL 、 編輯會有值)
    seaAreaOilAndGas: 25, // 海域石油及天然氣(探礦)
    onShoreMine: 75, // 陸上礦種(探礦)
    miningSeaAreaOilAndGas: 75, // 海域石油及天然氣(採礦)
    miningOnShoreMine: 225, // 陸上礦種(採礦)
    royaltyOilAndGas: 10, // 石油及天然氣(礦產礦產權利金繳納比率)
    royaltyMetallogenic: 5, // 金屬礦(礦產礦產權利金繳納比率)
    royaltyOther: 2, // 其他(礦產礦產權利金繳納比率)
    annualRate: 0, // 年利率
  }

  private submitForm(reqData: any) {
    createPeriod(reqData).then(() => {
      this.$emit('updateData')
    })
  }
}
</script>


