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

const routes = [
  {
    path: "/",
    name: "Web",
    meta: {
      title: "嘀嘀咕咕",
    },
    component: () => import("views/web"),
  },
  {
    path: "/space",
    name: "Space",
    component: () => import("views/Space.vue"),
    meta: {
      title: "个人空间",
    },
    children: [
      {
        path: "user",
        name: "User",
        meta: {
          title: "用户空间",
        },
        component: () => import("views/space/User.vue"),
      },
      {
        path: "history",
        name: "History",
        meta: {
          title: "历史记录",
        },
        component: () => import("views/space/History.vue"),
      },
      {
        path: "favlist",
        name: "Favlist",
        meta: {
          title: "我的收藏",
        },
        component: () => import("views/space/Favlist.vue"),
      },
      {
        path: "watchlater",
        name: "Watchlater",
        meta: {
          title: "稍后再看",
        },
        component: () => import("views/space/Watchlater.vue"),
      },
      {
        path: "manage",
        name: "Manage",
        meta: {
          title: "资源管理",
        },
        component: () => import("views/space/Manage.vue"),
      },
      {
        path: "setting",
        name: "Setting",
        meta: {
          title: "设置",
        },
        component: () => import("views/space/Setting.vue"),
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
    meta: {
      title: "404",
    },
    component: () => import("views/404.vue"),
  },
  {
    path: "/:area",
    name: "Area",
    component: () => import("views/web/Area.vue"),
    children: [
      {
        path: ":category",
        name: "category",
        component: () => import("views/web/Category.vue"),
      },
    ],
  },
  {
    path: "/:area/:category/:item",
    name: "media",
    meta: {
      type: "media",
    },
    component: () => import("views/web/Media.vue"),
  },
  {
    path: "/:area/:category/:item/play",
    name: "play",
    meta: {
      type: "play",
    },
    component: () => import("views/web/Media.vue"),
  },
  {
    path: "/:area/:category/:item/s/:chapter",
    name: "chapter",
    meta: {
      type: "chapter",
    },
    component: () => import("views/web/Media.vue"),
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

router.beforeEach((to, from, next) => {
  //   // 判断是否跳转至area
  //   if (to.params.area)
  //     if (area.includes(to.params.area))
  //       // 当area正确的时候继续，否则跳转至404
  //       next();
  //     else next({ name: "error" });
  //   else next();
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

export default router;
