import httpBoot from './http.boot'
import guardBoot from './guard.boot'
import mockBoot from './mock.boot'
import appConfig from '~/config/app.config'
export * from './launch'

export const boot = () => {
    // 初始化网络配置
    httpBoot()
    // 初始化守卫
    guardBoot()
    // 初始化Mock服务
    if (appConfig.mock) {
        mockBoot()
    }
}
