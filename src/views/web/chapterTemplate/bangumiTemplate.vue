<template>
  <div class="bangumi-template">
    <div class="play-wrap">
      <div class="play-inner">
        <div class="play-info">
          <h1 class="title">{{ mediaInfo.title }}</h1>
          <div class="path-breadcrumb">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item @click.native="handleBreadcrumbClick('/')"
                >主站</el-breadcrumb-item
              >
              <el-breadcrumb-item
                @click.native="handleBreadcrumbClick(`/${path.area}`)"
                >{{ path.area_web_name || path.area }}</el-breadcrumb-item
              >
              <el-breadcrumb-item
                @click.native="
                  handleBreadcrumbClick(`/${path.area}/${path.category}`)
                "
                >{{
                  path.category_web_name || path.category
                }}</el-breadcrumb-item
              >
              <el-breadcrumb-item
                @click.native="
                  handleBreadcrumbClick(
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
            <div class="play-list-box"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="media-wrap">
      <div class="tab"></div>
      <div class="tab-inner">
        <div class="media-content">
          <item-play-list :mediaInfo="mediaInfo"></item-play-list>
          <item-random></item-random>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "mui-player/dist/mui-player.min.css";
import MuiPlayer from "mui-player";
import MuiPlayerDesktopPlugin from "mui-player-desktop-plugin";

import { getACPath } from "@/network/getWebData";
import handleBangumi from "@/utils/handleBangumi";

import ItemPlayList from "components/content/ItemPlayList";
import ItemRandom from "components/content/ItemRandom";
export default {
  components: {
    ItemPlayList,
    ItemRandom,
  },
  props: {
    mediaInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      // 播放器
      player: "",
      // 播放列表
      playList: [],
      // 当前播放
      currentPlay: {},
      // 导航面包屑
      path: {},
    };
  },
  mounted() {
    // 处理获取视频列表
    this.playList = handleBangumi(this.mediaInfo);
    // 如果没有播放内容则跳转至404
    if (!this.playList[this.$route.params.chapter - 1])
      this.$router.push("/404");
    else {
      this.currentPlay = this.playList[this.$route.params.chapter - 1];
      console.log(this.currentPlay);

      // 获取导航路径
      getACPath(this.mediaInfo.area, this.mediaInfo.category).then((res) => {
        console.log(res);
        if (res.code && res.code === 200) this.path = res.data;
      });

      // 播放器配置
      this.player = new MuiPlayer({
        container: "#mui-player",
        title: this.currentPlay.label,
        src: `/proxy${this.currentPlay.source_url}`,
        plugins: [new MuiPlayerDesktopPlugin({})],
      });
    }
  },
  methods: {
    // 跳转
    handleBreadcrumbClick(url) {
      console.log(url);
      window.open(url, "_blank");
    },
    // // 番剧资源播放跳转
    // handleChapterPlay(url) {
    //   // window.open(url, "_blank");
    //   console.log(url);
    //   this.$router.push(url);
    // },
  },
};
</script>

<style lang="scss" scoped>
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
          padding-left: 5px;
          .play-list-box {
            width: 100%;
            height: 100%;
            background: #252525;
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
