<template>
  <div id="app">
    <v-app id="inspire">
      <Sidebar :items="items"/>
      <Header :handleDrawer="() => drawer = !drawer"/>
      <v-content>
        <v-container>
          <router-view></router-view>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'
import Header from '@/layouts/Header.vue'
import Sidebar from '@/layouts/Sidebar.vue'

const LayoutsModule = namespace('layouts')

@Component({
  components: {
    Header,
    Sidebar,
  },
})
export default class App extends Vue {
  // @LayoutsModule.State('options') public options!: {
  //   positionType: []
  //   positionTitle: []
  //   mineType: [],
  // }
  @LayoutsModule.State('token') public token!: string
  // @LayoutsModule.Action('getPositionType') public getPositionType!: () => {}
  private items = [
    { title: '期別管理', icon: 'home', link: '' },
    { title: '開徵作業', icon: 'search', link: 'operation' },
    { title: '開徵管理', icon: 'contacts', link: 'manage/default' },
    { title: '礦場開徵作業履歷', icon: 'contacts', link: 'history' },
    { title: '開立通知單紀錄', icon: 'contacts', link: 'notice' },
  ]
  public created() {
    // this.options.positionType && this.getPositionType()
  }
}
</script>
