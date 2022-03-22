import Vue from 'vue'
import Vuex from 'vuex'

// 安装插件
Vue.use(Vuex)

// 用户模块
let moduleUser = {
  state: {
    header: "https://img0.baidu.com/it/u=2859944020,1774086333&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400",
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
    appWidth: 0,
    appHeight: 0,
    // 域页面（移动端时有效）是否下拉状态
    areaMobileScrollIsDrop: false,
  },
  getters: {
    isHd: (state) => {
      return state.appWidth > state.appHeight;
    }
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
    // 设置在移动端下用户是往上还是往下滑的状态
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
