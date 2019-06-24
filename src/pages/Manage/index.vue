<template>
  <div>
    <v-card color="lighten-1" class="mb-2 pl-2">
      <v-layout align-center>
        <v-flex md2>
          <h3>開徵作業</h3>
        </v-flex>
      </v-layout>
    </v-card>
    <v-layout>
      <v-flex md4>
        <v-navigation-drawer>
          <v-list dense>
            <template v-for="item in items">
              <v-list-tile @click="$router.push(`/${item.link}`)" :key="item.title">
                <v-list-tile-content>
                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
          </v-list>
        </v-navigation-drawer>
      </v-flex>
      <v-flex md8>
        <router-view></router-view>
      </v-flex>
    </v-layout>
  </div>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'
import TimeRange from '@/components/TimeRange.vue'
import TaxForm from '@/components/TaxForm.vue'
import Table from '@/components/Table.vue'
import { VForm } from '@/type'

const TaxsModule = namespace('taxs')

@Component({
  components: {
    TimeRange,
    Table,
  },
})
export default class Manage extends Vue {
  // @UsersModule.State('step') public step!: number

  private items = [
    {
      title: '不限',
      link: 'manage/default',
    },
    {
      title: '定期開徵案件',
      link: 'manage/period',
    },
    {
      title: '個案開徵案件',
      link: 'manage/custom',
    },
  ]

  created() {
    // @TODO this.searchAPI
  }
}
</script>