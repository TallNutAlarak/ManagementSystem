import Vue from "vue";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from "./App.vue";
import router from "./router";
import store from "./store";

// 使用组件库
Vue.use(ElementUI);

Vue.config.productionTip = false;

console.log(111,process.env.VUE_APP_SERVICE_URL)

new Vue({
  router,
  store,
  // 引入的vue文件是运行版没有编译功能
  // 使用render无需编译
  render: h => h(App),
}).$mount("#app");
