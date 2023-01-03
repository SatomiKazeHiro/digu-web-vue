<template>
  <div id="area">
    <div
      class="m-header"
      :class="{
        hideHeaderNav: $store.state._browserStatus.areaMobileScrollIsDrop,
      }"
    >
      <NormalHeader :selfStyle="{ background: '#000', color: '#eee' }" />
      <div class="carousel-wrap">
        <AreaBanner :carouselList="carouselList" />
      </div>
      <div class="categories-nav" id="categories-nav">
        <div class="nav-content">
          <el-tabs v-model="activeTab" @tab-click="handleTabClick">
            <el-tab-pane label="所有" name="all"></el-tab-pane>
            <el-tab-pane
              v-for="i in categoryList"
              :key="i.category"
              :label="i.web_name || i.category"
              :name="i.category"
            />
          </el-tabs>
        </div>
      </div>
    </div>
    <div class="category-wrap">
      <Category ref="category" @scrollToTop="scrollToTop" />
    </div>
    <div class="footer-wrap"></div>
  </div>
</template>

<script>
import { getCategoryAllName, getAreaRandom } from "network/getWebData";
import NormalHeader from "components/NormalHeader";
import AreaBanner from "components/content/AreaBanner";
import Category from "./Category";
export default {
  name: "Area",
  components: {
    NormalHeader,
    AreaBanner,
    Category,
  },
  data() {
    return {
      windowWidth: null,
      categoryList: [],
      activeTab: this.$route.params.category || "all",
      carouselList: [],
    };
  },
  mounted() {
    // 获取域下所有分类的随机内容
    getAreaRandom(this.$route.params.area, 6).then((res) => {
      console.log(res);
      if (res.code === 200) {
        this.carouselList = res.data;
      }
    });
    // 获取域下所有分类的名字
    getCategoryAllName(this.$route.params.area).then((res) => {
      if (res.code === 200) this.categoryList = res.data;
    });
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

<style lang="scss" scoped>
#area {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  .m-header {
    background: #fff;
    .categories-nav {
      height: 56px;
      background: #fff;
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
      .nav-content {
        width: 1280px;
        padding: 0 15px;
        height: 100%;
        margin: 0 auto;
        .el-tabs.el-tabs--top {
          height: 100%;
          line-height: 56px;
          ::v-deep.el-tabs__header.is-top {
            .el-tabs__nav-wrap::after {
              height: 0;
            }
          }
        }
        ::v-deep .el-tabs__item {
          height: 39px;
        }
      }
    }
  }
  .category-wrap {
    background: #f4f5f7;
  }
}
// 平板 宽屏 1000~1280
@media only screen and (max-width: 1300px) {
  #area {
    .m-header {
      .categories-nav {
        .nav-content {
          width: 1000px;
        }
      }
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
      .carousel-wrap {
        display: none;
      }
      .categories-nav {
        padding: 0 2vw;
        height: 40px;
        &.fiexd-nav {
          position: fixed;
        }
        .nav-content {
          padding: 0;
          width: 100%;
          .el-tabs.el-tabs--top {
            line-height: 40px;
          }
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
