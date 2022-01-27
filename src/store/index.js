import Vue from 'vue'
import Vuex from 'vuex'

// 安装插件
Vue.use(Vuex)

// 用户模块
let moduleUser = {
  state: {
    userHeaderPath: "assets/img/user/head.jpeg",
  },
  mutations: {
    updateUsername(state, val) {
      state.username = val;
    }
  },
  actions: {
  },
  modules: {
  }
}
// 设置模块
let moduleSetting = {
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
}
// 浏览器状态
let moduleBrowserStatus = {
  state: {
    appWidth: null,
    appHeight: null,
    // 域页面（移动端时有效）是否下拉状态
    areaMobileScrollIsDrop: false,
  },
  mutations: {
    // 获取应用宽度
    setAppWidth(state, windowInnerWidth) {
      state.appWidth = windowInnerWidth;
    },
    // 获取应用高度
    setAppHeight(state, windowInnerHeight) {
      state.appHeight = windowInnerHeight;
    },
    // 获取在移动端下用户是往上还是往下滑
    setAreaScrollIsDrop(state, res) {
      state.areaMobileScrollIsDrop = res;
    }
  },
  actions: {
  },
  modules: {
  }
}

// 导出/创建实例对象
export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    _user: moduleUser,
    _setting: moduleSetting,
    _browserStatus: moduleBrowserStatus
  }
})
