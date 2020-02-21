import { RequestMethod } from '../../core/http'
import { ControllerConfig } from '~/config/type.config'

// 控制器名称
const controller = 'warehouse'

/**
 * API接口配置
 * 客户服务配置
 */
export const WareHouseController: ControllerConfig = {
    // 查询仓库
    available: {
        controller,
        action: 'available_all',
        type: RequestMethod.Post
    }
}
