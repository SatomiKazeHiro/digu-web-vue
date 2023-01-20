<template>
  <div ref="__item-random" class="__item-random">
    <div class="media-tab-module-wrap" :class="{ line: showLine }">
      <div class="top-wrp">
        <div class="media-tab-module-title" :style="titleStyle">{{ title || "更多推荐" }}</div>
        <div class="media-tab-module-more" @click="moreClick">更多</div>
      </div>
      <div class="media-tab-module-content" :class="{ hd: isHd() }">
        <div class="none-content" v-if="recommendItems.length === 0">
          <span v-if="recommendLoadErr">加载失败</span>
        </div>
        <div v-else class="slide-item" v-for="i in recommendItems" :key="i.id">
          <div class="img-box" @click="handleItemClick(i)">
            <div class="img-inner">
              <img v-lazy-img-compr="{ URL: i.cover, MAX_WIDTH: 300, QUALITY: 80 }" />
            </div>
          </div>
          <p :title="i.title">{{ i.title }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAreaRandom } from "network/getWebData";

export default {
  props: {
    color: { type: String, default: "#333" },
    showLine: { type: Boolean, default: true },
    moreLink: { type: String, default: "" },
    title: { type: String, default: "" },
    titleStyle: { type: Object, default: () => ({}) },
  },
  data() {
    return {
      recommendItems: [],
      recommendLoadErr: false,
    };
  },
  created() {
    this.getRecommendItem();
  },
  mounted() {
    if (this.color) {
      this.$refs["__item-random"].style.setProperty("--item-randon-main-color", this.color);
    }
  },
  methods: {
    // 获取推荐的随机内容
    getRecommendItem() {
      getAreaRandom(this.$route.params.area, 6, this.$route.params.item)
        .then((res) => {
          if (res.code === 200) {
            res.data.forEach((i) => {
              i.cover = `/proxy${i.source_url}${i.cover}`;
            });
            this.recommendItems = res.data;
            this.recommendLoadErr = false;
          } else return Promise.reject(new Error(`code: ${res.code}, msg: ${res.msg}`));
        })
        .catch((err) => {
          this.$message({ message: err, type: "error" });
          this.recommendLoadErr = true;
        });
    },

    // 随机资源项目的跳转事件
    handleItemClick(i) {
      this.$linkTo(i.link_url);
    },

    // 判断是否是平板或者大屏的情况下
    isHd() {
      return this.$store.getters.isHd;
      // return (
      //   this.$store.getters.isHd ||
      //   (this.$store.state._browserStatus.appWidth < 1024 &&
      //     this.$store.state._browserStatus.appWidth / 135.3 >= 4.5)
      // );
    },

    moreClick() {
      if (this.moreLink) window.open(this.moreLink);
    },
  },
};
</script>

<style lang="scss" scoped>
.__item-random {
  width: 100%;
  color: var(--item-randon-main-color);
  // margin-top: 8px;
  // padding-top: 8px;
  .media-tab-module-wrap {
    .top-wrp {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .line {
        border-top: 1px solid #e7e7e7;
        padding-top: 20px;
        margin-top: 20px;
      }
      .media-tab-module-title {
        display: inline-block;
        font-size: 18px;
        font-weight: 700;
        height: 24px;
        line-height: 24px;
      }
      .media-tab-module-more {
        float: right;
        line-height: 22px;
        border: 1px solid #e7e7e7;
        border-radius: 4px;
        padding: 0 10px;
        font-size: 12px;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
        user-select: none;
        &:hover {
          border: 1px solid #00a1d6;
          background-color: #00a1d6;
          color: #fff;
        }
      }
    }
    .media-tab-module-content {
      display: flex;
      gap: 24px;
      margin-top: 16px;
      .slide-item {
        flex: 1;
        cursor: pointer;
        .img-box {
          width: 100%;
          padding-bottom: 140%;
          height: 0;
          position: relative;
          .img-inner {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            > img {
              width: 100%;
              height: 100%;
              overflow: hidden;
              object-fit: cover;
              border-radius: 4px;
              box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
              &.horizontal {
                height: unset;
              }
            }
          }
        }
        p {
          margin: 5px 0;
          word-break: break-all;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
      .none-content {
        width: 100%;
        height: 200px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #999999;
        font-size: 14px;
      }
    }
  }
}

// 平板 宽屏 1024~1280
@media only screen and (max-width: 1300px) {
  .__item-random {
    .media-tab-module-wrap {
      .media-tab-module-title {
        font-size: 16px;
        height: 22px;
        line-height: 22px;
      }
      .media-tab-module-more {
        line-height: 20px;
        border-radius: 3px;
        padding: 0 1em;
      }
      .media-tab-module-content {
        gap: 16px;
        margin-top: 16px;
        .slide-item {
          p {
            font-size: 14px;
          }
        }
      }
    }
  }
}

// 平板 <1024
@media only screen and (max-width: 1044px) {
  .__item-random {
    .media-tab-module-wrap {
      .top-wrp {
        padding: 0 1.1666vw;
      }
      .media-tab-module-title {
        font-size: 14px;
        height: 20px;
        line-height: 20px;
      }
      .media-tab-module-more {
        line-height: 18px;
        border-radius: 2px;
        padding: 0 0.5em;
      }
      .media-tab-module-content {
        margin-top: 2.33vw;
        flex-wrap: wrap;
        gap: 0;
        &.hd {
          flex-wrap: nowrap;
          gap: 2.33vw;
          padding: 0 1.1666vw;
          .slide-item {
            flex: 1;
            padding: 0;
          }
        }
        .slide-item {
          flex: 0 0 33.33%;
          padding: 0 1.1666vw;
          p {
            font-size: 12px;
            margin: 0.83vw 0 1.66vw;
            font-size: 1.66vw;
          }
        }
      }
    }
  }
}

// 手机 <788
@media only screen and (max-width: 788px) {
  .__item-random {
    .media-tab-module-wrap {
      .media-tab-module-content {
        gap: 0;
        .slide-item {
          padding: 0 1.1666vw;
        }
      }
    }
  }
}
</style>
