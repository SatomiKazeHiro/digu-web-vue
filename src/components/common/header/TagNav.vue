<template>
  <div class="tag-nav-wrap">
    <div class="tag-nav">
      <div class="recommend-web">
        <ul>
          <li>
            <a href="https://www.bilibili.com/" target="_blank">
              <div class="web-item" style="background: #73c9e5">
                <img src="~assets/img/web/index/Bilibili.png" alt="" />
              </div>
              <span>BiliBili</span>
            </a>
          </li>
          <li>
            <a href="https://www.iqiyi.com/dongman/" target="_blank">
              <div class="web-item" style="background: #00be06">
                <img src="~assets/img/web/index/iQIYI.png" alt="" />
              </div>
              <span>爱奇艺</span>
            </a>
          </li>
          <li>
            <a href="https://ac.qq.com/" target="_blank">
              <div class="web-item" style="background: #fa9144">
                <img src="~assets/img/web/index/tencent.png" alt="" />
              </div>
              <span>腾讯动漫</span>
            </a>
          </li>
        </ul>
      </div>
      <div class="primaryChannelMenu">
        <ul v-if="tags.length > 0" class="clearfix">
          <li v-for="item in tags" :key="item.label">
            <a :href="item.url">
              <span>{{ item.label }}</span>
            </a>
          </li>
        </ul>
        <span v-else>无标签</span>
      </div>
      <div class="self-web"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TagNav",
  data() {
    return {
      tags: [
        {
          label: "动画",
          url: "",
        },
        {
          label: "音乐",
          url: "",
        },
        {
          label: "漫画",
          url: "",
        },
        {
          label: "游戏",
          url: "",
        },
        {
          label: "MMD",
          url: "",
        },
        {
          label: "科普",
          url: "",
        },
        {
          label: "杂谈",
          url: "",
        },
        {
          label: "科幻",
          url: "",
        },
        {
          label: "纪录片",
          url: "",
        },
        {
          label: "电影",
          url: "",
        },
        {
          label: "搞笑",
          url: "",
        },
        {
          label: "MAD",
          url: "",
        },
        {
          label: "动物",
          url: "",
        },
        {
          label: "悬疑",
          url: "",
        },
        {
          label: "舞蹈",
          url: "",
        },
        {
          label: "历史",
          url: "",
        },
        {
          label: "人文",
          url: "",
        },
        {
          label: "学习",
          url: "",
        },
        {
          label: "OVA",
          url: "",
        },
        {
          label: "生活",
          url: "",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.tag-nav-wrap {
  .tag-nav {
    width: 1280px;
    margin: 10px auto;
    padding: 10px 0;
    border-radius: 4px;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .recommend-web {
      height: 70px;
      ul {
        display: flex;
        li {
          width: 60px;
          padding: 0 5px;
          text-align: center;
          font-size: 14px;
          color: #212121;
          box-sizing: unset;
          a {
            transition: 0.3s;
            &:hover {
              transition: 0.3s;
              color: #73c9e5;
            }
            span {
              font-size: 12px;
            }
            .web-item {
              width: 42px;
              height: 42px;
              border-radius: 20px;
              overflow: hidden;
              margin: 0 auto 5px;
              img {
                width: 32px;
                height: 32px;
                position: relative;
                top: 50%;
                transform: translate(0, -50%);
              }
            }
          }
        }
      }
    }
    .primaryChannelMenu {
      flex: 1;
      height: 100%;
      padding-left: 20px;
      text-align: center;
      -webkit-overflow-scrolling: touch;
      overflow: hidden;
      overflow-x: auto;
      overflow-y: hidden;
      overflow: -moz-scrollbars-none;
      overflow: -moz-scrollbars-none;
      scrollbar-width: none;
      &::-webkit-scrollbar {
        display: none;
      }
      ul {
        border-left: 1px solid #cccccc;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-flow: row wrap;
        text-align: center;
        li {
          flex: 0 0 10%;
          margin: 5px 0;
          a {
            display: inline-block;
            span {
              font-size: 14px;
              color: #ffffff;
              border-radius: 4px;
              background: #ff8a80;
              padding: 2px 4px;
            }
          }
        }
      }
    }
  }
}
// 平板 宽屏 1000~1280
@media only screen and (max-width: 1300px) {
  .tag-nav-wrap {
    .tag-nav {
      width: 1000px;
      // width: 100%;
      .recommend-web {
        ul {
          li {
            a {
              span {
                font-size: 13px;
              }
            }
          }
        }
      }
    }
  }
}
// 手机 平板 <1000
@media only screen and (max-width: 1024px) {
  .tag-nav-wrap {
    box-shadow: 0 1px 1px 0 #d8d8d8;
    .tag-nav {
      width: 100%;
      border-radius: 0;
      margin: 0;
      padding: 0;
      .recommend-web {
        display: none;
      }
      .primaryChannelMenu {
        height: unset;
        padding-left: 10px;
        overflow: hidden;
        overflow-x: auto;
        &::-webkit-scrollbar {
          display: none;
        }
        ul {
          border-left: unset;
          display: flex;
          flex-wrap: nowrap;
          &::after {
            content: "";
            display: table;
            clear: both;
          }
          li {
            flex: unset;
            float: left;
            display: inline;
            margin-right: 10px;
            &:last-child {
              padding-right: 10px;
              margin-right: 0;
            }
            a {
              white-space: nowrap;
              span {
                font-size: 0.6rem;
                background: transparent;
                border-radius: 0;
                color: #3c3c3c;
              }
            }
          }
        }
      }
    }
  }
}
</style>
