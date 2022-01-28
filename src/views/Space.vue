<template>
  <div id="space">
    <main-side-bar class="main-side-bar" :config="baseConfig"></main-side-bar>
    <!-- space背景 -->
    <div class="side-mask" @click="handleShrinkSide"></div>
    <div class="space-bg-mask"></div>
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
  mounted() {
    // 监听侧边栏的状态
    this.$EventBus.$on("sideStateChange", (state) => {
      if (state === "active") {
        document.querySelector(".main-side-bar").classList.add("z-100");
        document.querySelector(".side-mask").classList.add("show");
      } else if (state === "collapse") {
        document.querySelector(".main-side-bar").classList.remove("z-100");
        document.querySelector(".side-mask").classList.remove("show");
      }
    });
  },
  methods: {
    // 点击遮罩收缩侧边栏和关闭遮罩
    handleShrinkSide() {
      this.$EventBus.$emit("shrinkSide");
      document.querySelector(".side-mask").classList.remove("show");
    },
  },
};
</script>

<style lang="scss" scoped>
#space {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  position: relative;
  display: flex;
  .side-mask {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    opacity: 0;
    background-color: rgba(0, 0, 0, 0.5);
    transition: all 0.3s linear;
    &.show {
      opacity: 1;
      z-index: 50;
    }
  }
  .space-bg-mask {
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
@media only screen and (max-width: 1024px) {
  #space {
    min-width: 1024px;
    .mian-side-bar {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      height: 100%;
    }
  }
  .space-content {
    padding-left: 70px;
  }
}
</style>
