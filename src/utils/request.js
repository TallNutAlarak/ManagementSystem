import axios from "axios";
import { Loading,Message } from 'element-ui';

const request = axios.create({
  baseURL: "/",
  // 请求超时，5000毫秒
  timeout: 5000
});

const loading = {
    loadingInstance :null,
    // 打开加载
    open:function(){
        if(this.loadingInstance === null){
            this.loadingInstance = Loading.service({
                target:'.main',
                text:'拼命加载中',
                background:'rgba(0,0,0,.5)'
            });
        }
        
    },
    // 关闭加载
    close:function(){        if(this.loadingInstance !== null){
            this.loadingInstance.close()
        }
        this.loadingInstance === null
            
    }
}

// 请求拦截器
request.interceptors.request.use(
  config => {
    // 请求的拦截
    loading.open()

    return config;
  },
  error => {
    // 出现异常
    loading.close()
    return Promise.reject(error);
  }
);
// 响应拦截器
request.interceptors.response.use(
  response => {
    // 响应的拦截
    loading.close()
    const resp =response.data
    
    // 如果不是2000，说明后台处理有问题
    if(resp.code !== 2000){
        Message({
            message:resp.message || '系统异常',
            type:'warning',
            duration:5*1000
        })
    }
    return response;
  },
  error => {
    // 出现异常
    loading.close()
    Message({
        message:error.message || '系统异常',
        type:'error',
        duration:5*1000
    })
    return Promise.reject(error);
  }
);

export default request;
