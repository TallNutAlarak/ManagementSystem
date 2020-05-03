<template>
  <div>
    {{ list }}
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      lists: []
    };
  },
  computed: {
    id() {
      console.log(this.$route.params);
      return this.$route.params.id;
    },
    list() {
      return this.lists.find(item => {
        return item.id === this.id;
      });
    }
  },
  created() {
    axios
      .get("http://localhost:8080/ajaxtest.json")
      .then(res => {
        this.lists = res.data;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
