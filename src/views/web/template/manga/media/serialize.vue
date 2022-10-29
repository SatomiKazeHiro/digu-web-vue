<template>
  <div class="serialize-wrap">
    <div class="media-wrap">
      <div class="cover-wrp"></div>
      <div class="info-wrp">
        <h1>title</h1>
      </div>
    </div>
    <div class="main-wrap">
      <div class="section-cell">
        <div class="section-title">章节列表</div>
        <div class="section-list">
          <button class="list-item">1</button>
          <button class="list-item">2</button>
          <button class="list-item">3</button>
          <button class="list-item">4</button>
          <button class="list-item">5</button>
          <button class="list-item">6</button>
          <button class="list-item">7</button>
          <button class="list-item">8</button>
          <button class="list-item">9</button>
          <button class="list-item">10</button>
          <button class="list-item">11</button>
          <button class="list-item">12</button>
          <button class="list-item">13</button>
          <button class="list-item">14</button>
          <button class="list-item">15</button>
        </div>
      </div>
      <div class="recommend-cell">
        <div class="recommend-title">推荐</div>
        <div>{{ mediaInfo }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    mediaInfo: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>

<style lang="scss" scoped>
.serialize-wrap {
  .media-wrap {
    width: 1160px;
    height: 360px;
    padding: 16px;
    margin: 0 auto;
    display: flex;
    gap: 16px;
    background-color: teal;
    border-radius: 4px;
    .cover-wrp {
      width: 240px;
      min-height: 320px;
      height: 100%;
      background: orange;
    }
    .info-wrp {
      min-width: 872px;
      background: darkslategray;
      display: flex;
      flex-direction: column;
    }
  }
  .main-wrap {
    width: 1160px;
    padding: 16px;
    margin: 16px auto 0;
    background-color: teal;
    border-radius: 4px;
    .section-cell {
      .section-title {
        display: flex;
        align-items: center;
        font-size: 24px;
        color: rgba(0, 0, 0, 0.87);
        height: 30px;
      }
      .section-list {
        margin-top: 16px;
        display: flex;
        align-content: flex-start;
        flex-flow: row wrap;
        button.list-item {
          position: relative;
          width: 173px;
          height: 42px;
          padding: 0 12px;
          margin-bottom: 16px;
          margin-right: 16px;
          font-size: 14px;
          line-height: 1.5;
          color: rgba(0, 0, 0, 0.87);
          background-color: #fff;
          text-align: left;
          border: 1px solid rgba(0, 0, 0, 0.12);
          border-radius: 3px;
          cursor: pointer;
          &:nth-child(6n) {
            margin-right: 0;
          }
          &:hover {
            color: #409eff;
            border-color: #c6e2ff;
            background-color: #ecf5ff;
          }
        }
      }
    }
    .recommend-cell {
      .recommend-title {
        margin: 0 0 24px;
        font-size: 24px;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.87);
      }
    }
  }
}

// 平板 宽屏 1024~1280
@media only screen and (max-width: 1300px) {
}

// 平板 <1024
@media only screen and (max-width: 1044px) {
}

// 手机 <720
@media only screen and (max-width: 740px) {
}
</style>
