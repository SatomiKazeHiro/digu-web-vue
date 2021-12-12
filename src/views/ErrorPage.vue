<template>
  <div class="error">
    <img src="~assets/img/web/404.png" />
    <h1>页面未找到</h1>
  </div>
</template>

<script>
export default {
  name: "Error",
};
</script>

<style lang="scss" scoped>
.error {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 1);
  h1 {
    margin-top: 15px;
    color: #fff;
  }
}
</style>
