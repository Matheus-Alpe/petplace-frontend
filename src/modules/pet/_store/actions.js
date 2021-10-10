import petService from '@/services/pet-service'
import * as types from './mutation-types'

export const setPets = ({ commit }, payload) => {
    commit(types.SET_PETS, payload)
}

export const setSelectedPet = ({ commit }, payload) => {
    commit(types.SELECT_PET, payload)
}

export const createPet = async ({ dispatch }, payload) => {
    try {
        await petService.registerPet(payload)
        await dispatch('auth/loadSession', {}, { root: true })
    } catch (error) {
        console.log(error && error.response)
    }
}

export const updatePet = async ({ dispatch }, payload) => {
    try {
        await petService.updatePet(payload)
        await dispatch('auth/loadSession', {}, { root: true })
    } catch (error) {
        console.log(error)
    }
}

export const deletePet = async (_, payload) => {
    try {
        await petService.deletePet({ pet: payload })
    } catch (error) {
        console.log(error)
    }
}