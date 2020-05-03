const Mock = require('mockjs')

const data = Mock.mock({
    // 定义数据生成规则
    'memberList|4': [
        {
            'id' : 1,
            'name' : '小明',
        }
    ]
})
console.log(JSON.stringify(data,null,2))