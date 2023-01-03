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
        <div
          class="slide-item opacity-0"
          v-else
          v-for="i in recommendItems"
          :key="i.id"
          :ref="i.id"
          @click="itemTransfer(i)"
        >
          <div class="img-box">
            <div class="img-inner">
              <img :data-src="i.cover" class="pre-cover" @load="showImg(i.id)" />
            </div>
          </div>
          <p :title="i.title">{{ i.title }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import compress from "utils/compress.js";
import { getAreaRandom } from "network/getWebData";
export default {
  props: {
    color: {
      type: String,
      default: "#333",
    },
    showLine: {
      type: Boolean,
      default: true,
    },
    moreLink: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    titleStyle: {
      type: Object,
      default: () => ({}),
    },
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
    if (this.color)
      this.$refs["__item-random"].style.setProperty("--item-randon-main-color", this.color);
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
        })
        .finally(() => {
          if (this.recommendItems.length && !this.recommendLoadErr) this.renderImg();
        });
    },

    // 随机资源项目的跳转事件
    itemTransfer(i) {
      window.open(i.link_url, "_blank");
    },

    // 判断是否是平板或者大屏的情况下
    isHd() {
      return (
        this.$store.getters.isHd ||
        (this.$store.state._browserStatus.appWidth < 1024 &&
          this.$store.state._browserStatus.appWidth / 135.3 >= 4.5)
      );
    },

    showImg(ref) {
      let coverDom = this.$refs[ref][0];
      let img = coverDom.querySelector("img.pre-cover");
      if (img) {
        // 判断图片的高度是否小于宽度
        if (img.naturalHeight < img.naturalWidth) img.classList.add("horizontal");
        else img.classList.remove("horizontal");
        // 渐变显示图片
        coverDom.classList.remove("opacity-0");
      }
    },

    renderImg() {
      this.recommendItems.forEach((item) => {
        this.compressImg(item.id, item.cover);
      });
    },

    compressImg(ref, url) {
      compress(url, 300, 80).then((base64) => {
        let img = this.$refs[ref][0].querySelector("img.pre-cover");
        img.src = base64;
      });
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
  margin-top: 8px;
  padding-top: 8px;
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
        gap: 15px;
        margin-top: 15px;
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
        margin-top: 1.6666vw;
        flex-wrap: wrap;
        padding: 0 1.1666vw;
        gap: 0;
        &.hd {
          flex-wrap: nowrap;
          .slide-item {
            flex: 1;
          }
        }
        .slide-item {
          flex: 0 0 33.33%;
          p {
            font-size: 12px;
          }
        }
      }
    }
  }
}

// 手机 平板 <1024
@media only screen and (max-width: 740px) {
  .__item-random {
    .media-tab-module-wrap {
      .media-tab-module-content {
        .slide-item {
          padding: 0 1.1666vw;
        }
      }
    }
  }
}
</style>
