<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="items"
      class
      no-data-text="查無結果"
      rows-per-page-text="每頁資料筆數"
      :rows-per-page-items="take ? take : rowsPerPageItems"
    >
      <template v-slot:items="props">
        <td
          v-show="column.key !== `${name}Id`"
          class="text-xs-center"
          v-for="(column, index) in tableOptions.columns"
          :key="`${column.key}-${index}`"
        >
          <span v-if="isEdit && (props.item[`${name}Id`] === currentId)">
            <v-select
              v-if="column.key === 'periodType'"
              :items="[{ text: '上期', value: 1,}, { text: '下期', value: 2,}]"
              label="期別"
              solo
              v-model="currentSendData[column.key]"
            ></v-select>
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
            v-if="isEdit && (props.item[`${name}Id`] === currentId)"
          >完成</v-btn>
          <v-icon
            v-for="(action) in tableOptions.control.split(',')"
            :key="`${props}-${action}-${1}`"
            v-show="action === 'edit' && (props.item[`${name}Id`] !== currentId)"
            @click="changeEditMode(props.item[`${name}Id`])"
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
            @click="deleteProfile(props.item[`${name}Id`])"
          >delete</v-icon>
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
import { createPeriod, getPeriods } from '@/http/apis'
// import { getPositionType, getPositionTitle, getMineType } from '@/http/apis'

const LayoutsModule = namespace('layouts')

@Component
export default class Table extends Vue {
  @LayoutsModule.State('options') public options!: {
    positionType: Array<{ text: string }>
    positionTitle: Array<{ text: string }>
    mineType: Array<{ text: string }>
  }

  @Prop() public name!: string
  @Prop() public take!: number[]
  get headers() {
    return this.tableOptions.columns.map(option => ({
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
      transMethod: string
    }>
    control: string
  }

  @Prop(Array) public items!: Array<{}>

  private isEdit = false
  private isCreate = false
  private currentId = ''
  private formatDate = formatDate
  private currentSendData = {}

  public enterProfile(personId: string) {
    this.$router.push(`user/${personId}`)
  }

  public changeEditMode(id: string) {
    this.currentId = id
    const reqData = _.find(this.items, { [`${this.name}Id`]: id })
    this.currentSendData = <any>reqData
    this.isEdit = true
  }

  public createProfile() {
    this.isCreate = true
  }

  private updateRow(id: string) {
    createPeriod(this.currentSendData).then(() => {
      this.$emit('updateData')
      this.isEdit = false
    })
  }

  public deleteProfile(personId: string) {}

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
            let periodTypeOptions = [{ text: '上期', value: 1,}, { text: '下期', value: 2,}]
            value = periodTypeOptions[props.item[column.key] - 1].text
            break
          case 'mineType':
            value = this.options.mineType[props.item[column.key]].text
            break
          case 'positionTitle':
            value = this.options.positionTitle[props.item[column.key]].text
            break
          default:
            value = props.item[column.key]
            break
        }
      }
    }

    return value
  }
}
</script>


