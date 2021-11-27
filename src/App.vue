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

<style lang="scss">
@import "@/styles/base.scss";
#app {
  overflow: hidden;
  overflow-y: auto;
  position: relative;
  // &::-webkit-scrollbar {
  //   position: absolute;
  //   right: 0;
  //   width: 8px;
  //   height: 8px;
  // }
  // /*滚动条里面小方块样式*/
  // &::-webkit-scrollbar-thumb {
  //   border-radius: 100px;
  //   -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  //   background: rgb(80, 80, 80);
  // }
  // /*滚动条里面轨道样式*/
  // &::-webkit-scrollbar-track {
  //   -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  //   border-radius: 0;
  //   background: rgba(0, 0, 0, 0.1);
  // }
}
</style>
