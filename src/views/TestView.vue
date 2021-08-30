<template>
  <div>
    <h1>TestView</h1>
    <h3>{{ $route.params.area }}</h3>
  </div>
</template>

<script>
export default {
  name: "TestView",
  created(){
    // if(this.$route.params.area) redirect()
  },
  mounted() {
    // console.log(this.$route.params);
  },
};
</script>

<style>
</style>
