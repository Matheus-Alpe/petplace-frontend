import userService from '@/services/user-service'
import * as types from './mutation-types'

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

// export const ActionUpdateUser = async () => {
//     try {
//         // const { data: { user } } = await services.auth.updateUser(payload)
//         // dispatch('setUser', user)
//     } catch (error) {
//         console.log(error)
//     }
// }

export const deleteUser = async ({ dispatch }, payload) => {
    try {
        await userService.deleteUser({ user: payload })
        dispatch('auth/logOut', null, { root: true })
    } catch (error) {
        console.log(error)
    }
}