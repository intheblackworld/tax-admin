<template>
  <div class="report-container">
    <table border="0" cellspacing="1" bgcolor="#999999" width="1100">
      <tr>
        <td colspan="9" align="center" bgcolor="#EEEEEE">
          <font size="3">
            民國{{year - 1911}}年 {{periodType === 1 ? '上期' : '下期'}}
            開徵礦業權費及礦產權利金開徵明細({{periodType === 1 ? `起徵日: 民國${year - 1911}年/4/1` : `起徵日: 民國${year - 1911}年/10/1`}})
          </font>
        </td>
      </tr>
      <tr>
        <td align="center" bgcolor="#EEEEEE">序號</td>
        <td align="center" bgcolor="#EEEEEE">礦區<br />字號</td>
        <td align="center" bgcolor="#EEEEEE">執照<br>字號</td>
        <td align="center" bgcolor="#EEEEEE">礦業權者</td>
        <td align="center" bgcolor="#EEEEEE">礦業<br>權費</td>
        <td align="center" bgcolor="#EEEEEE">礦產<br>權利金</td>
        <td align="center" bgcolor="#EEEEEE">滯納金</td>
        <td align="center" bgcolor="#EEEEEE">利息</td>
        <td align="center" bgcolor="#EEEEEE">應徵額</td>
        <td align="center" bgcolor="#EEEEEE">已繳額</td>
        <td align="center" bgcolor="#EEEEEE">欠繳額</td>
      </tr>
      <div v-if="data.items.length">
        <tr bgcolor="#fff" v-for="(item, index) in data.items" :key="`${index}-${item.areaNo}-print`">
          <td align="right">{{index + 1}}</td>
          <td align="left">{{item.areaNo}}</td>
          <td align="left">{{item.licesenNo}}</td>
          <td align="left">{{item.miningOwner}}</td>
          <td align="right">{{item.mineConcessionFee}}</td>
          <td align="right">{{item.royalty}}</td>
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
          <td align="right">{{data.totalReportPeroid[0].totalMineConcessionFee}}</td>
          <td align="right">{{data.totalReportPeroid[0].totalMineRoyalty}}</td>
          <td align="right">{{data.totalFines}}</td>
          <td align="right">{{data.totalInterest}}</td>
          <td align="right">{{data.totalPrice}}</td>
          <td align="right">{{data.totalActualPay}}</td>
          <td align="right">{{data.totalUnpaidPrice}}</td>
        </tr>
      </div>
      <div v-else>
        <td colspan="9" align="center" bgcolor="#EEEEEE">查無資料</td>
      </div>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
@Component
export default class Report000 extends Vue {
  @Prop() public data!: string
  @Prop() public year!: string
  @Prop() public periodType!: number
}
</script>