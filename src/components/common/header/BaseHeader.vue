<template>
  <div
    class="base-header"
    ref="base-nav"
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
    // PC端的字体颜色和背景颜色
    pcColor: {
      type: String,
      default() {
        return "#fff";
      },
    },
    pcBgColor: {
      type: String,
      default() {
        return "transparent";
      },
    },
    // 移动端的字体颜色和背景颜色
    mobileColor: {
      type: String,
      default() {
        return "#333";
      },
    },
    mobileBgColor: {
      type: String,
      default() {
        return "#fff";
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.base-header {
  width: 100%;
  height: 56px;
  position: relative;
  z-index: 5;
  .nav__content {
    display: flex;
    padding: 10px 24px;
    line-height: 30px;
    align-items: center;
    justify-content: space-between;
    .nav-links {
      height: 36px;
      display: flex;
      align-items: center;
      z-index: 5;
      .link-item {
        white-space: nowrap;
        margin-right: 12px;
        color: #fff;
      }
    }
    .nav-serach-box {
      margin: 0 10px;
      width: 500px;
      transition: width 0.2s;
      z-index: 5;
    }
    .nav-user-box {
      display: -ms-flexbox;
      display: flex;
      -ms-flex-align: center;
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
        color: #fff;
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
// 平板 宽屏 1000~1280
// @media only screen and (max-width: 1300px) {
//   .base-header {
//   }
// }
// 手机 平板 <= 1024
@media only screen and (max-width: 1024px) {
  .base-header {
    height: 48px;
    background: #fff;
    transition: top 0.2s linear;
    overflow: hidden;
    .nav__content {
      background: #fff;
      padding: 6px 12px;
      position: relative;
      width: 100%;
      transition: all 0.2s linear;
      align-items: center;
      .nav-links {
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
