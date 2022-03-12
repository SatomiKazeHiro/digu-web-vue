<template>
  <div class="media" v-cloak>
    <div
      class="media-wrap"
      :class="{ 'opacity-0': !isShow }"
      v-if="isShow && !noTemplate && !loadingError"
    >
      <normal-header>
        <img
          :src="getHead($store.state._user.userHeaderPath)"
          slot="user-img"
        />
      </normal-header>
      <div class="media-info-wrap">
        <div class="info-bg-wrap">
          <div class="info-blurbg-wrapper">
            <div class="info-blurbg" :style="coverBgImgStyle"></div>
          </div>
        </div>
        <div class="info-content-wrap">
          <div class="media-info-inner clearfix">
            <div class="media-preview fl">
              <div class="common-lazy-img">
                <img
                  :src="coverPath"
                  class="opacity-0"
                  :ref="'cover' + mediaInfo.id"
                  @load="showImg('cover' + mediaInfo.id)"
                />
              </div>
            </div>
            <div class="media-info-r">
              <div class="media-info-title">
                <span class="media-info-title-t">{{ mediaInfo.title }}</span>
                <div class="media-tags" v-if="mediaInfo.tags">
                  <span v-if="mediaInfo.tags.length == 0">无标签</span>
                  <span
                    class="media-tag"
                    v-for="i in mediaInfo.tags"
                    :key="i"
                    >{{ i }}</span
                  >
                </div>
              </div>
              <div class="media-info-status">
                <span class="status" v-if="mediaInfo.status">{{
                  mediaInfo.status
                }}</span>
                <span class="status" v-else>状态未知</span>
              </div>
              <div class="media-info-intro">
                <span class="media-info-intro-text" v-if="mediaInfo.intro">
                  {{ mediaInfo.intro }}
                </span>
                <span class="media-info-intro-text" v-else>无简介</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <item-media-tags></item-media-tags>
    </div>
    <no-template-page v-if="isShow && noTemplate"></no-template-page>
    <loading-error-page v-if="isShow && loadingError"></loading-error-page>
  </div>
</template>

<script>
import { checkItem } from "network/checkResource";
import { getItem } from "network/getWebData";
import NormalHeader from "components/NormalHeader";
import ItemMediaTags from "components/content/ItemMediaTags";
import NoTemplatePage from "components/content/NoTemplatePage";
import LoadingErrorPage from "components/content/LoadingErrorPage";
export default {
  name: "Media",
  components: {
    NormalHeader,
    ItemMediaTags,
    NoTemplatePage,
    LoadingErrorPage,
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
                  this.coverPath = "/proxy" + res.data.url + res.data.cover;
                  this.coverBgImgStyle =
                    'background-image: url("' + this.coverPath + '");';
                  this.mediaInfo = res.data;
                  this.isShow = true;
                } else if (
                  res.code &&
                  res.code === 403 &&
                  res.data.type === "no-Template"
                ) {
                  // 显示没有设置模板
                  this.isShow = true;
                  this.noTemplate = true;
                }
              },
              (err) => {
                // 数据获取失败
                this.isShow = true;
                this.loadingError = true;
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
    showImg(ref) {
      this.$refs[ref].classList.toggle("opacity-0");
    },
    handleTabClick() {},
    // 获取头像
    getHead(path) {
      return require("../../" + path);
    },
  },
};
</script>

