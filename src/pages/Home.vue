<template>
  <div>
    <h3>期別管理</h3>
    <PeriodForm/>
    <Table :table-options="tableOptions" :items="resultData.items"/>
  </div>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'
import TimeRange from '@/components/TimeRange.vue'
import PeriodForm from '@/components/PeriodForm.vue'
import Table from '@/components/Table.vue'
import { VForm } from '@/type'

const UsersModule = namespace('users')

@Component({
  components: {
    TimeRange,
    PeriodForm,
    Table
  },
})
export default class Home extends Vue {
  // @UsersModule.State('step') public step!: number

  @UsersModule.Action('create') public createPerson!: (params: object) => {}

  private tableOptions = {
    columns: [
      {
        title: '期別',
        key: 'cardNo',
      },
      {
        title: '海域石油及天然氣探礦權費率(%)',
        key: 'name',
      },
      {
        title: '陸上礦種探礦權費率(%)',
        key: 'personNo',
      },
      {
        title: '海域石油及天然氣採礦權費率(%)',
        key: 'position',
      },
      {
        title: '陸上礦種採礦權費率(%)',
        key: 'organization',
      },
      {
        title: '石油及天然氣權利金比率(%)',
        key: 'subsidiary',
      },
      {
        title: '金屬礦權利金比率(%)',
        key: 'employeeId',
      },
      {
        title: '其他權利金比率(%)',
        key: 'employeeId',
      },
      {
        title: '年利率(%)',
        key: 'employeeId',
      },
    ],
    control: 'edit,delete', // link | edit | delete, seperate multiple by comma
  }

  public resultData = {
    items: []
  }

  created() {
    // @TODO this.searchAPI
  }
}
</script>