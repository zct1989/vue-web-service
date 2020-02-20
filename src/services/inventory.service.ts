import { OrderController } from '~/config/services/order.controller'
import { Request, RequestParams } from '~/core/http'
import { Observable } from 'rxjs'
import { InventoryController } from '@/config/services/inventory.controller'

/**
 * 库存API服务
 */
export class InventoryService {
    /**
     * 查询商品库存
     * @param requestParams
     */
    @Request({
        server: InventoryController.inventory
    })
    public getInventory(requestParams: RequestParams): Observable<any> {
        return requestParams.request()
    }
}
