const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  //关闭ESLINT检查
  lintOnSave:false,
   //开发环境代理配置
   devServer: {
    // port: 8080,
    proxy: {
      '/api': {
        logLevel: 'info',
        target: 'http://192.168.8.138:8868/',
        changeOrigin: true,
        // ws:true,
        pathRewrite: {
          '^/api': ''// 重写路径，去掉'/api'前缀
        }
      }
    },
  },
  chainWebpack: (config) => {
    config.plugin('define').tap((definitions) => {
      Object.assign(definitions[0], {
        __VUE_OPTIONS_API__: 'true',
        __VUE_PROD_DEVTOOLS__: 'false',
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false'
      });
      return definitions;
    });
  }
})
