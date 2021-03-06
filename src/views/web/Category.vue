<template>
  <div id="category" ref="category" v-cloak>
    <div class="items-wrap" ref="item-wrap">
      <div
        class="item-cell opacity-0"
        v-for="i in data"
        :key="i.id"
        :ref="i.id"
      >
        <a :href="i.link_url">
          <img :src="getImgUrl(i)" @load="showImg(i.id)" />
          <span class="title">{{ i.title }}</span>
        </a>
      </div>
    </div>
    <div class="pagination-wrap">
      <el-pagination
        background
        layout="prev, pager, next, jumper"
        :total="itemTotal"
        :page-size="limit"
        :pager-count="5"
        :current-page="currentPage"
        :small="$store.state._browserStatus.appWidth < 1024"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getAreaNormal, getCategoryNormal } from "network/getWebData";
import { checkArea, checkCategory } from "network/checkResource";
export default {
  name: "Category",
  data() {
    return {
      area: this.$route.params.area,
      category: this.$route.params.category,
      currentPage: 1,
      limit: 30,
      data: [],
      itemTotal: 0,
      // 收缩起来的时候当前展示内容到顶部的距离
      scrollToTop: 0,
    };
  },
  mounted() {
    this.getInitData();
    // 初始化页面滚动值
    this.$store.commit("setAreaScrollIsDrop", false);
    // 监听页面滚动
    this.$refs.category.addEventListener(
      "scroll",
      this.handleCategoriesNavShow,
      true
    );
    // 判断是否是横屏的
    if (
      this.$store.state._browserStatus.appWidth &&
      this.$store.state._browserStatus.appHeight &&
      this.$store.state._browserStatus.appWidth <= 1024 &&
      this.$store.state._browserStatus.appWidth >=
        this.$store.state._browserStatus.appHeight
    )
      this.$refs["category"].classList.add("hd");
  },
  beforeDestroy() {
    // 撤销页面滚动的监听
    this.$refs.category.removeEventListener(
      "scroll",
      this.handleCategoriesNavShow
    );
  },
  watch: {
    // 监听当前路由
    $route(to, from) {
      this.$refs.category.scrollTop = 0;
      this.area = this.$route.params.area;
      this.category = this.$route.params.category;
      this.currentPage = 1;
      this.getInitData();
    },
    // 监听屏幕选择，当的平板类型的横屏的时候
    "$store.state._browserStatus.appWidth"(newValue, oldValue) {
      if (
        newValue &&
        newValue <= 1024 &&
        newValue >= this.$store.state._browserStatus.appHeight
      )
        this.$refs.category.classList.add("hd");
      else if (newValue && newValue <= 1024)
        this.$refs.category.classList.remove("hd");
    },
  },
  methods: {
    // 判断是否有该域和类，获取对应的类页面加载数据
    getInitData() {
      checkArea(this.area).then((res) => {
        console.log("checkArea", res);
        if (res.data) {
          if (!this.category) {
            getAreaNormal(this.area, this.limit, this.currentPage).then(
              (res) => {
                console.log("getAreaNormal", res);
                if (res.code === 200) {
                  this.itemTotal = res.data.total;
                  this.currentPage = res.data.page;
                  this.data = res.data.resArr;
                }
              }
            );
          } else {
            checkCategory(this.area, this.category).then((res) => {
              console.log("checkCategory", res);
              if (res.data) {
                getCategoryNormal(
                  this.area,
                  this.category,
                  this.limit,
                  this.currentPage
                ).then((res) => {
                  console.log("getCategoryNormal", res);
                  if (res.code === 200) {
                    this.itemTotal = res.data.total;
                    this.currentPage = res.data.page;
                    this.data = res.data.resArr;
                  }
                });
              } else this.$router.push("/404");
            });
          }
        } else this.$router.push("/404");
      });
    },

    // 生成 img 标签的连接
    getImgUrl(i) {
      if (i) return `/proxy${i.sources_url}/${i.cover}`;
      else return "";
    },

    // 渐变加载拓扑，防拉伸
    showImg(id) {
      let coverDom = this.$refs[id][0];
      if (coverDom) {
        // 判断图片的高度是否小于宽度
        if (
          coverDom.firstChild.firstChild.naturalHeight <
          coverDom.firstChild.firstChild.naturalWidth
        )
          coverDom.firstChild.firstChild.classList.add("horizontal");
        else coverDom.firstChild.firstChild.classList.remove("horizontal");
        // 渐变显示图片
        coverDom.classList.remove("opacity-0");
      }
    },

    // 移动端根据上下滑生成控制顶部导航栏显示的数据
    handleCategoriesNavShow(e) {
      console.log(e);
      // 对比之前的高度，输出用户动作
      if (
        this.$refs.category.scrollTop > 48 &&
        this.$refs.category.scrollTop - this.scrollToTop > 0
      ) {
        this.$store.commit("setAreaScrollIsDrop", true);
      } else this.$store.commit("setAreaScrollIsDrop", false);
      // 存入新的高度
      this.scrollToTop = this.$refs.category.scrollTop;
    },

    // 当前页码改变时发起请求
    handleCurrentChange(val) {
      this.currentPage = val;
      if (this.category)
        getCategoryNormal(
          this.area,
          this.category,
          this.limit,
          this.currentPage
        ).then((res) => {
          console.log("getCategoryNormal", res);
          if (res.code === 200) {
            this.$emit("scrollToTop");
            this.itemTotal = res.data.total;
            this.currentPage = res.data.page;
            this.data = res.data.resArr;
          }
        });
      else
        getAreaNormal(this.area, this.limit, this.currentPage).then((res) => {
          console.log("getAreaNormal", res);
          if (res.code === 200) {
            this.$emit("scrollToTop");
            // this.$refs.category.scrollTop = 0;
            this.itemTotal = res.data.total;
            this.currentPage = res.data.page;
            this.data = res.data.resArr;
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
#category {
  padding-top: 15px;
  overflow-x: hidden;
  overflow-y: auto;
  .items-wrap {
    width: 1280px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: flex-start;
    -ms-flex-pack: justify;
    -ms-flex-line-pack: justify;
    .item-cell {
      width: 196.666px;
      margin-right: 20px;
      margin-bottom: 10px;
      transition: opacity 0.25s linear;
      &:nth-child(6n + 6) {
        margin-right: 0;
      }
      a {
        img {
          display: block;
          width: 100%;
          height: 276.2px;
          object-fit: cover;
          box-shadow: rgba(0, 0, 0, 0.24) 0px 2px 5px;
          border-radius: 4px;
          &.horizontal {
            height: unset;
          }
        }
        span.title {
          font-size: 14px;
          margin: 5px 0;
          display: block;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          font-weight: bold;
        }
      }
    }
  }
  .pagination-wrap {
    width: 1280px;
    margin: 0 auto;
    text-align: center;
    padding: 15px 0 25px;
  }
}
// // 电脑 宽屏 1300+
// @media only screen and (min-width: 1300px) {
// }
// 平板 宽屏 1024~1300
@media only screen and (max-width: 1300px) {
  #category {
    .items-wrap {
      width: 1000px;
      margin: 0 auto;
      .item-cell {
        width: 188.8px;
        margin-right: 14px;
        &:nth-child(6n + 6) {
          margin-right: 14px;
        }
        &:nth-child(5n + 5) {
          margin-right: 0;
        }
        a img {
          display: block;
          width: 100%;
          height: 256.2px;
          object-fit: cover;
        }
      }
    }
    .pagination-wrap {
      width: 1000px;
    }
  }
}
// 手机 平板 <1024
@media only screen and (max-width: 1024px) {
  #category {
    height: 100%;
    padding: 2.33vw 1.166vw;
    // transition: 0.4s;
    padding-top: calc(2.33vw + 48px);
    &.hd {
      padding: 1.4vw 0.7vw;
      padding-top: calc(1.4vw + 48px);
      .items-wrap {
        .item-cell {
          width: 20%;
          padding-left: 0.7vw;
          padding-right: 0.7vw;
          a img {
            height: 24vw;
            max-height: 24vw;
          }
        }
      }
    }
    .items-wrap {
      width: 100%;
      .item-cell {
        width: 33.33333%;
        margin-right: 0;
        padding-left: 1.166vw;
        padding-right: 1.166vw;
        &:nth-child(6n + 6) {
          margin-right: 0;
        }
        &:nth-child(5n + 5) {
          margin-right: 0;
        }
        a img {
          // height: auto;
          height: 40vw;
          max-height: 40vw;
        }
      }
    }
    .pagination-wrap {
      width: 100%;
    }
  }
}
</style>
