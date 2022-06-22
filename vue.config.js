const { defineConfig } = require('@vue/cli-service')
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin')

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,

  configureWebpack: {
    plugins: [
      new SpriteLoaderPlugin()
    ]
  },

  chainWebpack: config => {
    config.module
      .rule('svg-sprite')
      .use('svgo-loader')
      .loader('svgo-loader')
  }
})
