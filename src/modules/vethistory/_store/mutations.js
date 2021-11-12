import * as types from './mutation-types'

export default {
    [types.SET_VET_HISTORY] (state, payload) {
        state.vetHistory = payload;
    },

    [types.ADD_TO_VET_HISTORY] (state, payload) {
        state.vetHistory.push(payload);
    },

    [types.SET_SELECTED_VET_HISTORY] (state, payload) {
        state.selectedVetHistory = payload;
    },
}