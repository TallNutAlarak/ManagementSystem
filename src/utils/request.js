import axios from "axios";

const request = axios.create({
  baseURL: "/",
  // 请求超时，5000毫秒
  timeout: 5000
});

// 请求拦截器
request.interceptors.request.use(
  config => {
    // 请求的拦截
    return config;
  },
  error => {
    // 出现异常
    return Promise.reject(error);
  }
);
// 响应拦截器
request.interceptors.response.use(
  response => {
    // 响应的拦截
    return response;
  },
  error => {
    // 出现异常
    return Promise.reject(error);
  }
);

export default request;
