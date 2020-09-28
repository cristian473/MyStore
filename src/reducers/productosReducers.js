import { logRoles } from '@testing-library/react';
import { GET_PRODUCTS, REST_STOCK_STATE } from '../constants/productConstants'

const initialState = {
    products: [],
    productsOrden: []
}

export function getData(state = initialState, action) {

    // console.log(action.payload)
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
        case 'DELETE_PRODUCT':
            console.log(action.payload);
            return {
                ...state,
                products: state.products.filter(el => el.id !== action.payload)
            }

    }
    return state;
}