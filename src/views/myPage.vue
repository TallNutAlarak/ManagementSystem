<template>
  <div>
    <ul>
      <router-link to="/mypage/page1" tag="li" active-class="active"
        ><a>first</a></router-link
      >
      <router-link to="/mypage/page2" active-class="active">second</router-link>
    </ul>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
export default {};
</script>
