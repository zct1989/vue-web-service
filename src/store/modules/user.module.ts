export default {
  namespaced: true,
  state: {
    username: ''
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
