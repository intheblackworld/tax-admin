<template>
  <div>
    <v-card color="gray-3" class="mb-2 pl-2 pt-3">
      <v-layout align-center>
        <v-flex md2>
          <h3>選擇礦業權者</h3>
        </v-flex>
      </v-layout>
    </v-card>
  </div>
</template>

<style lang="sass" scoped>

</style>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'
import { mixins } from 'vue-class-component'
import { VForm } from '@/type'
import CreateMixin from '@/mixins/CreateMixin'

const TaxsModule = namespace('taxs')

@Component
export default class PeriodForm extends mixins(CreateMixin) {
  get periodForm(): VForm {
    return this.$refs.periodForm as VForm
  }
}
</script>


