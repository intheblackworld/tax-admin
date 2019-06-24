<template>
  <div>
    <v-flex xs12 sm6 md4>
      {{ title }}
      <v-menu
        v-model="startMenu"
        :close-on-content-click="false"
        :nudge-right="40"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="startDate"
            label="起"
            prepend-icon="event"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="startDate"
          @input="startMenu = false;"
          locale="zh-cn"
        ></v-date-picker>
      </v-menu>
    </v-flex>
    <v-flex xs12 sm6 md4>
      <v-menu
        v-model="endMenu"
        :close-on-content-click="false"
        :nudge-right="40"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field v-model="endDate" label="迄" prepend-icon="event" readonly v-on="on"></v-text-field>
        </template>
        <v-date-picker v-model="endDate" @input="endMenu = false" locale="zh-cn"></v-date-picker>
      </v-menu>
    </v-flex>
  </div>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'

@Component
export default class TimeRange extends Vue {
  @Prop(String) public readonly title!: ''
  public startDate = ''
  public endDate = ''
  private startMenu = false
  private endMenu = false

  @Watch('startDate')
  public onChangeStartDate(val: string) {
    this.$emit('update:startDate', val)
  }
  @Watch('endDate')
  public onChangeEndDate(val: string) {
    this.$emit('update:endDate', val)
  }
}
</script>


