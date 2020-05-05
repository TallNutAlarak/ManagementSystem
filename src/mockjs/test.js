const Mock = require('mockjs')
const data = Mock.mock(process.env.VUE_APP_BASE_API + '/mocktest','post',{
    // 定义数据生成规则
    // 属性名|生成规则
    // :
    // @占位符
    // 随机生成4-6条
    'memberList|4-6': [
        {
            // 自增长1
            'id|+1' : 1,
            // 随机生成1-3个重叠的小明
            'name' : '@cname',
            'phone|11' : 8,//88888888
            // 在1-120之间随机生成
            'age|1-120' : 1,
            // 整数部分6000-8000之间,小数部分1-3位
            'salary|6000-8000.1-3' : 1,
            // 随机生成ture/false，都是1/2概率
            'status|1':true,
            // 生成的概率，true 4/(2+4),false 2/(2+4)
            'open|2-4' : false,
            // 随机挑选2个属性进行返回
            'order|2' : {id:1,name:'订单1',price:999},
            // 随机挑选2-3个属性返回
            'order2|2-3' : {id:1,name:'订单1',price:999},
            'idCard' : /\d{15}|\d{18}/,
            'ctitle' : '@ctitle',
            'content' : '@csentence(100,500)',
            'first' : '@cfirst',
            'last' : '@clast',
            'url' : '@url("http","baidu.com)',
            "dimain" : '@domain',
            'ip' : '@ip',
            // 地区
            "area" : "@region",
            // 县  加上(ture)后显示省市
            "address" : "@county",
            // 邮政编码
            "zipCode" : "@zip"
        }
    ]
})
console.log(JSON.stringify(data,null,2))