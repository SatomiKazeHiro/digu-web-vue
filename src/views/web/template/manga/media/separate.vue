<template>
  <div class="separate-wrap">
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
            <span class="media-tag" v-for="i in mediaInfo.tags" :key="i">{{ i }}</span>
          </div>
          <span v-else>无标签</span>
        </div>
        <div class="media-info-status">
          <svg-icon icon-class="manga-planet" class="icon"></svg-icon>
          <span class="status" v-if="mediaInfo.status">{{ mediaInfo.status }}</span>
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
      <div class="preview-cell">
        <div class="preview-list">
          <div
            class="img-cell"
            v-for="(imgObj, index) in mediaInfo.files_detail.filter((f) =>
              IMAGE_FORMAT.includes(f.ext)
            )"
            :key="imgObj.target"
          >
            <img
              v-lazy-img-compr="{
                URL: `/proxy${mediaInfo.sources_url}${imgObj.target}`,
              }"
              @click="handleViewClick(index + 1)"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="recommend-wrap panel">
      <ItemRandom
        :showLine="false"
        :moreLink="getCurrentLogLink"
        color="rgba(255, 255, 255, 0.9)"
      />
    </div>
  </div>
</template>

<script>
import { IMAGE_FORMAT } from "config";
import ItemRandom from "components/content/ItemRandom";

export default {
  components: { ItemRandom },
  props: {
    mediaInfo: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return { IMAGE_FORMAT };
  },
  computed: {
    getCurrentLogLink() {
      return `/${this.$route.params.area}/${this.$route.params.category}`;
    },
  },
  methods: {
    handleViewClick(i) {
      this.$linkTo(this.$route.fullPath + "/play?p=" + i, true);
    },
  },
};
</script>

<style lang="scss" scoped>
.separate-wrap {
  display: flex;
  flex-direction: column;
  gap: 16px;
  > .panel {
    width: 1160px;
    background-color: #333;
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
      color: rgba(255, 255, 255, 0.9);
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
            border: 1px solid #fff;
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
        color: #fff;
        font-size: 18px;
        margin-right: 8px;
      }
    }
  }
  .main-wrap {
    .preview-cell {
      .preview-list {
        display: flex;
        align-content: flex-start;
        flex-flow: row wrap;
        gap: 24px;
        .img-cell {
          width: 203.2px;
          transition: opacity 0.25s linear;
          &:nth-child(5n) {
            margin-right: 0;
          }
          img {
            display: block;
            width: 100%;
            height: 285px;
            object-fit: cover;
            box-shadow: rgba(0, 0, 0, 0.24) 0px 2px 5px;
            border-radius: 4px;
            cursor: pointer;
            opacity: 0.93;
            transition: opacity 0.2s ease-in-out;
            &.horizontal {
              height: unset;
            }
            &:hover {
              opacity: 1;
            }
          }
        }
      }
    }
  }
}

// 平板 宽屏 1024~1280
@media only screen and (max-width: 1300px) {
  .separate-wrap {
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
      .preview-cell {
        .preview-list {
          gap: 16px;
          .img-cell {
            width: 172.8px;
            img {
              height: 242px;
            }
          }
        }
      }
    }
  }
}

// 平板 <1024
@media only screen and (max-width: 1044px) {
  .separate-wrap {
    > .panel {
      width: 100%;
      border-radius: 0;
      padding: 2.33vw;
    }
    .media-wrap {
      gap: 2.33vw;
    }
    .main-wrap {
      padding: 2.33vw 1.165vw;
      .preview-cell {
        .preview-list {
          gap: unset;
          .img-cell {
            width: unset;
            flex: 0 0 25%;
            overflow: hidden;
            padding: 0 1.165vw;
            margin-bottom: 2.33vw;
            img {
              height: auto;
            }
          }
        }
      }
    }
  }
}

// 手机 <748
@media only screen and (max-width: 788px) {
  .separate-wrap {
    > .panel {
      width: 100%;
      border-radius: 0;
      padding: 2.33vw;
    }
    .media-wrap {
      gap: 2.33vw;
      flex-wrap: wrap;
      .cover-wrp {
        display: none;
      }
      .info-wrp {
        width: 100%;
        height: unset;
        min-height: unset;
        padding-bottom: 1.165vw;
        h1.title {
          font-size: 23px;
        }
      }
    }
    .main-wrap {
      .preview-cell {
        .preview-list {
          .img-cell {
            flex: 0 0 50%;
          }
        }
      }
    }
  }
}
</style>
