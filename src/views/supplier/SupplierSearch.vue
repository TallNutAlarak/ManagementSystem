<template>
    <div>
        <el-form
            ref="searchForm"
            :inline="true"
            :model="searchMap"
            style="margin-top:20px"
        >
            <el-form-item prop="name">
                <el-input
                    v-model="searchMap.name"
                    placeholder="供应商名称"
                ></el-input>
            </el-form-item>

            <el-form-item prop="linkman" v-if="!isDialog">
                <el-input
                    v-model="searchMap.linkman"
                    placeholder="联系人"
                ></el-input>
            </el-form-item>

            <el-form-item prop="mobile" v-if="!isDialog">
                <el-input
                    v-model="searchMap.mobile"
                    placeholder="联系电话"
                ></el-input>
            </el-form-item>

            <el-form-item>
                <el-button
                    type="primary"
                    @click="$emit('fetchdata')"
                >查询</el-button>
            </el-form-item>
            <el-form-item v-if="!isDialog">
                <el-button
                    type="primary"
                    @click="handleAdd"
                >新增</el-button>
            </el-form-item>
            <el-form-item v-if="!isDialog">
                <el-button @click="resetForm('searchForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    props: {
        searchMap: {
            type: Object,
            required: true
        },
        isDialog:Boolean
    },
    methods: {
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        handleAdd() {
            this.$emit("openPopup");
        }
    }
};
</script>
