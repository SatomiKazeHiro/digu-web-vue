import Vue from "vue";
import Vuex from "vuex";

// 安装插件
Vue.use(Vuex);

// 配置模块
const moduleConfig = {
  state: {
    mobileWidth: 724,
    padWidth: 1024,
    pcWidth: 1280,
  },
  mutations: {},
  actions: {},
  modules: {},
};

// 用户模块
const moduleUser = {
  state: {
    header: "https://pic1.zhimg.com/80/v2-7ca21042a498a7e3cb571f4e27846470_720w.webp",
  },
  mutations: {
    updateUsername(state, val) {
      state.username = val;
    },
  },
  actions: {},
  modules: {},
};

// 设置模块
const moduleSetting = {
  state: {},
  mutations: {},
  actions: {},
  modules: {},
};

// 浏览器状态
const moduleBrowserStatus = {
  state: {
    appWidth: 0,
    appHeight: 0,
    // 客户端信息
    broswerInfo: null,
    // 域页面（移动端时有效）是否下拉状态
    areaMobileScrollIsDrop: false,
  },
  getters: {
    isHd: (state) => {
      return state.appWidth > state.appHeight;
    },
    isPc: (state) => {
      return state.broswerInfo.platformType === "pc";
    },
    isMobile: (state) => {
      return state.broswerInfo.platformType === "mobile";
    },
  },
  mutations: {
    // 设置用户端信息
    setBrowserInfo(state, info) {
      state.broswerInfo = info;
    },
    // 获取应用宽度
    setAppWidth(state, windowInnerWidth) {
      state.appWidth = windowInnerWidth;
    },
    // 获取应用高度
    setAppHeight(state, windowInnerHeight) {
      state.appHeight = windowInnerHeight;
    },
    // 设置在移动端下用户是往上还是往下滑的状态
    setAreaScrollIsDrop(state, res) {
      state.areaMobileScrollIsDrop = res;
    },
  },
  actions: {},
  modules: {},
};

// 导出/创建实例对象
export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    _config: moduleConfig,
    _user: moduleUser,
    _setting: moduleSetting,
    _browserStatus: moduleBrowserStatus,
  },
});
