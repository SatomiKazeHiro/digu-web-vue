<template>
  <div class="main-header">
    <BaseHeader class="m-header" type="gradient">
      <div
        slot="web-item"
        class="web-item"
        v-for="i in linkItems"
        :key="'web-' + i.label"
      >
        <a :href="i.url">{{ i.label }}</a>
      </div>
      <NavSearch slot="search-item" />
      <div class="user-head" slot="user-head">
        <img :src="$store.state._user.header" slot="user-img" />
      </div>
      <div
        slot="user-item"
        class="user-item"
        v-for="i in userItems"
        :key="'user-' + i.label"
      >
        <a :href="i.url" v-if="isPC()">{{ i.label }}</a>
        <button v-else>
          <svg-icon :icon-class="i.icon"></svg-icon>
        </button>
      </div>
    </BaseHeader>
    <Banner class="m-banner" />
    <TagsNav class="m-tags" />
  </div>
</template>

<script>
import Banner from "./common/header/banner";
import BaseHeader from "./common/header/base-header";
import NavSearch from "./common/header/nav-search";
import TagsNav from "./common/header/tags-nav";
export default {
  name: "MainHeader",
  components: {
    BaseHeader,
    Banner,
    TagsNav,
    NavSearch,
  },
  data() {
    return {
      // 左侧站内链接内容
      linkItems: [
        { label: "主站", url: "/" },
        { label: "动画", url: "/anime" },
        { label: "漫画", url: "/manga" },
      ],
      // 右侧用户链接内容
      userItems: [
        { label: "收藏", icon: "header-collect", url: "/space/favlist" },
        { label: "历史记录", icon: "header-history", url: "/space/history" },
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

<style lang="less" scoped>
.main-header {
  position: relative;
  .m-header {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
  }
}

@media only screen and (max-width: 1920px) {
  .main-header {
    position: relative;
    .m-header {
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 10;
    }
  }
}
// 手机 平板 <1044
@media only screen and (max-width: 1044px) {
  .main-header {
    border-bottom: 1px solid #dfdfdf;
    padding-top: 48px;
    .m-banner {
      display: none;
    }
    .m-tags {
      z-index: 10;
    }
  }
}
</style>
