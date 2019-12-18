import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Application from './core/application'

import 'normalize-css/normalize.css'
import '@/assets/styles/default.less'
import '@/assets/styles/layout.less'
import '@/assets/styles/common.less'
import '@/assets/styles/theme.less'

import libs from '~/bootstrap/libs'
import filters from '~/bootstrap/filters'
import directives from '~/bootstrap/directives'
import provides from '@/bootstrap/provides'
import plugins from '~/bootstrap/plugins'
import { boot, launch } from '~/bootstrap/boots'

// 全局注册其他基础组件
import { registerComponent } from '~/bootstrap/global-components'

Vue.config.productionTip = false

// 安装扩展插件
libs.install()

// 系统初始化逻辑
boot()

// 全局注册自定义组件
registerComponent(Vue)

// 初始化应用
new Application({
  router,
  store,
  // 业务数据初始化
  launch,
  bootstrap: {
    provides,
    plugins,
    directives,
    filters
  }
})
