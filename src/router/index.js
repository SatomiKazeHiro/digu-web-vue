import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

let Home = () => import('views/Home.vue');
let About = () => import('views/About.vue');

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
