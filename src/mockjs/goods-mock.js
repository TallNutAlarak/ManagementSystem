const Mock = require("mockjs");
Mock.mock(/\/goods\/list\/search/, "post", {
  code: 2000,
  flag: true,
  message: "查询成功",
  "data": {
    total: "@integer(100,200)",
    "rows|10": [
      {
        "id|+1": 10,
        "name|5": "@cword",
        "code":"@word",
        "spec":"@integer(0,9)",
        "retailPrice":"@float(0,100,1,3)",
        "purchasePrice":"@float(0,100,1,3)",
        "storageNum":"@integer(0,500)",
        "supplierName": "@ctitle"
      }
    ]
  }
});

Mock.mock("/goods", "post", {
  code: 2000,
  flag: true,
  message: "新增成功"
});
Mock.mock(/\/goods/, "get", {
  code: 2000,
  flag: true,
  message: "查询成功",
  data: {
    id: 10,
    "name|5": "@cword",
    "code":"@word",
    "spec":"@integer(0,9)",
    "retailPrice":"@float(0,100,1,3)",
    "purchasePrice":"@float(0,100,1,3)",
    "storageNum":"@integer(0,500)",
    "supplierName": "@ctitle"
  }
});
Mock.mock(/\/goods/, "put", {
  code: 2000,
  flag: true,
  message: "修改成功"
});
Mock.mock(/\/goods/, "delete", {
  code: 2000,
  flag: true,
  message: "删除成功"
});
