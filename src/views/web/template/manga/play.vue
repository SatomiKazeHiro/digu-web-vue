<template>
  <div id="manga-play" v-if="type">
    <div class="manga-container">
      <div class="view-wrap" :class="{ single: viewType === 'single' }">
        <div
          v-for="(i, index) in list"
          :key="i"
          class="view-cell"
          :class="{ active: index + 1 == count }"
        >
          <img v-lazy-img="i" v-show="viewType === 'strip' || index + 1 == count" />
        </div>
        <div class="action-box">
          <div class="action" @click="viewClick('pre')"></div>
          <div class="action" @click="activeClick"></div>
          <div class="action" @click="viewClick('next')"></div>
        </div>
        <div class="operation-box">
          <div
            ref="nav"
            class="sensing-zone nav"
            @mouseover="onMouseover"
            @mouseleave="omMouseleave"
          >
            <div class="operation-nav" :class="{ active: isHover }">
              <div class="operation-container">
                <span @click="$linkTo('/')">首页</span>
                <div class="manga-path max-line-1">
                  <span style="cursor: pointer; color: #fff">{{ mediaInfo.title }}</span>
                  <span v-if="chapterName" style="padding: 0 4px; color: #bbb">></span>
                  <span v-if="chapterName" style="color: #bbb" :title="chapterName">
                    {{ chapterName }}
                  </span>
                </div>
                <span>历史记录</span>
              </div>
            </div>
          </div>
          <div
            ref="tool"
            class="sensing-zone tool"
            @mouseover="onMouseover"
            @mouseleave="omMouseleave"
          >
            <div class="operation-nav" :class="{ active: isHover }">
              <div class="operation-container">
                <span
                  v-if="type !== 'separate'"
                  @click="viewClick('pre')"
                  :class="{ disabled: isFirst }"
                  >上一话</span
                >
                <span v-if="viewType === 'single'" @click="picClick('pre')">上一页</span>
                <span @click="autopPlay">幻灯片</span>
                <span v-if="viewType === 'single'" @click="picClick('next')">下一页</span>
                <span
                  v-if="type !== 'separate'"
                  @click="viewClick('next')"
                  :class="{ disabled: isLast }"
                  >下一话</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { IMAGE_FORMAT } from "config";
import { getFolderFiles } from "network/getWebData";
export default {
  props: {
    mediaInfo: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      isHover: false,
      timer: null,
      count: 1,
      viewType: "strip", // single 单页 strip 条漫
      list: [],
      type: null,
      mode: null,
      chapter: null,
      chapterName: null,
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
    if (this.$route.query.p) {
      this.count = this.$route.query.p;
      this.viewType = "single";
    }
    const chapter = Number(this.$route.params.chapter);
    this.chapter = chapter;

    if (!chapter) {
      this.type = "separate";
      this.setList(this.mediaInfo.files_detail, this.mediaInfo.sources_url);
    } else {
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
            this.type = "serialize";
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
      this.list.splice(
        0,
        this.list.length,
        ...fd.filter((f) => IMAGE_FORMAT.includes(f.ext)).map((i) => `/proxy${path}${i.target}`)
      );
    },

    // 工具栏感应
    onMouseover() {
      console.log("over");
      this.isHover = true;
      if (this.timer) clearTimeout(this.timer);
    },
    omMouseleave() {
      console.log("leave");
      if (this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.isHover = false;
      }, 3000);
    },

    // 激活工具栏
    activeClick() {
      // over + leave
      this.isHover = !this.isHover;
      if (this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.isHover = false;
      }, 3000);
    },

    // 上/下一页点击
    picClick(type) {
      if (type === "pre") {
        if (this.count - 1 < 1) this.count = 1;
        else --this.count;
      } else if (type === "next") {
        if (this.count + 1 > this.list.length) this.count = this.list.length;
        else ++this.count;
      }
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
        this.fetchFolderFiles(chapterObj.path);
      }
    },

    // 自动播放
    autopPlay() {},
  },
  beforeDestroy() {
    if (this.timer) clearTimeout(this.timer);
  },
};
</script>

<style lang="scss" scoped>
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
          text-align: center;
          overflow: hidden;
          &.active {
            height: 100%;
          }
        }
      }
      .view-cell {
        text-align: center;
        img {
          max-width: 100%;
          user-select: none;
          -webkit-user-drag: none;
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
      }
    }
  }
}

// 平板 <1024
@media only screen and (max-width: 1044px) {
  #manga-play {
    .manga-container {
      .view-wrap {
        .operation-box {
          overflow: hidden;
          &::-webkit-scrollbar {
            background: transparent;
          }
          .sensing-zone {
            > .operation-nav {
              padding: 0 4.66vw;
              .operation-container {
                width: 100%;
              }
            }
          }
        }
      }
    }
  }
}
</style>
