<template>
  <Carousel :data="carouselList" />
</template>

<script>
import Carousel from "components/common/carousel";
import { getAreaRandom } from "network/getWebData";

export default {
  name: "MainCarousel",
  components: { Carousel },
  data() {
    return {
      carouselList: [],
    };
  },
  created() {
    // 获取域下所有分类的随机内容
    getAreaRandom(this.$route.params.area, 6).then((res) => {
      if (res.code === 200) {
        this.carouselList = res.data.map((r) => ({
          url: r.link_url,
          title: r.title,
          cover: `${this.$baseProxy}${r.source_url}${r.cover}`,
        }));
      }
    });
  },
};
</script>

<style lang="less" scoped></style>
