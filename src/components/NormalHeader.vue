<template>
  <div id="normal-header" :class="{ inTop, fixed }">
    <BaseHeader v-bind="$attrs">
      <div slot="web-item" class="web-item" v-for="i in webItems" :key="i.label">
        <a :href="i.url">{{ i.label }}</a>
      </div>
      <NavSearch slot="search-item" />
      <div class="user-head" slot="user-head">
        <img :src="$store.state._user.header" slot="user-img" />
      </div>
      <div slot="user-item" class="user-item" v-for="i in userItems" :key="i.label">
        <a :href="i.url" v-if="isPC()">{{ i.label }}</a>
        <button v-else>
          <svg-icon :icon-class="i.icon"></svg-icon>
        </button>
      </div>
    </BaseHeader>
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
  inheritAttrs: false,
  props: {
    inTop: { type: Boolean, default: false },
    fixed: { type: Boolean, default: false },
  },
  data() {
    return {
      // 左侧站内链接内容
      webItems: [
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
#normal-header {
  width: 100%;
  transition: opacity 0.25s linear;
  &.inTop {
    position: absolute;
  }
  &.fixed {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 10;
    overflow-y: scroll;
    overflow-x: hidden;
    pointer-events: none;
    > * {
      pointer-events: all;
    }
    &::-webkit-scrollbar {
      // 滚动条背景透明
      background: transparent;
    }
  }
}
</style>
