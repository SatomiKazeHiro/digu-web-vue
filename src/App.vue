<template>
  <div id="app" :style="{ width: appWidth, height: appHeight }" v-cloak>
    <router-view />
  </div>
</template>

<script>
import platform from "utils/platform";
export default {
  data() {
    return {
      appWidth: this.calculateW() + "px",
      appHeight: this.calculateH() + "px",
    };
  },
  created() {
    this.$store.commit("setBrowserInfo", platform.getPlatformInfo());
  },
  mounted() {
    const _this = this;
    window.addEventListener("resize", function () {
      _this.$nextTick(() => {
        return (() => {
          _this.appWidth = _this.calculateW() + "px";
          _this.appHeight = _this.calculateH() + "px";
        })();
      });
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
@import url("@/styles/variables.less");
@import url("styles/myFont.css");

#app {
  overflow: hidden;
  position: relative;
}
</style>
