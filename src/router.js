import Vue from 'vue'
import Router from 'vue-router'
import Recommend from 'views/Recommend.vue'
import Disc from 'views/Disc.vue'
import Singer from 'views/Singer.vue'
import SingerDetail from 'views/SingerDetail.vue'
import Rank from 'views/Rank.vue'
import RankDetail from 'views/RankDetail.vue'
import Search from 'views/Search.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  linkActiveClass: 'active',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      name: 'recommend',
      component: Recommend,
      children: [
        {
          path: ':id',
          name: 'disc',
          component: Disc
        }
      ]
    },
    {
      path: '/singer',
      name: 'singer',
      component: Singer,
      children: [
        {
          path: ':id',
          name: 'singerdetail',
          component: SingerDetail
        }
      ]
    },
    {
      path: '/rank',
      name: 'rank',
      component: Rank,
      children: [
        {
          path: ':id',
          name: 'rankdetail',
          component: RankDetail
        }
      ]
    },
    {
      path: '/search',
      name: 'search',
      component: Search,
      children: [
        {
          path: ':id',
          name: 'singerdetail',
          component: SingerDetail
        }
      ]
    }
  ]
})
