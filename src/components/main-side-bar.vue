<template>
  <div id="mian-side-bar">
    <side-bar>
      <img src="~assets/img/space/logo.png" slot="web-logo" />
      <div class="web-name" slot="web-name">{{ config.web_name }}</div>
      <side-bar-item
        v-for="(item, index) in config.nav_items"
        :key="index"
        :url="item.url"
        slot="nav-item"
      >
        <svg-icon
          :icon-class="item.icon"
          slot="nav-icon"
          style="font-size: 28px"
        ></svg-icon>
        <span slot="nav-label">{{ item.label }}</span>
        <span slot="tooltip" class="tooltip">{{ item.label }}</span>
      </side-bar-item>
      <img src="~assets/img/user/head.jpeg" slot="head-img" />
      <div class="decs-name" slot="decs-name">{{ config.user_name }}</div>
      <div class="decs-maxim" slot="decs-maxim">{{ config.user_maxim }}</div>
    </side-bar>
  </div>
</template>

<script>
import SideBar from "./common/sidebar/side-bar";
import SideBarItem from "./common/sidebar/side-bar-item.vue";
export default {
  name: "MainSideBar",
  components: { SideBar, SideBarItem },
  props: {
    config: { type: Object, default: () => ({}) },
  },
};
</script>

<style lang="less" scoped>
#mian-side-bar {
  height: 100%;
  z-index: 10;
  transition: all 0.3s linear;
  &.fixed {
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
  }
}
</style>
