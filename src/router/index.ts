import Router from 'vue-router'
import MobileDetect from 'mobile-detect'

// 首页入口
const home = {
    mobile: '/mobile/dashboard',
    pc: '/dashboard/workspace'
}

export default new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            redirect: () => {
                const detect = new MobileDetect(navigator.userAgent)
                const device = detect.mobile() ? 'mobile' : 'pc'
                return home[device]
            }
        },
        {
            path: '*',
            redirect: '/exception/404'
        }
    ]
})
