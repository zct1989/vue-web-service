import * as dictData from '@/config/dict.config'
import store from '~/store'

/**
 * 字典转换
 * @param value
 * @param code 字典名称
 */
export default function(value, code): string {
    try {
        const dictSource = Object.assign({}, dictData, store.state.dictData)
        const target = dictSource[code] as any[]
        const { label } = target.find(x => x.value === value)
        return label
    } catch (ex) {
        return ''
    }
}
