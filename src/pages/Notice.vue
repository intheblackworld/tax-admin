<template>
  <div>
    <h3>通知單開立紀錄</h3>
    <v-card color="lighten-1" class="mb-5">
      <v-form ref="noticeForm">
        <v-container>
          <v-layout align-center>
            <v-flex xs12 md2>礦權業者</v-flex>
            <v-flex xs12 md2>
              <v-text-field v-model="form.mineCompanay" label></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout align-center>
            <v-flex xs12 md2>礦權字號</v-flex>
            <v-flex xs12 md2>
              <v-text-field v-model="form.mineNo" label></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout align-center>
            <v-flex xs12 md2>通知類別</v-flex>
            <v-flex xs12 md2>
              <v-text-field v-model="form.noticeType" label></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout align-center>
            <v-flex xs12 md2>開立時間</v-flex>
            <v-flex xs12 md8>
              <TimeRange title :startDate.sync="form.openStart" :endDate.sync="form.openEnd"/>
            </v-flex>
          </v-layout>
        </v-container>
      </v-form>
      <v-btn flat @click="resetCurrentForm(noticeForm)">新建</v-btn>
      <v-btn flat @click="resetCurrentForm(noticeForm)">清除</v-btn>
    </v-card>
    <Table :table-options="tableOptions" :items="resultData.items"/>
  </div>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'
import TimeRange from '@/components/TimeRange.vue'
import { mixins } from 'vue-class-component'
import Table from '@/components/Table.vue'
import { VForm } from '@/type'
import CreateMixin from '@/mixins/CreateMixin'

const UsersModule = namespace('users')

@Component({
  components: {
    TimeRange,
    Table,
  },
})
export default class Notice extends mixins(CreateMixin) {
  get noticeForm(): VForm {
    return this.$refs.noticeForm as VForm
  }

  @UsersModule.Action('create') public createPerson!: (params: object) => {}

  public form = {
    mineCompanay: '',
    mineNo: '',
    noticeType: '',
    openStart: '',
    openEnd: '',
  }

  private tableOptions = {
    columns: [
      {
        title: '通知類別',
        key: 'cardNo',
      },
      {
        title: '時間',
        key: 'name',
      },
      {
        title: '單號',
        key: 'personNo',
      },
      {
        title: '礦區編號',
        key: 'position',
      },
      {
        title: '礦權業者',
        key: 'organization',
      },
      {
        title: '繳費期限',
        key: 'subsidiary',
      },
    ],
    control: 'watch', // link | edit | delete | watch, seperate multiple by comma
  }

  public resultData = {
    items: [],
  }

  created() {
    // @TODO this.searchAPI
  }
}
</script>