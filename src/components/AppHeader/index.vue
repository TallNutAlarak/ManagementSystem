<template>
  <div>
    <div class="header">
      <router-link to="/">
        <img class="logo" src="@/assets/logo.png" />
        <span class="company">管理系统</span>
      </router-link>
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          下拉菜单
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-edit" command="a"
            >修改密码</el-dropdown-item
          >
          <el-dropdown-item icon="el-icon-s-fold" command="b"
            >退出系统</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { logout } from "@/api/login";
export default {
  methods: {
    handleCommand(command) {
      switch (command) {
        case "a":
          break;
        case "b":
          var token = localStorage.getItem("ms-token");
          logout(token).then(res => {
            var resp = res.data;
            if (resp.flag) {
              // 退出成功
              localStorage.removeItem("ms-user");
              localStorage.removeItem("ms-token");
              this.$router.push("/login");
            } else {
              this.$message({
                type: "warning",
                message: "resp.message",
                duration: 500
              });
            }
          });
          break;

        default:
          break;
      }
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
