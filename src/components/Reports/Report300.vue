<template>
  <div class="report-container">
    <table border="0" cellspacing="1" bgcolor="#999999" width="1100">
      <tr>
        <td colspan="8" align="center" bgcolor="#EEEEEE">
          <font size="3">						
            民國{{year - 1911}}年 {{periodType === 1 ? '1 ~ 6月' : '7 ~ 12月'}}
            礦產權利金徵收額
          </font>
        </td>
      </tr>
      <tr>
        <td align="center" bgcolor="#EEEEEE">礦產品</td>
        <td align="center" bgcolor="#EEEEEE">
          量單位
        </td>
        <td align="center" bgcolor="#EEEEEE">
          平均場交價(元)
        </td>
        <td align="center" bgcolor="#EEEEEE">
          {{periodType === 1 ? '1 ~ 6月生產量' : '7 ~ 12月生產量'}}
        </td>

        <td align="center" bgcolor="#EEEEEE">
          徵收額(元)
        </td>
        <td align="center" bgcolor="#EEEEEE" style="color: red;">
          小計(元)
        </td>
        <td align="center" bgcolor="#EEEEEE">徵收率</td>
      </tr>
      <div v-if="data.collectionPrice.length">
        <tr
          bgcolor="#fff"
          v-for="(item, index) in data.collectionPrice"
          :key="`${index}-${item.mineral}-print`"
        >
          <td align="left">{{item.mineral}}</td>
          <td align="left">{{item.unit}}</td>
          <td align="right">{{item.fieldPrice}}</td>
          <td align="right">{{item.production}}</td>
          <td align="right">{{item.collectionPrice}}</td>
          <!-- 小計 -->
          <!-- 天然氣及石油礦合計及其他兩個合計 -->
          <td v-if="index === 0" align="right" :rowspan="data.collectionPrice.length - 2" style="color: red;">{{data.mineralSum}}</td>
          <td v-if="index === data.collectionPrice.length - 2" align="right" :rowspan="2" style="color: red;">{{data.gasOilSum}}</td>

          <td align="right">{{`${item.rate * 100}%`}}</td>
        </tr>
        <!-- 合計 -->
        <tr
          bgcolor="#fff"
        >
          <td align="left" colspan="4">合計</td>
          <td align="right" style="color: red;">{{data.collectionPriceSum}}</td>
          <td align="right" style="color: red;">{{data.totalSum}}</td>
          <td></td>
        </tr>
      </div>
      <div v-else>
        <td colspan="8" align="center" bgcolor="#EEEEEE">查無資料</td>
      </div>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
@Component
export default class Report300 extends Vue {
  @Prop() public data!: string
  @Prop() public year!: string
  @Prop() public periodType!: number
}
</script>