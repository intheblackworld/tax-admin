import Vue from 'vue'
import Vuetify, { VApp, VLayout, VFlex, VImg } from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  iconfont: 'md',
  VApp,
  VLayout,
  VFlex,
  VImg,
  theme: {
    CopyRight: '#35ffbf',
    Basic: '#3d485a',
  },
})