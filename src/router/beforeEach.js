import store from '../store'

export default async (to, from, next) => {
    document.title = `${to.name} - PetPlace`

    if (to.name !== 'Login' && !store.getters['auth/hasToken']) {
        try {
            await store.dispatch('auth/checkToken')
            next({ name: to.name })
        } catch (error) {
            store.dispatch('auth/logOut')
            next({ name: 'Login' })
        }
    } else {
        if (to.name === 'Login' && store.getters['auth/hasToken']) {
            next({ name: 'Home' })
        } else {
            next()
        }
    }

} 