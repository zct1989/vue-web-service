import menu from '~/assets/json/menu.json'
import menuMobile from '~/assets/json/mobile-menu.json'
import MobileDetect from 'mobile-detect'
import { CurrencyService } from '@/services/currency.service'
import { RequestParams } from '@/core/http'

const currencyService = new CurrencyService()
export const launch = async ({ store, router }) => {
    const detect = new MobileDetect(navigator.userAgent)
    const isMobile = !!detect.mobile()

    store.commit('updateUserMenuResource', isMobile ? menuMobile : menu)

    await updateDict(store)
}

/**
 * 更新字典
 * @param store
 */
function updateDict(store) {
    return Promise.all([getCurrency(store)])
}

/**
 * 更新支持币种
 */
function getCurrency(store) {
    return currencyService
        .getCurrency(new RequestParams())
        .toPromise()
        .then(data => {
            store.commit('updateDict', {
                currency: data.map(x => ({
                    label: x.name,
                    value: x.code
                }))
            })
        })
}
