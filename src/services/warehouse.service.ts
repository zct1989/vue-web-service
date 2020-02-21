import { Request, RequestParams } from '~/core/http'
import { Observable } from 'rxjs'
import { CustomerController } from '@/config/services/customer.controller'
import { WareHouseController } from '@/config/services/warehouse.controller'

/**
 * 仓库API服务
 */
export class WareHouseService {
    /**
     * 可用仓库查询
     * @param requestParams
     */
    @Request({
        server: WareHouseController.available
    })
    public getAvailable(requestParams: RequestParams): Observable<any> {
        return requestParams.request()
    }
}
