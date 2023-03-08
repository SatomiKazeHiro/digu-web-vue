<template>
  <div class="side-bar">
    <div class="logo-wrap">
      <div class="logo-box">
        <div class="web-logo">
          <slot name="web-logo"></slot>
        </div>
        <slot name="web-name"></slot>
      </div>
      <div class="menu-btn">
        <svg-icon icon-class="space-menu" id="menu-btn"></svg-icon>
      </div>
    </div>
    <div class="nav-wrap">
      <ul class="nav-list">
        <slot name="nav-item"></slot>
      </ul>
    </div>
    <div class="profile-wrap">
      <div class="profile-box">
        <div class="profile-head">
          <slot name="head-img"></slot>
        </div>
        <div class="profile-decs">
          <slot name="decs-name"></slot>
          <slot name="decs-maxim"></slot>
        </div>
      </div>
      <div class="log-out">
        <svg-icon icon-class="space-logout" id="logout-btn"></svg-icon>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SideBar",
  data() {
    return {
      // 默认折叠
      isCollapse: true,
    };
  },
  mounted() {
    // 点击事件
    let menuBtn = document.querySelector("#menu-btn");
    let sideBar = document.querySelector(".side-bar");
    let logoutBtn = document.querySelector("#logout-btn");
    menuBtn.onclick = () => {
      if (this.isCollapse) {
        sideBar.classList.add("active");
        // 控制侧边栏的展开
        this.$EventBus.$emit("sideStateChange", "active");
      } else {
        sideBar.classList.remove("active");
        this.$EventBus.$emit("sideStateChange", "collapse");
      }
      setTimeout(() => {
        this.isCollapse = !this.isCollapse;
      }, 500);
    };
    // 监听点击打开侧边栏时的遮罩
    this.$EventBus.$on("shrinkSide", () => {
      sideBar.classList.remove("active");
      setTimeout(() => {
        this.isCollapse = !this.isCollapse;
      }, 500);
    });
  },
};
</script>

<style lang="less" scoped>
.side-bar {
  height: 100%;
  width: 70px;
  background: #11101d;
  display: flex;
  flex-direction: column;
  transition: all 0.5s ease;
  .logo-wrap {
    padding: 10px;
    margin-bottom: 10px;
    display: flex;
    color: #fff;
    position: relative;
    .logo-box {
      width: 0;
      opacity: 0;
      display: flex;
      overflow: hidden;
      transition: all 0.5s ease;
      .web-logo {
        color: #fff;
        display: flex;
        margin: 2px;
        height: 46px;
        background: #fff;
        border-radius: 50%;
      }
      .web-name {
        flex: 1;
        height: 50px;
        margin: 0 8px;
        line-height: 50px;
        font-size: 23px;
        font-family: Helvetica;
        text-align: start;
        white-space: nowrap;
        overflow: hidden;
        // text-overflow: ellipsis;
      }
    }
    .menu-btn {
      width: 40px;
      height: 50px;
      margin: 0 5px;
      font-size: 28px;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      svg {
        cursor: pointer;
      }
    }
  }
  .nav-wrap {
    flex: 1;
    padding: 0 10px;
    ul.nav-list {
      margin-top: 20px;
    }
  }
  .profile-wrap {
    color: #fff;
    display: flex;
    margin-top: 10px;
    padding: 10px;
    .profile-box {
      width: 0;
      opacity: 0;
      display: flex;
      align-items: center;
      transition: all 0.5s ease;
      overflow: hidden;
      .profile-head {
        display: flex;
        align-items: center;
        justify-content: center;
        > img {
          height: 50px;
          width: 50px;
          object-fit: cover;
          border-radius: 6px;
        }
      }
      .profile-decs {
        flex: 1;
        margin: 0 10px;
        white-space: nowrap;
        overflow: hidden;
        .decs-name {
          font-weight: 400;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          margin-bottom: 5px;
        }
        .decs-maxim {
          font-size: 12px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
    .log-out {
      width: 50px;
      height: 50px;
      font-size: 34px;
      line-height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 5px;
      transition: all 0.5s ease;
      svg {
        cursor: pointer;
      }
    }
    // .log-out:hover {
    //   color: #11101d;
    //   background: #fff;
    //   border-radius: 5px;
    // }
  }
  &.active {
    width: 240px;
    .logo-wrap {
      .logo-box {
        opacity: 1;
        width: 100%;
      }
    }
    .profile-wrap {
      .profile-box {
        flex: 1;
        width: 100%;
        opacity: 1;
      }
      .log-out {
        box-sizing: border-box;
        padding-right: 5px;
      }
    }
  }
}
::v-deep.side-bar {
  .nav-wrap {
    ul.nav-list {
      .side-bar-item {
        overflow: hidden;
        a .nav-label {
          opacity: 0;
          width: 0;
          transition: all 0.5s ease;
        }
        .tooltip {
          display: block;
        }
        &:hover {
          overflow: unset;
          .tooltip {
            transition: all 0.3s ease;
          }
        }
      }
    }
  }
  &.active {
    .nav-wrap {
      ul.nav-list {
        .side-bar-item {
          a {
            .nav-label {
              opacity: 1;
              width: 100%;
              transition: all 0.5s ease;
              &:hover {
                transition: unset;
              }
            }
          }
          .tooltip {
            display: none;
          }
        }
      }
      &:hover ul.nav-list .side-bar-item a .nav-label {
        transition: unset;
      }
    }
  }
}
</style>
