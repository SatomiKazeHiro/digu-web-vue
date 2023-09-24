import request from "./request";

// 获取随机数量（limit）的资源项目
export function getItemRandom(params) {
  return request({
    url: "/api/get/itemRandom",
    params: params,
  });
}

// 获取所有域（area）的名字
export function getAreaAllName(isOnlyArea = true) {
  return request({
    url: "/api/get/areaAllName",
    params: { isOnlyArea },
  });
}

// 获取域下随机的资源项目
export function getAreaRandom(params) {
  return request({
    url: "/api/get/areaRandom",
    method: "POST",
    data: params,
  });
}

// 获取域下的内容
export function getAreaNormal(params) {
  return request({
    url: "/api/get/areaNormal",
    method: "POST",
    data: params,
  });
}

// 获取域下所有的类（category）
export function getCategoryAllName(area) {
  return request({
    url: "/api/get/categoryAllName",
    params: { area },
  });
}

// 获取域下指定的类的所有资源项目（Iitem）
export function getCategoryNormal(params) {
  return request({
    url: "/api/get/categoryNormal",
    method: "POST",
    data: params,
  });
}

// 获取资源项目的信息
export function getItem(params) {
  return request({
    url: "/api/get/item",
    method: "POST",
    data: params,
  });
}

// 获取资源项目所属的网页名（web_name）路径
export function getACPath(area, category) {
  return request({
    url: "/api/get/acPath",
    params: { area, category },
  });
}

// 获取资源项目所属的网页名（web_name）路径
export function getFolderFiles(path) {
  return request({
    url: "/api/get/getFolderFiles",
    method: "POST",
    data: { path },
  });
}
