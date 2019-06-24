<template>
  <div>
    <h3>新增人員資料</h3>
    <v-stepper v-model="$store.state.users.step" vertical>
      <v-stepper-step :complete="step > 1" step="1">基本資料</v-stepper-step>

      <v-stepper-content step="1">
        <Basic/>
      </v-stepper-content>

      <v-stepper-step :complete="step > 2" step="2">現職與任職經歷</v-stepper-step>

      <v-stepper-content step="2">
        <Incumbent/>
      </v-stepper-content>

      <v-stepper-step :complete="step > 3" step="3">訓練經歷</v-stepper-step>

      <v-stepper-content step="3">
        <Training/>
      </v-stepper-content>

      <v-stepper-step step="4">資格證照</v-stepper-step>
      <v-stepper-content step="4">
        <Qualification/>
      </v-stepper-content>

      <v-stepper-step step="5">獎懲紀錄</v-stepper-step>
      <v-stepper-content step="5">
        <Reward :submit="submit"/>
      </v-stepper-content>
    </v-stepper>
  </div>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'
import TimeRange from '@/components/TimeRange.vue'
import Basic from '@/components/Create/Basic.vue'
import Incumbent from '@/components/Create/Incumbent.vue'
import Training from '@/components/Create/Training.vue'
import Qualification from '@/components/Create/Qualification.vue'
import Reward from '@/components/Create/Reward.vue'
import { VForm } from '@/type'

const UsersModule = namespace('users')

@Component({
  components: {
    TimeRange,
    Basic,
    Incumbent,
    Training,
    Qualification,
    Reward,
  },
})
export default class Create extends Vue {
  @UsersModule.State('step') public step!: number
  @UsersModule.State('basic') public basic!: object
  @UsersModule.State('incumbents') public incumbents!: object
  @UsersModule.State('trainings') public trainings!: object
  @UsersModule.State('qualifications') public qualifications!: object
  @UsersModule.State('rewards') public rewards!: object

  @UsersModule.Action('create') public createPerson!: (params: object) => {}

  public submit() {
    // 送出資料
    this.createPerson({
      basic: this.basic,
      incumbents: this.incumbents,
      trainings: this.trainings,
      qualifications: this.qualifications,
      rewards: this.rewards,
    })
  }
}
</script>