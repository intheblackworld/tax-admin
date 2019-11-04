<template>
  <div>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="items"
      class="elevation-1"
      :select-all="canSelect"
      :item-key="itemKey"
      no-data-text="查無結果"
      rows-per-page-text="每頁資料筆數"
      :rows-per-page-items="take ? take : rowsPerPageItems"
    >
      <template v-slot:items="props">
        <td v-if="canSelect">
          <v-layout align-center>
            {{log(props, props.selected)}}
            <v-checkbox v-model="props.selected" primary hide-details></v-checkbox>
            <v-icon v-if="props.item.payStatus === 2" color="rgba(150, 40, 27, 1)">warning</v-icon>
          </v-layout>
        </td>
        <td
          v-show="column.key !== `${actionKey}Id`"
          class="text-xs-center"
          v-for="(column, index) in tableOptions.columns"
          :key="`${column.key}-${index}`"
        >
          <span v-if="isEdit && (props.index === currentIndex)">
            <v-select
              v-if="column.key === 'periodType'"
              :items="[{ text: '上期', value: 1,}, { text: '下期', value: 2,}]"
              label="期別"
              solo
              v-model="currentSendData[column.key]"
            ></v-select>
            <span v-else-if="column.key === 'mineStatus'">{{props.item.mineStatus}}</span>
            <span v-else-if="column.key === 'unpaidPrice'">{{props.item.unpaidPrice}}</span>
            
            <v-text-field v-else v-model="currentSendData[column.key]" label></v-text-field>
          </span>
          <span v-else>{{handleDataValue(column, props)}}</span>
        </td>

        <!-- <td v-if="tableOptions.control === 'link'" class="text-xs-center">
        <v-icon @click="enterProfile(props.item.employeeId)">account_circle</v-icon>
        </td>-->
        <td v-if="tableOptions.control" class="text-xs-center">
          <v-btn
            @click="updateRow(props.item[`${name}Id`])"
            v-if="isEdit && (props.index === currentIndex)"
          >完成</v-btn>
          <span v-if="tableOptions.control === 'multiple'" style="width: 150px;display:block;">
            <!-- pay all -->
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon @click="payAll(props.item)" v-on="on">money_off</v-icon>
              </template>
              <span>結清</span>
            </v-tooltip>
            <!-- pay custom -->
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon @click="payCustom(props.item)" v-on="on">attach_money</v-icon>
              </template>
              <span>登錄繳納紀錄</span>
            </v-tooltip>
            <!-- edit -->
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon @click="changeEditMode(props.item[`${name}Id`], props.index)" v-on="on">edit</v-icon>
              </template>
              <span>編輯</span>
            </v-tooltip>
            <!-- go history -->
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon v-on="on" @click="$router.push(`/history?areaNo=${props.item.areaNo}`)">format_list_bulleted</v-icon>
              </template>
              <span>歷史繳費記錄</span>
            </v-tooltip>
            
            <!-- payment -->
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon v-on="on" @click="showPayment(props.item)">credit_card</v-icon>
              </template>
              <span>催繳通知</span>
            </v-tooltip>
            
          </span>
          <v-icon
            v-for="(action) in tableOptions.control.split(',')"
            :key="`${props}-${action}-${1}`"
            v-show="action === 'edit' && (props.index !== currentIndex || !isEdit)"
            @click="changeEditMode(props.item[`${name}Id`], props.index)"
          >edit</v-icon>
          <v-icon
            v-for="(action) in tableOptions.control.split(',')"
            :key="`${action}-${2}`"
            v-show="action === 'link'"
            @click="enterProfile(props.item[`${name}Id`])"
          >account_circle</v-icon>
          <v-icon
            v-for="(action) in tableOptions.control.split(',')"
            :key="`${action}-${3}`"
            v-show="action === 'delete'"
            @click="deleteRow(name === 'tax' ? props.index : props.item[`${name}Id`])"
          >delete</v-icon>
          <v-icon
            v-for="(action) in tableOptions.control.split(',')"
            :key="`${props}-${action}-${4}`"
            v-show="action === 'detail'"
            @click="showDialog(props.item, props.index)"
          >format_list_bulleted</v-icon>
        </td>
      </template>
    </v-data-table>
    <v-layout v-if="tableOptions.control.includes('create')" justify-end align-center>
      新增一筆資料
      <v-icon @click="createProfile(props.item.employeeId)">add</v-icon>
    </v-layout>
  </div>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'
