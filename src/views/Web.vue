<template>
  <div id="web">
    <main-header>
      <img :src="$store.state._user.header" slot="user-img" />
    </main-header>
    <div class="index-content-wrap">
      <random-recommend :RRItem="itemRandomArr"></random-recommend>
      <div class="inner">
        <index-area-panel
          v-for="i in areaList"
          :key="i.area"
          :title="i.title"
          :areaItemList="i.list"
          :area="i.area"
        ></index-area-panel>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import {
  getItemRandom,
  getAreaAllName,
  getAreaRandom,
} from "network/getWebData";
import MainHeader from "components/MainHeader";
import RandomRecommend from "components/RandomRecommend";
import IndexAreaPanel from "components/content/IndexAreaPanel";
export default {
  name: "Web",
  components: {
    MainHeader,
    RandomRecommend,
    IndexAreaPanel,
  },
  data() {
    return {
      itemRandomLimit: 8,
      itemRandomArr: [],
      areaList: [],
      areaRandomLimit: 12,
    };
  },
  mounted() {
    // 获取所有资源项目中的随机8个
    getItemRandom(this.itemRandomLimit).then((res) => {
      if (res.code === 200) {
        this.itemRandomArr = res.data;
        this.itemRandomArr.forEach((i) => {
          i.cover = `/proxy${i.source_url}${i.cover}`;
        });
      }
    });
    // 获取所有的域名
    getAreaAllName(false).then(async (res) => {
      if (res.code === 200) {
        // 通过 async/await 按顺序请求，使得页面排版固定
        for (let i = 0; i < res.data.length; i++) {
          const areaObj = res.data[i];
          // 每个栏目获取随机12个
          await getAreaRandom(areaObj.area, this.areaRandomLimit).then(
            (res) => {
              if (res.code === 200) {
                this.areaList.push({
                  title: areaObj.web_name || areaObj.area,
                  area: areaObj.area,
                  list: res.data,
                });
              }
            }
          );
        }
      }
    });
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
#web {
  height: 100%;
  overflow-y: auto;
  // background: #f4f5f7;
  padding-bottom: 60px;
  .index-content-wrap {
    width: 1280px;
    margin: 0 auto;
  }
}

// PC x>1920px
@media only screen and (min-width: 1921px) {
}

// PC x<=1280px（预留多20给滚动条占位置）
@media only screen and (max-width: 1300px) {
  #web {
    .index-content-wrap {
      width: 1000px;
    }
  }
}

// 手机、平板 x<=1024px（预留多20给滚动条占位置）
@media only screen and (max-width: 1044px) {
  #web {
    padding-bottom: 0;
    .index-content-wrap {
      width: 100%;
      // nav + tag 高度
      height: calc(100vh - 48px);
      overflow: hidden;
      overflow-y: auto;
      .inner {
        display: none;
      }
    }
  }
}
</style>
