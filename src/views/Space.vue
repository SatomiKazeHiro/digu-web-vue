<template>
  <div id="space">
    <main-side-bar :config="baseConfig"></main-side-bar>
    <!-- space背景 -->
    <div class="mask-bg"></div>
    <img class="space-bg" src="~assets/img/space/bg.jpg" alt="" />
    <div class="space-content">
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
            label: "项目管理（修改版）",
            icon: "space-manage",
            url: "/space/manage2",
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
  mounted() {},
};
</script>

<style lang="scss" scoped>
#space {
  width: 100%;
  height: 100%;
  // min-width: 1280px;
  // min-height: 720px;
  margin: 0;
  padding: 0;
  position: relative;
  display: flex;
  .mask-bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.33);
  }
  .space-bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
  }
  .space-content {
    flex: 1;
    color: #fff;
    z-index: 1;
    overflow-x: hidden;
    overflow-y: overlay;
  }
}
// @media only screen and (width: 1024px) {
//   #space {
//     min-width: 1024px;
//     min-height: unset;
//   }
// }
</style>
