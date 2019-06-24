<template>
  <div>
    <v-card color="lighten-1" class="mb-5">
      <v-form ref="periodForm">
        <v-container>
          <v-layout align-center>
            <v-flex xs12 md2>期別</v-flex>
            <v-flex xs12 md2>
              <v-text-field v-model="form.year" label></v-text-field>
            </v-flex>年
            <v-flex xs12 md2>
              <v-radio-group v-model="form.type" :mandatory="false">
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
            <v-flex xs12 md2>礦權費率</v-flex>
            <v-flex xs12 md2>探礦權費率</v-flex>
            <v-flex xs12 md2>海域石油及天然氣</v-flex>
            <v-flex xs12 md2>
              <v-text-field v-model="form.seaAreaOilAndGas" label></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout align-center>
            <v-flex xs12 md2></v-flex>
            <v-flex xs12 md2></v-flex>
            <v-flex xs12 md2>陸上礦種</v-flex>
            <v-flex xs12 md2>
              <v-text-field v-model="form.onShoreMine" label></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout align-center>
            <v-flex xs12 md2></v-flex>
            <v-flex xs12 md2>採礦權費率</v-flex>
            <v-flex xs12 md2>海域石油及天然氣</v-flex>
            <v-flex xs12 md2>
              <v-text-field v-model="form.miningSeaAreaOilAndGas" label></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout align-center>
            <v-flex xs12 md2></v-flex>
            <v-flex xs12 md2></v-flex>
            <v-flex xs12 md2>陸上礦種</v-flex>
            <v-flex xs12 md2>
              <v-text-field v-model="form.miningOnShoreMine" label></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout align-center>
            <v-flex xs12 md2>礦產權利金比率</v-flex>
            <v-flex xs12 md2>石油及天然氣</v-flex>
            <v-flex xs12 md2></v-flex>
            <v-flex xs12 md2>
              <v-text-field v-model="form.royaltyOilAndGas" label></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout align-center>
            <v-flex xs12 md2>礦產權利金比率</v-flex>
            <v-flex xs12 md2>金屬礦</v-flex>
            <v-flex xs12 md2></v-flex>
            <v-flex xs12 md2>
              <v-text-field v-model="form.royaltyMetallogenic" label></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout align-center>
            <v-flex xs12 md2>礦產權利金比率</v-flex>
            <v-flex xs12 md2>其他</v-flex>
            <v-flex xs12 md2></v-flex>
            <v-flex xs12 md2>
              <v-text-field v-model="form.royaltyOther" label></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-form>
      <v-btn flat @click="resetCurrentForm(periodForm)">新建</v-btn>
      <v-btn flat @click="resetCurrentForm(periodForm)">清除</v-btn>
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
export default class PeriodForm extends mixins(CreateMixin) {
  get periodForm(): VForm {
    return this.$refs.periodForm as VForm
  }

  @TaxsModule.State('form') public form!: {
    year: null // 年度(民國)
    type: 1 // 上、下期(1,2)
    periodId: null // (新增的話為NULL 、 編輯會有值)
    seaAreaOilAndGas: 0 // 海域石油及天然氣(探礦)
    onShoreMine: 0 // 陸上礦種(探礦)
    miningSeaAreaOilAndGas: 0 // 海域石油及天然氣(採礦)
    miningOnShoreMine: 0 // 陸上礦種(採礦)
    royaltyOilAndGas: 0 // 石油及天然氣(礦產權利金比率)
    royaltyMetallogenic: 0 // 金屬礦(礦產權利金比率)
    royaltyOther: 0 // 其他(礦產權利金比率)
    annualRate: 0 // 年利率
  }
}
</script>


