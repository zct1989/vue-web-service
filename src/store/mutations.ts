export default {
    /**
     * 更新用户菜单资源
     * @param state
     * @param rescource
     */
    updateUserMenuResource(state, rescource) {
        state.menuResource = rescource
    },
    updateMenuActive(state, menu) {
        state.menuActive = menu
    }
}
