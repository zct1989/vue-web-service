export default {
    /**
     * 是否拥有菜单权限
     * @param state
     */
    hasMenuAuthority(state) {
        return resourceId =>
            state.menuResource.findIndex(x => x.id === resourceId) > -1
    },
    /**
     * 是否拥有按钮权限
     * @param state
     */
    hasControlAuthority(state) {
        return controlId =>
            state.controlResource.findIndex(x => x.id === controlId) > -1
    }
}
