import { combineReducers } from 'redux'
import {getData} from './productosReducers'
import {useReducer, userLoggedState} from './userReducer'

export const reducers = combineReducers({
    products: getData,
    user: useReducer,
    userLogged: userLoggedState
})