<template>
  <div id="web">
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
import { getItemRandom, getAreaAllName, getAreaRandom } from "network/getWebData";
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

<style lang="scss">
@import "@/styles/web.scss";
</style>
