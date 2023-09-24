<template>
  <div id="manga-play" v-if="type">
    <div class="manga-container">
      <div class="view-wrap" :class="{ single: mode === 'single' }">
        <div v-for="(i, index) in list" :key="i" class="view-cell" :class="{ active: index + 1 == current }">
          <img v-lazy-img="{ URL: i }" v-show="mode === 'strip' || index + 1 == current" :class="{ strip: mode === 'strip' }" />
        </div>
        <div class="action-box">
          <div class="action left" @click="handleActionClick('pre')"></div>
          <div class="action center" @click="handleActiveClick()"></div>
          <div class="action right" @click="handleActionClick('next')"></div>
        </div>
        <div class="operation-box">
          <div ref="nav" class="sensing-zone nav" @mouseover="onMouseover" @mouseleave="omMouseleave">
            <div class="operation-nav" :class="{ active: isHover }">
              <div class="operation-container">
                <span class="home" @click="$linkTo('/')">首页</span>
                <span class="return" @click="$linkTo(mediaInfo.link_url, true)">
                  <svg-icon icon-class="left-arrow"></svg-icon>
                </span>
                <div class="manga-path max-line-1" :class="{ hasChapter: chapter }">
                  <span class="work" style="cursor: pointer; color: #fff">
                    {{ mediaInfo.title }}
                  </span>
                  <span class="sep" v-if="chapterName" style="padding: 0 4px; color: #bbb">></span>
                  <span class="chapter" v-if="chapterName" style="color: #bbb" :title="chapterName">
                    {{ chapterName }}
                  </span>
                </div>
                <span class="history">历史记录</span>
                <span class="setting" @click="openSetting()">
                  <svg-icon icon-class="manga-setting"></svg-icon>
                </span>
              </div>
            </div>
          </div>
          <div ref="tool" class="sensing-zone tool" @mouseover="onMouseover" @mouseleave="omMouseleave">
            <div class="operation-nav" :class="{ active: isHover }">
              <div class="operation-container">
                <span v-if="type !== 'separate'" @click="viewClick('pre')" :class="{ disabled: isFirst }">上一话</span>
                <span v-if="mode === 'single'" @click="picClick('pre')">上一页</span>
                <span v-if="mode === 'single'" @click="autoPlay()" :class="{ active: isAutoPlay }"> 幻灯片 </span>
                <span v-if="mode === 'single'" @click="picClick('next')">下一页</span>
                <span v-if="type !== 'separate'" @click="viewClick('next')" :class="{ disabled: isLast }">下一话</span>
              </div>
            </div>
          </div>
          <div ref="setting" :class="{ active: isOpenSetting }" class="setting-zone">
            <div class="setting-mask" @click="isOpenSetting = false"></div>
            <div class="setting-panel">
              <h3 class="title">设置</h3>
              <div class="setting-content">
                <div class="item">
                  <div class="row">
                    <div class="label">阅读模式</div>
                    <div class="content">
                      <div class="select-box" :class="{ active: mode === 'single' }" @click="setMode('single')">
                        <span class="icon"><svg-icon icon-class="manga-single"></svg-icon></span>
                        <span>单页</span>
                      </div>
                      <div class="select-box" :class="{ active: mode === 'strip' }" @click="setMode('strip')">
                        <span class="icon"><svg-icon icon-class="manga-strip"></svg-icon></span>
                        <span>条漫</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="item">
                  <div class="row">
                    <div class="label">自动播放间隔</div>
                    <div class="content">
                      <input
                        class="slider"
                        v-model:="autoPlayIntervalTime"
                        type="range"
                        min="1"
                        max="9"
                        style="width: 25vw; max-width: 88px"
                        :style="{ backgroundSize: (autoPlayIntervalTime / 9) * 100 + '% 100%' }"
                      />
                      <span class="desc">{{ autoPlayIntervalTime }}秒</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const { merge } = require("webpack-merge");
