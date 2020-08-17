import {REGISTERED, GET_STORES} from '../constants/userConstants'

const initialState = {
    user: {},
    stores: [],
    items:[],
    registered: false
}

export function userLoggedState (state = initialState, action){
    const userLogged = JSON.parse(localStorage.getItem('userLogged') || "[]");
    if (userLogged){
        return userLogged;
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
        case GET_STORES :
            return {
                ...state,
                stores: action.payload
            }

    }

        

    return state;
}

export function storeReducer (state = initialState, action){

    

}