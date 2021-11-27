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
export function getAreaNormal(area, limit, page) {
  return request({
    url: "/api/get/areaNormal",
    params: { area, limit, page }
  })
}

// 获取域下所有的类（category）
export function getCategoryListbyArea(area) {
  return request({
    url: "/api/get/categoryListbyArea",
    params: { area }
  })
}

// 获取域下指定的类的所有资源项目（Iitem）
export function getCategoryNormal(area, category, limit, page) {
  // console.log(area, category, limit, page);
  return request({
    url: "/api/get/categoryNormal",
    params: { area, category, limit, page }
  })
}

// 获取资源项目的信息
export function getItem(id) {
  return request({
    url: "/api/get/item",
    params: { id }
  })
}