import { IMAGE_FORMAT } from "config";
import { getFolderFiles } from "network/getWebData";

export default {
  props: {
    mediaInfo: { type: Object, default: () => ({}) },
  },
  data() {
    return {
      isHover: false,
      timer: null,
      current: 1,
      mode: null, // single-单页 strip-条漫
      list: [],
      type: null, // 媒体是否连载
      chapter: null,
      chapterName: null,
      autoPlayIntervalTime: 3,
      autoPlayTimer: false,
      isAutoPlay: false,
      isOpenSetting: false,
    };
  },
  computed: {
    isFirst() {
      return this.chapter == 1;
    },
    isLast() {
      return this.chapter == this.mediaInfo.files_detail.length;
    },
  },
  created() {
    // 有指定页数则模式为单页
    if (this.$route.query.p) {
      this.current = this.$route.query.p;
      this.mode = "single";
    } else this.mode = "strip";

    // 存在章节则类型为连载
    const chapter = Number(this.$route.params.chapter);
    this.chapter = chapter;

    if (!chapter) {
      this.type = "separate";
      this.setList(this.mediaInfo.files_detail, this.mediaInfo.sources_url);
    } else {
      this.type = "serialize";
      this.switchChapter(chapter);
    }
  },
  methods: {
    // 获取对应路径的目录的文件
    fetchFolderFiles(path) {
      getFolderFiles(path)
        .then((res) => {
          if (res.code && res.code === 200) {
            this.setList(res.data.details, `${path}/`);
            this.current = 1;
          } else if (res.code && res.code === 400) {
            this.$router.push({ name: "error" });
          }
        })
        .catch((err) => {
          console.log(err);
          this.$router.push({ name: "error" });
        });
    },

    // 漫画列表更新
    setList(fd, path) {
      this.list.splice(0, this.list.length, ...fd.filter((f) => IMAGE_FORMAT.includes(f.ext)).map((i) => `/proxy${path}${i.target}`));
    },

    // 工具栏感应
    onMouseover() {
      this.isHover = true;
      if (this.timer) clearTimeout(this.timer);
    },
    omMouseleave() {
      if (this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.isHover = false;
      }, 3000);
    },

    // 激活工具栏
    handleActiveClick() {
      // over + leave
      this.isHover = !this.isHover;
      if (this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.isHover = false;
      }, 3000);
    },

    // 视图内容点击
    handleActionClick(type) {
      if (this.mode === "single") this.picClick(type);
      else if (this.mode === "strip") this.viewClick(type);
    },

    // 上/下一页点击
    picClick(type) {
      if (type === "pre") {
        if (this.current - 1 < 1) this.current = 1;
        else --this.current;
      } else if (type === "next") {
        if (this.current + 1 > this.list.length) this.current = this.list.length;
        else ++this.current;
      }
      // 更新页脚
      if (this.type == "separate") this.$router.push({ query: merge(this.$route.query, { p: this.current }) });
    },

    // 上/下一章点击
    viewClick(type) {
      // 非连载无上下章切换
      if (this.mediaInfo.type !== "serial") return;

      let { fullPath } = this.$route;
      fullPath = fullPath.slice(0, fullPath.lastIndexOf("/"));

      let chapter = this.chapter;
      if (type === "pre" && chapter > 1) {
        this.$linkTo(`${fullPath}/${--chapter}`, true);
      } else if (type === "next" && chapter < this.mediaInfo.files_detail.length) {
        this.$linkTo(`${fullPath}/${++chapter}`, true);
      }
      if (chapter !== this.chapter) {
        this.chapter = chapter;
        this.switchChapter(chapter);
      }
    },

    // 章节切换
    switchChapter(chapter) {
      const chapterObj = this.mediaInfo.files_detail[chapter - 1];
      this.chapterName = chapterObj.name;
      if (!chapterObj || !chapterObj.path) this.$router.push({ name: "error" });
      else {
        this.current = null;
        this.fetchFolderFiles(chapterObj.path);
      }
    },

    // 点击返回
    handleReturn() {
      this.$linkTo(this.mediaInfo.link_url, true);
    },

    // 设置阅读模式
    setMode(type) {
      // 自动播放的情况下不允许修改
      if (this.isAutoPlay) return; // 后续加个提示
      this.mode = type;
    },

    // 自动播放
    autoPlay() {
      if (this.isAutoPlay) {
        // 原开启则关闭
        this.isAutoPlay = false;
        if (this.autoPlayTimer) clearInterval(this.autoPlayTimer);
      } else {
        // 原关闭则开启
        this.isAutoPlay = true;
        // 定时器重置
        if (this.autoPlayTimer) clearInterval(this.autoPlayTimer);
        this.autoPlayTimer = setInterval(() => {
          if (this.current + 1 > this.list.length) {
            // 下一章
            if (this.chapter < this.mediaInfo.files_detail.length) {
              this.switchChapter(++this.chapter);
            } else {
              // 终章
              clearTimeout(this.autoPlayTimer);
              this.isAutoPlay = false;
            }
          } else {
            // 下一页
            this.picClick("next");
          }
        }, (this.autoPlayIntervalTime || 3) * 1000);
      }
    },

    // 打开设置弹窗
    openSetting() {
      // 收缩感应区
      if (this.timer) clearTimeout(this.timer);
      this.isHover = false;
      this.isOpenSetting = true;
    },
  },
  beforeDestroy() {
    if (this.timer) clearTimeout(this.timer);
    if (this.autoPlayTimer) clearInterval(this.autoPlayTimer);
  },
};
</script>

