import menu from '~/assets/json/menu.json'
import menuMobile from '~/assets/json/mobile-menu.json'
import MobileDetect from 'mobile-detect'

export const launch = async ({ store, router }) => {
    const detect = new MobileDetect(navigator.userAgent)
    const isMobile = !!detect.mobile()

    store.commit('updateUserMenuResource', isMobile ? menuMobile : menu)
}
