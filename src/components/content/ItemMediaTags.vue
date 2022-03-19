<template>
  <div class="media-tab-wrap">
    <div class="media-tab-nav">
      <ul class="clearfix">
        <li
          :class="{ on: currentTagID == i.tagID }"
          @click="setContent(i.tagID)"
          v-for="i in navTags"
          :key="i.tagID"
        >
          {{ i.label }}
        </li>
      </ul>
    </div>

    <div class="media-tab-content" v-if="currentTagID == 1">
      <div class="media-tab-detail-wrap">
        <div class="media-tab-detail">
          <div class="media-tab-module-content">
            <div class="sl-ep-nav">
              <ul class="sl-ep-nav-list">
                <li class="sl-ep-nav-item on">第1话-第12话</li>
                <li class="sl-ep-nav-item">第13话-第24话</li>
              </ul>
            </div>
            <div class="sl-ep-list">
              <ul>
                <li class="misl-ep-item" v-for="i in 24" :key="i">
                  <div class="misl-ep-index" @click="goToPlay">{{ i }}</div>
                </li>
              </ul>
            </div>
          </div>
          <div class="media-tab-module-wrap">
            <div class="media-tab-module-title">更多推荐</div>
            <div class="media-tab-module-more">更多</div>
            <div class="media-tab-module-content">
              <div class="slide-item" v-for="i in recommendItems" :key="i.id">
                <a :href="getAUrl(i)">
                  <img :src="getImgUrl(i)" />
                  <p>{{ i.title }}</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAreaRandom } from "network/getWebData";
export default {
  name: "ItemMediaTags",
  props: {
    link_url:"",
    sources_url: "",
    files: [],
  },
  data() {
    return {
      navTags: [
        { label: "作品详情", tagID: 1 },
        { label: "作品关联", tagID: 2 },
      ],
      currentTagID: 1,
      recommendItems: [],
      area: this.$route.params.area,
    };
  },
  mounted() {
    this.getRecommendItem();
    console.log(this.sources_url, this.files);
  },
  methods: {
    // 当前 tabs 的值
    setContent(id) {
      this.currentTagID = id;
    },
    // 跳转到播放页 - 单体
    goToPlay() {
      if (
        this.$route.params.area &&
        this.$route.params.category &&
        this.$route.params.item
      )
        this.$router.push(
          `/${this.$route.params.area}/${this.$route.params.category}/${this.$route.params.item}/play`
        );
    },

    // 跳转到播放页 - 连载
    goToChapter(chapter) {
      if (
        this.$route.params.area &&
        this.$route.params.category &&
        this.$route.params.item
      )
        this.$router.push(
          `/${this.$route.params.area}/${this.$route.params.category}/${this.$route.params.item}/s/${chapter}`
        );
    },

    // 获取推荐的随机内容
    getRecommendItem() {
      getAreaRandom(this.$route.params.area, 6).then((res) => {
        console.log(res);
        if (res.code === 200) {
          this.recommendItems = res.data;
        }
      });
    },
    // 生成推荐的 a 标签的连接
    getAUrl(i) {
      if (i) return `/${this.area}/${i.url.split("/")[3]}/${i.id}`;
      else return "";
    },
    // 生成推荐的 img 标签的连接
    getImgUrl(i) {
      if (i) return `/proxy${i.url}${i.title}/${i.cover}`;
      else return "";
    },
  },
};
</script>

