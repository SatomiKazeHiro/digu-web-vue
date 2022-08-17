import Vue from "vue";
import VueRouter from "vue-router";

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch((err) => err);
};

Vue.use(VueRouter);

let Web = () => import("views/Web.vue");
let Area = () => import("views/web/Area.vue");
let Category = () => import("views/web/Category.vue");
let Media = () => import("views/web/Media.vue");
let Play = () => import("views/web/Play.vue");
let Chapter = () => import("views/web/Chapter.vue");

let Space = () => import("views/Space.vue");
let User = () => import("views/space/User.vue");
let History = () => import("views/space/History.vue");
let Favlist = () => import("views/space/Favlist.vue");
let Watchlater = () => import("views/space/Watchlater.vue");
let Manage = () => import("views/space/Manage.vue");
let Setting = () => import("views/space/Setting.vue");

let ErrorPage = () => import("views/ErrorPage.vue");

const routes = [
  {
    path: "/",
    name: "Web",
    component: Web,
  },
  {
    path: "/",
    name: "Test",
    component: () => import("views/Test.vue"),
  },
  {
    path: "/space",
    name: "Space",
    component: Space,
    children: [
      {
        path: "user",
        name: "User",
        component: User,
      },
      {
        path: "history",
        name: "History",
        component: History,
      },
      {
        path: "favlist",
        name: "Favlist",
        component: Favlist,
      },
      {
        path: "watchlater",
        name: "Watchlater",
        component: Watchlater,
      },
      {
        path: "manage",
        name: "Manage",
        component: Manage,
      },
      {
        path: "setting",
        name: "Setting",
        component: Setting,
      },
      {
        path: "*",
        redirect: "/404",
      },
    ],
  },
  {
    path: "/404",
    name: "error",
    component: ErrorPage,
  },
  {
    path: "/:area",
    name: "Area",
    component: Area,
    // redirect: "/:area/all",
    children: [
      {
        path: ":category",
        name: "category",
        component: Category,
      },
    ],
  },
  {
    path: "/:area/:category/:item",
    component: Media,
  },
  {
    path: "/:area/:category/:item/play",
    component: Play,
  },
  {
    path: "/:area/:category/:item/s/:chapter",
    component: Chapter,
  },
  {
    path: "*",
    redirect: "/404",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// let area = ["manga", "anime"]

// router.beforeEach((to, from, next) => {
//   // 判断是否跳转至area
//   if (to.params.area)
//     if (area.includes(to.params.area))
//       // 当area正确的时候继续，否则跳转至404
//       next();
//     else next({ name: "error" });
//   else next();
// })

export default router;
