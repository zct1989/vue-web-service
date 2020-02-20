import Vue from 'vue'
import { LoggerService } from '~/shared/utils/logger.service'

export default {
    install() {
        Vue.prototype.$logger = new LoggerService('console')
    }
}
