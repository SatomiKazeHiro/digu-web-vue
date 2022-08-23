<template>
  <div id="test">
    <h1>Main Header</h1>
    <main-header></main-header>
    <h1>Normal Header</h1>
    <normal-header type="normal"></normal-header>
    <h1>Gradient Header</h1>
    <normal-header type="gradient"></normal-header>
    <h1>Transparent Header</h1>
    <normal-header type="transparent"></normal-header>
  </div>
</template>

<script>
import MainHeader from "components/MainHeader";
import NormalHeader from "components/NormalHeader";
export default {
  components: {
    MainHeader,
    NormalHeader,
  },
};
</script>

<style lang="scss" scoped>
div#test {
  width: 100%;
  height: 100%;
  background: #333;
}
h1 {
  color: #fff;
  &:not(:first-child){
    margin-top: 25px;
  }
}
</style>
