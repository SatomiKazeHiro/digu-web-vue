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
        <svg-icon icon-class="menu" id="menu-btn"></svg-icon>
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
          <!-- <div class="decs-name">Tonas</div>
          <div class="decs-desc">Web Test</div> -->
          <slot name="decs-name"></slot>
          <slot name="decs-maxim"></slot>
        </div>
      </div>
      <div class="log-out">
        <svg-icon icon-class="logout" id="logout-btn"></svg-icon>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SideBar",
  mounted() {
    let menuBtn = document.querySelector("#menu-btn");
    let sideBar = document.querySelector(".side-bar");
    let logoutBtn = document.querySelector("#logout-btn");

    menuBtn.onclick = () => {
      sideBar.classList.toggle("active");
    };
  },
};
</script>

<style lang="scss" scoped>
.side-bar {
  height: 100%;
  // position: fixed;
  // top: 0;
  // left: 0;
  height: 100%;
  width: 70px;
  background: #11101d;
  padding: 10px;
  display: flex;
  flex-direction: column;
  transition: all 0.5s ease;
  .logo-wrap {
    margin-bottom: 20px;
    display: flex;
    color: #fff;
    position: relative;
    .logo-box {
      opacity: 0;
      display: flex;
      width: 0;
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
    ul.nav-list {
      margin-top: 20px;
    }
  }
  .profile-wrap {
    color: #fff;
    display: flex;
    margin-top: 10px;
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
          border-radius: 12px;
        }
      }
      .profile-decs {
        flex: 1;
        margin: 0 10px;
        white-space: nowrap;
        .decs-name {
          font-size: 15px;
          font-weight: 400;
        }
        .decs-job {
          font-size: 12px;
        }
      }
    }
    .log-out {
      width: 40px;
      font-size: 32px;
      line-height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      box-sizing: unset;
      padding: 0 5px;
      // padding: 0 7px 0 3px;
      // margin: 5px 0;
      // cursor: pointer;
      // border-radius: 5px;
      // overflow: hidden;
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
        // 渐变出现
        opacity: 1;
        // 内容层填充
        width: 100%;
        transition: all 0.5s ease;
      }
      .menu-btn {
        margin: 0 10px;
      }
    }
    .profile-wrap {
      .profile-box {
        flex: 1;
        width: 100%;
        opacity: 1;
        transition: all 0.5s ease;
      }
      .log-out {
        box-sizing: border-box;
        padding-right: 5px;
        transition: all 0.5s ease;
      }
    }
  }
}
::v-deep.side-bar {
  .nav-wrap {
    ul.nav-list {
      .side-bar-item {
        .tooltip {
          display: block;
        }
        a .nav-label {
          opacity: 0;
          width: 0;
          overflow: hidden;
          transition: all 0.5s ease;
          &:hover {
            transition: unset;
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
