import Application from '@/core/application'
/**
 * 字典转换
 * @param value
 * @param code 字典名称
 */
export default function(key): string {
    try {
        return Application.i18n.t(key).toString()
    } catch (ex) {
        return ''
    }
}
