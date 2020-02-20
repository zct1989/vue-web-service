import Mock from 'mockjs'
import { IRequestServerConfig, RequestOption, RequestParams } from '~/core/http'
import appConfig from '@/config/app.config'

/**
 * Mock服务注册
 * @param param
 */
export function MockService({
    service,
    key,
    disable = false
}: {
    service: IRequestServerConfig
    key?: string
    disable?: boolean
}) {
    return (target, name, descriptor) => {
        // 禁用状态下直接跳过
        if (disable) {
            return () => {}
        }

        if (!target['services']) {
            target['services'] = []
        }
        const services = target['services'] as any[]

        let getMockData = descriptor.value
        // 配置模拟请求地址
        const requestOption = new RequestOption(service, new RequestParams())
        const baseUrl = appConfig.server
        const requestUrl = requestOption.getRequestUrl()

        descriptor.value = () => {
            if (key) {
                const generate = Mock.mock(getMockData())
                getMockData = () => generate[key]
            }

            Mock.mock(
                RegExp(`${baseUrl}/${requestUrl}.*`),
                service.type.toLowerCase(),
                getMockData()
            )
        }

        services.push(descriptor.value)

        return descriptor
    }
}
