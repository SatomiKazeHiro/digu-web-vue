<template>
  <div id="app" :style="{ width: appWidth, height: appHeight }" v-cloak>
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      appWidth: this.calculateW() + "px",
      appHeight: this.calculateH() + "px",
    };
  },
  mounted() {
    const that = this;
    window.addEventListener("resize", function () {
      that.$nextTick(() => {
        return (() => {
          that.appWidth = that.calculateW() + "px";
          that.appHeight = that.calculateH() + "px";
        })();
      });
    });
  },
  methods: {
    calculateW() {
      if (window.innerWidth < 1280) return 1280;
      else return window.innerWidth;
    },
    calculateH() {
      if (window.innerWidth < 720) return 720;
      else return window.innerHeight;
    },
  },
};
</script>

<style lang="scss">
@import "@/styles/base.scss";
#app{
  overflow: hidden;
  overflow-x: auto;
  overflow-y: auto;
}
</style>
