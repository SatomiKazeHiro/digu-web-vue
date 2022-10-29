<template>
  <div class="digu-banner">
    <img src="~assets/img/web/bg.png" />
  </div>
</template>

<script>
export default {
  name: "DiguBanner",
};
</script>

<style lang="scss" scoped>
.digu-banner {
  height: 200px;
  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: relative;
  }
}

// 平板 宽屏 1000~1280
@media only screen and (max-width: 1300px) {
  .digu-banner {}
}

// 手机 平板 <1024
@media only screen and (max-width: 1044px) {
  .digu-banner {
    height: 48px;
    > img {
      display: none;
    }
  }
}
</style>
