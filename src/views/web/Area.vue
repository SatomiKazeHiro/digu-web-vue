<template>
  <div id="area">
    <div
      class="m-header"
      :class="{
        hideHeaderNav: getHideHeaderNav,
      }"
    >
      <NormalHeader :selfStyle="{ background: '#000', color: '#eee' }" />
    </div>
    <div class="category-wrap">
      <Category ref="category" @scrollToTop="scrollToTop" />
    </div>
    <div class="footer-wrap"></div>
  </div>
</template>

<script>
import AreaBanner from "components/content/area-banner";
import MainCarousel from "components/content/main-carousel";
import NormalHeader from "components/normal-header";
import { getCategoryAllName } from "network/getWebData";
import Category from "./Category";

export default {
  name: "Area",
  components: {
    NormalHeader,
    AreaBanner,
    Category,
    MainCarousel,
  },
  data() {
    return {
      windowWidth: null,
      categoryList: [],
      activeTab: this.$route.params.category || "all",
    };
  },
  computed: {
    getHideHeaderNav() {
      return this.$store.state._browserStatus.areaMobileScrollIsDrop;
    },
  },
  mounted() {
    let { area } = this.$route.params;
    getCategoryAllName(area).then((res) => (this.categoryList = res));
  },
  watch: {
    $route(to, from) {
      this.activeTab = this.$route.params.category || "all";
    },
  },
  methods: {
    // tab 控制路由
    handleTabClick() {
      let url = `/${this.$route.params.area}${
        this.activeTab === "all" ? "" : "/" + this.activeTab
      }`;
      this.$router.push(url);
    },

    // 跳转到顶部
    scrollToTop() {
      document.getElementById("area").scrollTop =
        document.getElementById("area").scrollTop +
        document.getElementById("categories-nav").getBoundingClientRect().top;
    },
  },
};
</script>

<style lang="less" scoped>
#area {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background: #f4f5f7;
  .m-header {
    background: #fff;
  }
  .category-wrap {
  }
}
// 平板 宽屏 1000~1280
@media only screen and (max-width: 1300px) {
  #area {
    .m-header {
    }
  }
}
// 手机 平板 <1000
@media only screen and (max-width: 1024px) {
  #area {
    height: 100%;
    overflow: hidden;
    position: relative;
    .m-header {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      transition: transform 0.25s;
      z-index: 50;
      &.hideHeaderNav {
        transform: translateY(-48px);
        .normal-header {
          opacity: 0;
        }
      }
    }
    .category-wrap {
      position: absolute;
      // nav 48 + tag 40
      top: 40px;
      left: 0;
      width: 100%;
      height: 100%;
      // padding-bottom: 40px;
      transition: transform 0.25s;
      z-index: 4;
    }
  }
}
</style>
