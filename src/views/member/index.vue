<template>
    <div>
        <el-table
            :data="list"
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
                prop="cardNum"
                label="会员卡号"
            ></el-table-column>
            <el-table-column
                prop="name"
                label="会员姓名"
                width="90"
            ></el-table-column>
            <el-table-column
                prop="birthday"
                label="会员生日"
            ></el-table-column>
            <el-table-column
                prop="phone"
                label="手机号码"
            ></el-table-column>
            <el-table-column
                prop="integral"
                label="可用积分"
            ></el-table-column>
            <el-table-column
                prop="money"
                label="开卡金额"
            ></el-table-column>
            <el-table-column
                prop="payType"
                label="支付类型"
            ></el-table-column>
            <el-table-column
                prop="address"
                label="会员地址"
            ></el-table-column>
            <el-table-column label="操作" width="150">
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
import memberApi from "@/api/member";
export default {
    data() {
        return {
            list: []
        };
    },
    created() {
        this.fetchData();
    },
    methods: {
        fetchData() {
            memberApi.getList().then(res => {
                const resp = res.data;
                this.list = resp.data;
            });
        },
        handleEdit(id){
            console.log(id)
        },
        handleDelete(id){
            console.log(id)
        },
    }
};
</script>