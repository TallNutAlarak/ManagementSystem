import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/login/index.vue"
import Layout from "@/components/layout.vue"
import Home from "@/views/home"
import Member from "@/views/member"
import Supplier from "@/views/supplier"
import Goods from "@/views/goods"
import Staff from "@/views/staff"
Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    name: 'layout',
    component: Layout,
    redirect:'/home',
    children:[
      {
        path: '/home',
        name: 'home',
        component: Home,
        meta:{title:'首页'}
    },
    {
      path: '/member',
      name: 'member',
      component: Member,
      meta:{title:'会员管理'}
    },  
    {
      path: '/supplier',
      name: 'supplier',
      component: Supplier,
      meta:{title:'供应商管理'}
    },  
    {
      path: '/goods',
      name: 'goods',
      component: Goods,
      meta:{title:'商品管理'}
    },  
    {
      path: '/staff',
      name: 'staff',
      component: Staff,
      meta:{title:'员工管理'}
    },  
  ]
  },
  

];

const router = new VueRouter({
  routes
  // 可以设置连接激活时的class
  // linkActiveClass="..."
});

export default router;
