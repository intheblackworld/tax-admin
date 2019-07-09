<template>
  <div>
    <h3>期別管理</h3>
    <PeriodForm @updateData="updatePeriods" />
    <Table :table-options="tableOptions" :items="resultData.items" name="period" @updateData="updatePeriods" @deleteRow="deletePeriod" />
  </div>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'
import TimeRange from '@/components/TimeRange.vue'
import PeriodForm from '@/components/PeriodForm.vue'
import { getPeriods, deletePeriod } from '@/http/apis'
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
        title: '年度',
        key: 'year',
      },
      {
        title: '期別',
        key: 'periodType',
      },
      {
        title: '海域石油及天然氣探礦權費率(%)',
        key: 'seaAreaOilAndGas',
      },
      {
        title: '陸上礦種探礦權費率(%)',
        key: 'onShoreMine',
      },
      {
        title: '海域石油及天然氣採礦權費率(%)',
        key: 'miningSeaAreaOilAndGas',
      },
      {
        title: '陸上礦種採礦權費率(%)',
        key: 'miningOnShoreMine',
      },
      {
        title: '石油及天然氣權利金比率(%)',
        key: 'royaltyOilAndGas',
      },
      {
        title: '金屬礦權利金比率(%)',
        key: 'royaltyMetallogenic',
      },
      {
        title: '其他權利金比率(%)',
        key: 'royaltyOther',
      },
      {
        title: '年利率(%)',
        key: 'annualRate',
      },
      {
        title: '動作',
        key: 'periodId',
      },
    ],
    control: 'edit,delete', // link | edit | delete, seperate multiple by comma
  }

  public resultData = {
    items: [],
    total: 0,
  }

  public updatePeriods() {
    getPeriods({skip: 0}).then((data: any) => {
      this.resultData = data
    })
  }

  private deletePeriod(id: string) {
    deletePeriod(id).then(() => {
      this.updatePeriods()
    })
  }
  
  created() {
    this.updatePeriods()
  }
}
</script>