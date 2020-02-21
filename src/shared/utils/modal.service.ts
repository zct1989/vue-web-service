import Vue from 'vue'
import { Modal } from 'ant-design-vue'
import { Observable } from 'rxjs'
import Application from '@/core/application'

export class ModalService {
    /**
     * 创建Modal容器
     */
    private createModalContainer() {
        const container = document.createElement('div')
        const el = document.createElement('div')
        container.appendChild(el)
        document.body.appendChild(container)
        return {
            container,
            el
        }
    }

    /**
     * 创建Modal组件
     * @param options
     */
    private renderModelComponent(Component, data, options) {
        const { container, el } = this.createModalContainer()
        let modalInstance
        const modalClose = () => {
            if (modalInstance && container.parentNode) {
                modalInstance.$destroy()
                container.parentNode.removeChild(container)
            }
        }

        return new Observable<any>(subject => {
            modalInstance = new Vue({
                el,
                i18n: Application.i18n,
                render(h) {
                    return h(
                        Modal,
                        {
                            props: {
                                centered: true,
                                header: false,
                                ...options,
                                visible: true,
                                footer: false
                            },
                            on: {
                                cancel: () => {
                                    subject.complete()
                                    modalClose()
                                }
                            }
                        },
                        [
                            h(Component, {
                                props: data,
                                on: {
                                    'modal.submit': data => {
                                        subject.next(data)
                                        subject.complete()
                                        modalClose()
                                    },
                                    'modal.cancel': () => {
                                        subject.complete()
                                        modalClose()
                                    }
                                }
                            })
                        ]
                    )
                }
            })
        })
    }

    /**
     * 弹出组件页面
     * @param options
     */
    public open(Component, data?, options?) {
        return this.renderModelComponent(Component, data, options)
    }
}
