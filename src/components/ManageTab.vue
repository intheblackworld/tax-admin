<template>
  <v-tabs v-model="active">
    <v-tab ripple>
      <h2>全部案件</h2>
    </v-tab>
    <v-tab ripple>
      <h2>已繳清</h2>
    </v-tab>
    <v-tab ripple>
      <h2>未繳清</h2>
    </v-tab>
    <!-- 基本資料 -->
    <v-tab-item>
      <v-card flat>
        <v-form ref="manageForm">
          <v-container>
            <v-layout align-center>
              <v-flex xs12 md2>繳納日</v-flex>
              <v-flex xs12 md12>
                <TimeRange
                  title="繳納日"
                  :startDate.sync="form.payStart"
                  :endDate.sync="form.payEnd"
                />
              </v-flex>
            </v-layout>
            <v-layout align-center>
              <v-flex xs12 md2>開單日</v-flex>
              <v-flex xs12 md12>
                <TimeRange
                  title="開單日"
                  :startDate.sync="form.issueStart"
                  :endDate.sync="form.issueEnd"
                />
              </v-flex>
            </v-layout>
            <v-layout align-center>
              <v-flex xs12 md2>礦場編號</v-flex>
              <v-flex xs12 md2>
                <v-text-field v-model="form.mineNo" label></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout align-center>
              <v-flex xs12 md2>礦場名稱</v-flex>
              <v-flex xs12 md2>
                <v-text-field v-model="form.mineName" label></v-text-field>
              </v-flex>
            </v-layout>
            
          </v-container>
        </v-form>
        <v-btn flat @click="resetCurrentForm(manageForm)">建立</v-btn>
        <v-btn flat @click="resetCurrentForm(manageForm)">清除</v-btn>
      </v-card>
    </v-tab-item>
    <v-tab-item>
      <v-card flat>
        <v-form ref="manageForm">
          <v-container>
            <v-layout align-center>
              <v-flex xs12 md2>繳納日</v-flex>
              <v-flex xs12 md12>
                <TimeRange
                  title="繳納日"
                  :startDate.sync="form.payStart"
                  :endDate.sync="form.payEnd"
                />
              </v-flex>
            </v-layout>
            <v-layout align-center>
              <v-flex xs12 md2>開單日</v-flex>
              <v-flex xs12 md12>
                <TimeRange
                  title="開單日"
                  :startDate.sync="form.issueStart"
                  :endDate.sync="form.issueEnd"
                />
              </v-flex>
            </v-layout>
            <v-layout align-center>
              <v-flex xs12 md2>礦場編號</v-flex>
              <v-flex xs12 md2>
                <v-text-field v-model="form.mineNo" label></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout align-center>
              <v-flex xs12 md2>礦場名稱</v-flex>
              <v-flex xs12 md2>
                <v-text-field v-model="form.mineName" label></v-text-field>
              </v-flex>
            </v-layout>
            
          </v-container>
        </v-form>
        <v-btn flat @click="resetCurrentForm(manageForm)">建立</v-btn>
        <v-btn flat @click="resetCurrentForm(manageForm)">清除</v-btn>
      </v-card>
    </v-tab-item>
    <v-tab-item>
      <v-card flat>
        <v-form ref="manageForm">
          <v-container>
            <v-layout align-center>
              <v-flex xs12 md2>繳納日</v-flex>
              <v-flex xs12 md12>
                <TimeRange
                  title="繳納日"
                  :startDate.sync="form.payStart"
                  :endDate.sync="form.payEnd"
                />
              </v-flex>
            </v-layout>
            <v-layout align-center>
              <v-flex xs12 md2>開單日</v-flex>
              <v-flex xs12 md12>
                <TimeRange
                  title="開單日"
                  :startDate.sync="form.issueStart"
                  :endDate.sync="form.issueEnd"
                />
              </v-flex>
            </v-layout>
            <v-layout align-center>
              <v-flex xs12 md2>礦場編號</v-flex>
              <v-flex xs12 md2>
                <v-text-field v-model="form.mineNo" label></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout align-center>
              <v-flex xs12 md2>礦場名稱</v-flex>
              <v-flex xs12 md2>
                <v-text-field v-model="form.mineName" label></v-text-field>
              </v-flex>
            </v-layout>
            
          </v-container>
        </v-form>
        <v-btn flat @click="resetCurrentForm(manageForm)">建立</v-btn>
        <v-btn flat @click="resetCurrentForm(manageForm)">清除</v-btn>
      </v-card>Ｆ
    </v-tab-item>
  </v-tabs>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'
import { mixins } from 'vue-class-component'
import TimeRange from '@/components/TimeRange.vue'
import Table from '@/components/Table.vue'
import { VForm } from '@/type'
import CreateMixin from '@/mixins/CreateMixin'

@Component({
  components: {
    TimeRange,
    Table,
  },
})
export default class ManageTab extends mixins(CreateMixin) {
  // @UsersModule.State('step') public step!: number
  get manageForm(): VForm {
    return this.$refs.manageForm as VForm
  }

  private active = null

  public form = {
    payStart: '',
    payEnd: '',
    issudeStart: '',
    issudeEnd: '',
    mineNo: '',
    mineName: '',
  }

  created() {
    // @TODO this.searchAPI
  }
}
</script>


<style lang="sass" scoped>

</style>