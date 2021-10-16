import vetHistoryService from '@/services/vet-history-service'
import * as types from './mutation-types'

export const setVetHistory = ({ commit }, payload) => {
    commit(types.SET_VET_HISTORY, payload)
}

export const createPet = async ({ dispatch }, payload) => {
    try {
        await vetHistoryService.registerPet(payload)
        await dispatch('auth/loadSession', {}, { root: true })
    } catch (error) {
        console.log(error && error.response)
    }
}

export const updatePet = async ({ dispatch }, payload) => {
    try {
        await vetHistoryService.updatePet(payload)
        await dispatch('auth/loadSession', {}, { root: true })
    } catch (error) {
        console.log(error)
    }
}

export const deletePet = async (_, payload) => {
    try {
        await vetHistoryService.deletePet({ pet: payload })
    } catch (error) {
        console.log(error)
    }
}