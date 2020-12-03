import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import MobileDetect from 'mobile-detect'
import router from '@/router'
import { message } from 'ant-design-vue'
import { ConsoleLoggerService } from '@/shared/utils/logger.service'

export enum RedirectMethod {
    Auto = 'auto',
    Redirect = 'redirect',
    Router = 'router'
}

const detect = new MobileDetect(navigator.userAgent)

interface Tab {
    title?: string
    name?: string
    path?: string
    params?: any
    query?: any
}

/**
 * 应用内部数据存储
 */
export class ApplicationStore {
    public static getStore() {
        if (!this._store) {
            this._store = this.createStore()
            this._store.commit('updateReady', false)
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
                // 初始化状态
                ready: false,
                // 选项卡标签
                tabs: [],
                // 当前标签页
                currentTab: '',
                // 当前布局
                layout: 'loading',
                // 当前主题
                theme: 'default',
                // 当前语言
                locale: 'zh-cn',
                // 菜单折叠状态
                collapsed: false,
                // 页面全屏标识
                fullscreen: false,
                // 移动端标识
                mobile: !!detect.mobile()
            },
            getters: {
                layout(state) {
                    return `${state.layout.replace(/^\S/, s =>
                        s.toUpperCase()
                    )}Layout`
                }
            },
            mutations: {
                /**
                 * 更新系统准备状态
                 * @param state
                 *
                 */
                updateReady(state, value: boolean) {
                    state.ready = value
                },
                clearOtherTabs(state: any, name: string) {
                    // 获取需要关闭的页面名称
                    name = name || state.currentTab.name
                    // 修改页面tabs
                    const tabs = state.tabs.filter(item => item.name === name)

                    state.currentTab = tabs[0]
                    state.tabs = tabs
                },
                clearRightTabs(state: any, name: string) {
                    // 获取需要关闭的页面名称
                    name = name || state.currentTab.name
                    // 目标Index
                    let index = state.tabs.findIndex(item => item.name === name)
                    // 当前Tab的Index
                    let currentindex = state.tabs.findIndex(
                        item => item.name === state.currentTab.name
                    )
                    // 修改页面tabs
                    const tabs = state.tabs.slice(0, index + 1)

                    if (currentindex > index) {
                        state.currentTab = tabs[index]
                    }

                    state.tabs = tabs
                },
                /**
                 * 更新Tabs列表
                 * @param state
                 * @param tabs
                 */
                closeTab(
                    state: any,
                    {
                        id,
                        name,
                        method = RedirectMethod.Auto,
                        redirectName
                    }: {
                        id?: string
                        name?: string
                        method: RedirectMethod
                        redirectName?: string
                    }
                ) {
                    if (state.tabs.length === 1) {
                        message.warning('这是最后一页，不能再关闭了啦')
                        return
                    }
                    // 获取需要关闭的页面名称
                    let index = -1
                    const tabs = [...state.tabs]

                    if (id) {
                        // 获取需要关闭的页面Index
                        index = state.tabs.findIndex(item => item.id === id)
                    } else {
                        name = name || state.currentTab.name
                        // 获取需要关闭的页面Index
                        index = state.tabs.findIndex(item => item.name === name)
                    }

                    // 删除目标tab
                    tabs.splice(index, 1)

                    switch (method) {
                        case RedirectMethod.Auto:
                            index =
                                index >= tabs.length ? tabs.length - 1 : index
                            state.currentTab = tabs[index]
                            break
                        case RedirectMethod.Router:
                            router.back()
                            break
                        case RedirectMethod.Redirect: {
                            const tab = state.tabs.find(
                                x => x.name === x.redirectName
                            )

                            if (tab) {
                                state.currentTab = tabs[index]
                            } else {
                                router.push({ name: redirectName })
                            }
                        }
                    }

                    state.tabs = tabs
                },
                /**
                 * 更新Tabs列表
                 * @param state
                 * @param tabs
                 */
                openTab(state, tab) {
                    const tabs: any[] = state.tabs

                    if (!tab.name && !tab.path) {
                        return
                    }

                    tab.id = `${tab.name || ''}_${tab.path || ''}`

                    if (!tabs.find(x => x.id === tab.id)) {
                        tabs.push(tab)
                    }

                    state.currentTab = tab
                },
                /**
                 * 更新激活tab
                 * @param state
                 * @param tab
                 */
                updateCurrentTab(state, tab) {
                    state.currentTab = tab
                },
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
