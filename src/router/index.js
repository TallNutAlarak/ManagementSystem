import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import myPage from "../views/myPage.vue";
import MyPage1 from "../components/MyPage1.vue";
import MyPage2 from "../components/MyPage2.vue";
import MyPage11 from "../components/MyPage11.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/test",
    name: "Test",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/Test.vue")
  },
  {
    path: "/mypage",
    name: "MyPage",
    component: myPage,
    children: [
      {
        path: "/mypage/page1",
        component: MyPage1,
        children: [
          {
            // :id为占位符
            path: "/mypage/page1/page11/:id",
            component: MyPage11
          }
        ]
      },
      {
        // 等价于上面的path方式
        path: "page2",
        component: MyPage2
      },

      {
        //进入/page路由时
        path: "",
        // 重定向至页面1
        redirect: "/mypage/page1"
      }
    ]
  }
];

const router = new VueRouter({
  routes
  // 可以设置连接激活时的class
  // linkActiveClass="..."
});

export default router;
