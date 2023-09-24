<template>
  <div id="web">
    <normal-header type="gradient" class="web-header" />
    <div class="web-random-banner">
      <main-carousel type="item" :wrapStyle="{ paddingTop: '64px' }" />
    </div>
    <div class="web-content-wrap">
      <div class="inner-wrap">
        <WebAreaPanel v-for="i in areas" :key="i.area" :area="i" />
      </div>
    </div>
    <!-- <router-view /> -->
    <div class="mobile-env-wrap">
      <WebItemBanner :list="bannerItems" />
      <WebItemRecommend :list="recommendItems" />
    </div>
  </div>
</template>

<script>
import WebAreaPanel from "components/content/web-area-panel";
import NormalHeader from "components/normal-header";
import MainCarousel from "components/content/main-carousel";
import WebItemBanner from "components/content/web-item-banner";
import { getAreaAllName, getAreaRandom, getItemRandom } from "network/getWebData";
import WebItemRecommend from "components/content/web-item-recommend";

export default {
  name: "Web",
  components: { NormalHeader, MainCarousel, WebAreaPanel, WebItemBanner, WebItemRecommend },
  data() {
    return {
      areas: [],
      itemLimit: 12, // 轮播图的随机资源
      bannerItems: [],
      areaItemLimit: 12, // 每个栏目获取随机12个
      recommendItems: [], // 列表随机资源
    };
  },
  mounted() {
    this.getRandomSources().then((res) => (this.bannerItems = res));
    this.getRandomSources().then((res) => (this.recommendItems = res));

    // 获取所有的域名
    getAreaAllName(false).then(async (res) => {
      // 通过 async/await 按顺序请求，使得页面排版固定
      for (let i = 0; i < res.length; i++) {
        let areaObj = res[i];
        let resArea = await getAreaRandom({ area: areaObj.area, limit: this.areaItemLimit });
        this.areas.push({
          title: areaObj.web_name || areaObj.area,
          area: areaObj.area,
          list: resArea,
        });
      }
    });
  },
  methods: {
    async getRandomSources() {
      let res = (await getItemRandom({ limit: this.itemLimit })) || [];
      res = res.map((i) => ({
        ...i,
        cover: `/proxy${i.source_url}${i.cover}`,
      }));
      return Promise.resolve(res);
    },
  },
};
</script>

<style lang="less" scoped>
@import "styles/page.web.less";
</style>
