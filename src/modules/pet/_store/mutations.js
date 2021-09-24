import * as types from './mutation-types'

export default {
    [types.SET_PET] (state, payload) {
        state.pet = payload
    },

    [types.SET_PETS] (state, payload) {
        state.pets = payload;
    }
}