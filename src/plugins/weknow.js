import Vue from "vue";
import wkui from "components/common/weknow-ui";

Object.keys(wkui).forEach((comp) => {
  Vue.use(wkui[comp]);
});
