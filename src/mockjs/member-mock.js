const Mock = require("mockjs");

Mock.mock("/member/list", "get", {
  code: 2000,
  flag: true,
  message: "查询成功",
  "data|20": [
    {
      "id|+1": 10,
      cardNum: "@integer(10000)",
      name: "@cname",
      birthday: "@date",
      "phone|11": "@integer(0,9)",
      integral: "@integer(0,500)",
      money: "@float(0,1000,1,3)",
      "payType|1": ["1", "2", "3", "4"],
      address: "@county(true)"
    }
  ]
});
Mock.mock(/\/member\/list\/search/, "post", {
  code: 2000,
  flag: true,
  message: "查询成功",
  data: {
    total: "@integer(100,200)",
    "rows|10": [
      {
        "id|+1": 10,
        cardNum: "@integer(10000)",
        name: "@cname",
        birthday: "@date",
        "phone|11": "@integer(0,9)",
        integral: "@integer(0,500)",
        money: "@float(0,1000,1,3)",
        "payType|1": ["1", "2", "3", "4"],
        address: "@county(true)"
      }
    ]
  }
});
Mock.mock("/member", "post", {
  code: 2000,
  flag: true,
  message: "新增成功"
});
Mock.mock(/\/member/, "get", {
  code: 2000,
  flag: true,
  message: "查询成功",
  data: {
    id: 10,
    cardNum: "test01",
    name: "测试会员",
    birthday: "@date",
    "phone|11": "@integer(0,9)",
    integral: "@integer(0,500)",
    money: "@float(0,1000,1,3)",
    "payType|1": ["1", "2", "3", "4"],
    address: "@county(true)"
  }
});
Mock.mock(/\/member/, "put", {
  code: 2000,
  flag: true,
  message: "修改成功"
});
Mock.mock(/\/member/, "delete", {
  code: 2000,
  flag: true,
  message: "删除成功"
});
