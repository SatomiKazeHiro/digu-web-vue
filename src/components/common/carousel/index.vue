<template>
  <div v-if="data.length" class="digu-carousel-wrap" :class="{ gradient }" :style="{ '--mask-direction': gradient }">
    <div class="bg-wrap">
      <div ref="bg" class="bg" :style="{ '--pre-cover': preCover, '--cur-cover': curCover }"></div>
    </div>
    <div class="content-wrap" :style="wrapStyle">
      <div class="content" :style="{ ...contStyle }">
        <div class="carousel-box">
          <el-carousel class="carousel" :interval="5000" @change="handleChange">
            <el-carousel-item v-for="item in data" :key="item.url">
              <div class="playing-item">
                <div class="cover-card" :style="{ ...cardStyle, backgroundImage: `url('${item.cover}')` }"></div>
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="info-box">
          <h3 class="log">
            <span>{{ curPlaying.area_web_name }}</span>
            <span>·</span>
            <span>{{ curPlaying.category_web_name }}</span>
          </h3>
          <h1 class="title">{{ curPlaying.title }}</h1>
          <p class="intro" v-if="curPlaying.intro" v-html="curPlaying.intro"></p>
          <div class="ext-btns">
            <wk-button type="primary">播放</wk-button>
            <wk-button>前往详情页</wk-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    wrapStyle: { type: Object, default: () => ({}) },
    cardStyle: { type: Object, default: () => ({}) },
    data: { type: Array, default: [] },
    isReverse: { type: Boolean, default: false },
    gradient: {
      type: String,
      default: "",
      validator(value) {
        return ["", "top", "right", "bottom", "left"].includes(value);
      },
    },
  },
  data() {
    return {
      curPlaying: {},
      curCover: null,
      preCover: null,
      switchTimer: null,
    };
  },
  computed: {
    contStyle() {
      if (this.isReverse) return { flexDirection: "row-reverse" };
      else return {};
    },
    gradientClass() {
      return `gradient-${this.gradient}`;
    },
    inBtnLarge() {},
  },
  watch: {
    data(newVal) {
      this.curPlaying = newVal[0];
      this.preCover = `url('${this.curPlaying.cover}')`;
    },
  },
  methods: {
    handleChange(newIndex, oldIndex) {
      this.curCover = `url('${this.data[newIndex].cover}')`;
      this.preCover = `url('${this.data[oldIndex].cover}')`;
      const bg = this.$refs.bg;
      if (bg) {
        bg.classList.add("switch");
        if (this.switchTimer) clearTimeout(this.switchTimer);
        this.switchTimer = setTimeout(() => {
          this.$set(this, "curPlaying", this.data[newIndex]);
          this.preCover = `url('${this.data[newIndex].cover}')`;
          bg.classList.remove("switch");
        }, 400);
      }
    },
  },
};
</script>

<style lang="less" scoped>
@bg-top: -5%;
@bg-left: -5%;
@bg-height: 125%;
@bg-width: 110%;
@mask: -webkit-linear-gradient(var(--mask-direction, bottom), rgba(0, 0, 0, 0) 0px, rgba(0, 0, 0, 1) var(--mask-height, 180px), rgba(0, 0, 0, 1) 100%);

