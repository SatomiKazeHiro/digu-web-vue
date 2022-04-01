<template>
  <div class="__item-random">
    <div class="media-tab-module-wrap">
      <div class="media-tab-module-title">更多推荐</div>
      <div class="media-tab-module-more">更多</div>
      <div class="media-tab-module-content" :class="{ hd: isHd() }">
        <div class="none-content" v-if="recommendItems.length === 0">
          <span v-if="recommendLoadErr">加载失败</span>
        </div>
        <div
          class="slide-item"
          v-else
          v-for="i in recommendItems"
          :key="i.id"
          @click="itemTransfer(i)"
        >
          <div class="img-box">
            <div class="img-inner">
              <img :src="i.cover" />
            </div>
          </div>
          <p>{{ i.title }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAreaRandom } from "network/getWebData";
export default {
  data() {
    return {
      recommendItems: [],
      recommendLoadErr: false,
    };
  },
  mounted() {
    this.getRecommendItem();
  },
  methods: {
    // 获取推荐的随机内容
    getRecommendItem() {
      getAreaRandom(this.$route.params.area, 6, this.$route.params.item).then(
        (res) => {
          console.log(res);
          if (res.code === 200) {
            this.recommendLoadErr = false;
            this.recommendItems = res.data;
            this.recommendItems.forEach((i) => {
              i.cover = `/proxy${i.source_url}${i.cover}`;
            });
          }
        },
        (err) => {
          console.log(err);
          this.recommendLoadErr = true;
        }
      );
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
  },
};
</script>

<style lang="scss" scoped>
.__item-random {
  width: 100%;
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
      gap: 20px;
      margin-top: 20px;
      .slide-item {
        flex: 1;
        padding: 5px;
        cursor: pointer;
        .img-box {
          width: 100%;
          padding-bottom: 140%;
          height: 0;
          // overflow: hidden;
          position: relative;
          .img-inner {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            img {
              width: 100%;
              height: 100%;
              overflow: hidden;
              object-fit: cover;
              border-radius: 4px;
              box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
              &.horizontal {
                width: 100%;
                height: auto;
              }
            }
          }
        }
        p {
          margin: 5px 0;
          font-weight: 700;
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
