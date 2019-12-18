import Vue from 'vue'
import { FilterService } from '~/shared/utils/filter.service'

export default {
  install() {
    Vue.prototype.$filter = FilterService
  }
}
