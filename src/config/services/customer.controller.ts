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
    },
    // 批量分配仓库
    batchSetWms: {
        controller,
        action: 'batch_set_wms',
        type: RequestMethod.Post
    },
    // 保存客户
    save: {
        controller,
        action: 'save',
        type: RequestMethod.Post
    }
}
