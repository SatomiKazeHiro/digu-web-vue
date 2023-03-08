<template>
  <div class="nav-search">
    <form id="nav_searchform" :style="{ 'border-radius': brs }">
      <input class="nav-search-keywords" type="text" placeholder="搜索" />
      <div
        class="nav-search-btn"
        :style="{
          'border-top-right-radius': brs,
          'border-bottom-right-radius': brs,
        }"
      >
        <button>
          <svg-icon icon-class="header-search"></svg-icon>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "NavSearch",
  props: {
    brs: {
      type: String,
      default() {
        return "";
      },
    },
  },
};
</script>

<style lang="less" scoped>
.nav-search {
  position: relative;
  #nav_searchform {
    display: block;
    padding: 0 36px 0 8px;
    border: 1px solid hsla(0, 0%, 100%, 0);
    border-radius: 4px;
    background-color: #404040;
    height: 32px;
    .nav-search-keywords {
      overflow: hidden;
      height: 30px;
      border: none;
      background-color: transparent;
      box-shadow: none;
      color: #999;
      font-size: 14px;
      line-height: 34px;
      transition: all 0.2s;
      &:focus {
        outline: none;
      }
    }
    .nav-search-btn {
      position: absolute;
      top: 1px;
      right: 5px;
      margin: 0;
      padding: 0;
      width: 30px;
      height: 30px;
      border: none;
      line-height: 30px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      button {
        font-size: 20px;
        line-height: 20px;
        cursor: pointer;
        transition: all 0.2s;
        background: none;
        outline: none;
        border: none;
        color: #a1a1a1;
        &:hover {
          color: rgba(0, 161, 214, 1);
          transition: all 0.2s;
        }
      }
    }
  }
}
</style>
