<template>
    <div>
        <div class="header">
            <router-link to="/">
                <img
                    class="logo"
                    src="@/assets/logo.png"
                />
                <span class="company">管理系统</span>
            </router-link>
            <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                    {{user.name}}
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item
                        icon="el-icon-edit"
                        command="a"
                    >修改密码</el-dropdown-item>
                    <el-dropdown-item
                        icon="el-icon-s-fold"
                        command="b"
                    >退出系统</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>

            <!-- 修改密码 -->
            <el-dialog
                title="修改密码"
                :visible.sync="dialogFormVisible"
                width="400px"
            >
                <el-form
                    :model="ruleForm"
                    status-icon
                    :rules="rules"
                    ref="ruleForm"
                    label-width="100px"
                    style="width:300px"
                >
                    <el-form-item
                        label="原密码"
                        prop="oldPass"
                    >
                        <el-input
                            type="password"
                            v-model="ruleForm.oldPass"
                            autocomplete="off"
                        ></el-input>
                    </el-form-item>
                    <el-form-item
                        label="新密码"
                        prop="password"
                    >
                        <el-input
                            type="password"
                            v-model="ruleForm.password"
                            autocomplete="off"
                        ></el-input>
                    </el-form-item>
                    <el-form-item
                        label="确认密码"
                        prop="checkPass"
                    >
                        <el-input
                            type="password"
                            v-model="ruleForm.checkPass"
                            autocomplete="off"
                        ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button
                            type="primary"
                            @click="submitForm('ruleForm')"
                        >提交</el-button>
                        <el-button @click="$refs['ruleForm'].resetFields()">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>

        </div>
    </div>
</template>

<script>
import { logout } from "@/api/login";
import passwordApi from "@/api/password";
export default {
    data() {
        // return 上面进行申明自定义校验
        const validateOldPass = (rule, value, callback) => {
            passwordApi.checkPwd(this.user.id, value).then(res => {
                const resp = res.data;
                if (resp.flag) {
                    // 验证通过
                    callback();
                } else {
                    callback(new Error(resp.message));
                }
            });
        };
        const validatecheckPass = (rule, value, callback) => {
            if (value != this.ruleForm.password) {
                callback(new Error("两次输入的密码不一致"));
            } else {
                callback();
            }
        };

        return {
            user: this.$store.state.user.user,
            // user: JSON.parse(localStorage.getItem("ms-user")),
            dialogFormVisible: false,
            ruleForm: {
                oldPass: "",
                password: "",
                checkPass: ""
            },
            rules: {
                oldPass: [
                    {
                        required: true,
                        message: "原密码不能为空",
                        trigger: "blur"
                    },
                    { validator: validateOldPass, trigger: "blur" }
                ],
                password: [
                    {
                        required: true,
                        message: "新密码不能为空",
                        trigger: "blur"
                    }
                ],
                checkPass: [
                    {
                        required: true,
                        message: "确认密码不能为空",
                        trigger: "blur"
                    },
                    { validator: validatecheckPass, trigger: "change" }
                ]
            }
        };
    },
    methods: {
        handleCommand(command) {
            switch (command) {
                case "a":
                    this.handlePasswordChange();
                    break;
                case "b":
                    this.handleLogout();
                    break;
                default:
                    break;
            }
        },
        handleLogout() {
            // var token = localStorage.getItem("ms-token");
            // logout(token).then(res => {
            //     var resp = res.data;
            //     if (resp.flag) {
            //         // 退出成功
            //         localStorage.removeItem("ms-user");
            //         localStorage.removeItem("ms-token");
            //         this.$router.push("/login");
            //     } else {
            //         this.$message({
            //             type: "warning",
            //             message: "resp.message",
            //             duration: 500
            //         });
            //     }
            // });
            this.$store.dispatch("Logout").then(res => {
                console.log(res)
                if (res.flag) {
                    this.$router.push("/login");
                } else {
                    this.$message({
                        type: "warning",
                        message: "resp.message",
                        duration: 500
                    });
                }
            });
        },
        handlePasswordChange() {
            this.dialogFormVisible = true;
            this.$nextTick(() => {
                this.$refs["ruleForm"].resetFields();
            });
        },
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    passwordApi
                        .updatePwd(this.user.id, this.ruleForm.checkPass)
                        .then(res => {
                            const resp = res.data;
                            console.log(12);
                            this.$message({
                                message: resp.message,
                                type: resp.flag ? "success" : "warning"
                            });
                            if (resp.flag) {
                                // 退出系统回到登录页
                                this.handleLogout();
                                this.dialogFormVisible = false;
                            }
                        });
                } else {
                    return false;
                }
            });
        }
    }
};
</script>
<style lang="stylus" scoped>
.logo {
    vertical-align: middle;
    padding: 0px 10px 0px 40px;
}

.company {
    position: absolute;
    color: white;
}

// 下拉菜单
.el-dropdown {
    float: right;
    margin-right: 40px;
}

.el-dropdown-link {
    color: white;
    cursor: pointer;
}
</style>
