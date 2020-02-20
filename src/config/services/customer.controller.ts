import { RequestMethod } from '../../core/http'
import { ControllerConfig } from '~/config/type.config'

// 控制器名称
const controller = 'customer'

/**
 * API接口配置
 * 客户服务配置
 */
export const CustomerController: ControllerConfig = {
  // 客户查询
  query: {
    controller,
    action: 'query_all',
    type: RequestMethod.Post
  }
}
