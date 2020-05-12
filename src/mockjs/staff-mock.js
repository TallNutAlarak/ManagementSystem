const Mock = require("mockjs");


Mock.mock(/\/staff\/list\/search/, "post", {
  code: 2000,
  flag: true,
  message: "查询成功",
  data: {
    total: "@integer(100,200)",
    "rows|10": [
      {
        "id|+1": 10,
        "userName|5":"@word(1)",
        "name":"@cname",
        "age":"@integer(0,120)",
        "mobile|11":"@integer(0,9)",
        "salary":"@float(2000,20000,1,2)",
        "entryDate":"@date"
      }
    ]
  }
});
Mock.mock("/staff", "post", {
  code: 2000,
  flag: true,
  message: "新增成功"
});
Mock.mock(/\/staff/, "get", {
  code: 2000,
  flag: true,
  message: "查询成功",
  data: {
    "id": 10,
    "userName|5":"@word(1)",
    "name":"@cname",
    "age":"@integer(0,120)",
    "mobile|11":"@integer(0,9)",
    "salary":"@float(2000,20000,1,2)",
    "entryDate":"@date"
  }
});
Mock.mock(/\/staff/, "put", {
  code: 2000,
  flag: true,
  message: "修改成功"
});
Mock.mock(/\/staff/, "delete", {
  code: 2000,
  flag: true,
  message: "删除成功"
});
