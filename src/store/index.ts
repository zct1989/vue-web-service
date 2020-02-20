import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import modules from './modules'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
    // 子模块
    modules: { ...modules },
    state,
    getters,
    mutations,
    actions,
    plugins: [
        // 持久化存储插件
        createPersistedState({
            key: 'vuex',
            storage: localStorage
        })
    ]
})
