import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

let Index = () => import('views/Index.vue');
let Anime = () => import('views/Anime.vue');
let Manga = () => import('views/Manga.vue');
let Area = () => import('views/Area.vue');
let Category = () => import('views/Category.vue');
let Media = () => import('views/Media.vue');
let Play = () => import('views/Play.vue');
let Space = () => import('views/Space.vue');
let Setting = () => import('views/Setting.vue');
let Config = () => import('views/Config.vue');
let Manage = () => import('views/Manage.vue');
let Chapter = () => import('views/Chapter.vue');
let Error = () => import('views/Error.vue');


const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  // {
  //   path: '/anime',
  //   name: 'Anime',
  //   component: Anime,
  // },
  // {
  //   path: '/manga',
  //   name: 'Manga',
  //   component: Manga,
  // },
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
      {
        path: 'config',
        name: 'Config',
        component: Config,
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
