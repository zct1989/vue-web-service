import { Request, RequestParams } from '~/core/http'
import { Observable } from 'rxjs'
import { CustomerController } from '@/config/services/customer.controller'

/**
 * 客户API服务
 */
export class CustomerService {
    /**
     * 客户查询
     * @param requestParams
     */
    @Request({
        server: CustomerController.query
    })
    public getCustomerList(requestParams: RequestParams): Observable<any> {
        return requestParams.request()
    }
}
