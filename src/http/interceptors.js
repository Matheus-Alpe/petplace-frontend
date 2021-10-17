import store from '../store'

export const requestInterceptor = (config) => {
    return config;
}

export const responseInterceptor = (response) => {
    if (response.status === 401) {
        store.dispatch('auth/logOut')
        window._Vue.$router.push({ path: '/auth/login' })
    }
    return response;
}