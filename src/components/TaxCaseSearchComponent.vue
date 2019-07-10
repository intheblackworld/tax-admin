<template>
  <div>
    <v-card color="gray-3" class="mb-2 pl-2 pt-3">
      <v-layout align-center>
        <v-flex md2>
          <h3>選擇礦業權者</h3>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex md4 class="pl-3 pr-5">
          <v-form ref="caseForm">
            <v-layout align-center>
              <v-flex xs12 md4>礦區字號</v-flex>
              <v-flex xs12 md8>
                <v-text-field v-model="searchForm.areaNo" label></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout align-center>
              <v-flex xs12 md4>執照字號</v-flex>
              <v-flex xs12 md8>
                <v-text-field v-model="searchForm.licesenNo" label></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout align-center>
              <v-flex xs12 md4>礦業權者</v-flex>
              <v-flex xs12 md8>
                <v-text-field v-model="searchForm.miningOwner" label></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout align-center>
              <v-flex xs12 md4>現況</v-flex>
              <v-flex xs12 md8>
                <v-checkbox v-model="searchForm.mineStatus" label="不限" primary hide-details></v-checkbox>
              </v-flex>
            </v-layout>
            <v-layout>
              <v-btn @click="search(searchForm)">搜尋</v-btn>
              <v-btn @click="resetCurrentForm(taxForm)">清除</v-btn>
            </v-layout>
          </v-form>
          <v-list class="search-list">
            <template v-for="(item, index) in taxCase.filters">
              <v-list-tile :key="item.areaNo" @click="addToSelected(index)">
                <v-list-tile-content>
                  <v-list-tile-title v-text="`礦場編號${item.areaNo}`"></v-list-tile-title>
                </v-list-tile-content>

                <v-list-tile-action>
                  <v-icon color="gray">add</v-icon>
                </v-list-tile-action>
              </v-list-tile>
              <v-divider v-if="index + 1 < taxCase.filters.length" :key="index"></v-divider>
            </template>
          </v-list>
        </v-flex>
        <v-flex md8 class="pt-3">
          <Table
            :table-options="taxCaseOptions"
            :items="taxCase.selected"
            name="tax"
            :selected="taxCase.selected"
            :canSelect="false"
          />
        </v-flex>
      </v-layout>
    </v-card>
  </div>
</template>

<style lang="scss" scoped>
.search-list {
  height: 400px;
  overflow: scroll;
}
</style>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'
import { mixins } from 'vue-class-component'
import { VForm } from '@/type'
import Table from '@/components/Table.vue'
import CreateMixin from '@/mixins/CreateMixin'

const TaxsModule = namespace('taxs')

@Component({
  components: {
    Table,
  },
})
export default class TaxCaseSearchComponent extends mixins(CreateMixin) {
  get caseForm(): VForm {
    return this.$refs.caseForm as VForm
  }

  @TaxsModule.State('taxCase') public taxCase!: {
    items: []
    filters: any[]
    selected: any[]
    total: number
  }

  @TaxsModule.Mutation('setSelected') public setSelected!: (value: {}) => {}

  private searchForm = {
    areaNo: '',
    licesenNo: '',
    miningOwner: '',
    mineStatus: [],
  }

  private taxCaseOptions = {
    columns: [
      {
        title: '礦區字號',
        key: 'areaNo',
      },
      {
        title: '執照字號',
        key: 'licesenNo',
      },
      {
        title: '礦權業者',
        key: 'miningOwner',
      },
      {
        title: '礦產權利金',
        key: 'royalty',
      },
      {
        title: '礦業權費',
        key: 'mineConcessionFee',
      },
      {
        title: '滯納金',
        key: 'fines',
      },
      {
        title: '利息',
        key: 'interest',
      },
      {
        title: '應徵額',
        key: 'taxPrice',
      },
      {
        title: '礦權狀態',
        key: 'mineStatus',
      },
      {
        title: '廢止時間',
        key: 'revokeDate',
      },
      {
        title: '動作',
        key: 'taxId',
      },
    ],
    control: 'edit,delete', // link | edit | delete, seperate multiple by comma
  }

  private selectList: number[] = []

  private search() {
    // areaNo: '',
    // licesenNo: '',
    // miningOwner: '',
    // mineStatus: [],

    this.taxCase.filters = this.taxCase.items.filter((item: any) => {
      let conditionPass = 0
      if (this.searchForm.areaNo) {
        if (item.areaNo === this.searchForm.areaNo) {
          conditionPass++
        }
      } else {
        conditionPass++
      }

      if (this.searchForm.licesenNo) {
        if (item.licesenNo === this.searchForm.licesenNo) {
          conditionPass++
        }
      } else {
        conditionPass++
      }

      if (this.searchForm.miningOwner) {
        if (item.miningOwner === this.searchForm.miningOwner) {
          conditionPass++
        }
      } else {
        conditionPass++
      }

      // @TODO 按照checkbox mineStatus搜尋
      
      return conditionPass === 3
    })
    
  }

  private addToSelected(index: number) {
    if (this.selectList.includes(index)) {
      return
    }

    this.selectList = [
      ...this.selectList,
      index
    ]

    this.setSelected({ key: 'taxCase', data: [
      ...this.taxCase.selected,
      this.taxCase.filters[index]
    ] })
  }
}
</script>


