<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="items"
      class
      no-data-text="查無結果"
      rows-per-page-text="每頁資料筆數"
      :rows-per-page-items="rowsPerPageItems"
    >
      <template v-slot:items="props">
        <td
          v-show="column.key !== 'employeeId'"
          class="text-xs-center"
          v-for="(column, index) in tableOptions.columns"
          :key="`${column.key}-${index}`"
        >{{handleDataValue(column, props)}}</td>

        <!-- <td v-if="tableOptions.control === 'link'" class="text-xs-center">
        <v-icon @click="enterProfile(props.item.employeeId)">account_circle</v-icon>
        </td>-->
        <td v-if="tableOptions.control" class="text-xs-center">
          <v-icon
            v-for="(action, index) in tableOptions.control.split(',')"
            :key="`${props}-${action}-${index}`"
            v-show="action === 'edit'"
            @click="editDialog(props.item.employeeId)"
          >edit</v-icon>
          <v-icon
            v-for="(action, index) in tableOptions.control.split(',')"
            :key="`${action}-${index}`"
            v-show="action === 'link'"
            @click="enterProfile(props.item.employeeId)"
          >account_circle</v-icon>
          <v-icon
            v-for="(action, index) in tableOptions.control.split(',')"
            :key="`${action}-${index}`"
            v-show="action === 'delete'"
            @click="deleteProfile(props.item.employeeId)"
          >delete</v-icon>
        </td>
      </template>
    </v-data-table>
    <v-layout
      v-if="tableOptions.control.includes('create')"
      justify-end
      align-center
    >
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
import { formatDate } from '@/utils/methods'
// import { getPositionType, getPositionTitle, getMineType } from '@/http/apis'

const LayoutsModule = namespace('layouts')

@Component
export default class Table extends Vue {
  @LayoutsModule.State('options') public options!: {
    positionType: Array<{ text: string }>
    positionTitle: Array<{ text: string }>
    mineType: Array<{ text: string }>,
  }
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

  private isEdit = false
  private isCreate = false
  private formatDate = formatDate

  public enterProfile(personId: string) {
    this.$router.push(`user/${personId}`)
  }

  public editDialog() {
    this.isEdit = true
  }

  public createProfile() {
    this.isCreate = true
  }

  public deleteProfile(personId: string) {}

  public handleDataValue(column: { key: string }, props: { item: any }) {
    let value
    if (column.key.includes(',')) {
      value = `${formatDate(
        props.item[column.key.split(',')[1]],
      )} ~ ${formatDate(props.item[column.key.split(',')[1]])}`
    } else {
      if (column.key.includes('Date')) {
        value = formatDate(props.item[column.key])
      } else {
        switch (column.key) {
          case 'positionType':
            value = this.options.positionType[props.item[column.key]].text
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


