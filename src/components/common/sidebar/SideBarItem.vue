<template>
  <li class="side-bar-item" :class="{ on: $route.path == url }">
    <a @click="$router.push(url ? url : '/')">
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
  mounted() {},
};
</script>

<style lang="less" scoped>
.side-bar-item {
  position: relative;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 10px;
  &.on {
    background: #fff;
    a {
      color: #11101d;
    }
  }
  a {
    display: flex;
    color: #fff;
    .nav-icon {
      min-width: 50px;
      min-height: 50px;
      font-size: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .nav-label {
      flex: 1;
      line-height: 50px;
      margin-left: 8px;
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
    transition: 0;
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
      color: #11101d;
    }
    .tooltip {
      opacity: 1;
      right: -135px;
      transition: all 0.5s ease;
    }
  }
}
</style>
