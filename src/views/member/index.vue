<template>
    <div>
        <el-form
            ref="searchForm"
            :inline="true"
            :model="searchMap"
            style="margin-top:20px"
        >
            <el-form-item prop="cardNum">
                <el-input
                    v-model="searchMap.cardNum"
                    placeholder="会员卡号"
                ></el-input>
            </el-form-item>
            <el-form-item prop="name">
                <el-input
                    v-model="searchMap.name"
                    placeholder="会员名称"
                ></el-input>
            </el-form-item>
            <el-form-item prop="payType">
                <el-select
                    v-model="searchMap.payType"
                    placeholder="支付类型"
                >
                    <el-option
                        v-for="option in payTypeOptions"
                        :key="option.type"
                        :label="option.name"
                        :value="option.type"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="birthday">
                <el-date-picker
                    v-model="searchMap.birthday"
                    value-format="yyyy-MM-dd"
                    type="date"
                    placeholder="出生日期"
                >
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button
                    type="primary"
                    @click="fetchData"
                >查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button
                    type="primary"
                    @click="handleAdd"
                >新增</el-button>
            </el-form-item>
            <el-form-item>
                <el-button @click="resetForm('searchForm')">重置</el-button>
            </el-form-item>
        </el-form>

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
                prop="payType "
                label="支付类型"
            >
                <template slot-scope="scope">
                    <span>
                        {{ scope.row.payType | payTypeFilter }}
                    </span>
                </template>
            </el-table-column>
            <el-table-column
                prop="address"
                label="会员地址"
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
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
        >
        </el-pagination>
        <el-dialog
            title="会员编辑"
            :visible.sync="dialogFormVisible"
            width="500px"
        >
            <el-form
                :model="pojo"
                :rules="rules"
                ref="pojoForm"
                label-width="100px"
                label-position="right"
                style="width:400px"
            >
                <el-form-item
                    label="会员卡号"
                    prop="cardNum"
                >
                    <el-input
                        v-model="pojo.cardNum"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    label="会员姓名"
                    prop="name"
                >
                    <el-input
                        v-model="pojo.name"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    label="会员生日"
                    prop="birthday"
                >
                    <el-date-picker
                        v-model="pojo.birthday"
                        value-format="yyyy-MM-dd"
                        type="date"
                        placeholder="会员生日"
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item
                    label="手机号码"
                    prop="phone"
                >
                    <el-input
                        v-model="pojo.phone"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    label="开卡金额"
                    prop="money"
                >
                    <el-input
                        v-model="pojo.money"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    label="可用积分"
                    prop="integral"
                >
                    <el-input
                        v-model="pojo.integral"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    label="支付类型"
                    prop="payType"
                >
                    <el-select
                        v-model="pojo.payType"
                        placeholder="支付类型"
                    >
                        <el-option
                            v-for="option in payTypeOptions"
                            :key="option.type"
                            :label="option.name"
                            :value="option.type"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="会员地址">
                    <el-input
                        v-model="pojo.address"
                        autocomplete="off"
                        type="textarea"
                    ></el-input>
                </el-form-item>
            </el-form>
            <div
                slot="footer"
                class="dialog-footer"
            >
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button
                    type="primary"
                    @click="
            pojo.id === null ? addData('pojoForm') : updateData('pojoForm')
          "
                >确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import memberApi from "@/api/member";
const payTypeOptions = [
    { type: "1", name: "现金" },
    { type: "2", name: "微信" },
    { type: "3", name: "支付宝" },
    { type: "4", name: "银行卡" }
];
export default {
    data() {
        return {
            list: [],
            total: 0,
            currentPage: 1,
            pageSize: 10,
            searchMap: {
                cardNum: "",
                name: "",
                payType: "",
                birthday: ""
            },
            payTypeOptions,
            // 控制对话框
            dialogFormVisible: false,
            // 提交的数据
            pojo: {
                cardNum: "",
                name: "",
                birthday: "",
                phone: "",
                money: 0,
                integral: 0,
                payType: "",
                address: ""
            },
            rules: {
                cardNum: [
                    { required: true, message: "卡号不能为空", trigger: "blur" }
                ],
                name: [
                    { required: true, message: "姓名不能为空", trigger: "blur" }
                ],
                payType: [
                    {
                        required: true,
                        message: "支付方式不能为空",
                        trigger: "change"
                    }
                ]
            }
        };
    },
    created() {
        this.fetchData();
    },
    methods: {
        // 当每页显示条数改变后触发，val是最新的每页显示条数
        handleSizeChange(val) {
            this.pageSize = val;
            this.fetchData();
        },
        // 当页码改变后触发,val是最新的页面
        handleCurrentChange(val) {
            this.currentPage = val;
            this.fetchData();
        },
        fetchData() {
            memberApi
                .search(this.currentPage, this.pageSize, this.searchMap)
                .then(res => {
                    const resp = res.data;
                    this.list = resp.data.rows;
                    this.total = resp.data.total;
                });
        },
        updateData(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    memberApi.update(this.pojo).then(res => {
                        const resp = res.data;
                        if (resp.flag) {
                            this.fetchData();
                            this.dialogFormVisible = false;
                        } else {
                            this.$message({
                                message: resp.message,
                                type: "warning"
                            });
                        }
                    });
                }
            });
        },
        handleAdd() {
            this.dialogFormVisible = true;
            this.$nextTick(() => {
                // this.$nextTick()是一个异步事件，当渲染结束后，回调函数执行
                // 弹出窗口打开之后，需要加载Dom，需要花费一点时间，等待它加载完dom之后再进行调用resetFiles方法，重置表单和清除
                this.$refs["pojoForm"].resetFields();
            });
        },
        handleEdit(id) {
            this.handleAdd();
            memberApi.getByID(id).then(res => {
                const resp = res.data;
                console.log(resp);
                if (resp.flag) {
                    console.log(resp.data);
                    this.pojo = resp.data;
                }
            });
        },
        handleDelete(id) {
            console.log(id);
            this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    memberApi.deleteById(id).then(res => {
                        const resp = res.data;
                        this.$message({
                            type: resp.flag ? "success" : "error",
                            message: resp.message
                        });
                        if (resp.flag) {
                            this.fetchData();
                        }
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        addData(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    memberApi.add(this.pojo).then(res => {
                        const resp = res.data;
                        if (resp.flag) {
                            this.fetchData();
                            // 关闭成功
                            this.dialogFormVisible = false;
                        } else {
                            this.message({
                                message: resp.message,
                                type: "warning"
                            });
                        }
                    });
                } else {
                    return false;
                }
            });
        }
    },
    filters: {
        payTypeFilter(type) {
            const payObj = payTypeOptions.find(obj => obj.type === type);
            return payObj ? payObj.name : null;
        }
    }
};
</script>
