import { combineReducers } from 'redux'
import {getData} from './productosReducers'
import {useReducer} from './userReducer'

export const reducers = combineReducers({
    products: getData,
    user: useReducer
})