import { combineReducers } from 'redux'
import {getData} from './productosReducers'

export const reducers = combineReducers({
    products: getData
})