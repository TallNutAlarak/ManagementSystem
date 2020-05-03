<template>
  <div>
    <ul>
      <li v-for="router in routerLists" :key="router.id">
        <router-link :to="'/mypage/page1/page11/' + router.id">{{
          router.name
        }}</router-link>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      routerLists: []
    };
  },
  created() {
    axios
      .get("http://localhost:8080/ajaxtest.json")
      .then(res => {
        this.routerLists = res.data;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
