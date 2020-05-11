<template>
    <div>
        <!-- 搜索框 -->
        <el-form
            ref="searchForm"
            :inline="true"
            :model="searchMap"
            style="margin-top:20px"
        >
            <el-form-item prop="name">
                <el-input
                    v-model="searchMap.name"
                    placeholder="商品名称"
                ></el-input>
            </el-form-item>
            <el-form-item prop="code">
                <el-input
                    v-model="searchMap.code"
                    placeholder="商品编号"
                ></el-input>
            </el-form-item>
            <el-form-item prop="supplierName">
                <el-input
                    readonly
                    v-model="searchMap.supplierName"
                    @click.native="dialogSupplierVisible = true"
                    placeholder="选择供应商"
                ></el-input>
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
        <!-- 商品数据列表 -->
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
                prop="name"
                label="商品名称"
            ></el-table-column>
            <el-table-column
                prop="code"
                label="商品编码"
                width="90"
            ></el-table-column>
            <el-table-column
                prop="spec"
                label="商品规格"
            ></el-table-column>
            <el-table-column
                prop="retailPrice"
                label="零售价"
            ></el-table-column>
            <el-table-column
                prop="purchasePrice"
                label="进货价"
            ></el-table-column>
            <el-table-column
                prop="storageNum"
                label="库存数量"
            ></el-table-column>
            <el-table-column
                prop="supplierName"
                label="供应商"
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

        <!-- 分页栏 -->
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
        <!-- 选择供应商对话框 -->
        <el-dialog
            title="选择供应商"
            :visible.sync="dialogSupplierVisible"
            width="500"
        >
            <supplier
                :isDialog="true"
                @option-supplier="optionSupplier"
            ></supplier>
        </el-dialog>
        <!-- 编辑 -->
        <el-dialog
            title="编辑商品"
            :visible.sync="dialogFormVisible"
            width="500"
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
                    label="商品名称"
                    prop="name"
                >
                    <el-input
                        v-model="pojo.name"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    label="商品编码"
                    prop="code"
                >
                    <el-input
                        v-model="pojo.code"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>

                <el-form-item
                    label="商品规格"
                    prop="spec"
                >
                    <el-input
                        v-model="pojo.spec"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    label="零售价"
                    prop="retailPrice"
                >
                    <el-input
                        v-model="pojo.retailPrice"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    label="进货价"
                    prop="purchasePrice"
                >
                    <el-input
                        v-model="pojo.purchasePrice"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    label="库存数量"
                    prop="storageNum"
                >
                    <el-input
                        v-model="pojo.storageNum"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    label="供应商"
                    prop="supplierName"
                >
                    <el-input
                        readonly
                        @click.native="editOptionSupplier"
                        placeholder="选择供应商"
                        v-model="pojo.supplierName"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
            </el-form>
            <div
                slot="footer"
                class="dialog-footer"
            >
                <el-button @click="dialogFormVisible =false">取 消</el-button>
                <!-- <el-button
                    type="primary"
                    @click="pojo.id === null ? addData('pojoForm') : updateData('pojoForm')"
                >确 定</el-button> -->
                <el-button
                    type="primary"
                    @click="addData('pojoForm') "
                >确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>
<script>
import goodsApi from "@/api/goods.js";
import Supplier from "@/views/supplier";
export default {
    components: {
        Supplier
    },
    data() {
        return {
            currentPage: 1,
            pageSize: 10,
            searchMap: {
                name: "",
                code: "",
                supplierName: "",
                supplierId: null
            },
            list: [],
            total: 0,
            // 弹出选择供应商
            dialogSupplierVisible: false,
            dialogFormVisible: false,
            rules: {
                name: [
                    {
                        required: true,
                        message: "商品名称不能为空",
                        trigger: "blur"
                    }
                ],
                code: [
                    {
                        required: true,
                        message: "商品编码不能为空",
                        trigger: "blur"
                    }
                ],
                retailPrice: [
                    {
                        required: true,
                        message: "零售价不能为空",
                        trigger: "blur"
                    }
                ]
            },
            pojo: {
                name: "",
                code: "",
                spec: "",
                retailPrice: 0.0,
                purchasePrice: 0.0,
                storageNum: 0,
                supplierName: "",
                supplierId:null
            },
            // 是否为编辑窗口
            isEdit: false
        };
    },
    created() {
        this.fetchData();
    },
    methods: {
        fetchData() {
            goodsApi
                .search(this.currentPage, this.pageSize, this.searchMap)
                .then(res => {
                    const resp = res.data;
                    if (resp.flag) {
                        this.list = resp.data.rows;
                        this.total = resp.data.total;
                    }
                });
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.fetchData();
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.fetchData();
        },
        optionSupplier(currentRow) {
            if (this.isEdit) {
                this.pojo.supplierName = currentRow.name;
                this.pojo.supplierId = currentRow.id;
            } else {
                this.searchMap.supplierName = currentRow.name;
                this.searchMap.supplierId = currentRow.id;
            }
            this.isEdit = false
            this.dialogSupplierVisible = false;
        },
        handleAdd() {
            this.dialogFormVisible = true;
            this.$nextTick(() => {
                // this.$nextTick()是一个异步事件，当渲染结束后，回调函数执行
                // 弹出窗口打开之后，需要加载Dom，需要花费一点时间，等待它加载完dom之后再进行调用resetFiles方法，重置表单和清除
                this.$refs["pojoForm"].resetFields();
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        addData(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    goodsApi.add(this.pojo).then(res => {
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
        },
        editOptionSupplier() {
            this.isEdit = true;
            this.dialogSupplierVisible = true;
        },
        handleEdit(id) {
            this.handleAdd();
            goodsApi.getByID(id).then(res => {
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
                    goodsApi.deleteById(id).then(res => {
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
    }
};
</script>