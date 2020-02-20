import Vue from 'vue'
import filters from '~/shared/filters'

export default {
    install() {
        Vue.prototype.$filter = filters
    }
}
