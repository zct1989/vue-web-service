import Auth from './auth'

export default (store: any) => {
    return {
        /**
         * 资源认证
         */
        auth: Auth(store)
    }
}
