<template>
  <div class="index">
    <main-header>
      <img :src="getHead($store.state._user.userHeaderPath)" slot="user-img" />
    </main-header>
    <div class="index-content-wrap">
      <random-recommend :RRItem="itemRandomArr"></random-recommend>
      <div class="inner">
        <index-area-panel
          v-for="i in areaList"
          :key="i.area"
          :areaList="i.list"
          :title="i.area"
          :area="i.area"
        ></index-area-panel>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import { getItemRandom, getAreaAllName, getAreaRandom } from "network/getDB";
import MainHeader from "components/MainHeader";
import RandomRecommend from "components/RandomRecommend";
import IndexAreaPanel from "components/content/IndexAreaPanel";
export default {
  name: "Index",
  components: {
    MainHeader,
    RandomRecommend,
    IndexAreaPanel,
  },
  data() {
    return {
      itemRandomArr: [],
      areaList: [],
    };
  },
  mounted() {
    // 获取所有资源项目中的随机8个
    getItemRandom(8).then((res) => {
      if (res.code === 200) {
        this.itemRandomArr = res.data;
        this.itemRandomArr.forEach((i) => {
          i.cover = `/proxy${i.url}${i.title}/${i.cover}`;
        });
      }
    });
    // 获取所有的域名
    getAreaAllName().then((res) => {
      if (res.code === 200) {
        res.data.forEach((i) => {
          getAreaRandom(i, 12).then((res) => {
            if (res.code === 200) {
              this.areaList.push({
                area: i,
                list: res.data,
              });
            }
          });
        });
      }
    });
  },
  methods: {
    getHead(path) {
      return require("../" + path);
    },
  },
};
</script>

<style lang="scss" scoped>
.index {
  // background: #f4f5f7;
  .index-content-wrap {
    width: 1280px;
    margin: 0 auto;
    // margin-bottom: 40px;
  }
}

// 平板 宽屏 1000~1280
@media only screen and (max-width: 1300px) {
  .index {
    .index-content-wrap {
      width: 1000px;
    }
  }
}
// 手机 平板 <1000
@media only screen and (max-width: 1024px) {
  .index {
    .index-content-wrap {
      width: 100%;
      // nav + tag 高度
      height: calc(100vh - 80px);
      overflow: hidden;
      overflow-y: auto;
      .inner {
        display: none;
      }
    }
  }
}
</style>
