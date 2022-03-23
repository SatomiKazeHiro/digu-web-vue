<template>
  <div class="bangumi-template">
    <div class="play-wrap">
      <div class="play-inner">
        <div class="play-info">
          <h1 class="title">{{ mediaInfo.title }}</h1>
          <div class="path-breadcrumb">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item @click.native="openClick('/')"
                >主站</el-breadcrumb-item
              >
              <el-breadcrumb-item @click.native="openClick(`/${path.area}`)">{{
                path.area_web_name || path.area
              }}</el-breadcrumb-item>
              <el-breadcrumb-item
                @click.native="openClick(`/${path.area}/${path.category}`)"
                >{{
                  path.category_web_name || path.category
                }}</el-breadcrumb-item
              >
              <el-breadcrumb-item
                @click.native="
                  openClick(
                    `/${path.area}/${path.category}/${$route.params.item}`
                  )
                "
                >{{ mediaInfo.title }}</el-breadcrumb-item
              >
              <el-breadcrumb-item>{{ currentPlay.label }}</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
        </div>
        <div class="play-content">
          <div id="dplayer" class="player"></div>
          <!-- <d-player ref="player" class="player" :options="options"></d-player> -->
        </div>
      </div>
    </div>
    <div class="media-wrap"></div>
  </div>
</template>

<script>
import DPlayer from "dplayer";
import { getACPath } from "@/network/getWebData";
import handleBangumi from "@/utils/handleBangumi";
export default {
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
      player: "",
      playList: [],
      currentPlay: {},
      path: {},
      options: {
        container: document.getElementById("dplayer"),
        // 开启热键，支持快进、快退、音量控制、播放暂停
        hotkey: true,
        // 默认音量
        volume: 1,
        // 可选的播放速率
        playbackSpeed: [0.5, 0.75, 1, 1.25, 1.5, 2],
        video: {
          url: "",
        },
      },
    };
  },
  mounted() {

    // 处理视频列表
    this.handleVideos();


    this.options.container = document.getElementById("dplayer");
    // 播放器设置
    this.player = new DPlayer(this.options);
    this.currentPlay = this.playList[this.$route.params.chapter - 1];
    // 切换源
    this.player.switchVideo({
      url: encodeURI("/proxy" + this.currentPlay.source_url),
    });

    // 获取导航路径
    getACPath(this.mediaInfo.area, this.mediaInfo.category).then((res) => {
      console.log(res);
      if (res.code && res.code === 200) this.path = res.data;
    });
  },
  methods: {
    // 处理显示可观看的内容
    handleVideos() {
      this.playList = handleBangumi(this.mediaInfo);
    },
    // 跳转
    openClick(url) {
      console.log(url);
      window.open(url, "_blank");
    },
  },
};
</script>

<style lang="scss" scoped>
.bangumi-template {
  .play-wrap {
    padding: 20px 0 30px;
    background: #181818;
    .play-inner {
      margin: 0 auto;
      width: 1024px;
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
      .play-content {
        // height/width=0.56
        height: 573.5px;
        .player {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}

// 平板 宽屏 1024~1280
@media only screen and (max-width: 1300px) {
  .bangumi-template {
    .play-wrap {
      .play-inner {
        width: 960px;
        .play-info {
          .title {
            font-size: 23px;
          }
        }
        .play-content {
          // height/width=0.56
          height: 537.6px;
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
        margin: 0 auto;
        width: 720px;
        .play-info {
          .title {
            color: #f0f0f0;
            font-size: 20px;
          }
        }
        .play-content {
          // height/width=0.56
          height: 403.2px;
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
        .play-content {
          width: 100%;
          height: unset;
          .player {
            width: 100%;
            height: auto;
          }
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
