const Mock = require("mockjs");
Mock.mock("/user/login", "post", {
  code: 2000,
  flag: true,
  message: "验证成功",
  data: {
    token: "admin"
  }
});
Mock.mock(/\/user\/info/, "get", {
  code: 2000,
  flag: true,
  message: "成功获取用户信息",
  data: {
    "id|1-10000": 1,
    name: "@cname",
    roles: ["manager"]
  }
});
Mock.mock("/user/logout", "post", {
  code: 2000,
  flag: true,
  message: "退出成功"
});
