import Vue from 'vue'
import Router from 'vue-router'
import vote from '@/components/vote'
import voteOld from '@/components/voteOld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'vote',
      component: vote
    },
    {
      path: '/voteOld',
      name: 'voteOld',
      component: voteOld
    }
  ]
})
