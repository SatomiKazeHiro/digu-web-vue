<template>
  <div id="space">
    <main-side-bar class="main-side-bar" :config="baseConfig"></main-side-bar>
    <div id="space-side-mask" @click="handleShrinkSide"></div>
    <div id="space-bg-mask"></div>
    <img id="space-bg" src="~assets/img/space/bg.jpg" alt="" />
    <div id="space-content">
      <router-view />
    </div>
  </div>
</template>

<script>
import MainSideBar from "components/MainSideBar";
export default {
  name: "Space",
  components: {
    MainSideBar,
  },
  data() {
    return {
      baseConfig: {
        web_name: "Digu Web",
        user_name: "Tonas",
        user_maxim: "Web test",
        nav_items: [
          {
            label: "主页",
            icon: "space-play-hall",
            url: "/",
          },
          {
            label: "个人空间",
            icon: "space-user",
            url: "/space/user",
          },
          {
            label: "历史记录",
            icon: "space-history",
            url: "/space/history",
          },
          {
            label: "我的收藏",
            icon: "space-favlist",
            url: "/space/favlist",
          },
          {
            label: "稍后再看",
            icon: "space-watchlater",
            url: "/space/watchlater",
          },
          {
            label: "项目管理",
            icon: "space-manage",
            url: "/space/manage",
          },
          {
            label: "设置",
            icon: "space-setting",
            url: "/space/setting",
          },
        ],
      },
    };
  },
  mounted() {
    // 监听侧边栏的状态
    this.$EventBus.$on("sideStateChange", (state) => {
      if (state === "active") {
        document.querySelector(".main-side-bar").classList.add("z-100");
        document.querySelector("#space-side-mask").classList.add("show");
      } else if (state === "collapse") {
        document.querySelector(".main-side-bar").classList.remove("z-100");
        document.querySelector("#space-side-mask").classList.remove("show");
      }
    });
  },
  methods: {
    // 点击遮罩收缩侧边栏和关闭遮罩
    handleShrinkSide() {
      this.$EventBus.$emit("shrinkSide");
      document.querySelector("#space-side-mask").classList.remove("show");
    },
  },
};
</script>

<style lang="less">
@import url("@/styles/space.less");
</style>
