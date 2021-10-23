import vetHistoryService from '@/services/vet-history-service'
import * as types from './mutation-types'

export const setVetHistory = ({ commit }, payload) => {
    commit(types.SET_VET_HISTORY, payload)
}

export const setSelectedVetHistory = ({ commit }, payload) => {
    commit(types.SET_SELECTED_VET_HISTORY, payload)
}

export const createVetHistory = async ({ dispatch }, payload) => {
    try {
        await vetHistoryService.registerVetHistory(payload)
        await dispatch('auth/loadSession', {}, { root: true })
    } catch (error) {
        console.log(error && error.response)
    }
}

export const updateVetHistory = async ({ dispatch }, payload) => {
    try {
        await vetHistoryService.updateVetHistory({ vetHistory: { ...payload, id: payload.vethistory_id }})
        await dispatch('auth/loadSession', {}, { root: true })
    } catch (error) {
        return error
    }
}

export const deleteVetHistory = async ({ dispatch }, payload) => {
    try {
        await vetHistoryService.deleteVetHistory({ vetHistory: { ...payload, id: payload.vethistory_id }})
        await dispatch('auth/loadSession', {}, { root: true })
    } catch (error) {
        return error
    }
}