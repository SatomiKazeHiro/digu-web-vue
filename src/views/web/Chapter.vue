<template>
  <div id="chapter" v-cloak>
    <div
      class="chapter-wrap"
      :class="{ 'opacity-0': !isShow }"
      v-if="isShow && !noTemplate && !loadingError"
    >
      <normal-header :selfStyle="{ background: '#181818', color: '#eee' }">
        <img :src="$store.state._user.header" slot="user-img" />
      </normal-header>
      <div class="chapter-content">
        <bangumi-template :mediaInfo="mediaInfo"></bangumi-template>
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
import bangumiTemplate from "./template/bangumi/chapter.vue";
export default {
  name: "Chapter",
  components: {
    NormalHeader,
    NoTemplatePage,
    LoadingErrorPage,
    bangumiTemplate,
  },
  data() {
    return {
      // 展示标志
      isShow: false,
      // 模板标志
      noTemplate: false,
      // 数据加载标志
      loadingError: false,
      // 媒体信息
      mediaInfo: "",
    };
  },
  mounted() {
    this.initChapter();
  },
  methods: {
    initChapter() {
      // 判断路由参数，域，分类，资源项目id，缺一不可
      if (this.$route.params.area && this.$route.params.category && this.$route.params.item) {
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
                    this.mediaInfo = res.data;
                    this.isShow = true;
                  } else if (res.code && res.code === 400 && res.data.type === "no-Template") {
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
  },
};
</script>

<style lang="scss" scoped>
#chapter {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background: #f4f5f7;
  .chapter-wrap {
    height: 100%;
    display: flex;
    flex-direction: column;
    .chapter-content {
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
    .chapter-wrap {
      .chapter-content {
        overflow-y: auto;
      }
    }
  }
}
</style>
