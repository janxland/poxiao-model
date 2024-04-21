const { defineConfig } = require('@vue/cli-service')
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
  }
})

// 导入组件
// const AutoImport = require('unplugin-auto-import/webpack');
// const Components = require('unplugin-vue-components/webpack');
// const { TDesignResolver } = require('unplugin-vue-components/resolvers');
// module.exports = {
//   plugins: [
//     AutoImport.default({
//       resolvers: [TDesignResolver({
//         library: 'vue-next'
//       })],
//     }),
//     Components.default({
//       resolvers: [TDesignResolver({
//         library: 'vue-next'
//       })],
//     }),
//   ],
// };
