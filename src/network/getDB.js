import request from "./request";

// 获取随机数量（limit）的资源项目
export function getItemRandom(limit) {
  return request({
    url: '/api/get/itemRandom',
    params: { limit }
  })
}

// 获取所有域（area）的名字
export function getAreaAllName() {
  return request({
    url: '/api/get/areaAllName',
  })
}

// 获取域下随机的资源项目
export function getAreaRandom(area, limit, excludeID) {
  return request({
    url: '/api/get/areaRandom',
    params: { area, limit, excludeID }
  })
}

// 获取域下的内容
export function getAreaNormal(area, limit, page, msgType = "") {
  return request({
    url: "/api/get/areaNormal",
    params: { area, limit, page, msgType }
  })
}

// 获取域下所有的类（category）
export function getCategories(area) {
  return request({
    url: "/api/get/getCategories",
    params: { area }
  })
}

// 获取域下指定的类的所有资源项目（Iitem）
export function getCategoryNormal(area, category, limit, page, msgType = "") {
  // console.log(area, category, limit, page);
  return request({
    url: "/api/get/categoryNormal",
    params: { area, category, limit, page, msgType }
  })
}

// 获取资源项目的信息
export function getItem(area, category, id) {
  return request({
    url: "/api/get/item",
    params: { area, category, id }
  })
}

// 获取目录树
export function getLogTree() {
  return request({
    url: "/api/get/logtree",
  })
}

// 获取 area 配置信息
export function getAreaConfig(area) {
  return request({
    url: "/api/get/aeraIndex",
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
    params: { areaObj }
  })
}

// 设置 category 配置
export function setCategoryConfig(categoryObj) {
  return request({
    url: "/api/set/categoryIndex",
    params: { categoryObj }
  })
}
