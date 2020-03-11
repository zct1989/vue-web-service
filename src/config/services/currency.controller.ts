import { RequestMethod } from '../../core/http'
import { ControllerConfig } from '~/config/type.config'

// 控制器名称
const controller = 'currency'

/**
 * API接口配置
 */
export const CurrencyController: ControllerConfig = {
    // 获取支持币种
    getCurrency: {
        controller,
        action: 'all',
        type: RequestMethod.Post
    }
}
