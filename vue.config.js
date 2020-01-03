// vue.config.js
const aliasExtned = require('./extends/alias.extend')
const routeExtend = require('./extends/route.extend')
const svgExtend = require('./extends/svg.extend')
const i18nExtend = require('./extends/i18n.extend')
const markdownExtend = require('./extends/markdown.extend')

module.exports = {
  // 资源根路径
  publicPath: process.env.NODE_ENV === 'production' ? '/vue-web-service/' : '/',
  // 修改webpack配置
  chainWebpack: config => {
    // 别名扩展
    aliasExtned(config)
    // 路由扩展
    routeExtend(config)
    // svg扩展
    svgExtend(config)
    // i18n扩展
    i18nExtend(config)
    // Markdown扩展
    markdownExtend(config)
  },
  configureWebpack: {
    module: {
      unknownContextCritical: false
    },
    optimization: {
      minimize: false,
      splitChunks: {
        minSize: 20000,
        maxSize: 500000
      }
    }
  }
}
