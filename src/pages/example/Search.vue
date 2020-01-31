<template>
  <div>
    <h3>人員資料搜尋</h3>
    <div v-if="!isResult" class="search-optoin">
      <p>請選擇搜尋條件或輸入關鍵字進行搜尋</p>
      <v-flex v-if="!isAdvance">
        <v-text-field
          flat
          solo-inverted
          prepend-icon="search"
          label="keyword"
          v-model="searchParams.keyword"
          class="hidden-sm-and-down"
          placeholder="請輸入姓名、身分證字號、任職單位、附屬單位、文號、流水號等關鍵字"
        ></v-text-field>
        <TimeRange
          title="任用通過日期"
          :startDate.sync="searchParams.employmentStart"
          :endDate.sync="searchParams.employmentEnd"
        />
        <TimeRange
          title="離職通過日期"
          :startDate.sync="searchParams.resignationStart"
          :endDate.sync="searchParams.resignationEnd"
        />
      </v-flex>
      <v-flex v-else>
        <!-- 任職經歷篩選 -->
        <AdvenceSearchHistory
          :o.sync="searchParams.organization"
          :eNo.sync="searchParams.employmentNo"
          :eStart.sync="searchParams.employmentStart"
          :eEnd.sync="searchParams.employmentEnd"
          :rNo.sync="searchParams.resignationNo"
          :rStart.sync="searchParams.resignationStart"
          :rEnd.sync="searchParams.resignationEnd"
          :p.sync="searchParams.positionTitles"
          :pt.sync="searchParams.positionTypes"
        />
        <!-- 資料證照篩選 -->
        <AdvenceSearchLicense
          :q.sync="searchParams.qualification"
          :qNo.sync="searchParams.qualificationNo"
          :qStart.sync="searchParams.qualificationStart"
          :qEnd.sync="searchParams.qualificationEnd"
        />

        <!-- 訓練經歷篩選 -->
        <AdvenceSearchTraining
          :tType.sync="searchParams.trainingType"
          :tStart.sync="searchParams.trainingStart"
          :tEnd.sync="searchParams.trainingEnd"
        />
        <!-- 處分紀錄篩選 -->
        <AdvenceSearchPunishment
          :pType.sync="searchParams.rewardPunishmentType"
          :lType.sync="searchParams.laws"
          :jType.sync="searchParams.jobType"
          :pNo.sync="searchParams.punishmentNo"
          :pReason.sync="searchParams.punishmentReason"
          :pStart.sync="searchParams.punishmentStart"
          :pEnd.sync="searchParams.punishmentEnd"
        />
      </v-flex>
      <v-btn @click="isAdvance = !isAdvance">進階搜尋設定</v-btn>
      <v-btn @click="search">搜尋</v-btn>
    </div>
    <div v-else class="search-result">
      <v-btn @click="backToSearch">修改搜尋條件</v-btn>
      <Table :table-options="tableOptions" :items="resultData.items"/>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'
import AdvenceSearchHistory from '@/components/AdvenceSearchHistory.vue'
import AdvenceSearchLicense from '@/components/AdvenceSearchLicense.vue'
import AdvenceSearchTraining from '@/components/AdvenceSearchTraining.vue'
import AdvenceSearchPunishment from '@/components/AdvenceSearchPunishment.vue'
import TimeRange from '@/components/TimeRange.vue'
import Table from '@/components/Table.vue'

const UsersModule = namespace('users')

@Component({
  components: {
    TimeRange,
    Table,
    AdvenceSearchHistory, // 任職經歷篩選
    AdvenceSearchLicense, // 資格證照篩選
    AdvenceSearchTraining, // 訓練經歷篩選
    AdvenceSearchPunishment, // 處分紀錄篩選
  },
})
export default class Search extends Vue {
  public isAdvance: boolean = false
  @UsersModule.State('search') public resultData!: {
    items: []
    total: number,
  }
  @UsersModule.Action('search') public searchAction!: (params: object) => {}

  private pageIndex = 0
  private pageSize = 10

  private searchParams = {
    skip: this.pageIndex * this.pageSize, // 跳過幾筆(分頁用)
    take: this.pageSize, // 取用幾筆(分頁用)
    /* 常用搜尋 */
    keyword: '', // 常用搜尋關鍵字

    /* 任職經歷篩選 */
    organization: '', // 任職單位
    employmentNo: '', // 任用通過文號
    employmentStart: '', // 任用通過日期起
    employmentEnd: '', // 任用通過日期訖
    resignationNo: '', // 離職通過文號
    resignationStart: '', // 離職通過日期起
    resignationEnd: '', // 離職通過日期訖
    positionTitles: [], // 職位
    positionTypes: [], // 職別

    /* 資格證照篩選 */
    qualification: 0, // 資格類別 0 = SafeManager 安全管理員 1 = QualificationB 類別B 2 = QualificationC 類別C
    qualificationNo: '', // 證明書字號
    qualificationStart: '', // 發證日起
    qualificationEnd: '', // 發證日訖

    /* 訓練經歷篩選 */
    trainingType: [], // 訓練類別 0 = Ambulance 救護隊 1 = TrainingB 訓練類別2
    trainingStart: '', // 訓練日期起
    trainingEnd: '', // 訓練日期訖

    /* 處分紀錄篩選 */
    rewardPunishmentType: [], // 處分類別
    laws: [],
    jobType: [],
    punishmentNo: '', // 處分文號
    punishmentReason: '', // 處分原因
    punishmentStart: '', // 處分日期起
    punishmentEnd: '', // 處分日期訖
  }

  private isResult = false

  private tableOptions = {
    columns: [
      {
        title: '卡號',
        key: 'cardNo',
      },
      {
        title: '姓名',
        key: 'name',
      },
      {
        title: '身分證字號',
        key: 'personNo',
      },
      {
        title: '職稱',
        key: 'position',
      },
      {
        title: '任職單位',
        key: 'organization',
      },
      {
        title: '附屬單位',
        key: 'subsidiary',
      },
      {
        title: '人員履歷',
        key: 'employeeId',
      },
    ],
    control: 'link', // link | edit | delete, seperate multiple by comma
  }

  public search() {
    this.searchAction({...this.searchParams})
    this.isResult = true
  }

  public backToSearch() {
    this.isResult = false
  }
}
</script>




