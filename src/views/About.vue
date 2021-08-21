<template>
  <div class="about">
    <button @click="getData">获取数据</button>
    <h1>This is an about page</h1>
  </div>
</template>


<script>
import axios from "axios";
export default {
  name: "About",
  methods: {
    getData() {
      axios
        .get("/proxy/api/get/item", {
          params: {
            area: "manga",
            id: "17b51774307",
          },
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
