import { OrderController } from '~/config/services/order.controller'
import { Request, RequestParams } from '~/core/http'
import { Observable } from 'rxjs'

/**
 * 订单API服务
 */
export class OrderService {
  /**
   * 查询订单列表
   * @param requestParams
   */
  @Request({
    server: OrderController.getOrderList
  })
  public getOrderList(requestParams: RequestParams): Observable<any> {
    return requestParams.request()
  }
}
