const Mock = require("mockjs");

Mock.mock("/supplier/list", "get", {
  code: 2000,
  flag: true,
  message: "查询成功",
  "data|30": [
    {
      "id|+1": 10,
      name: "@ctitle",
      linkman: "@cname",
      "mobile|11": "@integer(0,9)",
      remark: "@csentence(5,15)"
    }
  ]
});
Mock.mock(/\/supplier\/list\/search/, "post", {
  code: 2000,
  flag: true,
  message: "查询成功",
  "data|10": {
    total: "@integer(100,200)",
    "rows|10": [
      {
        "id|+1": 10,
        name: "@ctitle",
        linkman: "@cname",
        "mobile|11": "@integer(0,9)",
        remark: "@csentence(5,15)"
      }
    ]
  }
});
Mock.mock("/supplier", "post", {
  code: 2000,
  flag: true,
  message: "新增成功",
});
Mock.mock(/\/supplier/, "get", {
  code: 2000,
  flag: true,
  message: "查询成功",
  data: {
    "id": 10,
    name: "@ctitle",
    linkman: "@cname",
    "mobile|11": "@integer(0,9)",
    remark: "@csentence(5,15)"
  }
});
Mock.mock(/\/supplier/, "put", {
  code: 2000,
  flag: true,
  message: "修改成功",
});
Mock.mock(/\/supplier/, "delete", {
  code: 2000,
  flag: true,
  message: "删除成功",
});