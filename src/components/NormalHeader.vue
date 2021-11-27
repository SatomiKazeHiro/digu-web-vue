<template>
  <div class="normal-header">
    <base-header
      :pcBgColor="pcBgColor"
      :pcColor="pcColor"
      :mobileBgColor="mobileBgColor"
      :mobileColor="mobileColor"
    >
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
</style>
