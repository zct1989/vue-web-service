module.exports = {
    '/api': {
        target: 'http://47.244.150.247:28069',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
            '^/api': ''
        }
    }
}
