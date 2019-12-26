import httpBoot from './http.boot'
import mockBoot from './mock.boot'
import appConfig from '~/config/app.config'
export * from './launch'

export const boot = () => {
  // 初始化网络配置
  httpBoot()
  // 初始化Mock服务
  console.log(appConfig)
  if (appConfig.mock) {
    mockBoot()
  }
}
