<template>
  <div class="report-container">
    <table border="0" cellspacing="1" bgcolor="#999999" width="1100">
      <tr>
        <td :colspan="4 + data.items[0].reportPeroidTax.length * 2 + 5" align="center" bgcolor="#EEEEEE">
          <font size="3">
            民國{{year - 1911}}年 {{periodType === 1 ? '上期' : '下期'}}
            開徵礦業權費及礦產權利金欠繳明細
          </font>
        </td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td
          v-for="(period, index) in data.items[0].reportPeroidTax"
          colspan="2"
          align="center"
          bgcolor="#EEEEEE"
          :key="`${index}-${period.periodName}-period`"
        >{{period.periodName}}</td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td align="center" bgcolor="#EEEEEE">序號</td>
        <td align="center" bgcolor="#EEEEEE">
          礦區
          <br />字號
        </td>
        <td align="center" bgcolor="#EEEEEE">
          執照
          <br />字號
        </td>
        <td align="center" bgcolor="#EEEEEE">礦業權者</td>
        <!-- 四期 -->
        <div
          v-for="(period, index) in data.items[0].reportPeroidTax"
          :key="`${index}-${period}-period-th`"
        >
          <td align="center" bgcolor="#EEEEEE">
            礦業
            <br />權費
          </td>
          <td align="center" bgcolor="#EEEEEE">
            礦產
            <br />權利金
          </td>
        </div>

        <td align="center" bgcolor="#EEEEEE">滯納金</td>
        <td align="center" bgcolor="#EEEEEE">利息</td>
        <td align="center" bgcolor="#EEEEEE">應徵額</td>
        <td align="center" bgcolor="#EEEEEE">已繳額</td>
        <td align="center" bgcolor="#EEEEEE">欠繳額</td>
      </tr>
      <div v-if="data.items.length">
        <tr
          bgcolor="#fff"
          v-for="(item, index) in data.items"
          :key="`${index}-${item.areaNo}-print`"
        >
          <td align="right">{{index + 1}}</td>
          <td align="right">{{item.areaNo}}</td>
          <td align="right">{{item.licesenNo}}</td>
          <td align="right">{{item.miningOwner}}</td>
          <!-- 四期別 權費 權利金-->
          <div
            v-for="(period, index) in item.reportPeroidTax"
            :key="`${index}-${period.periodName}-period-td`"
          >
            <td align="right">{{period.mineConcessionFee}}</td>
            <td align="right">{{period.royalty}}</td>
          </div>
          
          <td align="right">{{item.fines}}</td>
          <td align="right">{{item.interest}}</td>
          <td align="right">{{item.totalPrice}}</td>
          <td align="right">{{item.actualPay}}</td>
          <td align="right">{{item.unpaidPrice}}</td>
        </tr>
        <tr bgcolor="#fff">
          <td align="right">總計</td>
          <td align="left"></td>
          <td align="left"></td>
          <td align="left"></td>

          <div
            v-for="(period, index) in data.totalReportPeroid"
            :key="`${index}-${period.periodName}-total-period-td`"
          >
            <td align="right">{{period.totalMineConcessionFee}}</td>
            <td align="right">{{period.totalMineRoyalty}}</td>
          </div>

          <td align="right">{{data.totalFines}}</td>
          <td align="right">{{data.totalInterest}}</td>
          <td align="right">{{data.totalPrice}}</td>
          <td align="right">{{data.totalActualPay}}</td>
          <td align="right">{{data.totalUnpaidPrice}}</td>
        </tr>
      </div>
      <div v-else>
        <td :colspan="4 + data.items[0].reportPeroidTax.length * 2 + 5" align="center" bgcolor="#EEEEEE">查無資料</td>
      </div>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
@Component
export default class Report202 extends Vue {
  @Prop() public data!: string
  @Prop() public year!: string
  @Prop() public periodType!: number
}
</script>