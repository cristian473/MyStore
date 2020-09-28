import { logRoles } from '@testing-library/react';
import { GET_PRODUCTS, REST_STOCK_STATE } from '../constants/productConstants'

const initialState = {
    products: [],
    productsOrden: []
}

export function getData(state = initialState, action) {

    switch (action.type) {

        case GET_PRODUCTS:
            return {
                ...state,
                products: action.payload
            };

        case REST_STOCK_STATE:
            const indexElemet = state.products.findIndex(e => e.id === action.payload.id)
            state.products[indexElemet].stock--;

            return {
                ...state
            }
        case 'SUM_STOCK_STATE':
            const indexElemetToSum = state.products.findIndex(e => e.id === action.payload.id)
            state.products[indexElemetToSum].stock++;

            return {
                ...state
            }
        case 'DELETE_PRODUCT':
            return {
                ...state,
                products: state.products.filter(el => el.id !== action.payload)
            }

    }
    return state;
}