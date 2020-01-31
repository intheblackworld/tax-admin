<template>
  <v-toolbar color="Basic" dark app :clipped-left="$vuetify.breakpoint.mdAndUp" fixed>
    <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
      <v-toolbar-side-icon @click.stop="toggleDrawer"></v-toolbar-side-icon>
      <span class="hidden-sm-and-down">規費管理系統</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <span v-if="token" class="hello">您好，{{info.given_name}}</span>
    <v-btn v-if="token" light class="logout" bottom right @click="logout">登出</v-btn>
    <v-btn v-else color class="logout" bottom right @click="login">登入</v-btn>
  </v-toolbar>
</template>

<style lang="scss">
.v-toolbar {
  z-index: 100;
}
.logout {
  top: 0px;
}

.hello {
  color: #fff;
  margin-right: 20px;
}
</style>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'

const LayoutsModule = namespace('layouts')

@Component
export default class Header extends Vue {
  @LayoutsModule.Mutation('toggleDrawer') public toggleDrawer!: () => {}
  @LayoutsModule.Action('logout') public logoutAction!: () => {}

  @LayoutsModule.Action('login') public loginAction!: () => {}
  @LayoutsModule.State('token') public token!: any
  @LayoutsModule.State('info') public info!: any
  public logout = () => {
    this.logoutAction()
  }

  public login = () => {
    this.loginAction()
  }
}
</script>

