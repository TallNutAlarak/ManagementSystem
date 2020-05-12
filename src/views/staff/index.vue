<template>
    <div>
        <!-- 搜索框 -->
        <el-form
            ref="searchForm"
            :inline="true"
            :model="searchMap"
            style="margin-top:20px"
        >
            <el-form-item prop="userName">
                <el-input
                    v-model="searchMap.userName"
                    placeholder="账号"
                ></el-input>
            </el-form-item>
            <el-form-item prop="name">
                <el-input
                    v-model="searchMap.name"
                    placeholder="姓名"
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

        <!-- 员工数据列表 -->
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
                prop="userName"
                label="账号"
            ></el-table-column>
            <el-table-column
                prop="name"
                label="姓名"
                width="90"
            ></el-table-column>
            <el-table-column
                prop="age"
                label="年龄"
            ></el-table-column>
            <el-table-column
                prop="mobile"
                label="电话"
            ></el-table-column>
            <el-table-column
                prop="salary"
                label="薪酬"
            ></el-table-column>
            <el-table-column
                prop="entryDate"
                label="入职时间"
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
        <!-- 弹出框 -->
        <el-dialog
            title="员工编辑"
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
                    label="账号"
                    prop="userName"
                >
                    <el-input
                        v-model="pojo.userName"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    label="姓名"
                    prop="name"
                >
                    <el-input
                        v-model="pojo.name"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>

                <el-form-item
                    label="年龄"
                    prop="age"
                >
                    <el-input
                        v-model="pojo.age"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    label="电话"
                    prop="mobile"
                >
                    <el-input
                        v-model="pojo.mobile"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    label="薪酬"
                    prop="salary"
                >
                    <el-input
                        v-model="pojo.salary"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    label="入职时间"
                    prop="entryDate"
                >
                    <div class="block">
                        <el-date-picker
                            v-model="pojo.entryDate"
                            type="date"
                            placeholder="选择入职时间"
                        >
                        </el-date-picker>
                    </div>
                </el-form-item>
            </el-form>
            <div
                slot="footer"
                class="dialog-footer"
            >
                <el-button @click="dialogFormVisible =false">取 消</el-button>
                <el-button
                    type="primary"
                    @click="pojo.id===null ? addData('pojoForm') : updateData('pojoForm')"
                >确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
import staffApi from "@/api/staff.js";
export default {
    data() {
        return {
            list: [],
            currentPage: 1,
            pageSize: 10,
            searchMap: {},
            total: 0,
            searchMap: {
                userName: "",
                name: ""
            },
            pojo: {
                userName:"",
                name:"",
                age:null,
                mobile:"",
                salary:null,
                entryDate:"",
                id:null,
            },
            rules: {
                userName:[
                    {required:true,message:"请输入账号",trigger:"blur"}
                ],
                name:[
                    {required:true,message:"请输入姓名",trigger:"blur"}
                ],
            },
            dialogFormVisible:false
        };
    },
    created() {
        this.fetchData();
    },
    methods: {
        fetchData() {
            staffApi
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
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        handleAdd() {
            this.dialogFormVisible = true;
            this.$nextTick(()=>{
                this.$refs["pojoForm"].resetFields()
            })
        },
        addData(formName){
            this.$refs[formName].validate(valid =>{
                if(valid){
                    staffApi.add(this.pojo).then(res =>{
                        var resp = res.data;
                        if(resp.flag){
                            this.fetchData();
                            this.dialogFormVisible = false
                            this.$message({
                                message:"新增成功，初始密码为：123456",
                                type:"success"
                            })
                        }else{
                            this.$message({
                                message:resp.data,
                                type:"warning"
                            })
                        }

                    })
                }else{
                    return false
                }
            })
        },
        handleEdit(id){
            this.handleAdd();
            staffApi.getByID(id).then(res => {
                const resp =res.data;
                if(resp.flag){
                    this.pojo = resp.data
                }
            })

        },
        updateData(formName){
            this.$refs[formName].validate(valid => {
                if(valid){
                    staffApi.update(this.pojo).then(res => {
                        const resp =res.data
                        if(resp.flag){
                            this.fetchData();
                            this.dialogFormVisible = false
                        }
                        else{
                            this.$message({
                                message:resp.data,
                                type:"warning"
                            })
                        }

                    })
                }else{
                    return false
                }
            })
        },
        handleDelete(id){
            this.$confirm("此操作将永久删除该文件, 是否继续?","提示",{
                confirmButtonText:"确定",
                cancelButtonText:"取消"
            }).then(()=>{
                staffApi.deleteById(id).then(res => {
                    const resp =res.data;
                    this.$message({
                        message:resp.message,
                        type: resp.flag ? "success" : "warning"
                    })
                    if(resp.flag){
                        this.fetchData()
                    }
                })
            })
        }
    }
};
</script>
