import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './app'
Vue.use(VueRouter)

import { IApplicationOption } from './interfaces/application-option.interface'
import { ApplicationRouter } from './application_router'
import { ApplicationStore } from './application_store'
import VueI18n, { IVueI18n } from 'vue-i18n'
import { i18nLocale } from '~/assets/locale'

export default class Application {
    private router: ApplicationRouter
    public static i18n: VueI18n
    /**
     * 构造函数
     * @param options
     */
    constructor(options: IApplicationOption) {
        // 进行全局混入
        this.mixins()

        // 安装基础插件
        Vue.use(VueRouter)
        Vue.use(VueI18n)
        // application store
        const store = ApplicationStore.getStore()
        // 注册路由扩展
        this.router = new ApplicationRouter(options, store)

        const i18n = new VueI18n({
            locale: store.state.locale,
            messages: i18nLocale,
            silentTranslationWarn: true
        })
        Application.i18n = i18n
        // 初始化框架
        this.bootstrap(options, () => {
            new Vue({
                router: options.router,
                store: options.store,
                i18n,
                render: h => h(options.app, {}, [h(App)])
            }).$mount('#app')
        })
    }

    /**
     * 全局混入
     */
    public mixins() {
        // var Component = Vue.extend({
        //   mixins: [validationMixin]
        // })

        // 添加插件
        Vue.use({
            install: () => {
                Vue.prototype.$app = {
                    router: this.router,
                    store: ApplicationStore.getStore(),
                    state: ApplicationStore.getStore().state
                }
            }
        })
    }

    /**
     * 初始化配置
     * @param options 配置选项
     * @param callback
     */
    private bootstrap(
        { store, bootstrap }: IApplicationOption,
        applicationInit
    ) {
        // 安装过滤器
        if (bootstrap.filters) {
            Object.entries(bootstrap.filters(store)).forEach(
                ([key, fun]: [string, any]) => {
                    Vue.filter(key, fun)
                }
            )
        }

        // 安装指令
        if (bootstrap.directives) {
            Object.entries(bootstrap.directives(store)).forEach(
                ([key, fun]) => {
                    Vue.directive(key, fun as any)
                }
            )
        }

        // 安装插件
        if (bootstrap.plugins) {
            Object.entries(bootstrap.plugins(store)).forEach(
                ([key, plugin]: [string, any]) => {
                    Vue.use(plugin)
                }
            )
        }

        // UI实例化
        applicationInit()
    }
}
