import antv from './antv'
import fullcalender from './full-calender'
import vcharts from './vcharts'
import googleMap from './google-map'
export default {
  install() {
    antv.install()
    fullcalender.install()
    vcharts.install()
    googleMap.install()
  }
}
