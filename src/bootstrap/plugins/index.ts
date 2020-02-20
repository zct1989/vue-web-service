import filterPlugin from './filter.plugin'
import commonPlugin from './common.plugin'
import loggerPlugin from './logger.plugin'
import modalPlugin from './modal.plugin'
import dictPlugin from './dict.plugins'

export default store => ({
    filterPlugin,
    commonPlugin,
    loggerPlugin,
    modalPlugin,
    dictPlugin
})
