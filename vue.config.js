const { defineConfig } = require('@vue/cli-service')
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');

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
        target: 'http://192.168.8.138:8868/api',
        changeOrigin: true,
        // ws:true,
        pathRewrite: {
          '^/api': ''// 重写路径，去掉'/api'前缀
        }
      },
      '/customers': {
        logLevel: 'info',
        target: 'https://1b0hudcpe6.execute-api.ap-east-1.amazonaws.com/customers',
        changeOrigin: true,
        // ws:true,
        pathRewrite: {
          '^/customers': ''// 重写路径，去掉'/api'前缀
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
  },
  // webpack 配置
  configureWebpack: {
    // 添加插件
    plugins: [
      new TerserPlugin({
        terserOptions: {
          mangle: true, // 开启变量名混淆
          compress: {
            drop_console: true, // 移除 console.log
            drop_debugger: true // 移除 debugger
          }
        }
      }),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV)
        }
      })
    ]
  }
})
