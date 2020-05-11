<template>
  <div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      :layout="isDialog ? 'prev, pager, next' : 'total, sizes, prev, pager, next, jumper'"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    currentPage: {
      type: Number,
      required: true
    },
    pageSize: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    },
    isDialog:Boolean
  },
  methods: {
    handleSizeChange(val) {
      this.$emit("pageSizeChange", val);
      this.$emit("fetchdata");
    },
    // 当页码改变后触发,val是最新的页面
    handleCurrentChange(val) {
      this.$emit("pageChange", val);
      this.$emit("fetchdata");
    }
  }
};
</script>
