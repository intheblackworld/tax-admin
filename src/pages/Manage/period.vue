<template>
  <ManageTab />  
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'
import TimeRange from '@/components/TimeRange.vue'
import Table from '@/components/Table.vue'
import ManageTab from '@/components/ManageTab.vue'
import { VForm } from '@/type'

const TaxsModule = namespace('taxs')

@Component({
  components: {
    TimeRange,
    Table,
    ManageTab
  },
})
export default class Period
 extends Vue {
  // @UsersModule.State('step') public step!: number
}
</script>

