import appConfig from '~/config/app.config'
import store from '~/store'
import UUID from 'uuidjs'

/**
 * 公共函数
 */
export class CommonService {
    public static createQueryCondition(values, operations) {
        const defaultOperation = '='
        const conditions: any[] = []
        const data = values ? Object.entries(values) : []

        if (data.length) {
            data.filter(
                ([key, value]) =>
                    value !== null && value !== undefined && value !== ''
            ).forEach(([key, value]) => {
                const operate =
                    key in operations ? operations[key] : defaultOperation
                conditions.push({
                    query_name: key,
                    operate,
                    value
                })
            })

            return {
                query_condition: conditions
            }
        }
    }
}
