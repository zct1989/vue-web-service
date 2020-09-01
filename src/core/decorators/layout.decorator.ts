import { ILayoutOption } from '../interfaces'

/**
 * 设置布局
 * @param target
 */
export function Layout(option: ILayoutOption) {
    return function(target) {
        Object.defineProperty(target, '$name', {
            writable: false,
            value: option.name
        })

        return target
    }
}
