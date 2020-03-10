import { ExtendService, RequestParams } from '~/core/http'
import store from '~/store'
import { WmsController } from '@/config/services/wms.controller'

const whitelist = [WmsController.login]
export class TokenService extends ExtendService {
    public before = params => {
        const { userModule } = store.state as any

        if (!userModule.token) {
            return
        }

        params.options.header = params.options.header || {}
        params.options.header['csrf_token'] = userModule.token

        params.options.query = Object.assign(params.options.query || {}, {
            csrf_token: userModule.token
        })
    }
}
