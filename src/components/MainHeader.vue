<template>
  <div id="main-header" :style="{ 'background-color': bgcolor }">
    <base-header class="m-header">
      <div
        slot="link-item"
        class="link-item"
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
        <a :href="i.url" v-if="isPC()">{{ i.label }}</a>
        <button v-else>
          <svg-icon :icon-class="i.icon"></svg-icon>
        </button>
      </div>
    </base-header>
    <digu-banner class="m-banner"></digu-banner>
    <tag-nav></tag-nav>
  </div>
</template>

<script>
import BaseHeader from "./common/header/BaseHeader";
import DiguBanner from "./common/header/DiguBanner";
import TagNav from "./common/header/TagNav";
import NavSearch from "./common/header/NavSearch";
export default {
  name: "MainHeader",
  components: {
    BaseHeader,
    DiguBanner,
    TagNav,
    NavSearch,
  },
  props: {
    bgcolor: {
      type: String,
      default() {
        return "transparent";
      },
    },
  },
  data() {
    return {
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
  methods: {
    isPC() {
      return this.$store.state._browserStatus.appWidth > 1044;
    },
  },
};
</script>

<style lang="scss" scoped>
#main-header {
  position: relative;
  .m-header {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
  }
}
// 手机 平板 <1044
@media only screen and (max-width: 1044px) {
  #main-header {
    border-bottom: 1px solid #ccc;
    height: 48px;
    .m-header {
      box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px,
        rgb(209, 213, 219) 0px 0px 0px 1px inset;
    }
    .m-banner {
      display: none;
    }
  }
}
</style>
