<template>
  <div class="__item-play-list">
    <div class="media-tab-detail-content">
      <!-- <div class="sl-ep-nav">
        <ul class="sl-ep-nav-list">
          <li class="sl-ep-nav-item on">第1话-第12话</li>
          <li class="sl-ep-nav-item">第13话-第24话</li>
        </ul>
      </div> -->
      <div class="sl-ep-list" v-if="playList.length > 0">
        <ul>
          <li class="misl-ep-item" v-for="i in playList" :key="i.name">
            <div class="misl-ep-index" @click="handleChapterPlay(i.link_url)">
              <span :title="i.label">{{ i.label }}</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="no-item" v-else>无资源</div>
    </div>
  </div>
</template>

<script>
import { VIDEO_FORMAT } from "@/config";

export default {
  props: {
    mediaInfo: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      playList: [],
    };
  },
  created() {
    this.playList = this.mediaInfo.files_detail
      .filter((f) => VIDEO_FORMAT.includes(f.ext))
      .map((i, index) => ({
        label: i.name,
        source_url: `${this.mediaInfo.sources_url}${i.target}`,
        link_url: `${this.mediaInfo.link_url}/s/${index + 1}`,
      }));
  },
  methods: {
    // 番剧资源播放跳转
    handleChapterPlay(url) {
      window.open(url, "_blank");
      // this.$router.push(url);
    },
  },
};
</script>

<style lang="less" scoped>
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
        padding-top: 8px;
        margin-top: 10px;
        height: auto;
        overflow: hidden;
        display: flex;
        align-items: flex-start;
        flex-flow: row wrap;
        .misl-ep-item {
          display: inline-block;
          // flex: 0 0 8.333%;
          // max-width: 8.333%;
          flex: 0 0 16.666%;
          max-width: 16.666%;
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
    .no-item {
      height: 220px;
      line-height: 220px;
      font-size: 16px;
      color: #969696;
      text-align: center;
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
            margin-bottom: 10px;
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
          margin-top: 0;
          .misl-ep-item {
            // flex: 0 0 20%;
            // max-width: 20%;
            flex: 0 0 33.333%;
            max-width: 33.333%;
            padding: 0 1.1666vw;
            width: unset;
            margin-bottom: 1.6666vw;
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
