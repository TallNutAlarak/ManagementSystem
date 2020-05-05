// @代表src目录
import request from '@/utils/request'

// request.post('/mocktest').then(res =>{
//     console.log('request test:',res.data)
// })

 const BASE_URL = process.env.VUE_APP_BASE_API

 console.log(BASE_URL)
// 以对象配置的方式进行制定请求方式

export default{
    getList(){
        return request({
            method: 'post',
            url:BASE_URL+'/mocktest',
        })
    }
}
