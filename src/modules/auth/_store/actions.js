import authService from '@/services/auth-service'

import * as storage from '@/utils/storage'
import * as types from './mutation-types'

export const logIn = async ({ dispatch }, payload) => {
    const { data } = await authService.login(payload)
    if (data.status && data.status > 400) {
        return data
    }
    dispatch('user/setUser', data.user, { root: true })
    dispatch('setToken', data.token)
}

export const logOut = ({ dispatch }) => {
    storage.setHeaderToken('')
    storage.deleteLocalToken()
    dispatch('setToken', '')
    dispatch('user/setUser', {}, { root: true })
}

export const setToken = ({ commit }, payload) => {
    storage.setLocalToken(payload)
    storage.setHeaderToken(payload)
    commit(types.SET_TOKEN, payload)
}

export const checkToken = ({ dispatch, state }) => {
    if (state.token) {
        return Promise.resolve(state.token)
    }

    const token = storage.getLocalToken()

    if (!token) {
        return Promise.reject(new Error('Token inválido'))
    }

    dispatch('setToken', token)
    return dispatch('loadSession')
}

export const loadSession = ({ dispatch }) => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
        try {
            const { data: { user } } = await authService.loadSession()
            dispatch('user/setUser', user, { root: true })
            resolve()
        } catch (error) {
            dispatch('logOut')
            reject(error)
        }
    })
}