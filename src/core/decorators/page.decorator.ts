import { IPageOption } from '../interfaces/page-option.interface'

/**
 * 设置布局
 * @param target
 */
export function Page(option: IPageOption) {
    return function(target) {
        target.$layout = option.layout || 'default'
        target.$name = option.name
        target['options'].name = option.name
        return target
    }
}
