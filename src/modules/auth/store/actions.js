import services from '@/http'
import * as storage from '../storage'
import * as types from './mutation-types'

function goTo(path) {
    window.location.href = path
}

export const ActionDoLogin = ({ dispatch }, payload) => {
    return services.auth.login(payload).then((res) => {
        dispatch('ActionSetUser', res.data.user)
        dispatch('ActionSetToken', res.data.token)
        goTo('/')
    })
}

export const ActionCheckToken = ({ dispatch, state }) => {
    if (state.token) {
        return Promise.resolve(state.token)
    }

    const token = storage.getLocalToken()

    if (!token) {
        return Promise.reject(new Error('Token Inválido'))
    }

    dispatch('ActionSetToken', token)
    return dispatch('ActionLoadSession')
}

export const ActionLoadSession = ({ dispatch }) => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
        try {
            const { data: { user } } = await services.auth.loadSession()
            dispatch('ActionSetUser', user)
            
            resolve()
        } catch (error) {
            dispatch('ActionSignOut')
            reject(error)
        }
    })
}

export const ActionSetUser = ({ commit }, payload) => {
    commit(types.SET_USER, payload)
}

export const ActionRegisterUser = async ({ dispatch }, payload) => {
    try {
        const response = await services.auth.registerUser(payload)
        if(response.status === 200) {
            dispatch('ActionDoLogin', { ...payload.user })
        }
    } catch (error) {
        return error && error.body && error.body.erros
    }
    
}

export const ActionUpdateUser = async ({ dispatch }, payload) => {
    try {
        const { data: { user } } = await services.auth.updateUser(payload)
        dispatch('ActionSetUser', user)
    } catch (error) {
        console.log(error)
    }
}

export const ActionDeleteUser = ({ dispatch }, payload) => {
    try {
        services.auth.deleteUser({ user: payload })
        dispatch('ActionSignOut')
        goTo('/login')
    } catch (error) {
        console.log(error)
    }
}

export const ActionSetToken = ({ commit }, payload) => {
    storage.setLocalToken(payload)
    storage.setHeaderToken(payload)
    commit(types.SET_TOKEN, payload)
}

export const ActionSignOut = ({ dispatch }) => {
    storage.setHeaderToken('')
    storage.deleteLocalToken()
    dispatch('ActionSetUser', {})
    dispatch('ActionSetToken', '')
}