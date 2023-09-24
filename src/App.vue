<template>
  <div id="app" v-cloak>
    <router-view />
  </div>
</template>

<script>
import platform from "utils/platform";
export default {
  created() {
    this.appWidth = this.calculateW() + "px";
    this.appHeight = this.calculateH() + "px";
    this.$store.commit("setBrowserInfo", platform.getPlatformInfo());
  },
  mounted() {
    const _this = this;

    window.addEventListener("resize", function () {
      _this.$nextTick(() => {
        return (() => {
          _this.appWidth = _this.calculateW() + "px";
          _this.appHeight = _this.calculateH() + "px";
          _this.$EventBus.$emit("onWindowResize");
        })();
      });
    });

    window.addEventListener("orientationchange", function () {
      _this.$EventBus.$emit("onWindowResize");
    });
  },
  methods: {
    calculateW() {
      this.$store.commit("setAppWidth", window.innerWidth);
      return window.innerWidth;
    },
    calculateH() {
      this.$store.commit("setAppHeight", window.innerHeight);
      return window.innerHeight;
    },
  },
};
</script>

<style lang="less">
@import url("@/styles/base.less");
@import url("@/styles/color.less");
@import url("styles/myFont.css");

#app {
  overflow: hidden;
  position: relative;
  height: 100vh;
  width: 100%;
}
</style>
