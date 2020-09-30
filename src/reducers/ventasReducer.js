import { ADD_PRODUCT_ORDEN } from '../constants/productConstants'

const initialState = {
    productsOrden: [],
    productsInOrden: {},
    gastos: []
}

export function ventasReducer(state = initialState, action) {

    switch (action.type) {

        case ADD_PRODUCT_ORDEN:
            const indexElemet = state.productsOrden.findIndex(e => e.id === action.payload.id)
            if (indexElemet !== -1) {
                state.productsOrden[indexElemet].cantidad++;
                return {
                    ...state
                }

            }
            else {
                state.productsOrden.push(action.payload)
                return state
            }
        case 'REST_PRODUCT_ORDEN':
            const indexElemetToRest = state.productsOrden.findIndex(el => el.id === action.payload.id)
            if (indexElemetToRest !== -1) {
                if (state.productsOrden[indexElemetToRest].cantidad === 1) {
                    state.productsOrden.splice(indexElemetToRest, 1)
                    return {
                        ...state,
                    }
                }
                else {
                    state.productsOrden[indexElemetToRest].cantidad--
                    return {
                        ...state
                    }
                }
            }
        case 'CLEAN_ORDEN':
            return {
                ...state,
                productsOrden: []
            }
        case 'GET_GASTOS':
            return {
                ...state,
                gastos: action.payload
            }
        case 'CLEAN_AMOUNT':
            return {
                ...state,
                productsInOrden: action.payload
            }
    }
    return state;
}