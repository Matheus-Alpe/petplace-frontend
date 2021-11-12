import store from '../store'

export default async (to, from, next) => {
    document.title = `${to.name} - PetPlace`

    if (to.name !== 'Login' && to.name !== 'Register' && !store.getters['auth/hasToken']) {
        try {
            await store.dispatch('auth/checkToken')
            return next({ name: to.name })
        } catch (error) {
            store.dispatch('auth/logOut')
            return next({ name: 'Login' })
        }
    } 
    if (to.name === 'Login' && store.getters['auth/hasToken']) {
        return next({ name: 'Home' })
    } 

    return next()
} 