import antv from './antv'
import fullcalender from './full-calender'
import vcharts from './vcharts'
import googleMap from './google-map'
import quillEditor from './quill-editor'
import clipboard from './clipboard'

export default {
    install() {
        antv.install()
        fullcalender.install()
        vcharts.install()
        googleMap.install()
        quillEditor.install()
        clipboard.install()
    }
}
