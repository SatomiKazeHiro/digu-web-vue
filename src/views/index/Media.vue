<template>
  <div class="media">
    <normal-header>
      <img :src="getHead($store.state._user.userHeaderPath)" slot="user-img" />
    </normal-header>
    <div class="media-info-wrap">
      <div class="info-bg-wrap">
        <div class="info-blurbg-wrapper">
          <div class="info-blurbg" :style="coverBgImg"></div>
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
                <span class="media-tag" v-for="i in mediaInfo.tags" :key="i">{{
                  i
                }}</span>
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
</template>

<script>
import { getItem } from "network/getDB";
import NormalHeader from "components/NormalHeader";
import ItemMediaTags from "components/common/content/ItemMediaTags";
export default {
  name: "Media",
  components: {
    NormalHeader,
    ItemMediaTags,
  },
  data() {
    return {
      coverPath: "",
      coverBgImg: "",
      mediaInfo: {},
    };
  },
  mounted() {
    console.log(this.$route.params.item);
    getItem(this.$route.params.item).then((res) => {
      this.coverPath = "/proxy" + res.data.url + res.data.cover;
      this.coverBgImg = 'background-image: url("' + this.coverPath + '");';
      this.mediaInfo = res.data;
      console.log(res);
    });
  },
  methods: {
    getInitData() {},
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
// 平板 宽屏 1000~1280
@media only screen and (max-width: 1300px) {
  .media {
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
// 手机 平板 <1000
@media only screen and (max-width: 1024px) {
  .media {
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
</style>
