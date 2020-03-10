export default {
    namespaced: true,
    state: {
        id: 0,
        username: 'admin',
        menus: [],
        department: {},
        token: '',
        info: {}
    },
    mutations: {
        login(state, data) {
            state.id = data.id
            state.token = data.token
            state.username = data.username
            state.menus = data.menus
            state.department = data.department
            state.info = data
        },
        logout(state) {
            state.username = undefined
            state.id = undefined
            state.token = undefined
            state.username = undefined
            state.menus = undefined
            state.department = undefined
            state.info = undefined
        }
    }
}
