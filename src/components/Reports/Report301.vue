<template>
  <div class="report-container">
    <table border="0" cellspacing="1" bgcolor="#999999" width="1100">
      <tr>
        <td colspan="8" align="center" bgcolor="#EEEEEE">
          <font size="3">						
            民國{{year - 1911}}年 {{periodType === 1 ? '上期' : '下期'}}
            各礦產品平均場交單價
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
      </tr>
      <div v-if="data.fieldPrice.length">
        <tr
          bgcolor="#fff"
          v-for="(item, index) in data.fieldPrice"
          :key="`${index}-${item.mineral}-print`"
        >
          <td align="left">{{item.mineral}}</td>
          <td align="left">{{item.unit}}</td>
          <td align="right">{{item.fieldPrice}}</td>
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
export default class Report301 extends Vue {
  @Prop() public data!: string
  @Prop() public year!: string
  @Prop() public periodType!: number
}
</script>