import Vue from 'vue'
import { Modal, } from 'ant-design-vue';
import { destroyFns } from 'ant-design-vue/lib/modal';

export class ModalService {
  /**
   * 创建Modal容器
   */
  private createModalContainer() {
    const container = document.createElement('div');
    const el = document.createElement('div');
    container.appendChild(el);
    document.body.appendChild(container);
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

    const modalInstance = new Vue({
      el,
      render(h) {
        return h(Modal, {
          props: {
            centered: true,
            header: false,
            ...options,
            visible: true,
            footer: false,
          },
          on: {
            cancel: () => {
              if (modalInstance && container.parentNode) {
                modalInstance.$destroy();
                container.parentNode.removeChild(container);
              }
            }
          }
        }, [h(Component, {
          props: data
        })])
      },
    })
  }

  /**
   * 弹出组件页面
   * @param options
   */
  public open(Component, data, options) {
    const instance = this.renderModelComponent(Component, data, options)
    return instance
  }
}
