import Vue from 'vue'
import Vuex from 'vuex'

// 安装插件
Vue.use(Vuex)

// 用户模块
let moduleUser = {
  state: {
    username: "",
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

// 导出/创建实例对象
export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    MUser: moduleUser,
    MSetting: moduleSetting
  }
})
