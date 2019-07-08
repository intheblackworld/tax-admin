<template>
  <div>
    <v-card color="lighten-1" class="mb-5 pl-2 pt-3">
      <v-layout align-center>
          <v-flex md2>
            <h3>條件篩選</h3>
          </v-flex>
        </v-layout>
      <v-form ref="taxForm">
        <v-container>
          <v-layout align-center>
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
                  <v-text-field v-model="form.date" label prepend-icon="event" readonly v-on="on"></v-text-field>
                </template>
                <v-date-picker v-model="form.date" @input="dateMenu = false" locale="zh-cn"></v-date-picker>
              </v-menu>
            </v-flex>
          </v-layout>
        </v-container>
      </v-form>
      <v-btn flat @click="submitForm(taxListReq)">建立</v-btn>
      <v-btn flat @click="resetCurrentForm(taxForm)">清除</v-btn>
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
  @TaxsModule.Action('getTaxListUnpaid') public getTaxListUnpaid!: ({}) => {}

  private dateMenu = false

  @TaxsModule.State('taxListForm') public taxListReq!: {
    year: null // 年度(民國)
    type: 1 // 上、下期(1,2)
  }

  private submitForm(reqData: any) {
    this.getTaxList(reqData)
    this.getTaxListUnpaid(reqData)
  }

  public form = {
    date: ''
  }
}
</script>


