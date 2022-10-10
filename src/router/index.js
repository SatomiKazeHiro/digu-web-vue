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

const Web = () => import("views/Web.vue");
const Area = () => import("views/web/Area.vue");
const Category = () => import("views/web/Category.vue");
const Media = () => import("views/web/Media.vue");
const Play = () => import("views/web/Play.vue");
const Chapter = () => import("views/web/Chapter.vue");

const Space = () => import("views/Space.vue");
const User = () => import("views/space/User.vue");
const History = () => import("views/space/History.vue");
const Favlist = () => import("views/space/Favlist.vue");
const Watchlater = () => import("views/space/Watchlater.vue");
const Manage = () => import("views/space/Manage.vue");
const Setting = () => import("views/space/Setting.vue");

const ErrorPage = () => import("views/ErrorPage.vue");

const routes = [
  {
    path: "/",
    name: "Web",
    component: Web,
  },
  {
    path: "/test",
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
