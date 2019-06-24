<template>
  <v-toolbar color="blue darken-3" dark app :clipped-left="$vuetify.breakpoint.mdAndUp" fixed>
    <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
      <v-toolbar-side-icon @click.stop="toggleDrawer"></v-toolbar-side-icon>
      <span class="hidden-sm-and-down">規費管理系統</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <div>您好</div>
    <v-menu bottom left>
      <template v-slot:activator="{ on }">
        <v-btn dark icon v-on="on">
          <v-icon>settings</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-tile @click="logout">
          <v-list-tile-title>登出</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </v-toolbar>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'

const LayoutsModule = namespace('layouts')

@Component
export default class Header extends Vue {
  @LayoutsModule.Mutation('toggleDrawer') public toggleDrawer!: () => {}
  @LayoutsModule.Action('logout') public logoutAction!: () => {}

  public logout = () => {
    this.logoutAction()
  }
}
</script>

