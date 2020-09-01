import Router from 'vue-router'
import MobileDetect from 'mobile-detect'

import OrderDetail from '@/pages/orders/order-detail.vue'
// 首页入口
const home = {
    mobile: '/mobile/dashboard',
    pc: '/dashboard/workspace'
}

export default new Router({
    mode: 'history',
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
            name: 'order-detail',
            path: '/orders/order-detail/:id',
            component: OrderDetail,
            props: true
        },
        {
            path: '*',
            redirect: '/exception/404'
        }
    ]
})
