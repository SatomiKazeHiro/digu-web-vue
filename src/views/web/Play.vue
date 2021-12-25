<template>
  <div class="play">
    <div class="play-wrap" v-if="hasResource"></div>
    <div class="loading-error" v-if="loadingError">加载错误</div>
  </div>
</template>

<script>
import { checkItem } from "network/checkDB";
import { getItem } from "network/getDB";
export default {
  name: "Play",
  data() {
    return {
      // 资源存在
      hasResource: false,
      // 数据请求错误
      loadingError: false,
    };
  },
  mounted() {
    if (this.$route.params.item)
      checkItem(this.$route.params.item).then((res) => {
        // console.log(res);
        if (res.code && res.code == 200) {
          // 请求该资源是否存在成功
          if (res.data) {
            // 该资源存在
            // 往后放一放
            this.hasResource = true;
            if (this.$route.params.area && this.$route.params.category) {
              getItem(
                this.$route.params.area,
                this.$route.params.category,
                this.$route.params.item
              ).then((res) => {
                console.log(res);
              });
            } else this.$router.push("404");
          } else this.$router.push("404");
        } else {
          this.loadingError = true;
        }
      });
  },
};
</script>

<style lang="scss" scoped>
</style>
