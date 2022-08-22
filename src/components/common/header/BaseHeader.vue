<template>
  <div class="nav__base-header" ref="base-nav" v-show="show">
    <div class="nav__content" :class="[type, fixed ? 'fixed' : '']">
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
      default: "normal",
      validator(value) {
        return ["normal", "gradient", "transparent"].includes(value);
      },
    },
    fixed: {
      type: Boolean,
      default: false,
    },
    show: {
      type: Boolean,
      default: true,
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
@media only screen and ($pcMaxWidth) {
  .nav__base-header {
    width: 100%;
    height: 56px;
    position: relative;
    z-index: 5;
    .nav__content {
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
      &.fixed {
        position: fixed;
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
}

// 手机 平板 <= 1024
@media only screen and ($padMaxWidth) {
  .nav__base-header {
    height: 48px;
    transition: top 0.2s linear;
    overflow: hidden;
    .nav__content {
      padding: 6px 12px;
      position: relative;
      width: 100%;
      background: #fff;
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
