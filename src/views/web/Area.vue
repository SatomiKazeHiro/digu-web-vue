<template>
  <div id="area">
    <div
      class="m-header"
      :class="{
        hideHeaderNav: $store.state._browserStatus.areaMobileScrollIsDrop,
      }"
    >
      <normal-header pcBgColor="#333" mobileBgColor="transparent">
        <img :src="$store.state._user.header" slot="user-img" />
      </normal-header>
      <div class="carousel-wrap" v-cloak>
        <el-carousel :interval="4000" type="card" :height="getAppWidth()">
          <el-carousel-item v-for="i in carouselList" :key="'cl' + i.id">
            <div class="item-cover">
              <a :href="i.link_url">
                <img
                  :ref="'area_cl' + i.id"
                  class="opacity-0"
                  :src="`/proxy${i.source_url}${i.cover}`"
                  @load="showImg(i.id)"
                />
              </a>
            </div>
          </el-carousel-item>
        </el-carousel>
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
            ></el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
    <div class="category-wrap">
      <Category ref="category" @scrollToTop="scrollToTop"></Category>
    </div>
    <div class="footer-wrap"></div>
  </div>
</template>

<script>
import { getCategoryAllName, getAreaRandom } from "network/getWebData";
import NormalHeader from "components/NormalHeader";
import Category from "./Category";
export default {
  name: "Area",
  components: {
    NormalHeader,
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

    // 在封面加载完后渐变显示
    showImg(id) {
      this.$refs["area_cl" + id][0].classList.toggle("opacity-0");
    },

    // 获取应用窗口宽度
    getAppWidth() {
      if (this.$store.state._browserStatus.appWidth > 1300) return "480px";
      else if (this.$store.state._browserStatus.appWidth > 960) return "380px";
      else return "";
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
    .carousel-wrap {
      padding-top: 8px;
      background: #000;
      // el 走马灯样式
      .el-carousel.el-carousel--horizontal.el-carousel--card {
        max-width: 1920px;
        margin: 0 auto;
        .el-carousel__item.el-carousel__item--card {
          border-radius: 4px;
          overflow: hidden;
          .item-cover {
            width: 100%;
            height: 100%;
            a {
              width: 100%;
              height: 100%;
              img {
                width: 100%;
                height: 100%;
                object-fit: cover;
              }
            }
          }
        }
      }
      // 底色
      .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
      }
      .el-carousel__item:nth-child(2n + 1) {
        background-color: #d3dce6;
      }
      // 遮罩
      ::v-deep .el-carousel__mask {
        background: rgb(0, 0, 0) !important;
      }
    }
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
// element-ui走马灯样式
::v-deep li.el-carousel__indicator {
  &.is-active button.el-carousel__button {
    background-color: #00a1d6;
  }
  button.el-carousel__button {
    height: 10px;
    width: 10px;
    opacity: 1;
    border: 2px solid transparent;
    border-radius: 50%;
    background-color: #fff;
    vertical-align: middle;
    cursor: pointer;
    transition: all 0.2s;
    &:hover {
      border: 2px solid #fff;
      background-color: #00a1d6;
      transform: scale(1.3);
    }
  }
}
</style>
