<template>
  <div>
    <v-tabs v-model="active">
      <v-tab v-for="tab in tabList" :key="tab" ripple>
        <h2>{{tab}}</h2>
      </v-tab>
      <!-- 基本資料 -->
      <v-tab-item>
        <Basic :isForCreate="false"/>
      </v-tab-item>
      <!-- 任職紀錄 -->
      <v-tab-item>
        <v-card flat>
          <!-- 現職工作 -->
          <v-layout mb5 align-center justify-center wrap>
            <v-flex md12>
              <h1 class="text-md-center mb-2 mt-3">現職工作</h1>
            </v-flex>
            <v-flex md12>
              <Table
                :table-options="incumbent.currentJobOptions"
                :items="incumbent.currentJob.data"
              />
            </v-flex>
            <v-flex md12 pl3 pb3>兼職備註：{{incumbent.currentJob.partTimeRemark}}</v-flex>
          </v-layout>
          <!-- 負責人暨安全管理人員任職經歷 -->
          <v-layout mb5 align-center justify-center wrap>
            <v-flex md12>
              <h1 class="text-md-center mb-2 mt-3">負責人暨安全管理人員任職經歷</h1>
            </v-flex>
            <v-flex md12>
              <Table :table-options="incumbent.principalOptions" :items="incumbent.principal"/>
            </v-flex>
          </v-layout>
          <!-- 救護隊任職經歷 -->
          <v-layout mb5 align-center justify-center wrap>
            <v-flex md12>
              <h1 class="text-md-center mb-2 mt-3">救護隊任職經歷</h1>
            </v-flex>
            <v-flex md12>
              <Table :table-options="incumbent.ambulanceOptions" :items="incumbent.ambulance"/>
            </v-flex>
          </v-layout>
          <!-- 爆炸物管理暨爆破專業人員任職紀錄 -->
          <v-layout mb5 align-center justify-center wrap>
            <v-flex md12>
              <h1 class="text-md-center mb-2 mt-3">爆炸物管理暨爆破專業人員任職紀錄</h1>
            </v-flex>
            <v-flex md12>
              <Table :table-options="incumbent.blastingOptions" :items="incumbent.blasting"/>
            </v-flex>
          </v-layout>
          <!-- 作業人員任職紀錄 -->
          <v-layout mb5 align-center justify-center wrap>
            <v-flex md12>
              <h1 class="text-md-center mb-2 mt-3">作業人員任職紀錄</h1>
            </v-flex>
            <v-flex md12>
              <Table :table-options="incumbent.operatorOptions" :items="incumbent.operator"/>
            </v-flex>
          </v-layout>
        </v-card>
      </v-tab-item>
      <!-- 訓練記錄 -->
      <v-tab-item>
        <v-card flat>3</v-card>
      </v-tab-item>
      <!-- 資格証照紀錄 -->
      <v-tab-item>
        <v-card flat>3</v-card>
      </v-tab-item>
      <!-- 獎懲紀錄 -->
      <v-tab-item>
        <v-card flat>3</v-card>
      </v-tab-item>
      <!-- 資料編修紀錄 -->
      <v-tab-item>
        <v-card flat>3</v-card>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'

import {
  educationLevelList,
  mineTypeList,
  positionTitleList,
  positionTrainingList,
  periodList,
  qualificationCategoryList,
  jobAttrTypeList,
  legalBasisTypeList,
} from '@/utils/options'

import Basic from '@/components/Create/Basic.vue'
import Table from '@/components/Table.vue'

// 進階搜尋 - 資格證照篩選
@Component({
  components: {
    Table,
    Basic,
  },
})
export default class User extends Vue {
  get incumbentFileRef() {
    return this.$refs.incumbentFileRef as HTMLElement
  }

  get trainingFileRef() {
    return this.$refs.trainingFileRef as HTMLElement
  }

  get qualificationFileRef() {
    return this.$refs.qualificationFileRef as HTMLElement
  }

  get rewardFileRef() {
    return this.$refs.rewardFileRef as HTMLElement
  }