<style lang="scss" scoped>
.media {
  height: 100%;
  background: #f4f5f7;
  .media-wrap {
    height: 100%;
    .media-info-wrap {
      .info-bg-wrap {
        position: relative;
        .info-blurbg-wrapper {
          height: 446px;
          width: 100%;
          position: absolute;
          overflow: hidden;
          left: 0;
          top: -56px;
          -webkit-transform: translateZ(0);
          transform: translateZ(0);
          &::before {
            content: "";
            display: block;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.3);
            filter: progid:DXImageTransform.Microsoft.Gradient(startColorstr=rgba(72,0,0,0),0,endColorstr=rgba(72,0,0,0),0);
            position: absolute;
            top: 0;
            left: 0;
            z-index: 1;
          }
          .info-blurbg {
            position: absolute;
            background-size: cover;
            background-position: 50%;
            width: 110%;
            min-width: 1120px;
            height: 100%;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-repeat: no-repeat;
            -webkit-filter: blur(40px);
            -moz-filter: blur(40px);
            -ms-filter: blur(40px);
            filter: blur(40px);
          }
        }
      }
      .info-content-wrap {
        position: relative;
        width: 1280px;
        margin: 0 auto;
        .media-info-inner {
          padding: 44px 0 38px;
          .media-preview {
            height: 308px;
            width: 233px;
            box-sizing: border-box;
            display: inline-block;
            border: 4px solid #ffffff;
            border-radius: 10px;
            overflow: hidden;
            .common-lazy-img {
              height: 100%;
              width: 100%;
              background-size: 50px;
              display: inline-block;
              vertical-align: top;
              img {
                display: block;
                height: 300px;
                width: 225px;
                object-fit: cover;
                border-radius: 4px;
              }
            }
          }
          .media-info-r {
            margin-left: 260px;
            // margin-right: 58px;
            color: #ffffff;
            .media-info-title {
              .media-info-title-t {
                display: inline-block;
                font-size: 20px;
                line-height: 24px;
                font-weight: 700;
                color: #fff;
              }
              .media-tags {
                padding: 15px 0 10px;
                .media-tag {
                  font-size: 12px;
                  vertical-align: middle;
                  margin-right: 10px;
                  height: 20px;
                  padding: 0 4px;
                  line-height: 20px;
                  color: #fff;
                  border: 1px solid #fff;
                  border-radius: 3px;
                  white-space: nowrap;
                }
              }
            }
            .media-info-status {
              margin-top: 15px;
              .status {
                height: 17px;
                line-height: 17px;
                font-size: 12px;
                color: #fff;
              }
            }
            .media-info-intro {
              margin-top: 11px;
              font-size: 12px;
              color: #fff;
              line-height: 20px;
            }
          }
        }
      }
    }
  }
}
// 平板 宽屏 1000~1280
@media only screen and (max-width: 1300px) {
  .media {
    .media-wrap {
      .media-info-wrap {
        .info-bg-wrap {
          .info-blurbg-wrapper {
            height: 356px;
          }
        }
        .info-content-wrap {
          width: 1000px;
          .media-info-inner {
            padding: 29px 0 25px;
            .media-preview {
              width: 176.88px;
              height: 246px;
              border: 3px solid #ffffff;
              .common-lazy-img {
                img {
                  width: 170.88px;
                  height: 240px;
                }
              }
            }
            .media-info-r {
              margin-left: 197.88px;
              .media-info-title {
                .media-info-title-t {
                  font-size: 18px;
                  line-height: 24px;
                }
              }
              .media-info-status {
                margin-top: 10px;
              }
            }
          }
        }
      }
    }
  }
}
// 手机 平板 <1000
@media only screen and (max-width: 1024px) {
  .media {
    .media-wrap {
      .media-info-wrap {
        .info-bg-wrap {
          .info-blurbg-wrapper {
            height: 296px;
          }
        }
        .info-content-wrap {
          width: 100%;
          padding: 0 2.33vw;
          .media-info-inner {
            padding: 22px 0 14px;
            .media-preview {
              width: 139.28px;
              height: 194px;
              border: 2px solid #ffffff;
              .common-lazy-img {
                img {
                  width: 135.28px;
                  height: 190px;
                }
              }
            }
            .media-info-r {
              margin-left: 154.28px;
              .media-info-title {
                .media-info-title-t {
                  font-size: 16px;
                  font-weight: 600;
                }
              }
              .media-info-status {
                margin-top: 5px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
