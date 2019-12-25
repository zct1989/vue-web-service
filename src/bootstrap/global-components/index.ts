import SvgIcon from '~/components/common/svg-icon.vue'
import LabelItem from '~/components/common/label-item.vue'
import CommonTitle from '~/components/common/common-title.vue'
import LabelContainer from '~/components/common/label-container.vue'
import DataBox from '~/components/common/data-box.vue'
import PageContainer from '~/shared/components/page-container.vue'
import DataForm from '~/shared/components/data-form.vue'
import DataTable from '~/shared/components/data-table.vue'
/**
 * 注册全局自定义组件
 */
export const registerComponent = Vue => {
  // Vue.component('svg-icon', SvgIcon)
  // Vue.component('label-item', LabelItem)
  // Vue.component('label-container', LabelContainer)
  // Vue.component('data-box', DataBox)
  Vue.component('page-container', PageContainer)
  Vue.component('data-form', DataForm)
  Vue.component('data-table', DataTable)
}
