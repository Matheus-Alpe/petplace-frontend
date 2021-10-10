import petService from '@/services/pet-service'
import * as types from './mutation-types'

export const setPets = ({ commit }, payload) => {
    commit(types.SET_PETS, payload)
}

export const setSelectedPet = ({ commit }, payload) => {
    commit(types.SELECT_PET, payload)
}

export const addToPets = ({ commit }, payload) => {
    commit(types.ADD_TO_PETS, payload)
}

export const createPet = async ({ dispatch }, payload) => {
    try {
        const response = await petService.registerPet(payload)
        if(response.status === 200) {
            if (payload.saveImage) {
                await dispatch('uploadPetImage', payload.saveImage, { root: true })
            }
            await dispatch('addToPets', payload.pet)
        }
    } catch (error) {
        console.log(error && error.response)
    }
}

export const updatePet = async ({ dispatch }, payload) => {
    try {
        const { data: { pet } } = await petService.updatePet(payload)
        dispatch('addToPets', pet)
    } catch (error) {
        console.log(error)
    }
}

export const deletePet = async ({ dispatch }, payload) => {
    try {
        await petService.deletePet({ pet: payload })
        dispatch('auth/logOut', null, { root: true })
    } catch (error) {
        console.log(error)
    }
}