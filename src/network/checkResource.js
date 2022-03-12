import request from "./request";

export function checkArea(area) {
  return request({
    url: "/api/check/area",
    params: { area }
  })
}

export function checkCategory(area, category) {
  return request({
    url: "/api/check/category",
    params: { area, category }
  })
}

export function checkItem(id) {
  return request({
    url: "/api/check/item",
    params: { id }
  })
}
