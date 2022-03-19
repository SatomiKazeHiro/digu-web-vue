<template>
  <div class="bangumi-template">
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
    <div class="media-tab-wrap">
      <div class="media-tab-nav">
        <ul class="clearfix">
          <li
            :class="{ on: currentTagID == i.tagID }"
            @click="currentTagID = i.tagID"
            v-for="i in navTags"
            :key="i.tagID"
          >
            {{ i.label }}
          </li>
        </ul>
      </div>
      <div class="media-tab-content" v-if="currentTagID === 1">
        <div class="media-tab-detail-wrap">
          <div class="media-tab-detail">
            <div class="media-tab-module-content">
              <!-- <div class="sl-ep-nav">
                <ul class="sl-ep-nav-list">
                  <li class="sl-ep-nav-item on">第1话-第12话</li>
                  <li class="sl-ep-nav-item">第13话-第24话</li>
                </ul>
              </div> -->
              <div class="sl-ep-list">
                <ul>
                  <li class="misl-ep-item" v-for="i in handleVideos()" :key="i">
                    <div class="misl-ep-index" @click="handleChapterPlay(i)">
                      {{ i }}
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="media-tab-content" v-if="currentTagID === 2">作品关联</div>
    </div>
    <!-- <item-media-tags
      :link_url="mediaInfo.link_url"
      :sources_url="mediaInfo.sources_url"
      :files="mediaInfo.files"
    ></item-media-tags> -->
  </div>
</template>

<script>
import ItemMediaTags from "../ItemMediaTags";
export default {
  components: {
    ItemMediaTags,
  },
  props: {
    coverPath: "",
    coverBgImgStyle: "",
    mediaInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      supportedVideoFormats: ["mp4", "webm", "ogg"],
      navTags: [
        { label: "作品详情", tagID: 1 },
        { label: "作品关联", tagID: 2 },
      ],
      currentTagID: 1,
    };
  },
  methods: {
    showImg(ref) {
      this.$refs[ref].classList.toggle("opacity-0");
    },
    handleVideos() {
      // 遍历出视频文件
      let supportedArr = this.mediaInfo.files.filter((f) => {
        return (
          this.supportedVideoFormats.indexOf(f.split(".").pop().toLowerCase()) >
          -1
        );
      });
      // // 封装数据
      // supportedArr.forEach((m) => {
      //   let title = m.
      //   return {
      //     label: "",
      //     url: "",
      //   };
      // });
      return 24;
    },
    handleChapterPlay(i) {},
  },
};
</script>

