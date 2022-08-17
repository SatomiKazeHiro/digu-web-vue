<template>
  <div id="normal-header">
    <base-header :style="style">
      <div
        slot="web-item"
        class="web-item"
        v-for="i in webItems"
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
        <a :href="i.url" v-if="isPC()">{{ i.label }}</a>
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
    style: Object,
  },
  data() {
    return {
      // 左侧站内链接内容
      webItems: [
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
  methods: {
    isPC() {
      return this.$store.state._browserStatus.appWidth > 1044;
    },
  },
};
</script>

<style lang="scss" scoped>
#normal-header {
  transition: opacity 0.25s linear;
}
</style>
