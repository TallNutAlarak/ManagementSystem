<template>
    <div>
        <el-dialog
            title="供应商编辑"
            :visible.sync="dialogFormVisible"
            width="500px"
            :before-close="handleClose"
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
                    label="供应商名称"
                    prop="name"
                >
                    <el-input
                        v-model="pojo.name"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    label="联系人"
                    prop="linkman"
                >
                    <el-input
                        v-model="pojo.linkman"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>

                <el-form-item
                    label="联系电话"
                    prop="mobile"
                >
                    <el-input
                        v-model="pojo.mobile"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    label="备注"
                    prop="remark"
                >
                    <el-input
                        v-model="pojo.remark"
                        autocomplete="off"
                        type="textarea"
                    ></el-input>
                </el-form-item>
            </el-form>
            <div
                slot="footer"
                class="dialog-footer"
            >
                <el-button @click="$emit('TogglePopupShow')">取 消</el-button>
                <el-button
                    type="primary"
                    @click="pojo.id === null ? addData('pojoForm') : updateData('pojoForm')"
                >确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import supplierApi from "@/api/supplier";
export default {
    data() {
        return {
            rules: {
                name: [
                    {
                        required: true,
                        message: "供应商不能为空",
                        trigger: "blur"
                    }
                ],
                linkman: [
                    {
                        required: true,
                        message: "联系人不能为空",
                        trigger: "blur"
                    }
                ]
            },
            pojo: {
                id: null,
                name: "",
                linkman: "",
                mobile: "",
                remark: ""
            }
        };
    },
    props: {
        dialogFormVisible: {
            type: Boolean,
            required: true
        }
    },
    watch: {
        dialogFormVisible(val) {
            this.$nextTick(() => {
                if (val === true) {
                    this.$emit("getPopupRef", this.$refs["pojoForm"]);
                }
            });
        }
    },
    methods: {
        handleClose() {
            this.$confirm("确认关闭？")
                .then(_ => {
                    this.$emit("TogglePopupShow");
                })
                .catch(_ => {});
        },
        addData(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    // 提交表单
                    supplierApi.add(this.pojo).then(res => {
                        const resp = res.data;
                        if (resp.flag) {
                            this.$emit("fetchdata");
                            this.$emit("TogglePopupShow");
                        } else {
                            this.$message({
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
        updateData() {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    // 提交表单
                    supplierApi.add(this.pojo).then(res => {
                        const resp = res.data;
                        if (resp.flag) {
                            this.$emit("fetchdata");
                            this.$emit("TogglePopupShow");
                        } else {
                            this.$message({
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
    }
};
</script>

<style lang="stylus" scoped></style>
