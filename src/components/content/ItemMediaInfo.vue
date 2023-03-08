<template>
  <div class="__item-media-info" :class="{ border }">
    <div class="__info-content">
      <div class="__cover">
        <div class="__cover-img">
          <img :src="'/proxy' + mediaInfo.sources_url + mediaInfo.cover" :alt="mediaInfo.cover" />
        </div>
      </div>
      <div class="__info" :class="{ hd: isHd() }">
        <div class="__title">{{ mediaInfo.title }}</div>
        <div class="__tags"></div>
        <div class="__intro">{{ mediaInfo.intro || "无简介" }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    mediaInfo: {
      type: Object,
      default() {
        return {};
      },
    },
    border: false,
  },
  methods: {
    // 判断是否是平板或者大屏的情况下
    isHd() {
      return (
        this.$store.getters.isHd ||
        (this.$store.state._browserStatus.appWidth <= 1044 &&
          this.$store.state._browserStatus.appWidth / 135.3 >= 4.5)
      );
    },
  },
};
</script>

<style lang="less" scoped>
.__item-media-info {
  width: 100%;
  padding: 5px;
  &.border {
    border-top: 1px solid #e5e9ef;
    margin-top: 20px;
    padding: 20px 5px 15px;
  }
  .__info-content {
    display: flex;
    .__cover {
      width: 180px;
      height: 252px;
      border-radius: 4px;
      overflow: hidden;
      .__cover-img {
        width: 100%;
        height: 100%;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
    .__info {
      flex: 1;
      padding-left: 20px;
      .__title {
        font-size: 16px;
        color: #212121;
        line-height: 20px;
        font-weight: 600;
        margin-bottom: 15px;
      }
      .__intro {
        font-size: 14px;
        color: #969696;
      }
    }
  }
}

// 平板 宽屏 1024~1280
@media only screen and (max-width: 1300px) {
  .__item-media-info {
    .__info-content {
      .__cover {
        width: 145px;
        height: 203px;
      }
      .__info {
        padding-left: 15px;
        .__title {
          margin-bottom: 8px;
        }
      }
    }
  }
}

// 平板 <1024
@media only screen and (max-width: 1044px) {
  .__item-media-info {
    &.border {
      margin-top: 0px;
      padding: 2.3333vw;
    }
    .__info-content {
      gap: 1.6666vw;
      .__cover {
        flex: 1;
        width: 0;
        height: auto;
        .__cover-img {
          width: 100%;
          height: 0;
          padding-bottom: 140%;
          overflow: hidden;
          position: relative;
          img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          }
        }
      }
      .__info {
        flex: 2;
        padding-left: 1.6666vw;
        &.hd {
          flex: 5;
          padding-left: 0;
        }
      }
    }
  }
}
</style>
