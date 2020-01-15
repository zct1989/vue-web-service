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
  private renderModelComponent(options) {
    const { container, el } = this.createModalContainer()

    const modalInstance = new Vue({
      el,
      render(h) {
        return h(Modal, {
          props: {
            ...options,
            visible: true,
            footer: false
          },
          on: {
            cancel: () => {
              if (modalInstance && container.parentNode) {
                modalInstance.$destroy();
                container.parentNode.removeChild(container);
              }
            }
          }
        }, [h(options.component, {
          props: options.data
        })])
      },
    });
  }

  /**
   * 弹出组件页面
   * @param options
   */
  public open(options) {
    const instance = this.renderModelComponent(options)
    return instance
  }
}
