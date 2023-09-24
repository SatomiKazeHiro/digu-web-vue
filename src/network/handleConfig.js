import request from "./request";

// 获取目录树
export function getLogTree() {
  return request({
    url: "/api/cfg/getLogtree",
  });
}

// 获取 area 配置信息
export function getAreaConfig(area) {
  return request({
    url: "/api/cfg/getAreaIndex",
    params: { area },
  });
}

// 获取 category 配置信息
export function getCategoryConfig(area, category) {
  return request({
    url: "/api/cfg/getCategoryIndex",
    params: { area, category },
  });
}

// 设置 area 配置
export function settAreaConfig(areaObj) {
  return request({
    url: "/api/cfg/setAreaIndex",
    data: areaObj,
    method: "post",
  });
}

// 设置 category 配置
export function setCategoryConfig(categoryObj) {
  return request({
    url: "/api/cfg/setCategoryIndex",
    data: categoryObj,
    method: "post",
  });
}

// 获取资源的合法性
export function getResourcesValidity(params) {
  return request({
    url: "/api/cfg/getSourecesValidity",
    data: params,
    method: "post",
  });
}
