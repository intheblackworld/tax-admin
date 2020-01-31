<template>
  <v-navigation-drawer fixed :clipped="$vuetify.breakpoint.mdAndUp" app :value="isDrawerOpen">
    <v-list dense>
      <template v-for="item in items">
        <v-list-tile @click="$router.push(`/${item.link}`)" :key="item.title">
          <v-list-tile-action active-class>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from 'vue-property-decorator'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'

const LayoutsModule = namespace('layouts')

@Component
export default class Sidebar extends Vue {
  @Prop(Array) public readonly items!: []
  @LayoutsModule.State('isDrawerOpen') public isDrawerOpen!: boolean
}
</script>

