import { Request, RequestParams } from '~/core/http'
import { Observable } from 'rxjs'
import { WmsController } from '@/config/services/wms.controller'

/**
 * 仓库API服务
 */
export class WmsService {
    /**
     * 可用仓库查询
     * @param requestParams
     */
    @Request({
        server: WmsController.login
    })
    public login(requestParams: RequestParams): Observable<any> {
        return requestParams.request()
    }
}
