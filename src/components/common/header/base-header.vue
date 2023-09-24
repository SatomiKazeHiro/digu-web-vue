<template>
  <div class="nav-base-header" ref="base-nav" v-show="show" :class="[fixed ? 'fixed' : '']">
    <div class="nav-content" :class="[type]" :style="{ ...selfStyle }">
      <div class="nav-web-box">
        <slot name="web-logo"></slot>
        <slot name="web-item"></slot>
      </div>
      <div class="nav-serach-box">
        <slot name="search-item"></slot>
      </div>
      <div class="nav-user-box">
        <slot name="user-head"></slot>
        <slot name="user-item"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseHeader",
  props: {
    type: {
      type: String,
      default: "",
      validator(value) {
        return ["", "normal", "gradient", "transparent"].includes(value);
      },
    },
    fixed: { type: Boolean, default: false },
    show: { type: Boolean, default: true },
    selfStyle: { type: Object, default: () => ({}) },
  },
};
</script>

<style lang="less" scoped>
.nav-base-header {
  width: 100%;
  height: 56px;
  z-index: 5;
  &.fixed {
    position: fixed;
    top: 0;
  }
  .nav-content {
    width: 100%;
    padding: 10px 24px;
    line-height: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &.normal {
      color: #666;
      background: #fff;
      box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    }
    &.gradient {
      color: #fff;
      background: linear-gradient(180deg, rgba(0, 0, 0, 0.45), transparent);
    }
    &.transparent {
      color: #fff;
      background: transparent;
    }
    .nav-web-box {
      height: 36px;
      display: flex;
      align-items: center;
      z-index: 5;
      .web-item {
        white-space: nowrap;
        margin-right: 12px;
      }
    }
    .nav-serach-box {
      margin: 0 10px;
      width: 500px;
      transition: width 0.2s;
      z-index: 5;
    }
    .nav-user-box {
      display: flex;
      align-items: center;
      height: 36px;
      z-index: 5;
      .user-head {
        margin-right: 16px;
        display: flex;
        img {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          overflow: hidden;
          object-fit: cover;
        }
      }
      .user-item {
        align-items: center;
        white-space: nowrap;
        margin-right: 20px;
        &:last-child {
          margin-right: 0;
        }
        > button {
          font-size: 30px;
          line-height: 36px;
          cursor: pointer;
          transition: all 0.2s;
          background: none;
          outline: none;
          border: none;
        }
      }
    }
  }
}

@media only screen and (max-width: @digu-md) {
  .nav-base-header {
    height: 48px;
    transition: top 0.2s linear;
    overflow: hidden;
    .nav-content {
      padding: 6px 12px;
      position: relative;
      width: 100%;
      background: #fff !important;
      // transition: all 0.2s linear;
      align-items: center;
      .nav-web-box {
        display: none;
      }
      .nav-serach-box {
        margin-left: 48px;
      }
      .nav-user-box {
        .user-head {
          margin-left: 16px;
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          img {
            width: 32px;
            height: 32px;
          }
        }
        .user-item {
          margin-right: 10px;
          &:last-child {
            margin-right: 0;
          }
          button {
            font-size: 26px;
            color: #666;
          }
        }
      }
    }
  }
}
</style>