<style lang="scss" scoped>
.media-tab-wrap {
  width: 100%;
  padding-bottom: 25px;
  .media-tab-nav {
    position: relative;
    height: 60px;
    background-color: #fff;
    margin-bottom: 11px;
    ul {
      width: 1280px;
      margin: 0 auto;
      li {
        cursor: pointer;
        float: left;
        padding: 0 6px;
        line-height: 57px;
        color: #222;
        -webkit-transition: all 0.1s linear;
        -o-transition: 0.1s all linear;
        transition: all 0.1s linear;
        border-bottom: 3px solid rgba(0, 0, 0, 0);
        &:hover,
        &.on {
          color: #00a1d6;
          border-bottom-color: #00a1d6;
        }
        & + li {
          margin-left: 28px;
        }
      }
    }
  }
  .media-tab-content {
    .media-tab-detail-wrap {
      width: 1280px;
      margin: 0 auto;
      .media-tab-detail {
        padding: 20px;
        border-radius: 4px;
        background-color: #fff;
        -webkit-box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.07);
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.07);
        .media-tab-module-content {
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
                  -webkit-transition: all 0.1s linear;
                  -o-transition: 0.1s all linear;
                  transition: all 0.1s linear;
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
                transition: all 0.3s linear;
                &:nth-child(12n + 12) {
                  margin-right: 0px;
                }
                .misl-ep-index {
                  height: 38px;
                  padding: 0 4px;
                  line-height: 38px;
                  font-size: 14px;
                  background-color: #f4f5f7;
                  border: 1px solid #f4f5f7;
                  color: #6d757a;
                  border-radius: 4px;
                  text-align: center;
                  overflow: hidden;
                  -o-text-overflow: ellipsis;
                  text-overflow: ellipsis;
                  transition: all 0.3s linear;
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
        .media-tab-module-wrap {
          vertical-align: top;
          border-top: 1px solid #e5e9ef;
          padding-top: 20px;
          margin-top: 20px;
          .media-tab-module-title {
            display: inline-block;
            font-size: 18px;
            font-weight: 700;
            color: #222;
            height: 24px;
            line-height: 24px;
          }
          .media-tab-module-more {
            float: right;
            line-height: 22px;
            border: 1px solid #b7c0cc;
            border-radius: 4px;
            padding: 0 10px;
            font-size: 12px;
            color: #6e7579;
            cursor: pointer;
          }
          .media-tab-module-content {
            display: flex;
            margin-top: 20px;
            .slide-item {
              width: 190px;
              margin-right: 20px;
              &:last-child {
                margin-right: 0px;
              }
              a {
                img {
                  width: 100%;
                  height: 266.85px;
                  border-radius: 4px;
                  object-fit: cover;
                }
                p {
                  padding: 5px 0;
                  font-weight: 700;
                  word-break: break-all;
                }
              }
            }
          }
        }
      }
    }
  }
}
// 平板 宽屏 1000~1280
@media only screen and (max-width: 1300px) {
  .media-tab-wrap {
    .media-tab-nav {
      height: 52px;
      margin-bottom: 8px;
      ul {
        width: 1000px;
        li {
          line-height: 50px;
          border-bottom: 2px solid rgba(0, 0, 0, 0);
          font-size: 14px;
          & + li {
            margin-left: 20px;
          }
        }
      }
    }
    .media-tab-content {
      .media-tab-detail-wrap {
        width: 1000px;
        .media-tab-detail {
          padding: 15px;
          border-radius: 2px;
          .media-tab-module-content {
            .sl-ep-nav {
              .sl-ep-nav-item {
                margin-right: 20px;
              }
            }
            .sl-ep-list {
              ul {
                .misl-ep-item {
                  width: 65.8333px;
                  margin-right: 15px;
                }
              }
            }
          }
          .media-tab-module-wrap {
            margin-top: 15px;
            .media-tab-module-title {
              font-size: 16px;
              height: 22px;
              line-height: 22px;
            }
            .media-tab-module-more {
              float: right;
              line-height: 20px;
              border-radius: 3px;
              padding: 0 1em;
            }
            .media-tab-module-content {
              margin-top: 15px;
              .slide-item {
                width: 149.166px;
                margin-right: 15px;
                a {
                  img {
                    width: 100%;
                    height: 209.5px;
                  }
                  p {
                    font-size: 14px;
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
// 手机 平板 <1000
@media only screen and (max-width: 1044px) {
  .media-tab-wrap {
    padding-bottom: 0;
    .media-tab-nav {
      height: 46px;
      margin-bottom: 5px;
      ul {
        width: 100%;
        padding: 0 2.33vw;
        li {
          line-height: 44.5px;
          border-bottom: 1.5px solid rgba(0, 0, 0, 0);
          font-size: 12px;
          & + li {
            margin-left: 12px;
          }
        }
      }
    }
    .media-tab-content {
      .media-tab-detail-wrap {
        width: 100%;
        margin: 0;
        .media-tab-detail {
          padding: 2.33vw 0;
          border-radius: 0;
          box-shadow: none;
          .media-tab-module-content {
            .sl-ep-nav {
              padding: 0 2.33vw;
              .sl-ep-nav-item {
                margin-right: 10px;
              }
            }
            .sl-ep-list {
              ul {
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                justify-content: flex-start;
                padding: 1.1666vw;
                .misl-ep-item {
                  flex: 0 0 20%;
                  margin-right: 0;
                  padding: 0 1.1666vw;
                  width: unset;
                  height: 32px;
                  line-height: 32px;
                }
              }
            }
          }
          .media-tab-module-wrap {
            margin-top: 10px;
            padding: 2.33vw 0;
            .media-tab-module-title {
              font-size: 14px;
              height: 20px;
              line-height: 20px;
              margin-left: 2.33vw;
            }
            .media-tab-module-more {
              float: right;
              line-height: 18px;
              border-radius: 2px;
              padding: 0 0.5em;
              margin-right: 2.33vw;
            }
            .media-tab-module-content {
              margin-top: 15px;
              flex-wrap: wrap;
              padding: 0 1.1666vw;
              .slide-item {
                width: unset;
                flex: 0 0 33.33%;
                margin-right: 0;
                padding: 0 1.1666vw;
                a {
                  img {
                    height: unset;
                    max-height: 46.81vw;
                  }
                  p {
                    font-size: 12px;
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
