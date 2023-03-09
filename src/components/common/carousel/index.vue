<template>
  <div v-if="data.length" class="carousel-wrap" :style="wrapStyle">
    <div class="bg-wrap">
      <div class="bg" :style="{ backgroundImage: `url('${curPlaying.cover}')` }"></div>
    </div>
    <div class="content-wrap">
      <div class="info-box">
        <h1>{{ curPlaying.title }}</h1>
      </div>
      <div class="carousel-box">
        <el-carousel height="360px" @change="handleChange">
          <el-carousel-item v-for="item in data" :key="item.url">
            <div class="playing-item">
              <div
                class="cover-card"
                :style="{ ...cardStyle, backgroundImage: `url('${item.cover}')` }"
              ></div>
            </div>
          </el-carousel-item>
        </el-carousel>
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
  },
  data() {
    return {
      curPlaying: {},
    };
  },
  watch: {
    data(newVal) {
      this.curPlaying = newVal[0];
    },
  },
  methods: {
    handleChange(newIndex) {
      this.$set(this, "curPlaying", this.data[newIndex]);
    },
  },
};
</script>

<style lang="less" scoped>
.carousel-wrap {
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
    &::before {
      content: "";
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.3);
      position: absolute;
      top: 0;
      left: 0;
      z-index: 10;
    }
    .bg {
      background-size: cover;
      background-repeat: no-repeat;
      background-position: 50%;
      position: absolute;
      height: 110%;
      width: 110%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 5;
      filter: blur(16px);
    }
  }
  .content-wrap {
    position: absolute;
    top: 0;
    left: 5%;
    width: 90%;
    height: 100%;
    padding: 48px 0;
    z-index: 15;
    display: flex;
    .info-box {
      flex: 1;
      color: #fff;
    }
    .carousel-box {
      width: 320px;
      .playing-item {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 200px;
        height: 278px;
        overflow: hidden;
        border-radius: 4px;
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

/deep/ .el-carousel__arrow {
  background-color: rgba(23, 45, 67, 0.23);
}

/deep/ ul.el-carousel__indicators {
  li.el-carousel__indicator {
    &.is-active button.el-carousel__button {
      background-color: #00a1d6;
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
        background-color: #00a1d6;
        transform: scale(1.3);
      }
    }
  }
}
</style>
