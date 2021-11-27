<template>
  <div
    class="base-header"
    ref="base-nav"
    :class="{
      hideHeaderNav: $store.state._browserStatus.areaMobileScrollIsDrop,
    }"
    :style="{
      'background-color':
        $store.state._browserStatus.appWidth < 1024 ? mobileBgColor : pcBgColor,
    }"
  >
    <div class="nav__content">
      <div class="nav-links">
        <slot name="web-logo"></slot>
        <slot name="link-item"></slot>
      </div>
      <div class="nav-serach-box">
        <slot name="search-item"></slot>
      </div>
      <div class="nav-user-center">
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
    pcBgColor: {
      type: String,
      default() {
        return "transparent";
      },
    },
    pcColor: {
      type: String,
      default() {
        return "#fff";
      },
    },
    mobileBgColor: {
      type: String,
      default() {
        return "#fff";
      },
    },
    mobileColor: {
      type: String,
      default() {
        return "#333";
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.base-header {
  height: 56px;
  position: relative;
  z-index: 5;
  .nav__content {
    display: flex;
    padding: 10px 24px;
    line-height: 30px;
    align-items: flex-start;
    justify-content: space-between;
    .nav-links {
      height: 36px;
      display: flex;
      align-items: center;
      .link-item {
        margin-right: 12px;
        color: #fff;
        z-index: 5;
      }
    }
    .nav-serach-box {
      margin: 0 10px;
      width: 500px;
      transition: width 0.2s;
      z-index: 5;
    }
    .nav-user-center {
      display: -ms-flexbox;
      display: flex;
      -ms-flex-align: center;
      align-items: center;
      height: 36px;
      z-index: 5;
      > div {
        margin-left: 12px;
      }
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
        color: #fff;
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
// 平板 宽屏 1000~1280
@media only screen and (max-width: 1300px) {
  .base-header {
    .nav__content {
      // background: red;
      .nav-links {
        .link-item {
          white-space: nowrap;
        }
      }
      .nav-user-center {
        .user-item {
          white-space: nowrap;
        }
      }
    }
  }
}
// 手机 平板 < 1024
@media only screen and (max-width: 1024px) {
  .base-header {
    height: 48px;
    background: #fff;
    transition: 0.4s;
    overflow: hidden;
    &.hideHeaderNav {
      position: relative;
      height: 0;
      .nav__content {
        position: absolute;
        left: 0;
        top: -48px;
        height: 48px;
        opacity: 0;
      }
    }
    .nav__content {
      background: #fff;
      padding: 6px 12px;
      position: relative;
      top: 0;
      width: 100%;
      opacity: 1;
      transition: 0.4s;
      align-items: center;
      .nav-links {
        display: none;
      }
      .nav-serach-box {
        margin-left: 48px;
      }
      .nav-user-center {
        .user-head {
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
          button {
            font-size: 26px;
            color: #666;
          }
        }
        .user-item:nth-child(2) {
          margin-left: 0;
        }
        .user-item:last-child {
          margin-left: 0;
        }
      }
    }
  }
}
// // 电脑端全屏 1280+
// @media only screen and (min-width: 1300px) {
//   .base-header {
//     .nav__content {
//       // background: teal;
//     }
//   }
// }
</style>
