import { combineReducers } from 'redux'
import {getData} from './productosReducers'
import {useReducer, userLoggedState} from './userReducer'
import {ventasReducer} from './ventasReducer'

export const reducers = combineReducers({
    products: getData,
    user: useReducer,
    userLogged: userLoggedState,
    orden: ventasReducer
})