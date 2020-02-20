import Vue from 'vue'
import * as dictData from '~/config/dict.config'

export default {
    install() {
        Vue.prototype.$dict = dictData
    }
}
