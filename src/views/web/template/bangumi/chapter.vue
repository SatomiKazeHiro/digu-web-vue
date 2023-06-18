<template>
  <div class="bangumi-template">
    <div class="play-wrap">
      <div class="play-inner">
        <div class="play-info">
          <h1 class="title">{{ mediaInfo.title }}</h1>
          <div class="path-breadcrumb">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item @click.native="handleBreadcrumbOpen('/')"
                >主站</el-breadcrumb-item
              >
              <el-breadcrumb-item
                @click.native="handleBreadcrumbOpen(`/${path.area}`)"
                >{{ path.area_web_name || path.area }}</el-breadcrumb-item
              >
              <el-breadcrumb-item
                @click.native="
                  handleBreadcrumbOpen(`/${path.area}/${path.category}`)
                "
                >{{
                  path.category_web_name || path.category
                }}</el-breadcrumb-item
              >
              <el-breadcrumb-item
                @click.native="
                  handleBreadcrumbOpen(
                    `/${path.area}/${path.category}/${$route.params.item}`
                  )
                "
                >{{ mediaInfo.title }}</el-breadcrumb-item
              >
              <el-breadcrumb-item>{{ currentPlay.label }}</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
        </div>
        <div class="player-wrap">
          <div class="player-content">
            <div id="mui-player" class="player"></div>
          </div>
          <div class="play-list">
            <div class="play-list-box">
              <div class="play-list-top">
                <span title="选集">选集</span>
              </div>
              <div class="play-list-content">
                <ul>
                  <li
                    class="scroll-item"
                    v-for="p in playList"
                    :key="p.value"
                    :title="p.label"
                    @click="handleChapterChange(p.link_url)"
                    :class="{ playing: isCurrentPlaying(p.link_url) }"
                  >
                    {{ p.label }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="media-wrap">
      <div class="tab"></div>
      <div class="tab-inner">
        <div class="media-content">
          <item-play-list
            :mediaInfo="mediaInfo"
            v-if="isScreenWidthLessThanX()"
          ></item-play-list>
          <item-media-info
            :mediaInfo="mediaInfo"
            :border="isScreenWidthLessThanX()"
          ></item-media-info>
          <item-random></item-random>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MuiPlayer from "mui-player";
import MuiPlayerDesktopPlugin from "mui-player-desktop-plugin";
import "mui-player/dist/mui-player.min.css";

import { VIDEO_FORMAT } from "@/config";
import { getACPath } from "@/network/getWebData";

import ItemMediaInfo from "components/content/item-media-info";
import ItemPlayList from "components/content/item-play-list";
import ItemRandom from "components/content/item-random";
export default {
  components: {
    ItemPlayList,
    ItemRandom,
    ItemMediaInfo,
  },
  props: {
    mediaInfo: { type: Object, default: () => ({}) },
  },
  data() {
    return {
      // 播放器
      player: "",
      // 播放列表
      playList: [],
      // 当前播放的媒体信息
      currentPlay: {},
      // 导航面包屑
      path: {},
    };
  },
  created() {
    this.playList = this.mediaInfo.files_detail
      .filter((f) => VIDEO_FORMAT.includes(f.ext))
      .map((i, index) => ({
        label: i.name,
        source_url: `${this.mediaInfo.sources_url}${i.target}`,
        link_url: `${this.mediaInfo.link_url}/s/${index + 1}`,
      }));

    // 如果没有播放内容则跳转至404
    if (!this.playList[this.$route.params.chapter - 1])
      this.$router.push("/404");
    else {
      this.currentPlay = this.playList[this.$route.params.chapter - 1];
      console.log(9999, this.currentPlay);

      // 获取导航路径
      getACPath(this.mediaInfo.area, this.mediaInfo.category).then((res) => {
        console.log("获取导航路径：", res);
        if (res.code && res.code === 200) this.path = res.data;
      });
    }
  },
  mounted() {
    // 初始化播放器
    this.initPlayer();
    // 给播放器中的原生 video 打上标签，在画中画模式中用于判断是否是自己的页面开了画中画模式
    this.player.video().setAttribute("id", "digu-player");
  },
  methods: {
    // 初始化播放器
    initPlayer() {
      // 播放器配置
      this.player = new MuiPlayer({
        container: "#mui-player",
        title: this.currentPlay.label,
        src: `/proxy${this.currentPlay.source_url}`,
        plugins: [new MuiPlayerDesktopPlugin({})],
      });
    },

    // 导航面包屑跳转
    handleBreadcrumbOpen(url) {
      console.log(url);
      window.open(url, "_blank");
    },

    // 右侧列表面板点击切换频道
    handleChapterChange(url) {
      console.log(url);
      this.$router.push(url);
    },

    // 判断是否是当前播放的集
    isCurrentPlaying(link_url) {
      if (this.currentPlay && this.currentPlay.link_url === link_url)
        return true;
      else return false;
    },

    // 屏幕适应处理
    isScreenWidthLessThanX(w = 1044) {
      if (this.$store.state._browserStatus.appWidth < w) return true;
      else return false;
    },

    // 重新载入视频
    reloadVideo() {
      // 设置新的媒体源的路径
      this.player.reloadUrl("/proxy" + this.currentPlay.source_url);
      // 由于 MuiPlayer 官方没有提供修改 title 的方法，需要同js修改
      // ***注：这里修改 title 需要放在更新了路径之后（否则其title覆盖自定义新的）
      document.getElementById("title-name").innerHTML = this.currentPlay.label;
      // 换源后会更新原生的 video，这里从新打上id
      this.player.video().setAttribute("id", "digu-player");
    },
  },
  watch: {
    "$route.path"(newVal, oldVal) {
      // 最迫不得已的情况使用重刷新
      // window.location.reload()

      if (this.player) {
        let newPlayMedia = this.playList.filter(
          (i) => i.link_url === newVal
        )[0];
        // 路径正确则换源
        if (!newPlayMedia) this.$router.push("/404");
        else {
          // 更新当前播放的媒体信息
          this.currentPlay = newPlayMedia;

          // 判断是否是本页打开的画中画模式，是则关闭画中画模式，并重新加载视频
          if (
            document.pictureInPictureElement &&
            document.pictureInPictureElement.id === "digu-player"
          ) {
            document.exitPictureInPicture().then(() => {
              this.reloadVideo();
            });
          } else this.reloadVideo();
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.bangumi-template {
  .play-wrap {
    padding: 15px 0 30px;
    background: #181818;
    .play-inner {
      margin: 0 auto;
      width: 1280px;
      .play-info {
        .title {
          color: #f0f0f0;
          font-size: 25px;
          margin-bottom: 12px;
        }
      }
      .path-breadcrumb {
        margin-bottom: 23px;
      }
      .player-wrap {
        display: flex;
        .player-content {
          width: 1024px;
          // height/width=0.56
          height: 573.5px;
          .player {
            width: 100% !important;
            height: 100% !important;
          }
        }
        .play-list {
          flex: 1;
          width: 0;
          // padding-left: 5px;
          .play-list-box {
            width: 100%;
            height: 100%;
            background: #252525;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            .play-list-top {
              height: 42px;
              line-height: 42px;
              padding: 0 10px;
              span {
                color: #969696;
              }
            }
            .play-list-content {
              height: 531.5px;
              overflow: auto;
              &::-webkit-scrollbar {
                width: 8px;
                height: 8px;
              }
              /*滚动条里面小方块样式*/
              &::-webkit-scrollbar-thumb {
                border-radius: 100px;
                -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
                background: rgb(80, 80, 80);
              }
              /*滚动条里面轨道样式*/
              &::-webkit-scrollbar-track {
                -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
                border-radius: 0;
                background: rgba(0, 0, 0, 0.1);
              }
              ul {
                padding: 0 7px;
                li.scroll-item {
                  height: 30px;
                  line-height: 30px;
                  margin-bottom: 10px;
                  background: #323232;
                  border-radius: 4px;
                  color: #969696;
                  font-size: 12px;
                  padding: 0 10px;
                  overflow: hidden;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  cursor: pointer;
                  transition: background-color 0.2s linear;
                  &:hover {
                    color: #fff;
                    background-color: #00a1d6;
                  }
                  &.playing {
                    color: #fff;
                    background-color: #00a1d6;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  .media-wrap {
    .tab-inner {
      width: 1280px;
      margin: 0 auto;
      padding-top: 15px;
      padding-bottom: 25px;
      .media-content {
        padding: 20px;
        border-radius: 4px;
        background-color: #fff;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.07);
      }
    }
  }
}

// 平板 宽屏 1024~1280
@media only screen and (max-width: 1300px) {
  .bangumi-template {
    .play-wrap {
      .play-inner {
        width: 1024px;
        .play-info {
          .title {
            font-size: 23px;
          }
        }
        .player-wrap {
          .player-content {
            width: 778px;
            // height/width=0.56
            height: 435.68px;
          }
          .play-list {
            .play-list-box {
              .play-list-top {
                height: 36px;
                line-height: 36px;
                span {
                  font-size: 14px;
                }
              }
              .play-list-content {
                height: 399.5px;
              }
            }
          }
        }
      }
    }
    .media-wrap {
      .tab-inner {
        width: 1024px;
        .media-content {
          padding: 10px;
        }
      }
    }
  }
}

// 平板 <1024
@media only screen and (max-width: 1044px) {
  .bangumi-template {
    .play-wrap {
      padding: 15px 0 25px;
      background: #181818;
      .play-inner {
        width: 720px;
        .play-info {
          .title {
            color: #f0f0f0;
            font-size: 20px;
          }
        }
        .player-wrap {
          .player-content {
            width: 720px;
            // height/width=0.56
            height: 403.2px;
          }
          .play-list {
            display: none;
          }
        }
      }
    }
    .media-wrap {
      .tab-inner {
        width: 720px;
        .media-content {
          padding: 0px;
        }
      }
    }
  }
}

// 手机 <720
@media only screen and (max-width: 740px) {
  .bangumi-template {
    .play-wrap {
      padding: 0;
      background: #181818;
      .play-inner {
        width: 100%;
        .play-info {
          display: none;
        }
        .player-wrap {
          .player-content {
            width: 100%;
            height: unset;
            .player {
              width: 100% !important;
              height: auto !important;
            }
          }
        }
      }
    }
    .media-wrap {
      .tab-inner {
        width: 100%;
        padding-top: 0px;
        padding-bottom: 0px;
        .media-content {
          box-shadow: none;
          border-radius: 0px;
          padding: 2.33vw 0;
        }
      }
    }
  }
}

// 分隔符颜色
::v-deep .el-breadcrumb__item {
  .el-breadcrumb__inner {
    color: #969696;
    cursor: pointer;
    transition: color 0.2s linear;
    &:hover {
      color: #00a1d6;
    }
  }
  .el-breadcrumb__separator {
    color: #969696;
  }
}
</style>
