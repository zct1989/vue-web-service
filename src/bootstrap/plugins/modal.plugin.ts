import Vue from 'vue'
import { ModalService } from '../../shared/utils/modal.service'

export default {
    install() {
        Vue.prototype.$modal = new ModalService()
    }
}
