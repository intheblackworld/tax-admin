<template>
    <div id="app">
        <v-app id="inspire">
            <Sidebar :items="items" />
            <Header :handleDrawer="() => drawer = !drawer" />
            <v-content>
                <v-container>
                    <router-view></router-view>
                </v-container>
            </v-content>
            <v-footer color="Basic"
                      app>
                <span class="CopyRight--text">&copy; &nbsp;</span> <span class="white--text foot-text">2019</span>
                <v-layout>
                    <v-flex offset-lg11>
                        <!-- <WebLinker></WebLinker> -->
                    </v-flex>
                </v-layout>
            </v-footer>
        </v-app>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'
import Header from '@/layouts/Header.vue'
import Sidebar from '@/layouts/Sidebar.vue'
import WebLinker from '@/plugins/WebLinker.vue'


const LayoutsModule = namespace('layouts')

@Component({
  components: {
    Header,
    Sidebar,
    WebLinker,
  },
})
export default class App extends Vue {
  // @LayoutsModule.State('options') public options!: {
  //   positionType: []
  //   positionTitle: []
  //   mineType: [],
  // }
  @LayoutsModule.State('token') public token!: string
  @LayoutsModule.Action('login') public login!: () => {}
  // @LayoutsModule.Action('getPositionType') public getPositionType!: () => {}
  private items = [
    { title: '期別管理', icon: 'home', link: '' },
    { title: '開徵作業', icon: 'search', link: 'operation' },
    { title: '開徵管理', icon: 'book', link: 'manage/default' },
    { title: '礦區開徵作業履歷', icon: 'list', link: 'history' },
    { title: '開立通知單紀錄', icon: 'contacts', link: 'notice' },
    { title: '報表列印', icon: 'print', link: 'report' },
  ]
  public created() {
    // this.options.positionType && this.getPositionType()
    if (!this.token) {
      this.login()
    }
  }
}
</script>
