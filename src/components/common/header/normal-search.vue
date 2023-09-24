<template>
  <div class="normalsearch">
    <form class="normalsearchform" :style="{ 'border-radius': brs }">
      <input class="nav-search-keywords" type="text" />
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
  name: "NormalSearch",
  props: {
    brs: { type: String, default: "" },
  },
};
</script>

<style lang="less" scoped>
.normalsearch {
  position: relative;
  .normalsearchform {
    display: block;
    padding: 0 56px 0 16px;
    border: 1px solid #e7e8e9;
    border-radius: 2px;
    background-color: #fff;
    height: 36px;
    .nav-search-keywords {
      overflow: hidden;
      width: 100%;
      height: 34px;
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
      top: 0;
      right: 0;
      margin: 0;
      padding: 0;
      width: 48px;
      height: 36px;
      border: none;
      border-radius: 2px;
      background: #e7e7e7;
      line-height: 26px;
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
        color: #797979;
        &:hover {
          color: rgba(0, 161, 214, 1);
          transition: all 0.2s;
        }
      }
    }
  }
}

@media only screen and (max-width: @digu-md) {
  .normalsearch {
    .normalsearchform {
      height: 28px;
      padding: 0 16px 0 36px;
      border-radius: 18px;
      background: #f2f2f2;
      display: flex;
      .nav-search-btn {
        left: 0;
        top: 0;
        background: transparent;
        height: 28px;
        line-height: 28px;
        width: 36px;
      }
      .nav-search-keywords {
        height: 26px;
        line-height: 26px;
      }
    }
  }
}
</style>
