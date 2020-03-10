import { RequestService } from '~/core/http'
import appConfig from '~/config/app.config'
import store from '~/store'
import { TokenService } from '../services/token.service'
// import { TokenService } from '~/extension/services/token.service'

export default function() {
    // 配置服务端信息
    RequestService.setConfig({
        server: appConfig.server,
        timeout: appConfig.timeout
    })

    // 添加状态拦截器
    RequestService.interceptors.status.use(respone => {
        const result = respone.data.result
        return result.code === 0
    })

    // 添加成功拦截器
    RequestService.interceptors.success.use(respone => {
        const result = respone.data.result

        if (result.length !== undefined && result.length !== undefined) {
            return result.results
        } else {
            return result
        }
    })

    // 添加失败拦截器
    RequestService.interceptors.error.use(respone => {
        // Notification.error({
        //   title: respone.data.msg,
        //   message: respone.data.error
        // })
        return respone
    })

    // 网络异常处理
    RequestService.requestCatchHandle = respone => {
        const defaultError = '服务通讯连接失败'
        const message = {
            400: '请求参数错误',
            405: '请求服务方法错误',
            500: '服务器内部错误',
            403: '没有权限，请重新登陆'
        }

        if (respone) {
            const errMsg = (respone.data || {}).message
            // Notification.error(errMsg || message[respone.status] || defaultError)
            if (respone.status === 403) {
                setTimeout(() => {
                    store.dispatch('clearUserLoginData').catch()
                }, 2000)
            }
        } else {
            // Notification.error(defaultError)
        }
    }

    // 安装全局服务扩展
    RequestService.installExtendService(new TokenService())
}
