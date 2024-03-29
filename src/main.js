import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

// 在Vue中使用JQuery
import $ from "jquery";
Vue.prototype.$ = $;

// 在Vue中使用SvgIcon组件，引入icon
import "./icons";

// 自定义指令
import "./utils/v-lazy-img";

// 按需加载element ui组件
import "element-ui/lib/theme-chalk/index.css";
import "./plugins/element.js";
import "./plugins/weknow.js";

import less from "less";
Vue.use(less);

import request from "./network/request";
Vue.prototype.$http = request;

import linkTo from "./utils/link";
Vue.prototype.$linkTo = linkTo;

Vue.prototype.$baseProxy = "/proxy";

// 使用事件总线
Vue.prototype.$EventBus = new Vue();

new Vue({
  router,
  store,
  render: function (h) {
    return h(App);
  },
}).$mount("#app");