<style lang="scss" scoped>
.bangumi-template {
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
  .media-tab-wrap {
    width: 100%;
    padding-bottom: 25px;
    .media-tab-nav {
      position: relative;
      height: 60px;
      background-color: #fff;
      margin-bottom: 11px;
      ul {
        width: 1280px;
        margin: 0 auto;
        li {
          cursor: pointer;
          float: left;
          padding: 0 6px;
          line-height: 57px;
          color: #222;
          -webkit-transition: all 0.1s linear;
          -o-transition: 0.1s all linear;
          transition: all 0.1s linear;
          border-bottom: 3px solid rgba(0, 0, 0, 0);
          &:hover,
          &.on {
            color: #00a1d6;
            border-bottom-color: #00a1d6;
          }
          & + li {
            margin-left: 28px;
          }
        }
      }
    }
    .media-tab-content {
      .media-tab-detail-wrap {
        width: 1280px;
        margin: 0 auto;
        .media-tab-detail {
          padding: 20px;
          border-radius: 4px;
          background-color: #fff;
          -webkit-box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.07);
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.07);
          .media-tab-module-content {
            .sl-ep-nav {
              height: 25px;
              white-space: nowrap;
              -webkit-transition: -webkit-transform 0.3s ease;
              transition: -webkit-transform 0.3s ease;
              -o-transition: transform 0.3s ease;
              transition: transform 0.3s ease;
              transition: transform 0.3s ease, -webkit-transform 0.3s ease;
              .sl-ep-nav-item {
                position: relative;
                display: inline-block;
                margin-right: 30px;
                line-height: 26px;
                height: 26px;
                border-bottom: 1px solid rgba(0, 0, 0, 0);
                font-size: 12px;
                cursor: pointer;
                &:last-child {
                  margin-right: 0;
                }
                &:hover,
                &.on {
                  color: #00a1d6;
                  border-bottom-color: #00a1d6;
                  &:after {
                    content: "";
                    position: absolute;
                    left: 50%;
                    bottom: 0;
                    -webkit-transform: translateX(-3px);
                    -ms-transform: translateX(-3px);
                    transform: translateX(-3px);
                    border-bottom: 3px solid #00a1d6;
                    border-top: 0;
                    border-left: 3px solid rgba(0, 0, 0, 0);
                    border-right: 3px solid rgba(0, 0, 0, 0);
                    -webkit-transition: all 0.1s linear;
                    -o-transition: 0.1s all linear;
                    transition: all 0.1s linear;
                  }
                }
              }
            }
            .sl-ep-list {
              clear: both;
              ul {
                padding-top: 10px;
                margin: 10px 0px 0 0;
                height: auto;
                overflow: hidden;
                .misl-ep-item {
                  display: inline-block;
                  width: 85px;
                  margin-right: 20px;
                  margin-bottom: 15px;
                  transition: all 0.3s linear;
                  &:nth-child(12n + 12) {
                    margin-right: 0px;
                  }
                  .misl-ep-index {
                    height: 38px;
                    padding: 0 4px;
                    line-height: 38px;
                    font-size: 14px;
                    background-color: #f4f5f7;
                    border: 1px solid #f4f5f7;
                    color: #6d757a;
                    border-radius: 4px;
                    text-align: center;
                    overflow: hidden;
                    -o-text-overflow: ellipsis;
                    text-overflow: ellipsis;
                    transition: all 0.3s linear;
                    cursor: pointer;
                    &:hover {
                      background: #00a1d6;
                      color: #fff;
                    }
                  }
                }
              }
            }
          }
          .media-tab-module-wrap {
            vertical-align: top;
            border-top: 1px solid #e5e9ef;
            padding-top: 20px;
            margin-top: 20px;
            .media-tab-module-title {
              display: inline-block;
              font-size: 18px;
              font-weight: 700;
              color: #222;
              height: 24px;
              line-height: 24px;
            }
            .media-tab-module-more {
              float: right;
              line-height: 22px;
              border: 1px solid #b7c0cc;
              border-radius: 4px;
              padding: 0 10px;
              font-size: 12px;
              color: #6e7579;
              cursor: pointer;
            }
            .media-tab-module-content {
              display: flex;
              margin-top: 20px;
              .slide-item {
                width: 190px;
                margin-right: 20px;
                &:last-child {
                  margin-right: 0px;
                }
                a {
                  img {
                    width: 100%;
                    height: 266.85px;
                    border-radius: 4px;
                    object-fit: cover;
                  }
                  p {
                    padding: 5px 0;
                    font-weight: 700;
                    word-break: break-all;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

// 平板 宽屏 1000~1280
@media only screen and (max-width: 1300px) {
  .bangumi-template {
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
    .media-tab-wrap {
      .media-tab-nav {
        height: 52px;
        margin-bottom: 8px;
        ul {
          width: 1000px;
          li {
            line-height: 50px;
            border-bottom: 2px solid rgba(0, 0, 0, 0);
            font-size: 14px;
            & + li {
              margin-left: 20px;
            }
          }
        }
      }
      .media-tab-content {
        .media-tab-detail-wrap {
          width: 1000px;
          .media-tab-detail {
            padding: 15px;
            border-radius: 2px;
            .media-tab-module-content {
              .sl-ep-nav {
                .sl-ep-nav-item {
                  margin-right: 20px;
                }
              }
              .sl-ep-list {
                ul {
                  .misl-ep-item {
                    width: 65.8333px;
                    margin-right: 15px;
                  }
                }
              }
            }
            .media-tab-module-wrap {
              margin-top: 15px;
              .media-tab-module-title {
                font-size: 16px;
                height: 22px;
                line-height: 22px;
              }
              .media-tab-module-more {
                float: right;
                line-height: 20px;
                border-radius: 3px;
                padding: 0 1em;
              }
              .media-tab-module-content {
                margin-top: 15px;
                .slide-item {
                  width: 149.166px;
                  margin-right: 15px;
                  a {
                    img {
                      width: 100%;
                      height: 209.5px;
                    }
                    p {
                      font-size: 14px;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

// 手机 平板 <1000
@media only screen and (max-width: 1044px) {
  .bangumi-template {
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
    .media-tab-wrap {
      padding-bottom: 0;
      .media-tab-nav {
        height: 46px;
        margin-bottom: 5px;
        ul {
          width: 100%;
          padding: 0 2.33vw;
          li {
            line-height: 44.5px;
            border-bottom: 1.5px solid rgba(0, 0, 0, 0);
            font-size: 12px;
            & + li {
              margin-left: 12px;
            }
          }
        }
      }
      .media-tab-content {
        .media-tab-detail-wrap {
          width: 100%;
          margin: 0;
          .media-tab-detail {
            padding: 2.33vw 0;
            border-radius: 0;
            box-shadow: none;
            .media-tab-module-content {
              .sl-ep-nav {
                padding: 0 2.33vw;
                .sl-ep-nav-item {
                  margin-right: 10px;
                }
              }
              .sl-ep-list {
                ul {
                  display: flex;
                  flex-wrap: wrap;
                  align-items: center;
                  justify-content: flex-start;
                  padding: 1.1666vw;
                  .misl-ep-item {
                    flex: 0 0 20%;
                    margin-right: 0;
                    padding: 0 1.1666vw;
                    width: unset;
                    height: 32px;
                    line-height: 32px;
                  }
                }
              }
            }
            .media-tab-module-wrap {
              margin-top: 10px;
              padding: 2.33vw 0;
              .media-tab-module-title {
                font-size: 14px;
                height: 20px;
                line-height: 20px;
                margin-left: 2.33vw;
              }
              .media-tab-module-more {
                float: right;
                line-height: 18px;
                border-radius: 2px;
                padding: 0 0.5em;
                margin-right: 2.33vw;
              }
              .media-tab-module-content {
                margin-top: 15px;
                flex-wrap: wrap;
                padding: 0 1.1666vw;
                .slide-item {
                  width: unset;
                  flex: 0 0 33.33%;
                  margin-right: 0;
                  padding: 0 1.1666vw;
                  a {
                    img {
                      height: unset;
                      max-height: 46.81vw;
                    }
                    p {
                      font-size: 12px;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
