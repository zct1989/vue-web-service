import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import appConfig from '@/config/app.config'

export default {
    install() {
        Vue.use(VueGoogleMaps, {
            load: {
                key: appConfig.googleMapApiKey,
                libraries: 'places'
            }
        })
    }
}
