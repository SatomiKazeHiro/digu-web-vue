<template>
  <div class="rr-wrap clearfix box-r4x" v-cloak>
    <div class="rr-left fl">
      <el-carousel height="242px">
        <el-carousel-item v-for="item in RRItem" :key="item.id">
          <img :src="item.cover" class="el-banner-img" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="rr-right fr">
      <div class="video-card-reco" v-for="item in RRItem" :key="item.id">
        <div class="info-box">
          <a href="#" target="_blank">
            <img
              :src="item.cover"
              class="opacity-0"
              :ref="'rr' + item.id"
              @load="showImg(item.id)"
            />
            <div class="info">
              <p class="info-title">{{ item.title }}</p>
              <p class="info-content" v-if="item.intro"></p>
              <p class="info-content" v-else>无简介</p>
            </div>
          </a>
        </div>
      </div>
    </div>
    <div class="rr-mobile">
      <div class="video-list">
        <div class="v-card" v-for="item in RRItem" :key="item.id">
          <div class="card">
            <img
              :src="item.cover"
              class="opacity-0"
              :ref="'mobile' + item.id"
              @load="showImgMobile(item.id)"
            />
            <div class="title">
              <p>{{ item.title }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RandomRecommend",
  props: {
    RRItem: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  mounted() {
    // 判断是否是横屏的
    if (
      this.$store.state._browserStatus.appWidth &&
      this.$store.state._browserStatus.appHeight &&
      this.$store.state._browserStatus.appWidth >=
        this.$store.state._browserStatus.appHeight
    )
      document.querySelector(".video-list").classList.add("hd");
  },
  methods: {
    showImg(id) {
      this.$refs["rr" + id][0].classList.toggle("opacity-0");
    },
    showImgMobile(id) {
      this.$refs["mobile" + id][0].classList.toggle("opacity-0");
    },
  },
  watch: {
    // 监听屏幕选择，当的平板类型的横屏的时候
    "$store.state._browserStatus.appWidth"(newValue, oldValue) {
      if (newValue && newValue >= this.$store.state._browserStatus.appHeight) {
        document.querySelector(".video-list").classList.add("hd");
      } else if (
        newValue &&
        document.querySelector(".video-list").classList.contains("hd")
      )
        document.querySelector(".video-list").classList.remove("hd");
    },
  },
};
</script>

<style lang="scss" scoped>
img.el-banner-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.rr-wrap {
  height: 252px;
  // background: rebeccapurple;
  padding: 5px;
  .rr-left {
    width: 40%;
  }
  .rr-right {
    width: 60%;
    height: 100%;
    padding-left: 5px;
    display: flex;
    flex-wrap: wrap;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -ms-flex-line-pack: justify;
    align-content: space-between;
    overflow: hidden;
    .video-card-reco {
      // flex: 0 1 23.5%;
      flex: 0 1 24.5%;
      height: 118px;
      margin-bottom: 6px;
      border-radius: 4px;
      overflow: hidden;
      position: relative;
      &:before {
        content: "";
        position: absolute;
        z-index: 1;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 48px;
        background-image: url("~assets/img/web/area/shadow.png");
        background-repeat: repeat-x;
      }
      .info-box {
        width: 100%;
        height: 100%;
        position: relative;
        &:before {
          content: "";
          width: 100%;
          height: 100%;
          position: absolute;
          left: 0;
          top: 0;
          background: rgba(0, 0, 0, 0.7);
          opacity: 0;
          transition: opacity 0.2s;
        }
        &:hover {
          .info {
            padding: 10px;
            top: 0;
            transition: top 0.3s;
            .info-title {
              transition: 0.3;
              text-overflow: ellipsis;
              white-space: normal;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              overflow: hidden;
              -webkit-line-clamp: 2;
            }
            .info-content {
              transition: 0.3;
              text-overflow: ellipsis;
              white-space: normal;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              overflow: hidden;
              -webkit-line-clamp: 3;
            }
          }
        }
        &:hover:before {
          width: 100%;
          height: 100%;
          opacity: 1;
          transition: opacity 0.2s;
        }
        a {
          outline: none;
          cursor: pointer;
          text-decoration: none;
          background-color: transparent;
          display: initial;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            opacity: 1;
            transition: 0.25s;
          }
          .info {
            position: absolute;
            top: 60px;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 2;
            box-sizing: border-box;
            padding: 30px 10px 10px;
            transition: top 0.3s;
            .info-title {
              font-size: 15px;
              color: #fff;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              min-height: 40px;
              margin-bottom: 5px;
            }
            .info-content {
              font-size: 13px;
              color: #fff;
            }
          }
        }
      }
    }
  }
  .rr-mobile {
    display: none;
    .video-list {
      padding: 0 1vw;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -ms-flex-wrap: wrap;
      flex-wrap: wrap;
      align-items: flex-start;
      justify-content: space-between;
      background: #f1f2f3;
      .v-card {
        width: 50%;
        padding: 2.333vw 1.333vw;
        .card {
          background: #fff;
          border-radius: 1vw;
          overflow: hidden;
          box-shadow: rgba(0, 0, 0, 0.05) 0px 0.5px 1px 0px;
          img {
            width: 100%;
            height: 32vw;
            object-fit: cover;
            opacity: 1;
            transition: 0.25s;
            display: block;
          }
          .title {
            padding: 2.4vw 1.7vw;
            p {
              font-size: 3.2vw;
              // font-size: 14px;
              // height: 2.72em;
              color: #212121;
              overflow: hidden;
              word-break: break-all;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }
          }
        }
      }
      &.hd {
        .v-card {
          width: 25%;
          padding: 1.1665vw 0.6665vw;
          .card {
            img {
              height: 16vw;
            }
            .title {
              padding: 1.2vw 0.85vw;
              p {
                font-size: 1.6vw;
              }
            }
          }
        }
      }
    }
  }
}
// 平板 宽屏 1000~1280
@media only screen and (max-width: 1300px) {
  .rr-wrap {
    .rr-right {
      .video-card-reco {
        flex: 0 1 33%;
      }
    }
  }
}
// 手机 平板 < 1000
@media only screen and (max-width: 1024px) {
  .rr-wrap {
    height: auto;
    border-radius: 0;
    padding: 0;
    box-shadow: none;
    .rr-left,
    .rr-right {
      display: none;
    }
    .rr-mobile {
      display: initial;
    }
  }
}
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
</style>
