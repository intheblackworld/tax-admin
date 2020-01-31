<template>
  <div>
    <h1>開徵管理</h1>
    <v-layout>
      <v-flex class="side">
        <v-navigation-drawer>
          <v-list dense>
            <template v-for="(item) in items">
              <v-list-tile
                @click="pushTo(item.type)"
                :key="item.title"
                :class="`item ${item.type === current ? 'active' : ''}`"
              >
                <v-list-tile-content>
                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
          </v-list>
        </v-navigation-drawer>
      </v-flex>
      <v-flex class="view">
        <router-view></router-view>
      </v-flex>
    </v-layout>
  </div>
</template>

<style lang="scss" scoped>
.side {
  width: 12%;
}

.view {
  width: 88%;
}
.v-list {
  padding-top: 0;
}
.item {
  &.active {
    background: #2196f3;
    color: #fff;
  }
}
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
  private current = -1
  private items = [
    {
      title: '不限',
      type: -1,
    },
    {
      title: '定期開徵案件',
      type: 0,
    },
    {
      title: '個案開徵案件',
      type: 1,
    },
  ]

  public created() {
    // @TODO this.searchAPI
  }

  private pushTo(type: number) {
    this.current = type
    this.$router.push(`?type=${type}`)
  }
}
</script>