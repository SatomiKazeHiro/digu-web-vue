<template>
  <div class="loading-error">
    <div class="desc-box">
      <img src="~assets/img/web/loading-error.png" />
      <p>页面加载失败，请重试</p>
      <div class="btn-box">
        <button>刷新</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NoTemplatePage",
};
</script>

<style lang="less" scoped>
.loading-error {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  // background: rgba(0, 0, 0, 1);
  .desc-box {
    width: 25%;
    min-width: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    img {
      width: 100%;
      max-width: 360px;
      display: block;
    }
    p {
      margin-top: 15px;
      color: #666666;
      white-space: nowrap;
    }
    .btn-box {
      button {
        padding: 6px 15px;
        margin-top: 15px;
        font-size: 14px;
        color: #fff;
        border: none;
        outline: none;
        cursor: pointer;
        background-color: #2c7a9f;
        border-radius: 4px;
      }
    }
  }
}
@media only screen and (min-width: 1600px) {
  .loading-error {
    .desc-box {
      p {
        font-size: 46px;
      }
    }
  }
}
@media only screen and (max-width: 600px) {
  .loading-error {
    .desc-box {
      p {
        font-size: 16px;
      }
    }
  }
}
</style>
