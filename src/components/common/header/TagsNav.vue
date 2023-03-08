<template>
  <div class="tags-nav-wrap">
    <div class="tags-nav">
      <div class="primary-channel-menu">
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
  name: "TagsNav",
  data() {
    return {
      tags: [
        { label: "动画", url: "" },
        { label: "音乐", url: "" },
        { label: "漫画", url: "" },
        { label: "游戏", url: "" },
        { label: "MMD", url: "" },
        { label: "科普", url: "" },
        { label: "杂谈", url: "" },
        { label: "科幻", url: "" },
        { label: "纪录片", url: "" },
        { label: "电影", url: "" },
        { label: "搞笑", url: "" },
        { label: "MAD", url: "" },
        { label: "动物", url: "" },
        { label: "悬疑", url: "" },
        { label: "舞蹈", url: "" },
        { label: "历史", url: "" },
        { label: "人文", url: "" },
        { label: "学习", url: "" },
        { label: "OVA", url: "" },
        { label: "生活", url: "" },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
.tags-nav-wrap {
  .tags-nav {
    width: 1280px;
    margin: 8px auto;
    padding: 8px;
    border-radius: 4px;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .primary-channel-menu {
      flex: 1;
      text-align: center;
      -webkit-overflow-scrolling: touch;
      overflow: hidden;
      overflow-x: auto;
      overflow-y: hidden;
      overflow: -moz-scrollbars-none;
      scrollbar-width: none;
      &::-webkit-scrollbar {
        display: none;
      }
      ul {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-flow: row wrap;
        li {
          flex: 0 0 8.3333%;
          margin: 5px 0;
          text-align: left;
          a {
            display: inline-block;
            span {
              font-size: 14px;
              color: #ffffff;
              border-radius: 4px;
              background-color: #ff8a80;
              padding: 4px 8px;
              transition: background-color 0.25s linear;
              &:hover {
                background-color: #00a1d6;
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
  .tags-nav-wrap {
    .tags-nav {
      width: 1000px;
    }
  }
}
// 手机 平板 <1000
@media only screen and (max-width: 1044px) {
  .tags-nav-wrap {
    box-shadow: 0 1px 1px 0 #d8d8d8;
    .tags-nav {
      width: 100%;
      border-radius: 0;
      margin: 0;
      padding: 0;
      .primary-channel-menu {
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
