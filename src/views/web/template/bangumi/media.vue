<template>
  <div class="bangumi-template">
    <div class="media-info-wrap">
      <div class="info-bg-wrap">
        <div class="info-blurbg-wrapper">
          <div class="info-blurbg" :style="mediaInfo.coverBgImgStyle"></div>
        </div>
      </div>
      <div class="info-content-wrap">
        <div class="media-info-inner clearfix">
          <div class="media-preview fl">
            <div class="common-lazy-img">
              <img
                :src="mediaInfo.coverPath"
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
            <item-play-list :mediaInfo="mediaInfo"></item-play-list>
            <item-random></item-random>
          </div>
        </div>
      </div>
      <div class="media-tab-content" v-if="currentTagID === 2">作品关联</div>
    </div>
  </div>
</template>

<script>
import ItemPlayList from "components/content/item-play-list";
import ItemRandom from "components/content/item-random";
export default {
  components: { ItemPlayList, ItemRandom },
  props: {
    mediaInfo: { type: Object, default: () => ({}) },
  },
  data() {
    return {
      navTags: [
        { label: "作品详情", tagID: 1 },
        { label: "作品关联", tagID: 2 },
      ],
      currentTagID: 1,
    };
  },
  methods: {
    // 渐变显示图片
    showImg(ref) {
      this.$refs[ref].classList.toggle("opacity-0");
    },
  },
};
</script>

<style lang="less" scoped>
.bangumi-template {
  .media-info-wrap {
    .info-bg-wrap {
      position: relative;
      .info-blurbg-wrapper {
        // 390(308+44+38)+56
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
          -webkit-transition: color, border-bottom-color 0.3s linear;
          -o-transition: color, border-bottom-color 0.3s linear;
          transition: color, border-bottom-color 0.3s linear;
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
        }
      }
    }
  }
}

// 平板 宽屏 1024~1280
@media only screen and (max-width: 1300px) {
  .bangumi-template {
    .media-info-wrap {
      .info-bg-wrap {
        .info-blurbg-wrapper {
          // 300(246+29+25)+56
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
          }
        }
      }
    }
  }
}

// 手机 平板 <1024
@media only screen and (max-width: 1044px) {
  .bangumi-template {
    .media-info-wrap {
      .info-bg-wrap {
        .info-blurbg-wrapper {
          // 230(194+22+14)+48
          height: 278px;
          top: -48px;
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
          }
        }
      }
    }
  }
}
</style>
