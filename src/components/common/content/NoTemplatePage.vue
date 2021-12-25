<template>
  <div class="no-template">
    <div class="desc-box">
      <img src="~assets/img/web/no-tempalte.png" />
      <p>页面未设置模板，不可显示</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "NoTemplatePage",
};
</script>

<style lang="scss" scoped>
.no-template {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  // background: rgba(0, 0, 0, 1);
  .desc-box {
    width: 25%;
    min-width: 200px;
    max-width: 360px;
    display: flex;
    flex-direction: column;
    text-align: center;
    img {
      width: 100%;
      display: block;
    }
    p {
      margin-top: 15px;
      color: #666666;
      white-space: nowrap;
    }
  }
}
@media only screen and (min-width: 1600px) {
  .no-template {
    .desc-box {
      p {
        font-size: 46px;
      }
    }
  }
}
@media only screen and (max-width: 600px) {
  .no-template {
    .desc-box {
      p {
        font-size: 16px;
      }
    }
  }
}
</style>
