<template>
  <div>
    <v-card color="lighten-1" class="mb-2 pl-2">
      <v-layout align-center>
        <v-flex md2>
          <h3>開徵作業</h3>
        </v-flex>
        <v-flex md4>
          <v-radio-group v-model="taxType" :mandatory="false">
            <v-layout align-center>
              <v-flex>
                <v-radio label="定期開徵" :value="0"></v-radio>
              </v-flex>
              <v-flex>
                <v-radio label="個案開徵" :value="1"></v-radio>
              </v-flex>
            </v-layout>
          </v-radio-group>
        </v-flex>
      </v-layout>
    </v-card>
    
    <TaxForm :taxType="taxType"/>
    <div v-if="taxType === 0">
      <v-card color="gray-3" class="mb-5 pl-2 pt-3">
        <v-layout align-center>
          <v-flex md2>
            <h3>選擇本期開徵礦業權者</h3>
          </v-flex>
        </v-layout>
        <Table :table-options="tableOptions" :items="resultData.items"/>
      </v-card>

      <v-card color="gray-3" class="mb-2 pl-2 pt-3">
        <v-layout align-center>
          <v-flex md2>
            <h3>過去期別未繳清礦業權者</h3>
          </v-flex>
        </v-layout>
        <Table :table-options="tableOptions" :items="resultData.items"/>
      </v-card>
    </div>
    <div v-else>
      <DynamicSearchComponent />
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'
import TimeRange from '@/components/TimeRange.vue'
import TaxForm from '@/components/TaxForm.vue'
import Table from '@/components/Table.vue'
import DynamicSearchComponent from '@/components/DynamicSearchComponent.vue'
import { VForm } from '@/type'

const TaxsModule = namespace('taxs')

@Component({
  components: {
    TimeRange,
    TaxForm,
    Table,
    DynamicSearchComponent,
  },
})
export default class Operation extends Vue {
  // @UsersModule.State('step') public step!: number

  @TaxsModule.State('type') public type!: number
  @TaxsModule.Mutation('toggleTaxType') public toggleTaxType!: (
    value: number,
  ) => {}

  get taxType() {
    return this.type
  }

  set taxType(value) {
    this.toggleTaxType(value)
  }

  // @Watch('taxType')
  // public onChangeTaxType(val: string) {
  //   this.$emit('update:startDate', val)
  // }

  private tableOptions = {
    columns: [
      {
        title: '開徵',
        key: 'selected',
      },
      {
        title: '礦區字號',
        key: 'name',
      },
      {
        title: '執照字號',
        key: 'personNo',
      },
      {
        title: '礦權業者',
        key: 'position',
      },
      {
        title: '礦產權利金',
        key: 'organization',
      },
      {
        title: '礦業權費',
        key: 'subsidiary',
      },
      {
        title: '應徵額',
        key: 'employeeId',
      },
      {
        title: '礦權狀態',
        key: 'employeeId',
      },
      {
        title: '廢止時間',
        key: 'employeeId',
      },
    ],
    control: 'edit', // link | edit | delete, seperate multiple by comma
  }

  public resultData = {
    items: [],
  }

  created() {
    // @TODO this.searchAPI
  }
}
</script>