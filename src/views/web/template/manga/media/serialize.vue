<template>
  <div class="serialize-wrap">
    <div class="media-wrap panel">
      <div class="cover-wrp">
        <img
          v-lazy-img-compr="{
            URL: `/proxy${mediaInfo.sources_url}${mediaInfo.cover}`,
          }"
        />
      </div>
      <div class="info-wrp">
        <h1 class="title">{{ mediaInfo.title }}</h1>
        <div class="media-tags">
          <svg-icon icon-class="manga-tag" class="icon"></svg-icon>
          <div class="tags" v-if="mediaInfo.tags && mediaInfo.tags.length">
            <span class="media-tag" v-for="i in mediaInfo.tags" :key="i">{{
              i
            }}</span>
          </div>
          <span v-else>无标签</span>
        </div>
        <div class="media-info-status">
          <svg-icon icon-class="manga-planet" class="icon"></svg-icon>
          <span class="status" v-if="mediaInfo.status">{{
            mediaInfo.status
          }}</span>
          <span class="status" v-else>作品状态未知</span>
        </div>
        <div class="media-info-intro">
          <span class="media-info-intro-text" v-if="mediaInfo.intro">
            {{ mediaInfo.intro }}
          </span>
          <span class="media-info-intro-text" v-else>无简介</span>
        </div>
      </div>
    </div>
    <div class="main-wrap panel">
      <div class="section-cell">
        <div class="section-title">章节列表</div>
        <div class="section-list">
          <div
            class="list-item"
            v-for="(f, index) in mediaInfo.files_detail"
            :key="f.target"
          >
            <button :title="f.target" @click="sectionClick(index + 1)">
              {{ f.target }}
            </button>
          </div>
        </div>
      </div>
      <div class="recommend-cell">
        <ItemRandom
          :showLine="false"
          color="rgba(0, 0, 0, 0.9)"
          :moreLink="getCurrentLogLink"
          title="推荐"
          :titleStyle="titleStyle()"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ItemRandom from "components/content/item-random";

export default {
  components: { ItemRandom },
  props: {
    mediaInfo: { type: Object, default: () => ({}) },
  },
  computed: {
    getCurrentLogLink() {
      return `/${this.$route.params.area}/${this.$route.params.category}`;
    },
  },
  methods: {
    sectionClick(i) {
      this.$linkTo(this.$route.fullPath + "/s/" + i);
    },
    titleStyle() {
      let style = {
        margin: "8px 0",
        fontWeight: "400",
        color: "rgba(0, 0, 0, 0.87)",
      };
      if (this.$store.state._browserStatus.appWidth > 1044) {
        return {
          ...style,
          fontSize: "22px",
        };
      } else if (this.$store.state._browserStatus.appWidth > 788) {
        return {
          ...style,
          fontSize: "20px",
        };
      } else {
        return {
          ...style,
          margin: "8px 0",
          fontSize: "18px",
        };
      }
    },
  },
};
</script>

<style lang="less" scoped>
.serialize-wrap {
  display: flex;
  flex-direction: column;
  gap: 16px;
  > .panel {
    width: 1160px;
    background-color: #fff;
    border-radius: 4px;
    margin: 0 auto;
    padding: 24px;
  }
  .media-wrap {
    display: flex;
    gap: 24px;
    .cover-wrp {
      width: 240px;
      height: 320px;
      max-height: 320px;
      overflow: hidden;
      border-radius: 4px;
      > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 2px 5px;
        border-radius: 4px;
        &.horizontal {
          height: unset;
        }
      }
    }
    .info-wrp {
      flex: 1;
      min-height: 320px;
      display: flex;
      flex-direction: column;
      color: #666;
      .title {
        font-size: 28px;
        font-weight: 400;
      }
      .media-tags {
        margin-top: 16px;
        .tags {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          gap: 16px;
          .media-tag {
            display: inline-block;
            vertical-align: middle;
            margin-right: 16px;
            height: 20px;
            padding: 0 4px;
            line-height: 20px;
            border: 1px solid #666;
            border-radius: 3px;
            white-space: nowrap;
          }
        }
      }
      .media-info-status {
        margin-top: 16px;
        line-height: 22px;
        .status {
          height: 20px;
          line-height: 20px;
        }
      }
      .media-info-intro {
        margin-top: 16px;
        line-height: 20px;
      }
      .icon {
        color: #666;
        font-size: 18px;
        margin-right: 8px;
      }
    }
  }
  .main-wrap {
    .section-cell {
      .section-title {
        display: flex;
        align-items: center;
        font-size: 22px;
        color: rgba(0, 0, 0, 0.87);
        height: 26px;
        line-height: 26px;
      }
      .section-list {
        margin-top: 16px;
        display: flex;
        align-content: flex-start;
        flex-flow: row wrap;
        gap: 16px;
        .list-item {
          width: 170.3px;
          height: 42px;
          button {
            width: 100%;
            height: 100%;
            padding: 0 12px;
            margin-bottom: 16px;
            font-size: 14px;
            line-height: 1.5;
            color: rgba(0, 0, 0, 0.87);
            background-color: #fff;
            text-align: left;
            border: 1px solid rgba(0, 0, 0, 0.12);
            border-radius: 4px;
            cursor: pointer;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            &:nth-child(6n) {
              margin-right: 0;
            }
            &:hover {
              color: #409eff;
              border-color: #c6e2ff;
              background-color: #ecf5ff;
            }
          }
        }
      }
    }
    .recommend-cell {
      margin-top: 32px;
    }
  }
}

// 平板 宽屏 1024~1280
@media only screen and (max-width: 1300px) {
  .serialize-wrap {
    > .panel {
      width: 960px;
      padding: 16px;
    }
    .media-wrap {
      gap: 16px;
      .cover-wrp {
        width: 200px;
        height: 266px;
        max-height: 266px;
      }
      .info-wrp {
        min-height: 266px;
      }
    }
    .main-wrap {
      .section-cell {
        .section-list {
          list-item {
            width: 172.8px;
          }
        }
      }
    }
  }
}

// 平板 <1024
@media only screen and (max-width: 1044px) {
  .serialize-wrap {
    > .panel {
      width: 100%;
      border-radius: 0;
      padding: 2.33vw;
    }
    .media-wrap {
      gap: 2.33vw;
      .cover-wrp {
        height: unset;
      }
    }
    .main-wrap {
      padding: 2.33vw 1.165vw;
      .section-cell {
        .section-title {
          font-size: 20px;
          height: 24px;
          line-height: 24px;
        }
        .section-list {
          gap: unset;
          .list-item {
            width: unset;
            flex: 0 0 25%;
            overflow: hidden;
            padding: 0 1.165vw;
            margin-bottom: 2.33vw;
          }
        }
      }
      .recommend-cell {
        margin-top: 2.33vw;
      }
    }
  }
}

// 手机 <748
@media only screen and (max-width: 788px) {
  .serialize-wrap {
    > .panel {
      width: 100%;
      border-radius: 0;
      padding: 2.33vw;
    }
    .media-wrap {
      gap: 2.33vw;
      flex-wrap: wrap;
      .cover-wrp {
        width: 33%;
      }
      .info-wrp {
        width: 64%;
        height: unset;
        min-height: unset;
        padding-bottom: 1.165vw;
        h1.title {
          font-size: 23px;
        }
      }
    }
    .main-wrap {
      .section-cell {
        .section-title {
          font-size: 18px;
          height: 22px;
          line-height: 22px;
        }
        .section-list {
          .list-item {
            flex: 0 0 50%;
          }
        }
      }
    }
  }
}
</style>
