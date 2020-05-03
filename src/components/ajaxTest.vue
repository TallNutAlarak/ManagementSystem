<template>
  <div class="ajaxspace">
    <h3>ajax sapce</h3>
    <div v-for="(reqData, id) in reqDatas" :key="id">
      姓名：{{ reqData.name }} 年龄：{{ reqData.age }}
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      reqDatas: ""
    };
  },
  created() {
    // axios.get('http://localhost:8080/ajaxtest.json')
    axios({
      method: "get",
      url: "http://localhost:8080/ajaxtest.json"
    })
      .then(res => {
        this.reqDatas = res.data;
      })
      .catch(error => {
        console.log("发生错误：", error);
      });
  }
};
</script>
<style lang="stylus" scoped>
.ajaxspace{
    width 500px
    height 300px
    background white
    margin 0 auto
    padding 50px
}
</style>
