module.exports = {
    // outputDir: 'render',
    // assetsDir: 'static',
    devServer:{
        open:true,
        host:'127.0.0.1',
        port:8888,
        open:true,

        // 开发环境代理配置(解决跨域)
        // proxy:{
        //     // 当访问process.env.VUE_APP_BASE_API前缀的地址时进行代理
        //     [process.env.VUE_APP_BASE_API] : {
        //         target : process.env.VUE_APP_SERVICE_URL,
        //         // 开启代理服务器
        //         changeOrigin : true,
        //         pathRewrite : {
        //             // 将请求地址前缀变为空
        //             ['^' + process.env.VUE_APP_BASE_API] : '',
        //         }
        //     }
        // },
    },
    // 关闭格式检查
    // lintOnSave:false,
    // 打包时不会生成.map文件 加快打包速度
    productionSourceMap:false,
}
