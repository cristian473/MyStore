import {REGISTERED} from '../constants/userConstants'

const initialState = {
    user: {},
    registered: false
}

export function useReducer (state = initialState, action) {

    // console.log(action.payload)
    switch (action.type) {

        case REGISTERED:
            return {...state,
                    user: action.payload,
                    registered: true
                }

    }

        

    return state;
}