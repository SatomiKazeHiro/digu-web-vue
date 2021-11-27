<template>
  <div class="area-panel">
    <div class="area-name">
      <div class="title">
        <span>{{ title }}</span>
      </div>
      <div class="btns">
        <a :href="'/' + area" class="more">查看更多</a>
      </div>
    </div>
    <div class="panel-content">
      <div class="item-unity" v-for="i in areaList" :key="i.title">
        <div class="item-type">
          <span>{{ i.type }}</span>
        </div>
        <a :href="createAUrl(i.url, i.id)">
          <img
            :src="`/proxy${i.url}${i.title}/${i.cover}`"
            class="opacity-0"
            :ref="'a' + i.id"
            @load="showImg(i.id)"
          />
        </a>
        <span class="item-title" :title="i.title">{{ i.title }}</span>
        <span class="item-status">{{ i.status }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "IndexAreaPanel",
  props: {
    area: {
      type: String,
      default() {
        return "";
      },
    },
    title: {
      type: String,
      default() {
        return "";
      },
    },
    areaList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  mounted() {
    console.log(this.areaList);
  },
  methods: {
    showImg(id) {
      // 当图片的高大于宽的时候，使用竖版图片模板
      if (
        this.$refs["a" + id][0].naturalHeight >
        this.$refs["a" + id][0].naturalWidth
      ) {
        this.$refs["a" + id][0].classList.toggle("vertical-img-t");
      }
      this.$refs["a" + id][0].classList.toggle("opacity-0");
    },
    createAUrl(url, id) {
      return `/${url.split("/")[2]}/${url.split("/")[3]}/${id}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.area-panel {
  background-color: #ffffff;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  overflow: hidden;
  margin-top: 20px;
  padding: 5px 0;
  .area-name {
    height: 46px;
    display: flex;
    align-items: center;
    margin-bottom: 5px;
    padding-bottom: 6px;
    border-bottom: 1px solid #ff8a80;
    .title {
      line-height: 40px;
      span {
        font-size: 23px;
        border-left: 5px solid #ff8a80;
        padding-left: 10px;
      }
    }
    .btns {
      flex: 1;
      text-align: right;
      .more {
        float: right;
        font-size: 12px;
        padding: 2px 8px 2px 12px;
        border-radius: 10px 0px 0px 10px;
        color: #ffffff;
        background: #ff8a80;
        transition: 0.25s;
        &:hover {
          background: #000;
        }
      }
    }
  }
  .panel-content {
    padding: 15px;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: flex-start;
    -ms-flex-pack: justify;
    -ms-flex-line-pack: justify;
    overflow: hidden;
    .item-unity {
      position: relative;
      width: 191.66px;
      border-radius: 4px;
      overflow: hidden;
      margin-right: 20px;
      margin-bottom: 10px;
      &:nth-child(6n + 6) {
        margin-right: 0px;
      }
      a {
        width: 100%;
        display: initial;
        img {
          display: block;
          width: 100%;
          height: auto;
          object-fit: cover;
          border-radius: 5px;
          overflow: hidden;
          box-shadow: rgba(0, 0, 0, 0.24) 0px 2px 5px;
          transition: 0.3s;
          &.vertical-img-t {
            height: 269.2px;
          }
        }
      }
      span.item-title {
        font-size: 14px;
        margin: 5px 0;
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        font-weight: bold;
      }
    }
  }
}
// 平板 宽屏 1000~1280
@media only screen and (max-width: 1300px) {
  .area-panel {
    .panel-content {
      .item-unity {
        width: 182.8px;
        margin-right: 14px;
        margin-bottom: 8px;
        // 将原来的 6n 的样式改成普通的
        &:nth-child(6n + 6) {
          margin-right: 14px;
        }
        // 贴边的 5n 使用特殊样式
        &:nth-child(5n + 5) {
          margin-right: 0px;
        }
        // 隐藏掉多余的
        &:nth-child(11),
        &:nth-child(12) {
          display: none;
        }
        a img {
          &.vertical-img-t {
            height: 269.2px;
          }
        }
      }
    }
  }
}
</style>
