import request from "./request";

// 获取目录树
export function getLogTree() {
  return request({
    url: "/api/get/logtree",
  })
}

// 获取 area 配置信息
export function getAreaConfig(area) {
  return request({
    url: "/api/get/areaIndex",
    params: { area }
  })
}

// 获取 category 配置信息
export function getCategoryConfig(area, category) {
  return request({
    url: "/api/get/categoryIndex",
    params: { area, category }
  })
}

// 设置 area 配置
export function settAreaConfig(areaObj) {
  return request({
    url: "/api/set/areaIndex",
    data: areaObj,
    method: "post"
  })
}

// 设置 category 配置
export function setCategoryConfig(categoryObj) {
  return request({
    url: "/api/set/categoryIndex",
    data: categoryObj,
    method: "post"
  })
}
