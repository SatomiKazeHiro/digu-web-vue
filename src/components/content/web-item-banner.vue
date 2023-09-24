<template>
  <div class="wk-item-banner" ref="wrap" v-if="show" :style="{ '--len': getList.length, '--ih': itemHeight }">
    <!-- 参数设置在外边，因为swiper插件的内容随着示例挂载会刷新的 -->
    <div :id="swiperId" class="swiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item, index) in getList" :key="index">
          <div class="cover-wrap" @click="handleLink(item.link_url)">
            <div class="img-mask">
              <span class="title">{{ item.title }}</span>
            </div>
            <img v-lazy-img-compr="{ URL: item.cover, MAX_WIDTH: 500, QUALITY: 90 }" class="cover" />
          </div>
        </div>
      </div>
    </div>
    <div :id="paginationId" class="swiper-pagination outer-pagination"></div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import Swiper from "swiper";
import "swiper/css/swiper.min.css";

const id = uuidv4();

export default {
  name: "WebItemBanner",
  props: {
    list: { type: Array, default: () => [] },
    interval: { type: Number, default: 5000 },
    options: { type: Object, default: () => ({}) },
  },
  data() {
    return {
      show: false,
      swiper: null,
      renderTimer: null,
      swiperId: `swiper-${id}`,
      paginationId: `pagination-${id}`,
      itemHeight: "",
      iinerWidth: "",
    };
  },
  created() {
    this.$EventBus.$on("onWindowResize", this.resizeListener);
  },
  mounted() {
    this.resizeListener();
  },
  beforeDestroy() {
    this.$EventBus.$off("onWindowResize");
  },
  computed: {
    getItemHeightLimit() {
      let minH = 280;
      let iH27 = Math.floor((window.innerHeight * 2) / 7);
      return iH27 < minH ? minH : iH27; // 最大高度为屏幕的2/7，但又不能小于300px
    },
    getList() {
      if (this.list.length > 6) return this.list.splice(0, 6);
      else return this.list;
    },
  },
  watch: {
    list: {
      handler() {
        this.destroySwiper();
        this.show = false;
        this.$nextTick(() => {
          this.resizeListener();
        });
      },
      deep: true,
    },
  },
  methods: {
    // 渲染
    renderSwiper(options) {
      options = options || this.options || {};
      this.$nextTick(() => {
        let id = `#${this.swiperId}`;
        if (!document.querySelector(id)) return;

        this.destroySwiper();
        if (this.renderTimer) clearTimeout(this.renderTimer);
        this.renderTimer = setTimeout(() => {
          this.swiper = new Swiper(
            id,
            Object.assign(
              {
                slidesPerView: 4, // 默认视野内容纳4个卡片
                loop: true,
                centeredSlides: true,
                grabCursor: true,
                loopAdditionalSlides: 3,
                autoplay: {
                  delay: this.interval,
                  stopOnLastSlide: false,
                  disableOnInteraction: true,
                },
                pagination: {
                  el: `#${this.paginationId}`,
                  clickable: true,
                },
              },
              options
            )
          );
        }, 1000);
      });
    },

    // 销毁
    destroySwiper() {
      if (this.swiper) {
        this.swiper.destroy(true);
        this.swiper = null;
      }
    },

    // 重置
    resizeListener() {
      let iw = window.innerWidth;
      if (iw <= 992 && !this.show) this.show = true;

      if (iw == this.iinerWidth) return; // 宽度不变不做处理
      else this.iinerWidth = iw;

      this.$nextTick(() => {
        const wrap = this.$refs.wrap; // 取容器宽度
        if (wrap) {
          let ow = wrap.offsetWidth;
          let imgH = Math.floor(ow / 2 / 0.74); // 宽度的一半 / 0.74 = 正常的垂直图片的高度
          this.itemHeight = imgH <= this.getItemHeightLimit ? imgH : this.getItemHeightLimit;

          this.destroySwiper();
          if (iw <= 1000 && iw > 800) {
            this.renderSwiper({ slidesPerView: 4 });
          } else if (iw <= 800 && iw > 550) {
            this.renderSwiper({ slidesPerView: 3 });
          } else if (iw <= 550 && iw > 450) {
            this.renderSwiper({ slidesPerView: 2.5 });
          } else if (iw <= 450 && iw > 350) {
            this.renderSwiper({ slidesPerView: 2 });
          } else if (iw <= 350) {
            this.renderSwiper({ slidesPerView: 1 });
          }
        }
      });
    },

    // 详情跳转
    handleLink(url) {
      this.$linkTo(url);
    },
  },
};
</script>

<style lang="less" scoped>
.wk-item-banner {
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 3px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
  border-radius: 8px;
  user-select: none;
  margin-bottom: calc(24px + 2 * @mobile-padding-min-small);
  .swiper {
    border-radius: 8px;
    overflow: hidden;
    position: relative;
    &.swiper-container-initialized {
      // swiper实体挂载完后
      .swiper-slide {
        flex-shrink: 0;
        width: auto;
      }
    }
    .swiper-wrapper {
      align-items: center;

      .swiper-slide {
        width: calc(100% / var(--len)); // 默认铺满，等图加载完，这样swiper复制的时候才不会有空白
        height: calc(var(--ih) * 1px);
        transition: all 0.2s linear;
        &.swiper-slide-active {
          .cover-wrap {
            .img-mask {
              color: #fff;
            }
            &::before {
              background: transparent;
            }
          }
        }
      }
    }
    .cover-wrap {
      height: 100%;
      background-color: #fff;
      position: relative;
      .img-mask {
        display: flex;
        position: absolute;
        width: 100%;
        height: 100%;
        background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.2) 48px, transparent 30%, transparent 100%);
        padding: 12px;
        color: rgba(255, 255, 255, 0.6);
        align-items: flex-end;
        justify-content: flex-start;
        font-size: 18px;
        transition: color 0.2s linear;
        span.title {
          width: 100%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      > img.cover {
        width: 100%;
        height: 100%;
        border-radius: 0;
        aspect-ratio: 0.74 / 1;
      }
      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.52);
        transition: background 0.2s linear;
      }
    }
    .swiper-pagination {
      position: absolute;
      bottom: -32px;
      width: 100%;
      height: 8px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .outer-pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin: @mobile-padding-min-small 0;
    gap: @mobile-padding-min-small;
  }
}
</style>
