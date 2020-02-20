import { ApplicationRouter } from '@/core/application_router'
import MobileDetect from 'mobile-detect'

// 认证白名单
const authWhiteList = ['login', 'login-mobile']

// 认证状态检测
const authCheck = store => {
    return !!store.state.userModule.username
}

/**
 * 安装认证守卫
 */
function installAuthGuard() {
    ApplicationRouter.registerGuard(({ store, router }, { to, from, next }) => {
        // 认证白名单
        if (authWhiteList.includes(to.name)) {
            return true
        }

        // 认证检测
        if (!authCheck(store)) {
            const detect = new MobileDetect(navigator.userAgent)
            const isMobile = !!detect.mobile()
            return {
                name: isMobile ? 'login-mobile' : 'login'
            }
        }
    })
}

export default function() {
    // 安装认证守卫
    installAuthGuard()
}