<style lang="less" scoped>
#manga-play {
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background-color: #222;
  .manga-container {
    height: 100%;
    overflow-y: auto;
    .view-wrap {
      width: 100%;
      position: relative;
      &.single {
        height: 100%;
        .view-cell {
          height: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          &.active {
            height: 100%;
          }
        }
        .operation-box {
          overflow: hidden;
        }
      }
      .view-cell {
        text-align: center;
        img {
          max-width: 100%;
          user-select: none;
          -webkit-user-drag: none;
          &.strip {
            min-height: 100vh;
          }
        }
      }
      .action-box {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        .action {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          &.left {
            cursor: url("~assets/img/web/manga/manga-left.png"), default;
          }
          &.right {
            cursor: url("~assets/img/web/manga/manga-right.png"), default;
          }
        }
      }
      .operation-box {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        overflow-y: scroll;
        overflow-x: hidden;
        &::-webkit-scrollbar {
          // 滚动条背景透明
          background: transparent;
        }
        .sensing-zone {
          position: absolute;
          left: 0;
          width: 100%;
          height: 52px;
          pointer-events: all;
          &.nav {
            top: 0;
            > .operation-nav {
              transform: translateY(-100%);
            }
          }
          &.tool {
            bottom: 0;
            > .operation-nav {
              transform: translateY(100%);
            }
          }
          > .operation-nav {
            background-color: rgba(11, 11, 11, 0.8);
            width: 100%;
            height: 52px;
            transition: transform 0.3s linear;
            &.active {
              transform: translateY(0) !important;
            }
            .operation-container {
              margin: 0 auto;
              width: 960px;
              height: 100%;
              display: flex;
              align-items: center;
              justify-content: space-between;
              position: relative;
              > span {
                color: #fff;
                cursor: pointer;
                transition: all 0.25s linear;
                &.return {
                  display: none;
                  font-size: 32px;
                  font-weight: bold;
                  transform: translateX(-8px);
                }
                &.setting {
                  display: none;
                  font-size: 32px;
                  font-weight: bold;
                  transform: translateX(8px);
                }
                &.active {
                  background-color: #4fa0e7;
                  padding: 4px 12px;
                  border-radius: 8px;
                  font-size: 14px;
                }
              }
              .manga-path {
                width: 50%;
                position: absolute;
                left: 50%;
                top: 0;
                transform: translateX(-50%);
                line-height: 52px;
                text-align: center;
                color: #bbb;
              }
            }
          }
        }
        .setting-zone {
          z-index: 5;
          height: 100%;
          pointer-events: none;
          &.active {
            pointer-events: all;
            .setting-mask {
              opacity: 1;
            }
            .setting-panel {
              transform: translateY(0);
            }
          }
          .setting-mask {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            background-color: rgba(0, 0, 0, 0.18);
            transition: opacity 0.25s linear;
          }
          .setting-panel {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            background-color: #1b1d2c;
            border-top-left-radius: 24px;
            border-top-right-radius: 24px;
            padding: 20px 20px 56px;
            box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 3px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
            display: flex;
            flex-direction: column;
            gap: 16px;
            transform: translateY(100%);
            transition: transform 0.25s linear;
            .title {
              color: #d5d7e6;
            }
            .setting-content {
              flex: 1;
              display: flex;
              flex-direction: column;
              gap: 16px;
              .item {
                width: 100%;
                border-radius: 12px;
                background-color: #1f2639;
                display: flex;
                flex-direction: column;
                gap: 8px;
                .row {
                  min-height: 48px;
                  display: flex;
                  align-items: center;
                  gap: 16px;
                  padding: 16px;
                  color: #9ea3b7;
                  .content {
                    flex: 1;
                    display: flex;
                    justify-content: flex-end;
                    gap: 16px;
                    .select-box {
                      color: #9ea3b7;
                      padding: 8px 16px;
                      border: 1px solid #b4bdc3;
                      border-radius: 8px;
                      font-size: 14px;
                      display: flex;
                      align-items: center;
                      cursor: pointer;
                      .icon {
                        font-size: 16px;
                        margin-right: 4px;
                      }
                      &.active {
                        color: #4fa0e7;
                        border: 1px solid #4fa0e7;
                      }
                    }
                    input[type="range"].slider {
                      margin-top: 10px; /*上部分的填充值*/
                      outline: none;
                      -webkit-appearance: none; /*清除系统默认样式*/
                      background: -webkit-linear-gradient(#4fa0e7, #4fa0e7) no-repeat, #9ea3b7; /*背景颜色，俩个颜色分别对应上下*/
                      background-size: 33% 100%; /*设置左右宽度比例*/
                      height: 2px;
                    }
                    /*拖动块的样式*/
                    input[type="range"].slider::-webkit-slider-thumb {
                      -webkit-appearance: none; /*清除系统默认样式*/
                      height: 12px; /*拖动块高度*/
                      width: 12px; /*拖动块宽度*/
                      background: #e9ebea; /*拖动块背景*/
                      border-radius: 50%; /*外观设置为圆形*/
                      border: solid 1px #ddd; /*设置边框*/
                      cursor: pointer;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

// 平板 <1024
@media only screen and (max-width: 1044px) {
  #manga-play {
    .manga-container {
      .view-wrap {
        .view-cell {
          img.strip {
            min-height: unset;
          }
        }
        .action-box {
          .action.center {
            flex: 2;
          }
        }
        .operation-box {
          overflow: hidden;
          .sensing-zone {
            > .operation-nav {
              padding: 0 5.2vw;
              .operation-container {
                width: 100%;
                > span {
                  &.home,
                  &.history {
                    display: none;
                  }
                  &.return,
                  &.setting {
                    display: block;
                  }
                }
                .manga-path {
                  position: static;
                  width: 0;
                  flex: 1;
                  text-align: left;
                  transform: translateX(0);
                  padding-right: 20%;
                  &.hasChapter {
                    .work,
                    .sep {
                      display: none;
                    }
                    .chapter {
                      color: #fff !important;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
