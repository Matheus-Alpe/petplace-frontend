import store from '../store'

export const requestInterceptor = (config) => {
    console.log('config:', config)
    return config;
}

export const responseInterceptor = (response) => {
    if (response.status === 401) {
        console.log('responseInterceptor:', response)
        store.dispatch('auth/logOut')
        window._Vue.$router.push({ path: '/auth/login' })
    }
    return response;
}