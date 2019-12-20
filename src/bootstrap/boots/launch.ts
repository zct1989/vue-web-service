import menu from '~/assets/json/menu.json'

export const launch = async ({ store, router }) => {
  store.commit('updateUserMenuResource', menu)
}
