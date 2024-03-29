import axios from "axios";

export default function request(config) {
  const instance = axios.create({
    baseURL: "/proxy",
    timeout: 5000,
  });

  instance.interceptors.request.use(
    (config) => {
      return config;
    },
    (err) => {
      console.log("request.js: ", err);
      return Promise.reject(err);
    }
  );

  instance.interceptors.response.use(
    (res) => {
      if (res && res.data.code == 200) return res.data.data;
      else return Promise.reject(res.data);
    },
    (err) => {
      console.log("request.js: ", err);
      return Promise.reject(err);
    }
  );

  return instance(config);
}
