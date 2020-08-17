import {ADD_PRODUCT_ORDEN} from '../constants/productConstants'

const initialState = {
    productsOrden:[]
}

export function ventasReducer (state = initialState, action) {

    // console.log(action.payload)
    switch (action.type) {

        case ADD_PRODUCT_ORDEN:
            const indexElemet = state.productsOrden.findIndex(e => e.id === action.payload.id)
            
            if(indexElemet !== -1){
                state.productsOrden[indexElemet].cantidad++;
                return {
                    ...state
                }

            }
            else {
                state.productsOrden.push(action.payload)
                return state
            }
            

    }



        

    return state;
}