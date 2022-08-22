<template>
  <div id="media" v-cloak>
    <div
      class="media-wrap"
      :class="{ 'opacity-0': !isShow }"
      v-if="isShow && !noTemplate && !loadingError"
    >
      <normal-header :style="getNavStyle()">
        <img :src="$store.state._user.header" slot="user-img" />
      </normal-header>
      <div class="media-content">
        <bangumi-template
          v-if="mediaInfo.template === 'bangumi'"
          :coverPath="coverPath"
          :coverBgImgStyle="coverBgImgStyle"
          :mediaInfo="mediaInfo"
        ></bangumi-template>
        <video-template v-if="mediaInfo.template === 'video'"></video-template>
      </div>
    </div>
    <no-template-page v-if="isShow && noTemplate"></no-template-page>
    <loading-error-page v-if="isShow && loadingError"></loading-error-page>
  </div>
</template>

<script>
import { checkItem } from "network/checkResource";
import { getItem } from "network/getWebData";
import NormalHeader from "components/NormalHeader";
import NoTemplatePage from "./page/NoTemplatePage";
import LoadingErrorPage from "./page/LoadingErrorPage";
import bangumiTemplate from "./mediaTemplate/bangumiTemplate";
import videoTemplate from "./playTemplate/videoTemplate.vue"
export default {
  name: "Media",
  components: {
    NormalHeader,
    NoTemplatePage,
    LoadingErrorPage,
    bangumiTemplate,
    videoTemplate
  },
  data() {
    return {
      // 展示标志
      isShow: false,
      // 模板标志
      noTemplate: false,
      // 数据加载标志
      loadingError: false,

      // 封面路径
      coverPath: "",
      // 封面作为背景的样式
      coverBgImgStyle: "",
      // 资源项目的信息
      mediaInfo: {},
    };
  },
  mounted() {
    // 判断路由参数，域，分类，资源项目id，缺一不可
    if (
      this.$route.params.area &&
      this.$route.params.category &&
      this.$route.params.item
    ) {
      // 检查资源项目是否存在
      checkItem(this.$route.params.item).then(
        (res) => {
          console.log(res);
          if (res && res.code === 200 && res.data === true) {
            // 获取资源项目的详细数据
            getItem(
              this.$route.params.area,
              this.$route.params.category,
              this.$route.params.item
            ).then(
              (res) => {
                console.log(res);
                if (res.code && res.code === 200) {
                  this.coverPath =
                    "/proxy" + res.data.sources_url + res.data.cover;
                  this.coverBgImgStyle =
                    'background-image: url("' + this.coverPath + '");';
                  this.mediaInfo = res.data;
                  this.isShow = true;
                } else if (
                  res.code &&
                  res.code === 400 &&
                  res.data.type === "no-Template"
                ) {
                  // 显示没有设置模板
                  this.noTemplate = true;
                  this.isShow = true;
                }
              },
              (err) => {
                // 数据获取失败
                this.loadingError = true;
                this.isShow = true;
              }
            );
          } else this.$router.push("/404");
        },
        (err) => {
          // 数据获取失败
          this.isShow = true;
          this.loadingError = true;
        }
      );
    } else {
      // 路径参数不正确则跳转至404页面
      this.$router.push("/404");
    }
  },
  methods: {
    getNavStyle() {
      let isPc = this.$store.getters.isPc;
      let isMobile = this.$store.getters.isMobile;
      let template = this.mediaInfo.template;
      if (isPc && template === "video") {
        return {
          color: "#333",
          backgroundColoe: "#fff",
        };
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#media {
  height: 100%;
  width: 100%;
  overflow-y: auto;
  background: #f4f5f7;
  .media-wrap {
    height: 100%;
    display: flex;
    flex-direction: column;
    .media-content {
      flex: 1;
    }
  }
}
// 平板 宽屏 1000~1280
@media only screen and (max-width: 1300px) {
}

// 手机 平板 <1000
@media only screen and (max-width: 1044px) {
  #media {
    .media-wrap {
      .media-content {
        overflow-y: auto;
      }
    }
  }
}
</style>
