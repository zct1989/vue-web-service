module.exports = {
  '/api': {
    target: 'http://47.244.150.247:2169/woltu_b2c/',
    ws: true,
    changeOrigin: true,
    pathRewrite: {
      '^/api': ''
    }
  }
}