import { RequestMethod } from '../../core/http'
import { ControllerConfig } from '~/config/type.config'

// 控制器名称
const controller = 'inventory'

/**
 * API接口配置
 * 库存服务配置
 */
export const InventoryController: ControllerConfig = {
    // 获取库存信息
    inventory: {
        controller,
        type: RequestMethod.Post
    }
}
