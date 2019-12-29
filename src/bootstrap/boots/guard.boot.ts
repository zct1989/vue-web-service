import { ApplicationRouter } from '@/core/application_router'

// 认证白名单
const authWhiteList = ['login']

// 认证状态检测
const authCheck = store => {
  return !!store.state.userModule.username
}

export default function() {
  // 安装认证守卫
  ApplicationRouter.registerGuard(({ store, router }, { to, from, next }) => {
    // 认证白名单
    if (authWhiteList.includes(to.name)) {
      return next()
    }

    // 认证检测
    if (authCheck(store)) {
      next()
    } else {
      next({
        name: 'login'
      })
    }
  })
}
