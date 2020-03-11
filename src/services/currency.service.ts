import { Request, RequestParams } from '~/core/http'
import { Observable } from 'rxjs'
import { CurrencyController } from '@/config/services/currency.controller'

/**
 * 币种API服务
 */
export class CurrencyService {
    /**
     * 获取支持币种
     * @param requestParams
     */
    @Request({
        server: CurrencyController.getCurrency
    })
    public getCurrency(requestParams: RequestParams): Observable<any> {
        return requestParams.request()
    }
}
