<template>
  <div class="chapter" v-cloak>
    <h1>Chapter</h1>
  </div>
</template>

<script>
import { checkItem } from "network/checkResource";
export default {
  name: "Chapter",
  created() {
    console.log(this.$route.params.item, this.$route.params.chapter);
    if (this.$route.params.item)
      checkItem(this.$route.params.item).then((res) => {
        console.log(res);
      });
  },
};
</script>

<style lang="scss" scoped>
</style>
