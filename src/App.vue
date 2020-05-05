<template>
  <div id="app">
    <div id="nav">
      <!-- router默认渲染出a标签 -->
      <!-- 使用tag="..."设置渲染出指定标签 -->
      <!-- active-class="..."设置激活时的class 也可以在路由配置时设置-->
      <!-- 默认是模糊匹配,'/xxx'会匹配到'/'路由，使用exact精确匹配 -->
      <router-link to="/" exact>Home</router-link> |
      <router-link to="/test">Test</router-link> |
      <router-link to="/mypage">MyPage</router-link>
    </div>
    <!-- 路由出口 -->
    <router-view />
  </div>
</template>

<style lang="stylus" scoped>
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin-top 60px
</style>
