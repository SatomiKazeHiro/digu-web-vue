<template>
  <div class="dg-collapss">
    <div class="brs8fff collapss-panel">
      <div class="header">
        {{ title }}
        <button class="btn fr" ref="collapse" @click="collapse()">
          <svg-icon icon-class="space-manage-drop-down"></svg-icon>
        </button>
        <slot name="top-btn"></slot>
      </div>
      <div class="content" ref="content">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DgCollapse",
  props: {
    title: {
      type: String,
      default: () => "",
    },
  },
  mounted() {
    // 获取内容高度来初始化面板高度
    if (this.$refs.content) {
      this.$refs.content.style.height = this.$refs.content.scrollHeight + "px";
    }
    // 监听窗口的变化，调整面板高度
    window.addEventListener("resize", this.resize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resize);
  },
  computed: {
    contentHeight() {
      console.log(this.$refs.content.scrollHeight);
      return this.$refs.content.offsetHeight;
    },
  },
  methods: {
    // 点击折叠事件
    collapse() {
      // this.$refs.collapse.classList.toggle("arrow");
      // setTimeout(() => {
      //   this.$refs.content.classList.toggle("hide");
      // }, 10);

      this.$refs.collapse.classList.toggle("arrow");
      // this.$refs.content.style.height = "";
      this.$refs.content.style.height = this.$refs.content.scrollHeight + "px";
      setTimeout(() => {
        this.$refs.content.classList.toggle("hide");
        setTimeout(() => {
          this.$refs.content.style.height = "";
        }, 1000);
      }, 10);
    },
    // 响应式更新内容高度
    resize() {
      // 清除之前的高度
      this.$refs.content.style.height = "";
      // 更新高度
      this.$refs.content.style.height = this.$refs.content.scrollHeight + "px";
    },
  },
};
</script>

<style lang="scss" scoped>
.collapss-panel {
  padding: 15px;
  margin-bottom: 15px;
  overflow: hidden;
  .header {
    color: #3c3c3c;
    padding-left: 5px;
    border-left: 2px solid #87bcee;
    height: 24px;
    line-height: 24px;
    .btn {
      padding: 0;
      margin-left: 10px;
      background: transparent;
      outline: none;
      border: none;
      font-size: 22px;
      line-height: 24px;
      cursor: pointer;
      transition: all 0.3s ease;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      -webkit-tap-highlight-color: transparent;
      &.arrow {
        transform: rotate(-90deg);
      }
      &.edit:hover {
        color: #00a1d6;
      }
    }
  }
  .content {
    transition: all 0.3s ease;
    overflow: hidden;
    opacity: 1;
    width: 100%;
    &.hide {
      height: 0 !important;
      opacity: 0;
    }
  }
}
@media only screen and (width: 1024px) {
  .collapss-panel {
    padding: 15px 10px;
    margin-bottom: 10px;
    .header {
      font-size: 15px;
      height: 22px;
      line-height: 22px;
    }
  }
}
</style>