import _ from 'lodash'
import { formatDate } from '@/utils/methods'
import { createPeriod, getPeriods, createTaxManage } from '@/http/apis'
// import { getPositionType, getPositionTitle, getMineType } from '@/http/apis'

const TaxsModule = namespace('taxs')

@Component
export default class Table extends Vue {
  @Prop() public name!: string
  @Prop() public case!: string
  @Prop() public itemKey!: string // 表格checkbox 判斷狀態用
  @Prop() public take!: number[]
  get headers() {
    return this.tableOptions.columns.map((option) => ({
      text: option.title,
      align: 'center',
      value: option.key,
      transMethod: option.transMethod,
      sortable: option.sortable || false,
    }))
  }
  public rowsPerPageItems = [10]

  @Prop(Object) public tableOptions!: {
    columns: Array<{
      title: string
      key: string
      sortable: boolean
      control: string
      transMethod: string,
    }>
    control: string,
  }

  @Prop(Array) public items!: Array<{}>
  @Prop(Boolean) public canSelect!: boolean

  @TaxsModule.State('taxList') public taxList!: {
    items: []
    total: number
    selected: [],
  }

  @TaxsModule.State('taxManage') public taxManage!: {
    items: []
    total: number
    selected: [],
  }

  @TaxsModule.State('taxUnpaidList') public taxUnpaidList!: {
    items: []
    total: number,
  }

  @TaxsModule.Mutation('setSelected') public setSelected!: (value: {}) => {}

  // 連動表格的勾選跟全局狀態的資料
  get selected() {
    interface IParams {
      [key: string]: any
    }
    if (this.canSelect) {
      return (this as IParams)[`${this.name}${this.case}`].selected
    } else {
      return []
    }
  }
  // 連動表格的勾選跟全局狀態的資料
  set selected(value) {
    this.setSelected({ key: `${this.name}${this.case}`, data: value })
  }

  get actionKey() {
    return this.name.replace('Unpaid', '')
  }

  private isEdit = false
  private isCreate = false
  private currentIndex: number | null = null
  private formatDate = formatDate
  private currentSendData = {}

  public enterProfile(personId: string) {
    this.$router.push(`user/${personId}`)
  }

  public changeEditMode(id: string, index: number) {
    this.currentIndex = index
    this.isEdit = true
    const reqData = this.items[index]
    this.currentSendData = reqData as any
  }

  public createProfile() {
    this.isCreate = true
  }

  public deleteRow(id: string) {
    this.$emit('deleteRow', id)
  }

  public showDialog(object: any) {
    let id = object.mineAreaId
    if (!id) {
      id = object.number
    }
    this.$emit('showDialog', id)
  }

  public handleDataValue(column: { key: string }, props: { item: any }) {
    let value
    if (column.key.includes(',')) {
      if (props.item[column.key.split(',')[0]]) {
        value = `${formatDate(
          props.item[column.key.split(',')[0]],
        )} ~ ${formatDate(props.item[column.key.split(',')[1]])}`
      } else {
        value = ''
      }
    } else {
      if (column.key.includes('Date')) {
        if (props.item[column.key]) {
          value = formatDate(props.item[column.key])
        } else {
          value = ''
        }
      } else {
        switch (column.key) {
          case 'periodType':
            const periodTypeOptions = [
              { text: '上期', value: 1 },
              { text: '下期', value: 2 },
            ]
            value = periodTypeOptions[props.item[column.key] - 1].text
            break
          case 'hasPaidPrice':
            value = props.item.totalPrice - props.item.unpaidPrice
            break
          default:
            value = props.item[column.key]
            break
        }
      }
    }

    return value
  }
  private payAll(data: any) {
    this.$emit('payAll', data)
  }

  private payCustom(data: any) {
    this.$emit('payCustom', data)
  }
  private showPayment(data: any) {
    this.$emit('showPayment', data)
  }

  private log = (val: any, val2: any) => {
    // console.log(val, val2)
  }

  private updateRow(id: string) {
    // 有 id 代表直接在表格內編輯資料之後，完成就向後端丟資料(ex. 期別管理)
    // 無 id 代表還要整理資料再一併送出(ex. 開徵作業)
    if (id) {
      if (this.name === 'period') {
        createPeriod(this.currentSendData).then(() => {
          this.$emit('updateData')
          this.isEdit = false
        })
      }
      if (this.name === 'tax') {
        createTaxManage(this.currentSendData).then(() => {
          this.$emit('updateData')
          this.isEdit = false
        })
      }
    } else {
      this.isEdit = false
    }
  }
}
</script>


