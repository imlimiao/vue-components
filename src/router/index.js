import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import pullRefresh from '@/demo/PullRefresh/PullRefresh'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'pullRefresh',
    component: pullRefresh
  }]
})
