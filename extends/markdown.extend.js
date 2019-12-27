const path = require('path')

module.exports = function(config) {
  config.module
    .rule('markdown')
    .test(/\.md/)
    .use('html-loader')
    .loader('html-loader')
    .end()
    .use('markdown-loader')
    .loader('markdown-loader')
}
