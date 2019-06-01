import Vue from 'vue'
import Router from 'vue-router'
import vote from '@/components/vote'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'vote',
      component: vote
    }
  ]
})
