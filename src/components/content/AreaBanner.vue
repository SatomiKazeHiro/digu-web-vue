<template>
  <div class="carousel-contaier" v-cloak>
    <el-carousel :interval="4000" type="card" :height="calculateWidth()">
      <el-carousel-item v-for="i in carouselList" :key="'cl' + i.id">
        <div class="item-cover">
          <a :href="i.link_url">
            <img
              class="opacity-0"
              :ref="`area_cl${i.id}`"
              :src="`/proxy${i.source_url}${i.cover}`"
              @load="showImg(`area_cl${i.id}`)"
            />
          </a>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  props: {
    carouselList: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    calculateWidth() {
      if (this.$store.state._browserStatus.appWidth > 1300) return "480px";
      else if (this.$store.state._browserStatus.appWidth > 960) return "380px";
      else return "";
    },
    showImg(ref) {
      this.$refs[ref][0].classList.toggle("opacity-0");
    },
  },
};
</script>

<style lang="less" scoped>
.carousel-contaier {
  padding-top: 8px;
  background: #000;
  // el 走马灯样式
  .el-carousel.el-carousel--horizontal.el-carousel--card {
    max-width: 1920px;
    margin: 0 auto;
    .el-carousel__item.el-carousel__item--card {
      border-radius: 4px;
      overflow: hidden;
      .item-cover {
        height: 100%;
        a {
          height: 100%;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
      }
    }
  }
  // 底色
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }
  // 遮罩
  ::v-deep .el-carousel__mask {
    background-color: rgb(0, 0, 0) !important;
  }
}

// element-ui走马灯样式
::v-deep li.el-carousel__indicator {
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
::v-deep div.el-carousel__container {
  button.el-carousel__arrow {
    background-color: rgba(0, 0, 0, 0.42);
  }
}
</style>
