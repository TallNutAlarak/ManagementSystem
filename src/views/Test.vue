<template>
  <div class="about">
    <h1>This is an todo list page</h1>
    <todo />
    <transition-test />
    <filterTest />
    <ajaxTest />
  </div>
</template>

<script>
import todo from "../components/Todo";
import transitionTest from "../components/transitionTest";
import filterTest from "../components/filter";
import ajaxTest from "../components/ajaxTest.vue";
export default {
  components: {
    todo,
    transitionTest,
    filterTest,
    ajaxTest
  }
};
</script>
