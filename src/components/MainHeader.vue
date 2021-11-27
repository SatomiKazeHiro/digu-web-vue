<template>
  <div id="mainHeader" :style="{ 'background-color': bgcolor }">
    <base-header class="m-header">
      <div class="link-item" slot="link-item">
        <a href="/" target="_blank">主站</a>
      </div>
      <div class="link-item" slot="link-item">
        <a href="/anime" target="_blank">动画</a>
      </div>
      <div class="link-item" slot="link-item">
        <a href="/manga" target="_blank">漫画</a>
      </div>
      <nav-search slot="search-item"></nav-search>
      <div class="user-head" slot="user-head">
        <slot name="user-img"></slot>
      </div>
      <div class="user-item" slot="user-item">
        <a href="javascript:void(0)" target="_blank" v-if="windowWidth > 1024"
          >收藏</a
        >
        <button v-else>
          <svg-icon icon-class="mainheader-collect"></svg-icon>
        </button>
      </div>
      <div class="user-item" slot="user-item">
        <a href="javascript:void(0)" target="_blank" v-if="windowWidth > 1024"
          >历史记录</a
        >
        <button v-else>
          <svg-icon icon-class="mainheader-history"></svg-icon>
        </button>
      </div>
      <div class="user-item" slot="user-item">
        <a href="javascript:void(0)" target="_blank" v-if="windowWidth > 1024"
          >设置</a
        >
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
      windowWidth: null,
    };
  },
  mounted() {
    this.windowWidth = window.innerWidth;
    window.onresize = () => {
      this.windowWidth = window.innerWidth;
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
#mainHeader {
  position: relative;
  .m-header {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
  }
}
// 手机 平板 <1000
@media only screen and (max-width: 1024px) {
  #mainHeader {
    border-bottom: 1px solid #ccc;
    .m-header {
      position: unset;
    }
    .m-banner {
      display: none;
    }
  }
}
</style>
