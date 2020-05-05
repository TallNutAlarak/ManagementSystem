<template>
  <div class="about">
    <h1>This is an todo list page</h1>
    <div>{{ajaxGet}}</div>
  </div>
</template>

<script>
  import '../mockjs/test.js'
  import api from '@/api/test.js'
  
  export default{
    data(){
      return {
        ajaxGet:[]
      }
    },
    created(){
      // 接收promise对象
      api.getList()
      .then(
        res=>{
          this.ajaxGet = res.data
        })
    }
  }
</script>
