import router from "./index.js";
import { getUserInfo } from "@/api/login.js";
// to:即将要进入的目标路由对象
// from:即将要离开的理由对象
// next:是一个方法，可以指定路由地址进行跳转
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("ms-token");
  if (!token) {
    if (to.path !== "/login") {
      next({ path: "/login" });
    } else {
      next();
    }
  } else {
    if (to.path === "/login") {
      next();
    } else {
      const userInfo = localStorage.getItem("ms-user");
      if (userInfo) {
        next();
      } else {
        getUserInfo(token).then(res => {
          const resp = res.data;
          if (resp.flag) {
            localStorage.setItem("ms-user", JSON.stringify(resp.data));
            next();
          } else {
            next({ path: "/login" });
          }
        });
      }
    }
  }
});
