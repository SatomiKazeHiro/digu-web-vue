<template>
  <div id="normal-header">
    <base-header
      :pcBgColor="pcBgColor"
      :pcColor="pcColor"
      :mobileBgColor="mobileBgColor"
      :mobileColor="mobileColor"
    >
      <div
        class="link-item"
        slot="link-item"
        v-for="i in linkItems"
        :key="'header-' + i.label"
      >
        <a :href="i.url">{{ i.label }}</a>
      </div>
      <nav-search slot="search-item"></nav-search>
      <div class="user-head" slot="user-head">
        <slot name="user-img"></slot>
      </div>
      <div
        slot="user-item"
        class="user-item"
        v-for="i in userItems"
        :key="'header-' + i.label"
      >
        <a :href="i.url" v-if="windowWidth > 1024">{{ i.label }}</a>
        <button v-else>
          <svg-icon :icon-class="i.icon"></svg-icon>
        </button>
      </div>
    </base-header>
  </div>
</template>

<script>
import BaseHeader from "./common/header/BaseHeader";
import NavSearch from "./common/header/NavSearch";
export default {
  name: "NormalHeader",
  components: {
    BaseHeader,
    NavSearch,
  },
  props: {
    pcBgColor: String,
    pcColor: String,
    mobileBgColor: String,
    mobileColor: String,
  },
  data() {
    return {
      windowWidth: null,
      // 左侧站内链接内容
      linkItems: [
        {
          label: "主站",
          url: "/",
        },
        {
          label: "动画",
          url: "/anime",
        },
        {
          label: "漫画",
          url: "/manga",
        },
      ],
      // 右侧用户链接内容
      userItems: [
        {
          label: "收藏",
          icon: "header-collect",
          url: "/space/favlist",
        },
        {
          label: "历史记录",
          icon: "header-history",
          url: "/space/history",
        },
      ],
    };
  },
  mounted() {
    this.windowWidth = window.innerWidth;
    // window.onresize = () => {
    //   this.windowWidth = window.innerWidth;
    //   console.log(this.windowWidth);
    // };
    window.addEventListener(
      "resize",
      () => (this.windowWidth = window.innerWidth),
      false
    );
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
#normal-header{
  transition: opacity 0.25s linear;
}
</style>
