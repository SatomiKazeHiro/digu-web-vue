<template>
  <div class="manage-preview" v-if="itemObj.cover">
    <div class="preview-wrap">
      <div class="img-cover" align="center">
        <img ref="cover" :src="'/proxy' + itemObj.cover" @load="showImg" />
      </div>
    </div>
    <div class="info-wrap">
      <div class="item-title">{{ itemObj.title }}</div>
      <div class="item-cell">
        <div class="item-cell-content">
          <span class="tag">标签1</span>
          <span class="tag">标签2</span>
          <span class="tag">标签3</span>
          <span class="tag">标签4</span>
          <span class="tag">标签5</span>
        </div>
      </div>
      <div class="item-infos">
        <div class="info-block">
          <div class="info-label">收录时间</div>
          <div class="info-content">{{ dateFormat(itemObj.id) }}</div>
        </div>
        <div class="info-block">
          <div class="info-label">文件数量</div>
          <div class="info-content">{{ itemObj.amount || "/" }}</div>
        </div>
        <div class="info-block">
          <div class="info-label">空间大小</div>
          <div class="info-content">{{ itemObj.size || "/" }}</div>
        </div>
      </div>
      <div class="item-cell">
        <div class="item-cell-label">简介</div>
        <div class="item-cell-content">{{ itemObj.intro || "无" }}</div>
      </div>
      <div class="item-cell">
        <div class="item-cell-label">关联</div>
        <div class="item-cell-content">
          <span class="link">SP</span>
          <span class="link">OVA</span>
          <span class="link">第二季</span>
          <span class="link">剧场版</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ManagePreview",
  props: {
    itemObj: { type: Object, default: {} },
  },
  methods: {
    // 将时间戳格式化
    dateFormat(time) {
      time = parseInt(time);
      let date = new Date(time + 8 * 3600000);
      let str = date.toISOString().replace("T", " ");
      return str.substr(0, str.lastIndexOf("."));
    },
    // 图片适应容器
    showImg() {
      if (this.$refs.cover) {
        if (this.$refs.cover.naturalWidth > this.$refs.cover.naturalHeight)
          this.$refs.cover.classList.add("horizontal");
        else this.$refs.cover.classList.remove("horizontal");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.manage-preview {
  width: 100%;
  height: 100%;
  display: flex;
  .preview-wrap {
    width: 25%;
    min-width: 300px;
    position: relative;
    .img-cover {
      position: absolute;
      left: 20px;
      top: 20px;
      bottom: 20px;
      right: 20px;
      overflow: hidden;
      border-radius: 4px;
      img {
        // width: 100%;
        width: auto;
        height: 100%;
        object-fit: cover;
        border-radius: 4px;
        &.horizontal {
          width: 100%;
          height: auto;
        }
      }
    }
  }
  .info-wrap {
    flex: 1;
    min-width: 452px;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    padding: 20px 0;
    .item-title {
      font-size: 20px;
      line-height: 30px;
      font-weight: 700;
      overflow: hidden;
      -webkit-line-clamp: 2;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
    }
    .item-cell {
      margin-top: 20px;
      .item-cell-label {
        font-size: 16px;
        margin-bottom: 4px;
      }
      .item-cell-content {
        font-size: 14px;
        span.tag {
          font-size: 12px;
          height: 20px;
          line-height: 18px;
          display: inline-block;
          vertical-align: middle;
          margin-right: 10px;
          padding: 0 4px;
          color: #fff;
          border: 1px solid #fff;
          border-radius: 3px;
          cursor: pointer;
        }
        span.link {
          font-size: 12px;
          color: #fff;
          display: inline-block;
          vertical-align: middle;
          margin-right: 10px;
          cursor: pointer;
        }
      }
    }
    .item-infos {
      margin-top: 20px;
      display: flex;
      .info-block {
        flex: 1;
        padding-right: 20px;
        margin-right: 20px;
        border-right: 1px solid #fff;
        display: inline-block;
        &:last-child {
          border-right: none;
        }
        .info-label {
          font-size: 16px;
          margin-bottom: 3px;
        }
        .info-content {
          font-size: 14px;
          padding-bottom: 3px;
        }
      }
    }
  }
}
</style>
