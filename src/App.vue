<template>
  <div id="app" :style="{ width: appWidth, height: appHeight }">
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      appWidth: window.innerWidth + "px",
      appHeight: window.innerHeight + "px",
    };
  },
  mounted() {
    const that = this;
    window.addEventListener("resize", function () {
      that.$nextTick(() => {
        return (() => {
          that.appWidth = window.innerWidth + "px";
          that.appHeight = window.innerHeight + "px";
        })();
      });
    });
  },
};
</script>

<style lang="scss">
@import "@/styles/base.scss";

</style>
