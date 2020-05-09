<template>
    <div>
        <el-table
            :data="supplierList"
            height="380"
            border
            style="width: 100%"
        >
            <el-table-column
                type="index"
                label="序号"
                width="50"
            ></el-table-column>
            <el-table-column
                prop="name"
                label="供应商名称"
            ></el-table-column>
            <el-table-column
                prop="linkman"
                label="联系人"
                width="90"
            ></el-table-column>
            <el-table-column
                prop="mobile"
                label="联系电话"
            ></el-table-column>
            <el-table-column
                prop="remark"
                label="备注"
            ></el-table-column>
            <el-table-column
                label="操作"
                width="150"
            >
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        @click="handleEdit(scope.row.id)"
                    >编辑</el-button>
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.row.id)"
                    >删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import supplierApi from "@/api/supplier";
export default {
    props: {
        supplierList: {
            type: Array,
            required: true
        }
    },
    methods: {
        handleEdit(id) {
            this.$emit("openPopup");
            supplierApi.getById(id).then(res => {
                const resp = res.data;
                if (resp.flag) {
                    this.pojo = resp.data;
                } else {
                    this.$message({
                        message: resp.message,
                        type: "warning"
                    });
                }
            });
        },
        handleDelete(id) {
            this.$confirm("确认删除这条记录吗？", "提示", {
                confirmButtonText: "确认",
                cancleButtonText: "取消"
            }).then(() => [
                supplierApi.deleteById(id).then(res => {
                    const resp = res.data;
                    this.$message({
                        message: resp.message,
                        type: resp.flag ? "success" : "warning"
                    });
                    if (resp.flag) {
                        this.$emit("fetchdata");
                    }
                })
            ]);
        }
    }
};
</script>

<style lang="stylus" scoped></style>
