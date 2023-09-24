<template>
  <Carousel gradient="bottom" :data="carouselList" v-bind="$attrs" />
</template>

<script>
import Carousel from "components/common/carousel";
import { getItemRandom, getAreaRandom } from "network/getWebData";

export default {
  name: "MainCarousel",
  components: { Carousel },
  inheritAttrs: false,
  props: {
    type: { type: String, default: "" },
    area: { type: String, default: "" },
    category: { type: String, default: "" },
    limit: { type: Number, default: 6 },
  },
  data() {
    return {
      carouselList: [],
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      let { limit } = this;
      let setData = (res) => {
        this.carouselList = res.map((r) => ({
          url: r.link_url,
          title: r.title,
          cover: `${this.$baseProxy}${r.source_url}${r.cover}`,
          intro: r.intro,
          area_web_name: r.area_web_name,
          category_web_name: r.category_web_name,
        }));
      };

      if (this.type == "item") {
        getItemRandom({ limit }).then((res) => setData(res));
      } else if (type == "area") {
        let { area } = this || this.$route.params;
        if (area) getAreaRandom({ area, limit }).then((res) => setData(res));
      }
    },
  },
};
</script>

<style lang="less" scoped></style>
