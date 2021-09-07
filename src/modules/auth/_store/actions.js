// import { api } from '@/http'
import authService from '../../../services/auth'

import * as storage from '@/utils/storage'
import * as types from './mutation-types'

// function goTo(path) {
//     window.location.href = path
// }

export const logIn = async (_, payload) => {
    return await authService.login(payload)
}

// export const ActionCheckToken = ({ dispatch, state }) => {
//     if (state.token) {
//         return Promise.resolve(state.token)
//     }

//     const token = storage.getLocalToken()

//     if (!token) {
//         return Promise.reject(new Error('Token Inválido'))
//     }

//     dispatch('setToken', token)
//     return dispatch('ActionLoadSession')
// }

// export const ActionLoadSession = ({ dispatch }) => {
//     // eslint-disable-next-line no-async-promise-executor
//     return new Promise(async (resolve, reject) => {
//         try {
//             // const { data: { user } } = await services.auth.loadSession()
//             // dispatch('setUser', user)
            
//             resolve()
//         } catch (error) {
//             dispatch('logOut')
//             reject(error)
//         }
//     })
// }

export const setUser = ({ commit }, payload) => {
    commit(types.SET_USER, payload)
}

// export const ActionRegisterUser = async ({ dispatch }, payload) => {
//     try {
//         // const response = await services.auth.registerUser(payload)
//         // if(response.status === 200) {
//         //     if (payload.saveImage) {
//         //         await dispatch('ActionUploadImagem', payload.saveImage)
//         //     }
//         //     dispatch('logIn', { ...payload.user })
//         // }
//     } catch (error) {
//         return error && error.body && error.body.erros
//     }
    
// }

// export const ActionUploadImagem = async ({ dispatch }, payload) => {
//     try {
//         // const { data: { user } } = await services.auth.uploadImage(payload)
//         const formData = new FormData();
//         formData.append('pic', payload, payload.name)
//         // await services.auth.uploadImage(formData);
//         // dispatch('setUser', user)
//     } catch (error) {
//         console.log(dispatch);
//     }
// }

// export const ActionUpdateUser = async () => {
//     try {
//         // const { data: { user } } = await services.auth.updateUser(payload)
//         // dispatch('setUser', user)
//     } catch (error) {
//         console.log(error)
//     }
// }

// export const ActionDeleteUser = ({ dispatch }) => {
//     try {
//         // services.auth.deleteUser({ user: payload })
//         dispatch('logOut')
//         goTo('/login')
//     } catch (error) {
//         console.log(error)
//     }
// }

export const setToken = ({ commit }, payload) => {
    storage.setLocalToken(payload)
    storage.setHeaderToken(payload)
    commit(types.SET_TOKEN, payload)
}

// export const logOut = ({ dispatch }) => {
//     storage.setHeaderToken('')
//     storage.deleteLocalToken()
//     dispatch('setUser', {})
//     dispatch('setToken', '')
// }