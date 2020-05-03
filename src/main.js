import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  // 引入的vue文件是运行版没有编译功能
  // 使用render无需编译
  render: h => h(App),
}).$mount("#app");
