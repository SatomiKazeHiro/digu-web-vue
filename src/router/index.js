import Vue from 'vue'
import VueRouter from 'vue-router'

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

let Index = () => import('views/Index.vue');
let Area = () => import('views/index/Area.vue');
let Category = () => import('views/index/Category.vue');
let Media = () => import('views/index/Media.vue');
let Play = () => import('views/index/Play.vue');
let Chapter = () => import('views/index/Chapter.vue');

let Space = () => import('views/Space.vue');
let Setting = () => import('views/space/Setting.vue');
let Manage = () => import('views/space/Manage.vue');

let Error = () => import('views/Error.vue');

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/space',
    name: 'Space',
    component: Space,
    children: [
      {
        path: 'manage',
        name: 'Manage',
        component: Manage,
      },
      {
        path: 'setting',
        name: 'Setting',
        component: Setting,
      },
    ]
  },
  {
    path: '/:area',
    name: 'Area',
    component: Area,
    children: [
      {
        path: ':category',
        component: Category,
        children: [
          {
            path: ':item',
            component: Media,
            children: [
              {
                path: 'play',
                component: Play,
              },
              {
                path: 's/:chapter',
                component: Chapter,
              }
            ]
          },
        ]
      }
    ]
  },
  {
    path: '/404',
    name: 'error',
    component: Error,
  },
  {
    path: '*',
    redirect: '/404'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

let area = ["manga", "anime"]

router.beforeEach((to, from, next) => {
  // 判断是否跳转至area
  if (to.params.area)
    if (area.includes(to.params.area))
      // 当area正确的时候继续，否则跳转至404
      next();
    else next({ name: "error" });
  else next();
})

export default router
