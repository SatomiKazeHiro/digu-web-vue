<template>
  <div class="web-item-recommend" v-cloak>
    <div class="resources-list">
      <div class="card-wrap" v-for="item in list" :key="item.id">
        <div class="cover-warp" @click="$router.push(item.link_url)">
          <div class="cover-box">
            <img v-lazy-img-compr="{ URL: item.cover, MAX_WIDTH: 500, QUALITY: 90 }" class="cover" />
          </div>
          <div class="title-box">
            <p>{{ item.title }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WebItemRecommend",
  props: {
    list: { type: Array, default: () => [] },
  },
};
</script>

<style lang="less" scoped>
.web-item-recommend {
  display: none;
  .resources-list {
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    justify-content: flex-start;
    gap: @mobile-padding-min-middle;
    .card-wrap {
      width: calc(50% - @mobile-padding-min-middle / 2);
      .cover-warp {
        height: 100%;
        width: 100%;
        background: #fff;
        border-radius: 1.166vw;
        overflow: hidden;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 3px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
        .cover-box {
          width: 100%;
          padding-bottom: 68%;
          height: 0;
          overflow: hidden;
          position: relative;
          img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            opacity: 1;
            transition: 0.25s;
            display: block;
            border-radius: 4px 4px 0 0;
          }
        }
        .title-box {
          padding: calc(@mobile-padding-min-middle / 2);
          p {
            color: #233;
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
  }
}

@media only screen and (min-width: 800px) and (max-width: 992px) {
  .web-item-recommend {
    display: block;
    .resources-list {
      .card-wrap {
        width: calc(25% - 3 * @mobile-padding-min-middle / 4); // 每行4个
        .title-box {
          font-size: 16px;
        }
      }
    }
  }
}

@media only screen and (min-width: 480px) and (max-width: 800px) {
  .web-item-recommend {
    display: block;
    .resources-list {
      .card-wrap {
        width: calc(33.3% - 2 * @mobile-padding-min-middle / 3); // 每行3个
        .title-box {
          font-size: 15px;
        }
      }
    }
  }
}

@media only screen and (max-width: 480px) {
  .web-item-recommend {
    display: block;
    .resources-list {
      .card-wrap {
        width: calc(50% - @mobile-padding-min-middle / 2); // 每行2个
        .title-box {
          font-size: 14px;
        }
      }
    }
  }
}
</style>
