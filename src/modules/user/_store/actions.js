import userService from '@/services/user-service'
import * as types from './mutation-types'

export const setUser = ({ commit }, payload) => {
    commit(types.SET_USER, payload)
}

export const createUser = async ({ dispatch }, payload) => {
    try {
        const response = await userService.registerUser(payload)
        if(response.status === 200) {
            if (payload.saveImage) {
                await dispatch('uploadUserImage', payload.saveImage, { root: true })
            }
            dispatch('auth/logIn', { ...payload.user }, { root: true })
        }
    } catch (error) {
        const responseError =  error && error.response
        const errorMessages = responseError && responseError.data 
        return errorMessages && errorMessages.erros
    }
}

export const updateUser = async ({ dispatch }, payload) => {
    try {
        const { data: { user } } = await userService.updateUser(payload)
        dispatch('setUser', user)
    } catch (error) {
        return error
    }
}

export const deleteUser = async ({ dispatch }, payload) => {
    try {
        await userService.deleteUser({ user: payload })
        dispatch('auth/logOut', null, { root: true })
    } catch (error) {
        return error
    }
}