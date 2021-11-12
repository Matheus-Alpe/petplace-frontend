import * as types from './mutation-types'

export default {
    [types.SET_TERMS] (state, payload) {
        state.terms = payload;
    },

    [types.ADD_TO_TERMS] (state, payload) {
        state.terms.push(payload);
    },

    [types.SET_SELECTED_TERM] (state, payload) {
        state.selectedTerm = payload;
    },

    [types.UPDATE_SELECTED_TERM] (state, { attribute, value }) {
        if (!state.selectedTerm[attribute]) return;
        state.selectedTerm[attribute] = value;
    },
}