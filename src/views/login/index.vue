<template>
    <div class="login-container">
        <el-form
            ref="form"
            :model="form"
            label-width="80px"
            class="login-form"
            :rules="rules"
        >
            <h1 class="login-title">管理系统</h1>
            <el-form-item
                label="账号"
                prop="username"
            >
                <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item
                label="密码"
                prop="password"
            >
                <el-input
                    v-model="form.password"
                    type="password"
                ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button
                    type="primary"
                    @click="submitForm('form')"
                >登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import { login, getUserInfo } from "@/api/login";

export default {
    data() {
        return {
            form: {
                username: "",
                password: ""
            },
            rules: {
                username: [
                    { required: true, message: "账号不能为空", trigger: "blur" }
                ],
                password: [
                    { required: true, message: "密码不能为空", trigger: "blur" }
                ]
            }
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    //   login(this.form.username, this.form.password).then(res => {
                    //     const resp = res.data;
                    //     if (resp.flag) {
                    //       getUserInfo(resp.data.token).then(res => {
                    //         const respUser = res.data;
                    //         if (respUser.flag) {
                    //           localStorage.setItem(
                    //             "ms-user",
                    //             JSON.stringify(respUser.data)
                    //           );
                    //           localStorage.setItem("ms-token", resp.data.token);

                    //           this.$router.push("/");
                    //         } else {
                    //           this.$message({
                    //             message: respUser.message,
                    //             type: "warning"
                    //           });
                    //         }
                    //       });
                    //     } else {
                    //       this.$message({
                    //         message: resp.message,
                    //         type: "warning"
                    //       });
                    //     }
                    //   });
                    const pro = this.$store.dispatch("Login", this.form);
                    pro.then(res => {
                        // res就是响应回来的resp
                        if (res.flag) {
                            this.$router.push("/").catch(err => {
                                console.log(err);
                            });
                        } else {
                            this.$message({
                                message: res.message,
                                type: "warning"
                            });
                        }
                    }).catch(error => {});
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        }
    }
};
</script>
<style lang="stylus" scoped>
.login-form {
    width: 350px;
    margin: 160px auto;
    background-color: rgba(255, 255, 255, 0.8);
    padding: 28px;
    border-radius: 20px;
}

.login-container {
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: url('../../assets/images/ionia-the-placidium-of-navori.jpg');
}

.login-title {
    color: #303133;
    text-align: center;
    letter-spacing: 5px;
}
</style>
