<template>
  <div id="category" ref="category" v-cloak>
    <div class="list-wrap">
      <div class="list-content">
        <div class="item" v-for="i in data" :key="i.id">
          <a :href="i.link_url" :class="{ 'no-cover': !hasCover(i) }">
            <img class="cover" v-lazy-img-compr="getImgCfg(i)" />
            <p class="title" :title="i.title">{{ i.title }}</p>
          </a>
        </div>
      </div>
    </div>
    <div class="pagination-wrap" v-if="data.length">
      <el-pagination
        background
        layout="prev, pager, next, jumper"
        :pager-count="5"
        :total="pagination.total"
        :page-size="pagination.pageSize"
        :current-page="pagination.currentPage"
        :small="useSmall"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getAreaNormal, getCategoryNormal } from "network/getWebData";
import { getResourcesValidity } from "network/handleConfig";

export default {
  name: "Category",
  data() {
    return {
      area: this.$route.params.area,
      pagination: {
        currentPage: 1,
        pageSize: 30,
        total: 0,
      },
      data: [],
    };
  },
  mounted() {
    this.getInitData();
  },
  computed: {
    useSmall() {
      return this.$store.state._browserStatus.appWidth < 1024;
    },
  },
  methods: {
    fetchData() {
      let { area } = this;
      let { pageSize: limit, currentPage: page } = this.pagination;
      if (this.category) {
        return getCategoryNormal({ area, limit, page }).then((res) => {
          this.data = res.data;
          this.pagination = Object.assign(this.pagination, {
            total: res.total,
            currentPage: res.page,
          });
        });
      } else {
        return getAreaNormal({ area, limit, page }).then((res) => {
          this.data = res.data;
          this.pagination = Object.assign(this.pagination, {
            total: res.total,
            currentPage: res.page,
          });
        });
      }
    },

    // 判断是否有该域和类，获取对应的类页面加载数据
    async getInitData() {
      let isValidity = await getResourcesValidity({
        area: this.area,
        category: this.category,
      });
      if (!isValidity) return this.$router.push("/404");

      this.fetchData();
    },

    // 当前页码改变时发起请求
    handleCurrentChange(page) {
      this.currentPage = page;
      this.fetchData().finally(() => this.$emit("scrollToTop"));
    },

    hasCover(item) {
      return Boolean(item.cover);
    },

    getImgCfg(item) {
      return {
        URL: `/proxy${item.sources_url}/${item.cover}`,
        MAX_WIDTH: 300,
        QUALITY: 80,
      };
    },
  },
};
</script>

<style lang="less" scoped>
#category {
  padding: 32px 0;
  overflow-x: hidden;
  overflow-y: auto;
  .list-wrap {
    width: 1280px;
    margin: 0 auto;
    .list-content {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      -ms-flex-pack: justify;
      -ms-flex-line-pack: justify;
      gap: 1.25%; // 19*5 + 0.5*4
      margin-left: -0.625%;
      padding-left: 0.625%;
      margin-right: -0.625%;
      padding-right: 0.625%;
      .item {
        max-width: 19%;
        flex: 0 0 19%;
        display: flex;
        flex-direction: column;
        a {
          p.title {
            font-size: 14px;
            margin: 5px 0;
            display: block;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            transition: color 0.2s ease-in-out;
          }
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
    .list-content {
      width: 1000px;
      margin: 0 auto;
      .item {
        width: 188.8px;
        margin-right: 14px;
        &:nth-child(6n + 6) {
          margin-right: 14px;
        }
        &:nth-child(5n + 5) {
          margin-right: 0;
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
    padding-top: calc(2.33vw + 48px);
    &.hd {
      padding: 1.4vw 0.7vw;
      padding-top: calc(1.4vw + 48px);
      .list-content {
        .item {
          width: 20%;
          padding-left: 0.7vw;
          padding-right: 0.7vw;
        }
      }
    }
    .list-content {
      width: 100%;
      .item {
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
      }
    }
    .pagination-wrap {
      width: 100%;
    }
  }
}
</style>
