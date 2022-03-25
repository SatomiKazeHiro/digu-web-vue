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
        <div class="play-content">
          <div id="mui-player" class="player"></div>
        </div>
      </div>
    </div>
    <div class="media-wrap">
      <div class="media-tab-detail-content">
        <div class="sl-ep-list">
          <ul>
            <li class="misl-ep-item" v-for="i in playList" :key="i.value">
              <div class="misl-ep-index" @click="handleChapterPlay(i.link_url)">
                {{ i.label }}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "mui-player/dist/mui-player.min.css";
import MuiPlayer from "mui-player";
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
      options: {},
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
      });
    }
  },
  methods: {
    // 跳转
    handleBreadcrumbClick(url) {
      console.log(url);
      window.open(url, "_blank");
    },
    // 番剧资源播放跳转
    handleChapterPlay(url) {
      // window.open(url, "_blank");
      console.log(url);
      this.$router.push(url);
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
    .media-wrap {
      .media-tab-detail-content {
        .sl-ep-nav {
          height: 25px;
          white-space: nowrap;
          -webkit-transition: -webkit-transform 0.3s ease;
          transition: -webkit-transform 0.3s ease;
          -o-transition: transform 0.3s ease;
          transition: transform 0.3s ease;
          transition: transform 0.3s ease, -webkit-transform 0.3s ease;
          .sl-ep-nav-item {
            position: relative;
            display: inline-block;
            margin-right: 30px;
            line-height: 26px;
            height: 26px;
            border-bottom: 1px solid rgba(0, 0, 0, 0);
            font-size: 12px;
            cursor: pointer;
            &:last-child {
              margin-right: 0;
            }
            &:hover,
            &.on {
              color: #00a1d6;
              border-bottom-color: #00a1d6;
              &:after {
                content: "";
                position: absolute;
                left: 50%;
                bottom: 0;
                -webkit-transform: translateX(-3px);
                -ms-transform: translateX(-3px);
                transform: translateX(-3px);
                border-bottom: 3px solid #00a1d6;
                border-top: 0;
                border-left: 3px solid rgba(0, 0, 0, 0);
                border-right: 3px solid rgba(0, 0, 0, 0);
                -webkit-transition: color, border-bottom-color 0.1s linear;
                -o-transition: color, border-bottom-color 0.1s linear;
                transition: color, border-bottom-color 0.1s linear;
              }
            }
          }
        }
        .sl-ep-list {
          clear: both;
          ul {
            padding-top: 10px;
            margin: 10px 0px 0 0;
            height: auto;
            overflow: hidden;
            .misl-ep-item {
              display: inline-block;
              width: 85px;
              margin-right: 20px;
              margin-bottom: 15px;
              &:nth-child(12n + 12) {
                margin-right: 0px;
              }
              .misl-ep-index {
                height: 38px;
                padding: 0 4px;
                line-height: 36px;
                font-size: 14px;
                background-color: #f4f5f7;
                border: 1px solid #f4f5f7;
                color: #6d757a;
                border-radius: 4px;
                text-align: center;
                overflow: hidden;
                -o-text-overflow: ellipsis;
                text-overflow: ellipsis;
                transition: background 0.3s linear;
                cursor: pointer;
                &:hover {
                  background: #00a1d6;
                  color: #fff;
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
