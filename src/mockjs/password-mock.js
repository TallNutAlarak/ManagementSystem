const Mock = require("mockjs");

Mock.mock("/user/pwd", "post", {
    code: 2000,
    flag: true,
    message: "密码正确"
  });
Mock.mock("/user/pwd", "put", {
    code: 2000,
    flag: true,
    message: "密码更新成功"
  });
  