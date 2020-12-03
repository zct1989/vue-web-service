// vue.config.js
const aliasExtned = require('./extends/alias.extend')
const routeExtend = require('./extends/route.extend')
const svgExtend = require('./extends/svg.extend')
const i18nExtend = require('./extends/i18n.extend')
const markdownExtend = require('./extends/markdown.extend')
const proxyConfig = require('./proxy.config')
const CompressionPlugin = require('compression-webpack-plugin')

module.exports = {
    // 资源根路径
    publicPath: '/',
    // 静态资源路径
    assetsDir: process.env.NODE_ENV === 'production' ? 'static' : '',
    // 生产环境下sourcemap
    productionSourceMap: false,
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
    configureWebpack(config) {
        const baseConfig = {
            module: {
                unknownContextCritical: false
            }
        }

        // 开发模式配置
        const developmentConfig = {}

        // 生产模式配置
        const productionConfig = {
            optimization: {
                minimize: true,
                splitChunks: {
                    minSize: 2000,
                    maxSize: 500000
                }
            },
            plugins: [
                new CompressionPlugin({
                    filename: '[path].gz',
                    algorithm: 'gzip',
                    test: /\.js$|\.css$|\.svg$/,
                    threshold: 10240,
                    minRatio: 0.8,
                    compressionOptions: {
                        level: 9
                    },
                    deleteOriginalAssets: false
                })
            ]
        }

        return process.env.NODE_ENV === 'production'
            ? Object.assign(baseConfig, productionConfig)
            : Object.assign(baseConfig, developmentConfig)
    },
    devServer: {
        host: '0.0.0.0',
        proxy: proxyConfig
    }
}
