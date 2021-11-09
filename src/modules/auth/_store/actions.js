import authService from '@/services/auth-service'

import * as storage from '@/utils/storage'
import * as types from './mutation-types'

export const logIn = async ({ dispatch }, payload) => {
    const { data } = await authService.login(payload)
    if (data.status && data.status > 400) {
        return data
    }

    dispatch('setToken', data.token)
    dispatch('loadSession')
}

export const logOut = ({ dispatch }) => {
    dispatch('setToken', '')
    storage.setHeaderToken('')
    storage.deleteLocalToken()
    dispatch('user/setUser', {}, { root: true })
    dispatch('pet/setPets', [], { root: true })
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
            const { data } = await authService.loadSession()
            console.log(data)
            dispatch('user/setUser', data.user, { root: true })
            dispatch('pet/setPets', data.pets, { root: true })
            dispatch('vetHistory/setVetHistory', data.vetHistory, { root: true })
            dispatch('responsibilityTerm/setTerms', data.terms, { root: true })
            resolve(data.user)
        } catch (error) {
            dispatch('logOut')
            reject(error)
        }
    })
}