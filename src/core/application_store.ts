import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

/**
 * 应用内部数据存储
 */
export class ApplicationStore {
  public static getStore() {
    if (!this._store) {
      this._store = this.createStore()
    }

    return this._store
  }

  private static _store

  private static createStore() {
    return new Vuex.Store({
      plugins: [
        // 持久化存储插件
        createPersistedState({
          key: 'core-vuex',
          storage: localStorage
        })
      ],
      state: {
        // 当前布局
        layout: 'loading',
        // 当前主题
        theme: 'default',
        // 当前语言
        locale: 'zh-cn',
        // 菜单折叠状态
        collapsed: false,
        // 页面全屏标识
        fullscreen: false
      },
      getters: {
        layout(state) {
          return `${state.layout.replace(/^\S/, s => s.toUpperCase())}Layout`
        }
      },
      mutations: {
        /**
         * 更新当前布局
         * @param state
         * @param layout
         */
        updateLayout(state, layout) {
          state.layout = layout
        },
        /**
         * 更新当前主题
         * @param state
         * @param theme
         */
        updateTheme(state, theme) {
          state.theme = theme
        },
        /**
         * 更新当前语言
         * @param state
         * @param locale
         */
        updateLocale(state, locale) {
          state.locale = locale
        },
        /**
         * 更新菜单折叠状态
         * @param state
         */
        updateCollapsed(state) {
          state.collapsed = !state.collapsed
        },
        /**
         * 更新菜单全屏状态
         * @param state
         *
         */
        updateFullscreen(state) {
          state.fullscreen = !state.fullscreen
        }
      }
    })
  }
}
