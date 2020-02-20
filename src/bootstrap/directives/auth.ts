export default store => {
    /**
     * v-auth 按钮权限控制
     */
    return (el, binding, vnode) => {
        // 获取权限编码
        const authCode = binding.value
        // 验证权限码
        if (!authCode) {
            // console.error('未传入权限')
            return
        }
        if (authCode === -1) {
            return
        }
        const hasAuth: boolean =
            store.getters.hasControlAuthority(authCode.toString()) ||
            store.getters.hasMenuAuthority(authCode.toString())

        // 验证权限
        if (!hasAuth) {
            el.style.display = 'none'
        }
    }
}
