export default {
    server: process.env.VUE_APP_SERVER, // 后端服务地址
    debug: process.env.NODE_ENV === 'development',
    timeout: process.env.VUE_APP_TIMEOUT,
    mock: process.env.VUE_APP_MOCK,
    googleMapApiKey: process.env.VUE_APP_GOOGLEMAP_APIKEY
}
