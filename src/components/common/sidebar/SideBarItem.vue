<template>
  <li class="side-bar-item">
    <a href="">
      <div class="nav-icon">
        <slot name="nav-icon"></slot>
      </div>
      <div class="nav-label">
        <slot name="nav-label"></slot>
      </div>
    </a>
    <slot name="tooltip"></slot>
  </li>
</template>

<script>
export default {
  name: "SideBarItem",
  props: {
    color: {
      type: String,
      default() {
        return "#11101d";
      },
    },
    url: {
      type: String,
      default() {
        return "";
      },
    },
  },
  mounted() {
    console.log(this.url);
  },
};
</script>

<style lang="scss" scoped>
.side-bar-item {
  position: relative;
  // display: flex;
  // flex-wrap: nowrap;
  // align-items: center;
  padding-right: 10px;
  border-radius: 5px;
  // overflow: hidden;
  cursor: pointer;
  margin-bottom: 10px;
  a {
    display: flex;
    .nav-icon {
      // 限制大小
      min-width: 50px;
      min-width: 50px;
      min-height: 50px;
      min-height: 50px;
      font-size: 28px;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .nav-label {
      flex: 1;
      // background: red;
      line-height: 50px;
      color: #fff;
      margin-left: 8px;
      //超过一行省略号
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      span {
        width: 100%;
      }
    }
  }
  .tooltip {
    position: absolute;
    top: 5px;
    right: -105px;
    width: 115px;
    padding: 0 10px;
    height: 40px;
    line-height: 40px;
    background: #fff;
    border-radius: 5px;
    color: #11101d;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    opacity: 0;
    transition: 0s;
    text-align: center;
    font-weight: bold;
    //超过一行省略号
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  &:hover {
    background: #fff;
    a {
      .nav-icon {
        color: #11101d;
      }
      .nav-label {
        color: #11101d;
      }
    }
    .tooltip {
      opacity: 1;
      right: -135px;
      transition: all 0.5s ease;
    }
  }
}
</style>
