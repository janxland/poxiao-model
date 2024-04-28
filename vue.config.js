const { defineConfig } = require('@vue/cli-service')
const AutoImport = require('unplugin-auto-import/webpack');
const Components = require('unplugin-vue-components/webpack');
const { TDesignResolver } = require('unplugin-vue-components/resolvers');
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://47.95.6.197:18080/api/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  //解决vue编译时环境未设置的警告
  chainWebpack: (config) => {
    config.plugin('define').tap((definitions) => {
      Object.assign(definitions[0], {
        __VUE_OPTIONS_API__: 'true',
        __VUE_PROD_DEVTOOLS__: 'false',
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false'
      })
      return definitions
    })
  },
  // 按需自动导入组件
  configureWebpack:{
    plugins: [
      AutoImport.default({
        resolvers: [TDesignResolver({
          library: 'vue-next'
        })],
      }),
      Components.default({
        resolvers: [TDesignResolver({
          library: 'vue-next'
        })],
      }),
    ],
  }
  
})