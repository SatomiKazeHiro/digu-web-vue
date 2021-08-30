<template>
  <div class="space" id="space">
    <main-side-bar :config="baseConfig"></main-side-bar>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
import MainSideBar from "components/MainSideBar";

export default {
  name: "Space",
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
            url: "",
          },
          {
            label: "管理",
            icon: "manage",
            url: "",
          },
          {
            label: "设置",
            icon: "setting",
            url: "",
          },
        ],
      },
    };
  },
  components: {
    MainSideBar,
  },
};
</script>

<style lang="scss" scoped>
#space {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  display: flex;
  height: 100vh;
  .content {
    flex: 1;
    color: #fff;
    padding: 30px;
  }
}
</style>
