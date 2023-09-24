<template>
  <div id="media" v-cloak>
    <div v-if="!isShow">loading</div>
    <div class="media-wrap" v-else-if="isShow && !noTemplate && !loadingError">
      <NormalHeader
        :type="getHeaderType()"
        v-if="showHeader"
        :selfStyle="
          routerType === 'chapter'
            ? { background: '#181818', color: '#eee' }
            : {}
        "
      />
      <div class="media-content">
        <div v-if="routerType === 'media'">
          <!-- 可以配置的媒体详情的 -->
          <BangumiMedia
            v-if="mediaInfo.template === 'bangumi'"
            :mediaInfo="mediaInfo"
          />
          <MangaMedia
            v-else-if="mediaInfo.template === 'manga'"
            :mediaInfo="mediaInfo"
            padTop="20px"
          />
          <!-- 没有媒体详情页面的 -->
          <VideoPlay
            v-else-if="mediaInfo.template === 'video'"
            :mediaInfo="mediaInfo"
          />
          <link-to-404 v-else />
        </div>
        <div v-else-if="routerType === 'play'">
          <MangaPlay
            v-if="mediaInfo.template === 'manga' && mediaInfo.type === 'normal'"
            :mediaInfo="mediaInfo"
          />
          <link-to-404 v-else />
        </div>
        <div v-else-if="routerType === 'chapter'">
          <BangumiChapter
            v-if="
              mediaInfo.template === 'bangumi' && mediaInfo.type === 'normal'
            "
            :mediaInfo="mediaInfo"
          />
          <MangaPlay
            v-else-if="
              mediaInfo.template === 'manga' && mediaInfo.type === 'serial'
            "
            :mediaInfo="mediaInfo"
          />
          <link-to-404 v-else />
        </div>
      </div>
    </div>
    <NoTemplatePage v-else-if="isShow && noTemplate" />
    <LoadingErrorPage v-else-if="isShow && loadingError" />
  </div>
</template>

<script>
import NormalHeader from "components/normal-header";
import { getResourcesValidity } from "network/handleConfig";
import { getItem } from "network/getWebData";
import { sortObjNameAsWin } from "utils/sort";
import LinkTo404 from "./page/LinkTo404";
import LoadingErrorPage from "./page/LoadingErrorPage";
import NoTemplatePage from "./page/NoTemplatePage";
import BangumiChapter from "./template/bangumi/chapter";
import BangumiMedia from "./template/bangumi/media";
import MangaMedia from "./template/manga/media";
import MangaPlay from "./template/manga/play";
import VideoPlay from "./template/video/play";

export default {
  name: "Media",
  components: {
    NormalHeader,
    NoTemplatePage,
    LoadingErrorPage,
    BangumiMedia,
    BangumiChapter,
    MangaMedia,
    VideoPlay,
    MangaPlay,
    LinkTo404,
  },
  data() {
    return {
      routerType: null,
      isShow: false,
      noTemplate: false,
      loadingError: false,
      mediaInfo: {},
    };
  },
  beforeRouteEnter(to, from, next) {
    if (to.meta.type) next((vm) => (vm.routerType = to.meta.type));
  },
  computed: {
    showHeader() {
      let hides = {
        manga: ["play", "chapter"],
      };
      if (
        hides[this.mediaInfo.template] &&
        hides[this.mediaInfo.template].includes(this.routerType)
      )
        return false;
      else return true;
    },
  },
  mounted() {
    this.getResource();
  },
  methods: {
    getHeaderType() {
      let isPc = this.$store.getters.isPc;
      let isMobile = this.$store.getters.isMobile;
      let template = this.mediaInfo.template;
      if (isPc && template === "bangumi") return "gradient";
      else return "normal";
    },

    getResource() {
      let { area, category, item: resourceId } = this.$route.params;
      // 判断路由参数，域，分类，资源项目id，缺一不可
      if (area && category && resourceId) {
        // 检查资源项目是否存在
        getResourcesValidity({ resourceId })
          .then(() => {
            // 获取资源详情
            getItem({ area, category, resourceId })
              .then((res) => {
                let coverPath = `/proxy${res.sources_url}${res.cover}`;
                let coverBgImgStyle = `background-image: url("${coverPath}");`;
                this.mediaInfo = {
                  ...res,
                  coverPath,
                  coverBgImgStyle,
                  files_detail:
                    res.type === "serial"
                      ? res.files_detail
                          .filter((f) => f.type === "directory")
                          .sort(sortObjNameAsWin)
                      : res.type === "normal"
                      ? res.files_detail
                          .filter((f) => f.type !== "directory")
                          .sort(sortObjNameAsWin)
                      : [],
                };
              })
              .catch((err) => {
                if (err.data.type === "no-Template") this.noTemplate = true;
                else this.loadingError = true;
              })
              .finally(() => (this.isShow = true));
          })
          .catch((err) => {
            // 数据获取失败
            this.isShow = this.loadingError = true;
          });
      } else {
        console.log("area, category, item 数据缺失：", area, category, item);
        this.$router.push("/404");
      }
    },
  },
};
</script>

<style lang="less" scoped>
#media {
  height: 100%;
  overflow-y: auto;
  background: #f4f5f7;
  position: relative;
  .media-wrap {
    height: 100%;
    display: flex;
    flex-direction: column;
    .media-content {
      flex: 1;
    }
  }
}
// 平板 宽屏 1024~1280
@media only screen and (max-width: 1300px) {
}

// 手机 平板 <1024
@media only screen and (max-width: 1044px) {
  #media {
    .media-wrap {
      .media-content {
        overflow-y: auto;
      }
    }
  }
}

// 手机 <748
@media only screen and (max-width: 788px) {
}
</style>
