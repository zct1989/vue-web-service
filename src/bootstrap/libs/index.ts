import antv from './antv'
import i18n from './i18n'
import fullcalender from './full-calender'

export default {
  install() {
    antv.install()
    i18n.install()
    fullcalender.install()
  }
}
