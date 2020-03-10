import { RequestMethod } from '../../core/http'
import { ControllerConfig } from '~/config/type.config'

// 订单控制器名称
const controller = 'wms'

/**
 * API接口配置
 * 订单服务配置
 */
export const WmsController: ControllerConfig = {
    // 登录
    login: {
        controller,
        action: 'user_login',
        type: RequestMethod.Post
    }
}