.digu-carousel-wrap {
  width: 100%;
  height: 520px;
  position: relative;
  overflow: hidden;
  .bg-wrap {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    filter: blur(16px);
    &::before {
      content: "";
      top: -5%;
      left: -5%;
      height: @bg-height;
      width: @bg-width;
      background-color: rgba(0, 0, 0, 0.3);
      position: absolute;
      z-index: 1;
    }
    .bg {
      &::before {
        content: "";
        position: absolute;
        top: @bg-top;
        left: @bg-left;
        height: @bg-height;
        width: @bg-width;
        background-image: var(--pre-cover);
        background-size: cover;
        background-repeat: no-repeat;
        background-position: 50%;
        opacity: 1;
      }
      &::after {
        content: "";
        position: absolute;
        top: @bg-top;
        left: @bg-left;
        height: @bg-height;
        width: @bg-width;
        background-image: var(--cur-cover);
        background-size: cover;
        background-repeat: no-repeat;
        background-position: 50%;
        opacity: 0;
      }
      &.switch {
        &::before {
          opacity: 0;
          transition: opacity 0.2s linear;
        }
        &::after {
          opacity: 1;
          transition: opacity 0.2s linear;
        }
      }
    }
  }
  .content-wrap {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 24px 0;
    z-index: 1;
    .content {
      display: flex;
      gap: 24px;
      width: 1600px;
      margin: 0 auto;
      .info-box {
        flex: 1;
        color: @white-text-color;
        padding: 48px 24px;
        display: flex;
        flex-direction: column;
        gap: 8px;
        .log {
          color: @white-text-color-light;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 8px;
        }
        .title {
          margin-bottom: 8px;
        }
        .intro {
          text-indent: 2em;
          margin-bottom: 24px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 7;
          -webkit-box-orient: vertical;
          // color: @white-text-color-light;
        }
        .ext-btns {
          display: flex;
          gap: 16px;
        }
      }
      .carousel-box {
        width: 340px;
        .carousel {
          height: 400px;
          .playing-item {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 216px;
            height: 300px;
            overflow: hidden;
            border-radius: 6px;
            filter: drop-shadow(0 0 1px rgba(0, 0, 0, 0.33)) drop-shadow(0 0 3px rgba(0, 0, 0, 0.22)) drop-shadow(0 0 5px rgba(0, 0, 0, 0.11));
            .cover-card {
              width: 100%;
              height: 100%;
              background-size: cover;
              background-repeat: no-repeat;
              background-position: 50%;
            }
          }
        }
      }
    }
  }
  &.gradient {
    overflow: unset;
    .bg-wrap {
      &::before {
        -webkit-mask-image: @mask;
      }
      .bg {
        &::before {
          -webkit-mask-image: @mask;
        }
        &::after {
          -webkit-mask-image: @mask;
        }
      }
    }
  }
}

@media only screen and (min-width: @digu-lg) and (max-width: @digu-xl) {
  .digu-carousel-wrap {
    --mask-height: 155px; // -25
    height: 460px; // -60
    .content-wrap {
      .content {
        width: 1200px;
        .info-box {
          padding: 44px 16px; // -4 -8
          .title {
            font-size: 30px; // -2
          }
        }
        .carousel-box {
          width: 320px; // -20
          .carousel {
            height: 368px; // -32
            .playing-item {
              width: 192px; // -24
              height: 266.66px; // h / 0.72
            }
          }
        }
      }
    }
  }
}

@media only screen and (min-width: @digu-md) and (max-width: @digu-lg) {
  .digu-carousel-wrap {
    --mask-height: 130px; // -25
    height: 400px; // -60
    .content-wrap {
      .content {
        width: 960px;
        .info-box {
          padding: 40px 8px; // -4 -8
          .title {
            font-size: 28px; // -2
          }
        }
        .carousel-box {
          width: 300px; // -20
          .carousel {
            height: 336px; // -32
            .playing-item {
              width: 168px; // -24
              height: 233.33px; // h / 0.72
            }
          }
        }
      }
    }
  }
}

@media only screen and (min-width: @digu-sm) and (max-width: @digu-md) {
}

@media only screen and (min-width: 0) and (max-width: @digu-sm) {
}

// 走马灯作用切换的背景颜色
/deep/ .el-carousel__arrow {
  background-color: rgba(23, 45, 67, 0.23);
  border: 1px solid rgba(138, 138, 138, 0.23);
}

// 走马灯容器
/deep/ .el-carousel__container {
  position: unset;
}

// 走马灯底部指示点
/deep/ ul.el-carousel__indicators {
  li.el-carousel__indicator {
    &.is-active button.el-carousel__button {
      background-color: @main-color;
    }
    button.el-carousel__button {
      height: 10px;
      width: 10px;
      opacity: 1;
      border: 2px solid transparent;
      border-radius: 50%;
      background-color: #fff;
      vertical-align: middle;
      cursor: pointer;
      transition: all 0.2s;
      &:hover {
        border: 2px solid #fff;
        background-color: @main-color;
        transform: scale(1.3);
      }
    }
  }
}
</style>
