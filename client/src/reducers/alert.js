import * as types from './../actions/types.js';


const intialState = [];

export default function alertReducer(state = intialState, action){
    const {type, payload} = action;
    switch (type){
        case types.SET_ALERT:
            return [...state, payload];
        case types.REMOVE_ALERT:
            return state.filter((alert) => alert.id !== payload);
        default: return state;
    }
}