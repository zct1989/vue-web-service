// andt语言包
import antd_zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN'
import antd_en_US from 'ant-design-vue/lib/locale-provider/en_US'
// 本地语言包
import zh_CN from './zh-cn.json'
import en_US from './en-us.json'

export const i18nLocale = {
    'zh-cn': zh_CN,
    'en-us': en_US
}

export const antdLocale = {
    'zh-cn': {
        antd: antd_zh_CN,
        moment: 'zh-cn'
    },
    'en-us': {
        antd: antd_en_US,
        moment: 'en'
    }
}
