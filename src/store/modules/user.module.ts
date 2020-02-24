export default {
    namespaced: true,
    state: {
        id: 0,
        username: 'admin'
    },
    mutations: {
        login(state, { username }) {
            state.username = username
        },
        logout(state) {
            state.username = undefined
        }
    }
}
