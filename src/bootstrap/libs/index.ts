import antv from './antv'
import fullcalender from './full-calender'
import vcharts from './vcharts'
export default {
  install() {
    antv.install()
    fullcalender.install()
    vcharts.install()
  }
}
