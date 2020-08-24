export default {
    /**
     * 更新用户菜单资源
     * @param state
     * @param rescource
     */
    updateUserMenuResource(state, rescource) {
        state.menuResource = rescource
    },
    /**
     * 更新当前菜单
     * @param state
     * @param menu
     */
    updateMenuActive(state, menu) {
        state.menuActive = menu
    },
    /**
     * 更新字典数据
     * @param state
     * @param dict
     */
    updateDict(state, dict) {
        state.dictData = Object.assign(state.dictData, dict)
    }
}
