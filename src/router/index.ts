import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Generator from '../views/Generator.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Generator',
    component: Generator
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
