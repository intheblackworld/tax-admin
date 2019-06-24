import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home', // 期別管理
      // route level code-splitting
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "home" */ '@/pages/Home.vue'),
    },
    {
      path: '/operation',
      name: 'operation', // 開徵作業
      // route level code-splitting
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "operation" */ '@/pages/Operation.vue'),
    },
    {
      path: '/manage',
      name: 'manage', // 開徵管理
      // route level code-splitting
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "manage" */ '@/pages/Manage/index.vue'),
      children: [
        {
          path: 'default',
          component: () =>
            import(/* webpackChunkName: "manage" */ '@/pages/Manage/default.vue'),
        },
        {
          path: 'period',
          component: () =>
            import(/* webpackChunkName: "manage" */ '@/pages/Manage/period.vue'),
        },
        {
          path: 'custom',
          component: () =>
            import(/* webpackChunkName: "manage" */ '@/pages/Manage/custom.vue'),
        },
      ],
    },
    {
      path: '/history',
      name: 'history', // 礦場開徵作業履歷
      // route level code-splitting
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "history" */ '@/pages/History.vue'),
    },
    {
      path: '/notice',
      name: 'notice', // 開立通知單紀錄
      // route level code-splitting
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "notice" */ '@/pages/Notice.vue'),
    },
  ],
})
