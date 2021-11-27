import axios from "axios"

export default function request(config) {
  const instance = axios.create({
    baseURL: '/proxy',
    timeout: 5000
  })

  // 拦截器
  instance.interceptors.request.use(config => {
    // console.log(config);
    // 拦截后（处理后）返回过去，否则请求失败
    return config
  }, err => {
    console.log(err);
  })

  instance.interceptors.response.use(res => {
    // console.log(res);
    // 拦截后（处理后）返回过去，否则请求失败
    return res.data
  }, err => {
    console.log(err);
  })

  return instance(config)
}
