<template>
  <div class="error">
    <div class="desc-box">
      <img src="~assets/img/web/404.png" />
      <p>页面未找到</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ErrorPage",
};
</script>

<style lang="less" scoped>
.error {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 1);
  .desc-box {
    width: 25%;
    min-width: 200px;
    max-width: 360px;
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
      color: #fff;
      white-space: nowrap;
      font-size: 3vw;
      background-image: -webkit-linear-gradient(225deg, rgb(47, 47, 48), rgb(143, 58, 92));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
}
@media only screen and (min-width: 1600px) {
  .error {
    .desc-box {
      p {
        font-size: 46px;
      }
    }
  }
}
@media only screen and (max-width: 600px) {
  .error {
    .desc-box {
      p {
        font-size: 16px;
      }
    }
  }
}
</style>
