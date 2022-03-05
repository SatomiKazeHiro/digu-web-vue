<template>
  <div class="dg-collapse">
    <div class="brs-8-bc-fff collapse-panel">
      <div class="header">
        {{ title }}
        <button class="btn fr" ref="collapse" @click="collapseClick()">
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
  data() {
    return {
      isCollapse: false,
    };
  },
  props: {
    title: {
      type: String,
      default: () => "",
    },
    initHeight: {
      type: Boolean,
      default: () => true,
    },
  },
  mounted() {
    // // 获取内容高度来初始化面板高度
    // if (this.initHeight && this.$refs.content) {
    //   this.$refs.content.style.height = this.$refs.content.scrollHeight + "px";
    // }
    // 监听窗口的变化，调整面板高度
    window.addEventListener("resize", this.resize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resize);
  },
  computed: {
    contentHeight() {
      // console.log(this.$refs.content.scrollHeight);
      return this.$refs.content.offsetHeight;
    },
  },
  methods: {
    // 点击折叠事件
    collapseClick() {
      if (this.$refs.collapse && this.$refs.content) {
        if (!this.isCollapse) {
          // 即将折叠
          this.$refs.collapse.classList.add("arrow");
          this.$refs.content.style.height = "";
          this.$refs.content.style.height =
            this.$refs.content.scrollHeight + "px";
          setTimeout(() => {
            this.$refs.content.classList.add("hide");
            setTimeout(() => {
              this.isCollapse = true;
            }, 300);
          }, 10);
        } else {
          // 即将展开
          this.$refs.collapse.classList.remove("arrow");
          this.$refs.content.classList.remove("hide");
          setTimeout(() => {
            this.$refs.content.style.height = "";
            this.isCollapse = false;
          }, 300);
        }
      }
    },
    // 响应式更新内容高度
    resize() {
      if (this.$refs.content) {
        // 清除之前的高度
        this.$refs.content.style.height = "";
        // 更新高度
        this.$refs.content.style.height =
          this.$refs.content.scrollHeight + "px";
        setTimeout(() => {
          // 撤销修改的高度
          this.$refs.content.style.height = "";
        }, 50);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.collapse-panel {
  padding: 15px;
  margin-bottom: 20px;
  overflow: hidden;
  .header {
    color: #3c3c3c;
    font-size: 16px;
    padding-left: 6px;
    border-left: 2px solid #87bcee;
    height: 24px;
    line-height: 24px;
    .btn {
      padding: 0;
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
    }
  }
  .content {
    transition: all 0.3s ease;
    overflow: hidden;
    opacity: 1;
    width: 100%;
    padding-top: 10px;
    &.hide {
      height: 0 !important;
      opacity: 0;
      padding-top: 0;
    }
    * {
      font-size: 16px;
    }
  }
}
@media only screen and (max-width: 1620px) {
  .collapse-panel {
    margin-bottom: 15px;
    .header {
      font-size: 15px;
      height: 20px;
      line-height: 20px;
      padding-left: 4px;
    }
    .content {
      padding-top: 7.5px;
      * {
        font-size: 15px;
      }
    }
  }
}
@media only screen and (max-width: 1320px) {
  .collapse-panel {
    margin-bottom: 10px;
    padding: 10px;
    .header {
      font-size: 14px;
      height: 19px;
      line-height: 19px;
      .btn {
        font-size: 19px;
        line-height: 19px;
      }
    }
    .content {
      padding-top: 5px;
      * {
        font-size: 14px;
      }
    }
  }
}
</style>
