import {REGISTERED, GET_STORES, LOGGED} from '../constants/userConstants'

const initialState = {
    user: {},
    stores: [],
    items:[],
    registered: false,
    loged: false
}

export function userLoggedState (state = initialState, action){
    const userLogged = JSON.parse(localStorage.getItem('userLogged') || null);
    if (userLogged){
        return {
            ...state,
            user: userLogged,
            loged: true
        };
    }
    return state
}


export function useReducer (state = initialState, action) {

    // console.log(action.payload)
    switch (action.type) {

        case REGISTERED:
            return {...state,
                    user: action.payload,
                    registered: true
                }
        case LOGGED:
            return{
                ...state,
                loged: true
            }
        case GET_STORES :
            return {
                ...state,
                stores: action.payload
            }

    }

        

    return state;
}
