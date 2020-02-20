import { RequestMethod } from '../../core/http'
import { ControllerConfig } from '~/config/type.config'

// 订单控制器名称
const controller = 'order'

/**
 * API接口配置
 * 订单服务配置
 */
export const OrderController: ControllerConfig = {
    // 获取订单列表
    getOrderList: {
        controller,
        action: 'list',
        type: RequestMethod.Get
    },
    // 获取订单详情
    getOrderDetail: {
        controller,
        action: 'detail',
        type: RequestMethod.Get
    }
}
