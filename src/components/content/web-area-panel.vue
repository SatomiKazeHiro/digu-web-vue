<template>
  <div class="web-area-panel-wrap">
    <div class="title-wrap">
      <div class="title">{{ area.title }}</div>
      <a class="more" @click="$linkTo(area.area)">更多</a>
    </div>
    <div class="preview-wrap">
      <div class="item" v-for="(item, index) in area.list" :key="index">
        <a :href="item.link_url" :class="{ 'no-cover': !hasCover(item) }">
          <img class="cover" v-lazy-img-compr="getImgCfg(item)" />
          <p class="title" :title="item.title">
            {{ item.title }}
          </p>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WebAreaPanel",
  props: {
    area: { type: Object, default: () => ({}) },
  },
  methods: {
    hasCover(item) {
      return Boolean(item.cover);
    },
    getImgCfg(item) {
      return {
        URL: `/proxy${item.source_url}/${item.cover}`,
        MAX_WIDTH: 300,
        QUALITY: 80,
      };
    },
  },
};
</script>

<style lang="less" scoped>
.web-area-panel-wrap {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
  .title-wrap {
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .title {
      font-size: 28px;
      line-height: 24px;
      padding-left: 8px;
      border-left: 4px solid @main-color;
    }
    .more {
      color: @black-text-color;
      padding: 8px;
      font-size: 18px;
      line-height: 18px;
      cursor: pointer;
      transition: color 0.2s ease-in-out;
      &:hover {
        color: @main-color;
      }
    }
  }
  .preview-wrap {
    padding-top: 16px;
    overflow: hidden;
    display: flex;
    flex-wrap: nowrap;
    position: relative;
    gap: 1.5%; // 13*7 + 1.5*6
    margin-left: -0.75%;
    padding-left: 0.75%;
    margin-right: -0.75%;
    padding-right: 0.75%;

    .item {
      max-width: 13%;
      flex: 0 0 13%;
      display: flex;
      flex-direction: column;
      &:hover {
        p.title {
          color: @main-color;
        }
      }
      p.title {
        margin-top: 8px;
        color: @black-text-color;
        font-size: 18px;
        // word-break: break-all;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        transition: color 0.2s ease-in-out;
      }
    }
  }
}

@media only screen and (min-width: @digu-lg) and (max-width: @digu-xl) {
  .web-area-panel-wrap {
    margin-bottom: 32px; // -8
    .title-wrap {
      height: 28px; // -4
      .title {
        font-size: 26px; // -2
        line-height: 20px; // -4
      }
      .more {
        font-size: 16px; // -2
        line-height: 16px; // -2
        padding: 6px; // -2
      }
    }
    .preview-wrap {
      padding-top: 12px; // -4
      gap: 2%; // 15*6 + 2*5
      margin-left: -1%;
      padding-left: 1%;
      margin-right: -1%;
      padding-right: 1%;

      .item {
        max-width: 15%;
        flex: 0 0 15%;
        p.title {
          font-size: 16px; // -2
        }
      }
    }
  }
}

@media only screen and (min-width: @digu-md) and (max-width: @digu-lg) {
  .web-area-panel-wrap {
    margin-bottom: 24px; // -8
    .title-wrap {
      height: 24px; // -4
      .title {
        font-size: 24px; // -2
        line-height: 16px; // -4
      }
      .more {
        font-size: 15px; // -1
        line-height: 15px; // -1
      }
    }
    .preview-wrap {
      padding-top: 12px;
      gap: 2.5%; // 18*5 + 2.5*4
      margin-left: -1.25%;
      padding-left: 1.25%;
      margin-right: -1.25%;
      padding-right: 1.25%;

      .item {
        max-width: 18%;
        flex: 0 0 18%;
        p.title {
          font-size: 15px; // -1
        }
      }
    }
  }
}

@media only screen and (min-width: @digu-sm) and (max-width: @digu-md) {
}

@media only screen and (min-width: 0) and (max-width: @digu-sm) {
}
</style>
