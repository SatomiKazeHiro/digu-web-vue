<template>
  <div class="__item-play-list">
    <div class="media-tab-detail-content">
      <!-- <div class="sl-ep-nav">
        <ul class="sl-ep-nav-list">
          <li class="sl-ep-nav-item on">第1话-第12话</li>
          <li class="sl-ep-nav-item">第13话-第24话</li>
        </ul>
      </div> -->
      <div class="sl-ep-list">
        <ul>
          <li class="misl-ep-item" v-for="i in handleVideos()" :key="i.value">
            <div class="misl-ep-index" @click="handleChapterPlay(i.link_url)">
              {{ i.label }}
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import handleBangumi from "@/utils/handleBangumi";
export default {
  props: {
    mediaInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    // 处理显示可观看的内容
    handleVideos() {
      return handleBangumi(this.mediaInfo);
    },
    // 番剧资源播放跳转
    handleChapterPlay(url) {
      window.open(url, "_blank");
    },
  },
};
</script>

<style lang="scss" scoped>
.__item-play-list {
  width: 100%;
  .media-tab-detail-content {
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
            -webkit-transition: color, border-bottom-color 0.1s linear;
            -o-transition: color, border-bottom-color 0.1s linear;
            transition: color, border-bottom-color 0.1s linear;
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
        display: flex;
        align-items: flex-start;
        flex-flow: row wrap;
        .misl-ep-item {
          display: inline-block;
          flex: 0 0 8.333%;
          max-width: 8.333%;
          margin-bottom: 15px;
          padding: 5px;
          .misl-ep-index {
            height: 38px;
            padding: 0 8px;
            line-height: 36px;
            font-size: 14px;
            background-color: #f4f5f7;
            border: 1px solid #f4f5f7;
            color: #6d757a;
            border-radius: 4px;
            text-align: center;
            white-space: nowrap;
            overflow: hidden;
            -o-text-overflow: ellipsis;
            text-overflow: ellipsis;
            transition: background 0.3s linear;
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
}

// 平板 宽屏 1024~1280
@media only screen and (max-width: 1300px) {
  .__item-play-list {
    .media-tab-detail-content {
      .sl-ep-nav {
        .sl-ep-nav-item {
          margin-right: 20px;
        }
      }
    }
  }
}

// 平板 <1024
@media only screen and (max-width: 1044px) {
  .__item-play-list {
    .media-tab-detail-content {
      .sl-ep-nav {
        padding: 0 2.33vw;
        .sl-ep-nav-item {
          margin-right: 10px;
        }
      }
      .sl-ep-list {
        ul {
          padding: 1.1666vw;
          .misl-ep-item {
            flex: 0 0 16.666%;
            max-width: 16.666%;
            // padding: 0 1.1666vw;
            width: unset;
            .misl-ep-index {
              height: 32px;
              line-height: 30px;
              font-size: 13px;
            }
          }
        }
      }
    }
  }
}

// 手机 <720
@media only screen and (max-width: 740px) {
  .__item-play-list {
    .media-tab-detail-content {
      .sl-ep-list {
        ul {
          .misl-ep-item {
            flex: 0 0 20%;
            max-width: 20%;
            padding: 0 1.1666vw;
            width: unset;
            .misl-ep-index {
              font-size: 12px;
            }
          }
        }
      }
    }
  }
}
</style>
