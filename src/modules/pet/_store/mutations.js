import * as types from './mutation-types'

export default {
    [types.SET_PETS] (state, payload) {
        state.pets = payload;
    },

    [types.ADD_TO_PETS] (state, payload) {
        state.pets.push(payload);
    },
}