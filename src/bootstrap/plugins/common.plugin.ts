import Vue from 'vue'
import { CommonService } from '~/shared/utils/common.service'

export default {
    install() {
        Vue.prototype.$common = CommonService
    }
}
