<template>
  <div>
    <div id="manga" @click="onManga">
      <div class="operation-container" @click="onOperation">
        <div ref="nav" class="operation-nav" @mouseover="onMouseover" @mouseleave="omMouseleave">
          <div class="operation-wrap" :class="isHover ? 'active' : ''" @click="onNav"></div>
        </div>
        <div ref="tool" class="operation-tool" @mouseover="onMouseover" @mouseleave="omMouseleave">
          <div class="operation-wrap" :class="isHover ? 'active' : ''" @click="onTool"></div>
        </div>
      </div>
      <div class="view-container">
        <div class="action" @click="preClick"></div>
        <div class="action" @click="activeClick">
          {{ count }}
        </div>
        <div class="action" @click="nextClick"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isHover: false,
      timer: null,
      count: 0,
    };
  },
  methods: {
    onManga() {
      console.log("=manga");
    },
    onOperation() {
      console.log("=operation");
    },
    onNav() {
      console.log("=onNav");
    },
    onTool() {
      console.log("=onTool");
    },
    onMouseover() {
      console.log("over");
      this.isHover = true;
      if (this.timer) clearTimeout(this.timer);
    },
    omMouseleave() {
      console.log("leave");
      if (this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.isHover = false;
      }, 3000);
    },
    activeClick() {
      // over + leave
      this.isHover = !this.isHover;
      if (this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.isHover = false;
      }, 3000);
    },
    preClick() {
      if (this.count - 1 < 0) this.count = 0;
      else --this.count;
    },
    nextClick() {
      ++this.count;
    },
  },
  beforeDestroy() {
    if (this.timer) clearTimeout(this.timer);
  },
};
</script>

<style lang="scss" scoped>
#manga {
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
  .operation-container {
    position: absolute;
    width: 100%;
    height: 100%;
    pointer-events: none;
    .operation-nav {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 52px;
      background: teal;
      pointer-events: all;
      .operation-wrap {
        transform: translateY(-100%);
      }
    }
    .operation-tool {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 52px;
      background: orange;
      pointer-events: all;
      .operation-wrap {
        transform: translateY(100%);
      }
    }
    .operation-wrap {
      background: red;
      width: 100%;
      height: 100%;
      transition: transform 0.3s linear;
      &.active {
        transform: translateY(0) !important;
      }
    }
  }
}
</style>
