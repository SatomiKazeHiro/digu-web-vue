<template>
  <div class="space" id="space">
    <main-side-bar :config="baseConfig" class="main-side-bar"></main-side-bar>
    <!-- space背景 -->
    <div class="space-bg"></div>
    <img class="space-bg" src="~assets/img/space/bg.jpg" alt="" />
    <!-- router内容 -->
    <div class="content" v-if="$route.path == '/space'">
      <space-ct></space-ct>
    </div>
    <div class="content" v-else>
      <router-view />
    </div>
  </div>
</template>

<script>
import MainSideBar from "components/MainSideBar";
import SpaceCt from "views/space/SpaceCt";
export default {
  name: "Space",
  components: {
    MainSideBar,
    SpaceCt,
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
            icon: "user",
            url: "/space",
          },
          {
            label: "管理",
            icon: "manage",
            url: "/space/manage",
          },
          {
            label: "设置",
            icon: "setting",
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
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  position: relative;
  display: flex;
  div.space-bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.33);
  }
  img.space-bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
  }
  .content {
    flex: 1;
    color: #fff;
    z-index: 1;
    overflow-x: hidden;
    overflow-y: auto;
  }
}
</style>