  get personId() {
    return this.$route.params.personId
  }
  private active = null
  private tabList = [
    '基本資料',
    '任職紀錄',
    '訓練記錄',
    '資格証照紀錄',
    '獎懲紀錄',
    '資料編修紀錄',
  ]
  private rules = {
    required: (value: string) => !!value || '此欄位必填',
  }

  private birthdayMenu = false
  private deathDateMenu = false
  private insuranceDateMenu = false

  // 任職紀錄
  private incumbent = {
    currentJobOptions: {
      columns: [
        {
          title: '任職單位',
          key: 'organization',
        },
        {
          title: '附屬單位',
          key: 'subsidiary',
        },
        {
          title: '職稱',
          key: 'positionTitle',
        },
        {
          title: '任用通過日期',
          key: 'employmentDate',
        },
        {
          title: '任用通過文號/證號',
          key: 'employmentNo',
        },
        {
          title: '備註',
          key: 'remark',
        },
        {
          title: '動作',
          key: 'employeeId',
        },
      ],
      control: 'create,edit,delete',
    },
    principalOptions: {
      columns: [
        {
          title: '任職單位',
          key: 'organization',
        },
        {
          title: '附屬單位',
          key: 'subsidiary',
        },
        {
          title: '職稱',
          key: 'positionTitle',
          transMethod: 'positionTitle',
        },
        {
          title: '任職期間',
          key: 'employmentDate,resignationDate',
        },
        {
          title: '任用通過文號',
          key: 'employmentNo',
        },
        {
          title: '離職通過文號',
          key: 'resignationNo',
        },
        {
          title: '動作',
          key: 'employeeId',
        },
      ],
      control: 'create,edit,delete',
    },
    ambulanceOptions: {
      columns: [
        {
          title: '任職單位',
          key: 'organization',
        },
        {
          title: '附屬單位',
          key: 'subsidiary',
        },
        {
          title: '礦場類別',
          key: 'mineType',
          transMethod: 'mineType',
        },
        {
          title: '職稱',
          key: 'positionTitle',
          transMethod: 'positionTitle',
        },
        {
          title: '任職期間',
          key: 'employmentDate,resignationDate',
        },
        {
          title: '任用通過文號',
          key: 'employmentNo',
        },
        {
          title: '動作',
          key: 'employeeId',
        },
      ],
      control: 'create,edit,delete',
    },
    blastingOptions: {
      columns: [
        {
          title: '任職單位',
          key: 'organization',
        },
        {
          title: '附屬單位',
          key: 'subsidiary',
        },
        {
          title: '工程名稱',
          key: 'projectName',
        },
        {
          title: '庫號',
          key: 'libraryNo',
        },
        {
          title: '職稱',
          key: 'positionTitle',
          transMethod: 'positionTitle',
        },
        {
          title: '證書字號',
          key: 'certificateNo',
        },
        {
          title: '任職期間',
          key: 'employmentDate,resignationDate',
        },
        {
          title: '動作',
          key: 'employeeId',
        },
      ],
      control: 'create,edit,delete',
    },
    operatorOptions: {
      columns: [
        {
          title: '任職單位',
          key: 'organization',
        },
        {
          title: '附屬單位',
          key: 'subsidiary',
        },
        {
          title: '礦場類別',
          key: 'mineType',
          transMethod: 'mineType',
        },
        {
          title: '職別',
          key: 'positionType',
          transMethod: 'positionType',
        },
        {
          title: '任職期間',
          key: 'employmentDate,resignationDate',
        },
        {
          title: '動作',
          key: 'employeeId',
        },
      ],
      control: 'create,edit,delete',
    },
    currentJob: {
      data: [],
      partTimeRemark: '',
    },
    principal: [], // 負責人
    ambulance: [], // 救護人員
    blasting: [], // 爆破人員
    operator: [], // 操作人員
  }

  // 訓練記錄
  private training = {}

  // 資格証照紀錄
  private qualification = {}

  // 獎懲紀錄
  private reward = {}

  // 資料編修紀錄
  private history = {}

  public created() {
    // getExperience(this.personId).then((data) => {
    //   this.incumbent = Object.assign({}, this.incumbent, data)
    // })
  }
}
</script>


